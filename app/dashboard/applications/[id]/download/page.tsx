"use client"
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Printer, ArrowLeft } from "lucide-react";

interface AdmissionDetails {
  id: string;
  // Student Information
  class_applying: string;
  student_name: string;
  father_name: string;
  grandfather_name: string;
  tribe_name: string;
  nationality: string;
  date_of_birth: string;
  place_of_birth: string;
  gender: string;
  religion: string;
  remarks: string;
  
  // Father Information
  parent_name: string;
  mobile_number: string;
  work_mobile_number: string;
  job: string;
  place_of_work: string;
  
  // Mother Information
  mother_name: string;
  mother_mobile_number: string;
  mother_work_mobile_number: string;
  mother_job: string;
  mother_place_of_work: string;
  
  // Relative Information
  relative_name: string;
  relative_phone: string;
  
  // Previous Education
  previous_school: string;
  
  // Transport and Home Data
  region: string;
  village_no: string;
  house_number: string;
  site_description: string;
  school_transport: string;
  transportation_type: string;
  trip_type: string;
  
  // Status and Metadata
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
}

const Field = ({ ar, en, value, fullWidth = false }: { ar: string, en: string, value: React.ReactNode, fullWidth?: boolean }) => (
  <div className={`border-b border-gray-300 pb-1 ${fullWidth ? 'col-span-2' : ''}`}>
    <div className="flex justify-between text-[13px] text-gray-500 font-bold mb-1">
      <span>{ar}</span>
      <span dir="ltr">{en}</span>
    </div>
    <div className="font-semibold text-[15px] px-1 text-gray-900 min-h-[24px]">
      {value || '-'}
    </div>
  </div>
);

const SectionHeader = ({ ar, en }: { ar: string, en: string }) => (
  <h2 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-r-4 border-gray-800 flex justify-between items-center">
    <span>{ar}</span>
    <span dir="ltr" className="text-gray-700 text-base">{en}</span>
  </h2>
);

export default function DownloadAdmissionPage() {
  const router = useRouter();
  const params = useParams();
  const [admission, setAdmission] = useState<AdmissionDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmission();
  }, [params.id]);

  const fetchAdmission = async () => {
    try {
      const response = await fetch(`/api/admissions/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setAdmission(data.admission);
      }
    } catch (error) {
      console.error('Error fetching admission:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">جاري التحميل... / Loading...</p>
        </div>
      </div>
    );
  }

  if (!admission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">الطلب غير موجود / Application not found</p>
          <button
            onClick={() => router.back()}
            className="text-primary hover:underline font-semibold"
          >
            العودة / Return
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 print:bg-white print:py-0 print:px-0" dir="rtl">
      {/* Non-printable controls */}
      <div className="max-w-[210mm] mx-auto mb-6 flex justify-between items-center print:hidden">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 bg-white px-5 py-2.5 rounded-lg shadow-sm border font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          العودة / Back
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-primary/90 font-semibold"
        >
          <Printer className="w-5 h-5" />
          طباعة / Print
        </button>
      </div>

      {/* Printable A4 Page */}
      <div className="max-w-[210mm] min-h-[297mm] mx-auto bg-white p-12 shadow-lg print:shadow-none text-black">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
          <h1 className="text-2xl font-bold mb-2 flex flex-col gap-1">
            <span>استمارة طلب تسجيل</span>
            <span dir="ltr" className="text-xl">Admission Application Form</span>
          </h1>
          <p className="text-gray-600 mt-4 flex justify-center gap-2">
            <span>تاريخ التقديم:</span>
            <span dir="ltr">{new Date(admission.created_at).toLocaleDateString('en-GB')}</span>
            <span>:Date of Application</span>
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {/* Section: Student Info */}
          <section>
            <SectionHeader ar="1. بيانات الطالب" en="1. Student Information" />
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 px-2">
              <Field ar="اسم الطالب" en="Student Name" value={admission.student_name} />
              <Field ar="الصف المتقدم له" en="Class Applying For" value={admission.class_applying} />
              <Field ar="اسم الأب" en="Father's Name" value={admission.father_name} />
              <Field ar="اسم الجد" en="Grandfather's Name" value={admission.grandfather_name} />
              <Field ar="القبيلة" en="Tribe" value={admission.tribe_name} />
              <Field ar="الجنسية" en="Nationality" value={admission.nationality} />
              <Field ar="تاريخ الميلاد" en="Date of Birth" value={admission.date_of_birth} />
              <Field ar="مكان الميلاد" en="Place of Birth" value={admission.place_of_birth} />
              <Field ar="الجنس" en="Gender" value={admission.gender === 'male' ? 'ذكر / Male' : 'أنثى / Female'} />
              <Field ar="الديانة" en="Religion" value={admission.religion} />
              {admission.remarks && (
                <Field ar="ملاحظات" en="Remarks" value={admission.remarks} fullWidth />
              )}
            </div>
          </section>

          {/* Section: Father Info */}
          <section>
            <SectionHeader ar="2. بيانات ولي الأمر (الأب)" en="2. Father's Information" />
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 px-2">
              <Field ar="الاسم" en="Name" value={admission.parent_name} fullWidth />
              <Field ar="رقم الهاتف" en="Mobile Number" value={<span dir="ltr">{admission.mobile_number}</span>} />
              <Field ar="هاتف العمل" en="Work Phone" value={<span dir="ltr">{admission.work_mobile_number}</span>} />
              <Field ar="المهنة" en="Occupation" value={admission.job} />
              <Field ar="جهة العمل" en="Place of Work" value={admission.place_of_work} />
            </div>
          </section>

          {/* Section: Mother Info */}
          <section>
            <SectionHeader ar="3. بيانات الأم" en="3. Mother's Information" />
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 px-2">
              <Field ar="الاسم" en="Name" value={admission.mother_name} fullWidth />
              <Field ar="رقم الهاتف" en="Mobile Number" value={<span dir="ltr">{admission.mother_mobile_number}</span>} />
              <Field ar="هاتف العمل" en="Work Phone" value={<span dir="ltr">{admission.mother_work_mobile_number}</span>} />
              <Field ar="المهنة" en="Occupation" value={admission.mother_job} />
              <Field ar="جهة العمل" en="Place of Work" value={admission.mother_place_of_work} />
            </div>
          </section>

          {/* Section: Relative & Previous School Info */}
          <section>
            <SectionHeader ar="4. بيانات إضافية" en="4. Additional Information" />
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 px-2">
              <Field ar="اسم قريب" en="Relative's Name" value={admission.relative_name} />
              <Field ar="رقم هاتف القريب" en="Relative's Phone" value={<span dir="ltr">{admission.relative_phone}</span>} />
              {admission.previous_school && (
                <Field ar="المدرسة السابقة" en="Previous School" value={admission.previous_school} fullWidth />
              )}
            </div>
          </section>

          {/* Section: Transport Info */}
          <section>
            <SectionHeader ar="5. بيانات المنزل والنقل المدرسي" en="5. Home & Transport" />
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 px-2">
              <Field ar="المنطقة" en="Region" value={admission.region} />
              <Field ar="رقم القرية" en="Village No" value={admission.village_no} />
              <Field ar="رقم المنزل" en="House No" value={admission.house_number} />
              <Field ar="النقل المدرسي" en="School Transport" value={admission.school_transport === 'yes' ? 'نعم / Yes' : 'لا / No'} />
              {admission.school_transport === 'yes' && (
                <>
                  <Field ar="نوع النقل" en="Transport Type" value={admission.transportation_type} />
                  <Field ar="نوع الرحلة" en="Trip Type" value={
                     admission.trip_type === 'twoWay' ? 'ذهاب وعودة / Two-way' :
                     admission.trip_type === 'toSchool' ? 'إلى المدرسة / To School' :
                     'من المدرسة / From School'
                  } />
                </>
              )}
              {admission.site_description && (
                <Field ar="وصف الموقع" en="Site Description" value={admission.site_description} fullWidth />
              )}
            </div>
          </section>
        </div>
        
        {/* Footer info or signatures */}
        <div className="mt-12 pt-8 border-t border-gray-300 flex justify-between px-8 text-gray-700 font-semibold text-sm">
          <div className="text-center">
            <div className="mb-8">توقيع ولي الأمر</div>
            <div dir="ltr">Parent Signature</div>
            <div className="mt-4">_______________________</div>
          </div>
          <div className="text-center">
            <div className="mb-8">توقيع الإدارة</div>
            <div dir="ltr">Management Signature</div>
            <div className="mt-4">_______________________</div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background-color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}} />
    </div>
  );
}
