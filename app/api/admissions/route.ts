import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    console.log('Received form data');
    
    // Extract form fields
    const data = {
      // Student Information
      class_applying: formData.get('classApplying'),
      student_name: formData.get('studentName'),
      father_name: formData.get('fatherName'),
      grandfather_name: formData.get('grandfatherName'),
      tribe_name: formData.get('tribeName'),
      nationality: formData.get('nationality'),
      date_of_birth: formData.get('dateOfBirth'),
      place_of_birth: formData.get('placeOfBirth'),
      gender: formData.get('gender'),
      religion: formData.get('religion'),
      remarks: formData.get('remarks'),
      
      // Father Information
      parent_name: formData.get('parentName'),
      mobile_number: formData.get('mobileNumber'),
      work_mobile_number: formData.get('workMobileNumber'),
      job: formData.get('job'),
      place_of_work: formData.get('placeOfWork'),
      
      // Mother Information
      mother_name: formData.get('motherName'),
      mother_mobile_number: formData.get('motherMobileNumber'),
      mother_work_mobile_number: formData.get('motherWorkMobileNumber'),
      mother_job: formData.get('motherJob'),
      mother_place_of_work: formData.get('motherPlaceOfWork'),
      
      // Relative Information
      relative_name: formData.get('relativeName'),
      relative_phone: formData.get('relativePhone'),
      
      // Previous Education
      previous_school: formData.get('previousSchool'),
      
      // Transport and Home Data
      region: formData.get('region'),
      village_no: formData.get('villageNo'),
      house_number: formData.get('houseNumber'),
      site_description: formData.get('siteDescription'),
      school_transport: formData.get('schoolTransport'),
      transportation_type: formData.get('transportationType'),
      trip_type: formData.get('tripType'),
      
      status: 'pending',
    };

    // Handle file uploads
    const fileFields = ['birthCertificate', 'vaccinationCard', 'passport', 'parentId', 'housePhoto'];
    const uploadedFiles: any = {};

    // Upload files to Supabase Storage
    for (const fieldName of fileFields) {
      const file = formData.get(fieldName);
      
      if (file && file instanceof File && file.size > 0) {
        try {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `admissions/${fileName}`;

          // Convert File to ArrayBuffer
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, buffer, {
              contentType: file.type,
              upsert: false
            });

          if (uploadError) {
            console.error(`Error uploading ${fieldName}:`, uploadError);
            continue;
          }

          const { data: { publicUrl } } = supabase.storage
            .from('documents')
            .getPublicUrl(filePath);

          uploadedFiles[fieldName] = publicUrl;
        } catch (uploadErr) {
          console.error(`Error processing ${fieldName}:`, uploadErr);
        }
      }
    }

    // Add file URLs to data
    const finalData = {
      ...data,
      birth_certificate_url: uploadedFiles.birthCertificate || null,
      vaccination_card_url: uploadedFiles.vaccinationCard || null,
      passport_url: uploadedFiles.passport || null,
      parent_id_url: uploadedFiles.parentId || null,
      house_photo_url: uploadedFiles.housePhoto || null,
    };

    console.log('Attempting to insert data:', finalData);

    // Insert into database
    const { data: insertedData, error: insertError } = await supabase
      .from('admissions')
      .insert([finalData])
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      console.error('Error details:', JSON.stringify(insertError, null, 2));
      return NextResponse.json(
        { error: 'Failed to submit application', details: insertError.message, hint: insertError.hint },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Application submitted successfully', data: insertedData },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error processing admission:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let query = supabase
      .from('admissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`student_name.ilike.%${search}%,parent_name.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch applications', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ admissions: data }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching admissions:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
