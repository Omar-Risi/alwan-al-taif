import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    console.log('=== TEST API CALLED ===');
    console.log('Form data entries:');
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File(${value.name}, ${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
    
    // Extract form fields
    const data = {
      class_applying: formData.get('classApplying') as string,
      student_name: formData.get('studentName') as string,
      father_name: formData.get('fatherName') as string,
      grandfather_name: formData.get('grandfatherName') as string,
      tribe_name: formData.get('tribeName') as string,
      nationality: formData.get('nationality') as string,
      date_of_birth: formData.get('dateOfBirth') as string,
      place_of_birth: formData.get('placeOfBirth') as string,
      gender: formData.get('gender') as string,
      religion: formData.get('religion') as string,
      remarks: formData.get('remarks') as string || '',
      parent_name: formData.get('parentName') as string,
      mobile_number: formData.get('mobileNumber') as string,
      work_mobile_number: formData.get('workMobileNumber') as string || '',
      job: formData.get('job') as string,
      place_of_work: formData.get('placeOfWork') as string,
      mother_name: formData.get('motherName') as string,
      mother_mobile_number: formData.get('motherMobileNumber') as string,
      mother_work_mobile_number: formData.get('motherWorkMobileNumber') as string || '',
      mother_job: formData.get('motherJob') as string,
      mother_place_of_work: formData.get('motherPlaceOfWork') as string,
      relative_name: formData.get('relativeName') as string,
      relative_phone: formData.get('relativePhone') as string,
      previous_school: formData.get('previousSchool') as string || '',
      region: formData.get('region') as string,
      village_no: formData.get('villageNo') as string,
      house_number: formData.get('houseNumber') as string,
      site_description: formData.get('siteDescription') as string || '',
      school_transport: formData.get('schoolTransport') as string,
      transportation_type: formData.get('transportationType') as string || '',
      trip_type: formData.get('tripType') as string || '',
      status: 'pending',
      birth_certificate_url: null,
      vaccination_card_url: null,
      passport_url: null,
      parent_id_url: null,
      house_photo_url: null,
    };

    console.log('Prepared data:', JSON.stringify(data, null, 2));

    // Test database connection
    const { data: testData, error: testError } = await supabase
      .from('admissions')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('Database connection test failed:', testError);
      return NextResponse.json(
        { error: 'Database connection failed', details: testError.message },
        { status: 500 }
      );
    }

    console.log('Database connection OK');

    // Insert into database
    const { data: insertedData, error: insertError } = await supabase
      .from('admissions')
      .insert([data])
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json(
        { 
          error: 'Failed to submit application', 
          details: insertError.message,
          hint: insertError.hint,
          code: insertError.code
        },
        { status: 500 }
      );
    }

    console.log('Insert successful:', insertedData);

    return NextResponse.json(
      { message: 'Application submitted successfully', data: insertedData },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error processing admission:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
