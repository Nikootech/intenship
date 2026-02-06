-- Enable the storage extension if not already enabled (though usually pre-installed)

-- 1. Create the 'resumes' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Access objects" ON storage.objects;
DROP POLICY IF EXISTS "Public Insert objects" ON storage.objects;
DROP POLICY IF EXISTS "Public Select objects" ON storage.objects;

-- 3. Create Policy: Allow Public Read Access
CREATE POLICY "Public Select objects"
ON storage.objects FOR SELECT
USING ( bucket_id = 'resumes' );

-- 4. Create Policy: Allow Public Insert/Upload Access
CREATE POLICY "Public Insert objects"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'resumes' );

-- 5. Create Policy: Allow Public Update (optional, if needed)
-- CREATE POLICY "Public Update objects"
-- ON storage.objects FOR UPDATE
-- USING ( bucket_id = 'resumes' );
