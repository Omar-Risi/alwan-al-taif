# Admission System Setup Guide

## Overview
The admission system is now fully integrated with API routes and database. Here's what has been implemented:

## Files Created/Modified

### API Routes
1. **`app/api/admissions/route.ts`** - Main API for creating and listing admissions
2. **`app/api/admissions/[id]/route.ts`** - API for getting, updating, and deleting specific admissions

### Form Pages
1. **`app/admission/page.tsx`** - Redirects to terms page
2. **`app/admission/terms/page.tsx`** - Terms and conditions (with i18n support)
3. **`app/admission/form/page.tsx`** - Updated with API submission

### Database
1. **`database/admissions_table.sql`** - Complete SQL schema

## Database Setup

### Step 1: Run the SQL Query in Supabase

Execute the following SQL in your Supabase SQL Editor:

```sql
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admissions_status ON admissions(status);
CREATE INDEX IF NOT EXISTS idx_admissions_created_at ON admissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admissions_student_name ON admissions(student_name);
CREATE INDEX IF NOT EXISTS idx_admissions_parent_name ON admissions(parent_name);

-- Enable RLS
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can submit admission"
  ON admissions FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Authenticated users can view all admissions"
  ON admissions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can update admissions"
  ON admissions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete admissions"
  ON admissions FOR DELETE TO authenticated USING (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admissions_updated_at
  BEFORE UPDATE ON admissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Step 2: Create Storage Bucket

In Supabase Dashboard:
1. Go to **Storage**
2. Create a new bucket named **`documents`**
3. Make it **public**
4. Set up the following policies:

```sql
-- Allow public upload
CREATE POLICY "Anyone can upload documents"
  ON storage.objects FOR INSERT TO public
  WITH CHECK (bucket_id = 'documents');

-- Allow public read
CREATE POLICY "Anyone can view documents"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'documents');
```

## How It Works

### User Flow
1. User visits `/admission`
2. Redirected to `/admission/terms`
3. Must read and agree to terms
4. Redirected to `/admission/form`
5. Fills out comprehensive form with file uploads
6. Form submits to `/api/admissions`
7. Files uploaded to Supabase Storage
8. Data saved to database
9. Success message shown
10. Redirected to homepage

### Admin Flow
1. Admin logs in
2. Goes to `/dashboard/applications`
3. Views all submitted applications
4. Can filter by status (pending/approved/rejected)
5. Can search by student or parent name
6. Can view details of each application
7. Can approve or reject applications
8. Can download documents

## API Endpoints

### POST /api/admissions
- **Purpose**: Submit new admission application
- **Body**: FormData with all form fields and files
- **Response**: Created admission record

### GET /api/admissions
- **Purpose**: List all admissions
- **Query Params**: 
  - `status`: Filter by status (pending/approved/rejected)
  - `search`: Search by student or parent name
- **Response**: Array of admissions

### GET /api/admissions/[id]
- **Purpose**: Get single admission details
- **Response**: Single admission record

### PATCH /api/admissions/[id]
- **Purpose**: Update admission status
- **Body**: `{ status: 'approved' | 'rejected' }`
- **Response**: Updated admission record

### DELETE /api/admissions/[id]
- **Purpose**: Delete admission
- **Response**: Success message

## Environment Variables Required

Make sure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Features Implemented

✅ Complete admission form with all required fields
✅ File upload for 5 documents (birth certificate, vaccination card, passport, parent ID, house photo)
✅ Terms and conditions page with bilingual support
✅ API routes for CRUD operations
✅ Database schema with proper indexes and RLS
✅ Form validation and error handling
✅ Loading states and success messages
✅ Dashboard integration (needs field mapping update)
✅ Status management (pending/approved/rejected)
✅ Search and filter functionality

## Next Steps

To complete the dashboard integration, update the `app/dashboard/applications/page.tsx` to use the new field names:
- `childName` → `student_name`
- `gradeApplying` → `class_applying`
- `dateOfBirth` → `date_of_birth`
- `fatherName` → `parent_name`
- `fatherPhone` → `mobile_number`
- `submittedAt` → `created_at`

## Testing

1. Visit `/admission`
2. Read and agree to terms
3. Fill out the form
4. Upload all required documents
5. Submit
6. Check Supabase database for the new record
7. Check Storage bucket for uploaded files
8. Login to dashboard and view the application
