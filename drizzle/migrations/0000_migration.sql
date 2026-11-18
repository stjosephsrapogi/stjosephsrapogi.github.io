CREATE TABLE public.admission_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  parent_name text NOT NULL CHECK (char_length(btrim(parent_name)) BETWEEN 2 AND 100),
  phone text NOT NULL CHECK (char_length(btrim(phone)) BETWEEN 7 AND 25),
  email text CHECK (email IS NULL OR (char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')),
  student_name text NOT NULL CHECK (char_length(btrim(student_name)) BETWEEN 2 AND 100),
  grade text NOT NULL CHECK (grade IN ('Grade 10', 'Grade 11', 'Grade 12', 'Not sure yet')),
  current_school text CHECK (current_school IS NULL OR char_length(current_school) <= 150),
  message text NOT NULL CHECK (char_length(btrim(message)) BETWEEN 5 AND 1500)
);

GRANT INSERT ON public.admission_inquiries TO anon, authenticated;
GRANT ALL ON public.admission_inquiries TO service_role;

ALTER TABLE public.admission_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can send an admission inquiry"
  ON public.admission_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);