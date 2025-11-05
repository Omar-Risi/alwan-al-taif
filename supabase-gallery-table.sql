-- Create gallery table
CREATE TABLE public.gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published gallery items
CREATE POLICY "Anyone can view published gallery"
  ON public.gallery
  FOR SELECT
  USING (published = true);

-- Allow public to view all gallery (for dashboard)
CREATE POLICY "Public can view all gallery"
  ON public.gallery
  FOR SELECT
  TO public
  USING (true);

-- Allow public to insert gallery (API will check auth)
CREATE POLICY "Public can insert gallery"
  ON public.gallery
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public to update gallery (API will check auth)
CREATE POLICY "Public can update gallery"
  ON public.gallery
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow public to delete gallery (API will check auth)
CREATE POLICY "Public can delete gallery"
  ON public.gallery
  FOR DELETE
  TO public
  USING (true);

-- Create index for faster queries (newest first)
CREATE INDEX idx_gallery_published_created ON public.gallery(published, created_at DESC);
CREATE INDEX idx_gallery_type ON public.gallery(type);

-- Create updated_at trigger
CREATE TRIGGER update_gallery_updated_at
  BEFORE UPDATE ON public.gallery
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
