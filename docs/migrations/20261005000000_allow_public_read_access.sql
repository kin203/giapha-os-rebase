-- Allow public (anon & authenticated) read access for basic family tree features

-- 1. Table Data Grants
GRANT SELECT ON public.persons TO anon;
GRANT SELECT ON public.relationships TO anon;
GRANT SELECT ON public.custom_events TO anon;
GRANT SELECT ON public.gallery_items TO anon;

-- 2. Persons Policy
DROP POLICY IF EXISTS "Active users can view persons" ON public.persons;
DROP POLICY IF EXISTS "Anyone can view persons" ON public.persons;
CREATE POLICY "Anyone can view persons" ON public.persons
  FOR SELECT TO anon, authenticated USING (true);

-- 3. Relationships Policy
DROP POLICY IF EXISTS "Active users can view relationships" ON public.relationships;
DROP POLICY IF EXISTS "Anyone can view relationships" ON public.relationships;
CREATE POLICY "Anyone can view relationships" ON public.relationships
  FOR SELECT TO anon, authenticated USING (true);

-- 4. Custom Events Policy
DROP POLICY IF EXISTS "Active users can view custom events" ON public.custom_events;
DROP POLICY IF EXISTS "Anyone can view custom events" ON public.custom_events;
CREATE POLICY "Anyone can view custom events" ON public.custom_events
  FOR SELECT TO anon, authenticated USING (true);

-- 5. Gallery Items Policy
DROP POLICY IF EXISTS "Active users can view gallery" ON public.gallery_items;
DROP POLICY IF EXISTS "Anyone can view gallery" ON public.gallery_items;
CREATE POLICY "Anyone can view gallery" ON public.gallery_items
  FOR SELECT TO anon, authenticated USING (true);

-- 6. Storage Buckets Policies (Avatars and Gallery)
DROP POLICY IF EXISTS "Active users can view avatars" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;
CREATE POLICY "Anyone can view avatars" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Active users can view gallery files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view gallery files" ON storage.objects;
CREATE POLICY "Anyone can view gallery files" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'gallery');
