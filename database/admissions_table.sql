-- Create admissions table
CREATE TABLE IF NOT EXISTS admissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Student Information
  class_applying VARCHAR(10) NOT NULL,
  student_name VARCHAR(255) NOT NULL,
  father_name VARCHAR(255) NOT NULL,
  grandfather_name VARCHAR(255) NOT NULL,
  tribe_name VARCHAR(255) NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  place_of_birth VARCHAR(255) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  religion VARCHAR(100) NOT NULL,
  remarks TEXT,
  
  -- Father Information
  parent_name VARCHAR(255) NOT NULL,
  mobile_number VARCHAR(20) NOT NULL,
  work_mobile_number VARCHAR(20),
  job VARCHAR(255) NOT NULL,
  place_of_work VARCHAR(255) NOT NULL,
  
  -- Mother Information
  mother_name VARCHAR(255) NOT NULL,
  mother_mobile_number VARCHAR(20) NOT NULL,
  mother_work_mobile_number VARCHAR(20),
  mother_job VARCHAR(255) NOT NULL,
  mother_place_of_work VARCHAR(255) NOT NULL,
  
  -- Relative Information
  relative_name VARCHAR(255) NOT NULL,
  relative_phone VARCHAR(20) NOT NULL,
  
  -- Previous Education
  previous_school VARCHAR(255),
  
  -- Transport and Home Data
  region VARCHAR(255) NOT NULL,
  village_no VARCHAR(50) NOT NULL,
  house_number VARCHAR(50) NOT NULL,
  site_description TEXT,
  school_transport VARCHAR(10) NOT NULL,
  transportation_type VARCHAR(100),
  trip_type VARCHAR(50),
  
  -- Document URLs
  birth_certificate_url TEXT,
  vaccination_card_url TEXT,
  passport_url TEXT,
  parent_id_url TEXT,
  house_photo_url TEXT,
  
  -- Status and Metadata
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on status for faster filtering
CREATE INDEX IF NOT EXISTS idx_admissions_status ON admissions(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_admissions_created_at ON admissions(created_at DESC);

-- Create index on student_name for searching
CREATE INDEX IF NOT EXISTS idx_admissions_student_name ON admissions(student_name);

-- Create index on parent_name for searching
CREATE INDEX IF NOT EXISTS idx_admissions_parent_name ON admissions(parent_name);

-- Enable Row Level Security (RLS)
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (anyone can submit)
CREATE POLICY "Anyone can submit admission"
  ON admissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy for authenticated users to read all
CREATE POLICY "Authenticated users can view all admissions"
  ON admissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated users to update
CREATE POLICY "Authenticated users can update admissions"
  ON admissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy for authenticated users to delete
CREATE POLICY "Authenticated users can delete admissions"
  ON admissions
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_admissions_updated_at
  BEFORE UPDATE ON admissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for documents (run this in Supabase dashboard or via API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true);

-- Create storage policy for public upload
-- CREATE POLICY "Anyone can upload documents"
--   ON storage.objects
--   FOR INSERT
--   TO public
--   WITH CHECK (bucket_id = 'documents');

-- Create storage policy for public read
-- CREATE POLICY "Anyone can view documents"
--   ON storage.objects
--   FOR SELECT
--   TO public
--   USING (bucket_id = 'documents');
