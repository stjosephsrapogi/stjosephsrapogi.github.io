CREATE POLICY "Anyone can view news media" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'news-media');