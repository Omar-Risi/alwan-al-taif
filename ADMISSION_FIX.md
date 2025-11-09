# Admission Form Error Fix

## Issues Fixed

1. **File Upload Handling** - Converted File objects to Buffer for Supabase upload
2. **Error Logging** - Added detailed console logs to track issues
3. **Error Messages** - Improved error display to show actual error details

## Testing Steps

### Step 1: Test Without Files First

Temporarily change the form submission URL to test the database insert:

In `app/admission/form/page.tsx`, change:
```typescript
const response = await fetch('/api/admissions/test', {  // Changed to /test
  method: 'POST',
  body: formDataToSend,
});
```

This will skip file uploads and test if the database insert works.

### Step 2: Check Console Logs

Open browser console (F12) and check for:
- "Submitting form..."
- "Response: ..."
- Any error messages

Also check your terminal/server logs for:
- "=== TEST API CALLED ==="
- "Form data entries:"
- "Database connection OK"
- "Insert successful:"

### Step 3: Common Issues & Solutions

#### Issue: "Database connection failed"
**Solution:** Check your `.env.local` file has:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### Issue: "Failed to submit application" with details about missing columns
**Solution:** Make sure you ran the SQL query to create the `admissions` table

#### Issue: "RLS policy violation"
**Solution:** Make sure you have the policy:
```sql
CREATE POLICY "Anyone can submit admission"
  ON admissions FOR INSERT TO public WITH CHECK (true);
```

#### Issue: File upload errors
**Solution:** 
1. Create the `documents` bucket in Supabase Storage
2. Make it public
3. Add the storage policies from ADMISSION_SETUP.md

### Step 4: Enable File Uploads

Once the test API works, change back to the main API:
```typescript
const response = await fetch('/api/admissions', {  // Back to main API
  method: 'POST',
  body: formDataToSend,
});
```

## Quick Debug Checklist

- [ ] SQL table created in Supabase
- [ ] RLS policies added
- [ ] Storage bucket 'documents' created
- [ ] Storage bucket is public
- [ ] Storage policies added
- [ ] Environment variables set correctly
- [ ] Server restarted after env changes
- [ ] Browser console shows no CORS errors
- [ ] Server logs show API is being called

## Manual Test Query

Run this in Supabase SQL Editor to test if table exists:
```sql
SELECT * FROM admissions LIMIT 1;
```

If you get "relation does not exist", run the full SQL from `database/admissions_table.sql`

## File Upload Test

To test file uploads separately:
```sql
-- Check if bucket exists
SELECT * FROM storage.buckets WHERE id = 'documents';

-- If not, create it
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', true);
```

## Still Having Issues?

Check the exact error message in:
1. Browser console (F12 → Console tab)
2. Server terminal logs
3. Supabase Dashboard → Logs

The error message will tell you exactly what's wrong:
- Missing column → SQL table not created properly
- RLS violation → Policies not set
- Storage error → Bucket not created or policies missing
- Network error → Environment variables wrong
