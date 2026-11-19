CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT, INSERT, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin', 'editor'))
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_staff(uuid) TO authenticated;

CREATE POLICY "Users see their own roles, admins see all" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins add editors" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') AND role = 'editor');
CREATE POLICY "Admins remove editors" ON public.user_roles
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') AND role = 'editor');

-- The school's own inboxes become the main admin when they sign up.
CREATE OR REPLACE FUNCTION public.grant_school_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF lower(NEW.email) IN ('stjosephsschoolrapogi@gmail.com', 'rapogihighschool@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created_grant_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.grant_school_admin();

-- Admins list signed-up accounts so they can give staff access.
CREATE OR REPLACE FUNCTION public.list_accounts()
RETURNS TABLE (user_id uuid, email text, created_at timestamptz, role public.app_role)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can list accounts';
  END IF;
  RETURN QUERY
    SELECT u.id, u.email::text, u.created_at,
      (SELECT r.role FROM public.user_roles r WHERE r.user_id = u.id
        ORDER BY CASE r.role WHEN 'admin' THEN 0 ELSE 1 END LIMIT 1)
    FROM auth.users u
    ORDER BY u.created_at DESC;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.list_accounts() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.list_accounts() TO authenticated;

CREATE TABLE public.news_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  author_id uuid NOT NULL DEFAULT auth.uid(),
  body text NOT NULL DEFAULT '' CHECK (char_length(body) <= 3000),
  image_paths text[] NOT NULL DEFAULT '{}' CHECK (cardinality(image_paths) <= 6),
  video_path text CHECK (video_path IS NULL OR char_length(video_path) <= 300),
  video_url text CHECK (video_url IS NULL OR (char_length(video_url) <= 500 AND video_url ~* '^https?://')),
  CHECK (char_length(btrim(body)) > 0 OR cardinality(image_paths) > 0 OR video_path IS NOT NULL OR video_url IS NOT NULL)
);
CREATE INDEX news_posts_created_at_idx ON public.news_posts (created_at DESC);
GRANT SELECT ON public.news_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.news_posts TO authenticated;
GRANT ALL ON public.news_posts TO service_role;
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read news" ON public.news_posts
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff can post news" ON public.news_posts
  FOR INSERT TO authenticated
  WITH CHECK (public.is_staff(auth.uid()) AND author_id = auth.uid());
CREATE POLICY "Staff can edit news" ON public.news_posts
  FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff can delete news" ON public.news_posts
  FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

CREATE TABLE public.live_stream (
  id smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  is_live boolean NOT NULL DEFAULT false,
  title text NOT NULL DEFAULT '' CHECK (char_length(title) <= 150),
  stream_url text NOT NULL DEFAULT '' CHECK (char_length(stream_url) <= 500 AND (stream_url = '' OR stream_url ~* '^https?://')),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid DEFAULT auth.uid()
);
GRANT SELECT ON public.live_stream TO anon;
GRANT SELECT, INSERT, UPDATE ON public.live_stream TO authenticated;
GRANT ALL ON public.live_stream TO service_role;
ALTER TABLE public.live_stream ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can see the live stream" ON public.live_stream
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff can start the live stream" ON public.live_stream
  FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff can update the live stream" ON public.live_stream
  FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- Photos and videos for news posts (bucket created separately).
CREATE POLICY "Staff upload news media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'news-media' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff delete news media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'news-media' AND public.is_staff(auth.uid()));