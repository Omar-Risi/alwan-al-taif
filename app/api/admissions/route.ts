import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const finalData = {
      // Student Information
      class_applying: body.classApplying,
      student_name: body.studentName,
      father_name: body.fatherName,
      grandfather_name: body.grandfatherName,
      tribe_name: body.tribeName,
      nationality: body.nationality,
      date_of_birth: body.dateOfBirth,
      place_of_birth: body.placeOfBirth,
      gender: body.gender,
      religion: body.religion,
      remarks: body.remarks || null,

      // Father Information
      parent_name: body.parentName,
      mobile_number: body.mobileNumber,
      work_mobile_number: body.workMobileNumber || null,
      job: body.job,
      place_of_work: body.placeOfWork,

      // Mother Information
      mother_name: body.motherName,
      mother_mobile_number: body.motherMobileNumber,
      mother_work_mobile_number: body.motherWorkMobileNumber || null,
      mother_job: body.motherJob,
      mother_place_of_work: body.motherPlaceOfWork,

      // Relative Information
      relative_name: body.relativeName,
      relative_phone: body.relativePhone,

      // Previous Education
      previous_school: body.previousSchool || null,

      // Transport and Home Data
      region: body.region,
      village_no: body.villageNo,
      house_number: body.houseNumber,
      site_description: body.siteDescription || null,
      school_transport: body.schoolTransport,
      transportation_type: body.transportationType || null,
      trip_type: body.tripType || null,

      // File URLs (uploaded directly from client to Supabase Storage)
      birth_certificate_url: body.birthCertificateUrl || null,
      vaccination_card_url: body.vaccinationCardUrl || null,
      passport_url: body.passportUrl || null,
      parent_id_url: body.parentIdUrl || null,
      house_photo_url: body.housePhotoUrl || null,

      status: 'pending',
    };

    const { data: insertedData, error: insertError } = await supabase
      .from('admissions')
      .insert([finalData])
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
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
