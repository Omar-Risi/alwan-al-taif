"use client"
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [admission, setAdmission] = useState<AdmissionDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmission();
  }, [params.id]);

  useEffect(() => {
    if (!loading && admission) {
      const timer = setTimeout(() => window.print(), 200);
      return () => clearTimeout(timer);
    }
  }, [loading, admission]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            {t('loading', { lng: 'ar' })} / {t('loading', { lng: 'en' })}
          </p>
        </div>
      </div>
    );
  }

  if (!admission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">
            {t('admissionNotFound', { lng: 'ar' })} / {t('admissionNotFound', { lng: 'en' })}
          </p>
          <button
            onClick={() => router.back()}
            className="text-primary hover:underline font-semibold"
          >
            {t('back', { lng: 'ar' })} / {t('back', { lng: 'en' })}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 print:bg-white print:py-0 print:px-0" dir="rtl">
      {/* Printable A4 Page */}
      <div className="max-w-[210mm] min-h-[297mm] mx-auto bg-white p-12 shadow-lg print:shadow-none text-black">
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-6 mb-8">
          <div className="flex justify-between items-center mb-6 gap-4">
            {/* Arabic School Info */}
            <div className="text-right flex-1">
              <h2 className="text-xl font-bold text-gray-900 leading-tight">مدرسة ألوان الطيف</h2>
              <p className="text-xs font-semibold text-gray-600 mt-1">سلطنة عمان</p>
              <p className="text-[11px] text-gray-500">مسقط - المعبيلة الجنوبية</p>
            </div>
            
            {/* Logo */}
            <div className="flex-shrink-0 px-4">
              <img
                src="/alwan-al-taif-logo.png"
                alt="School Logo"
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* English School Info */}
            <div className="text-left flex-1" dir="ltr">
              <h2 className="text-xl font-bold text-gray-900 leading-tight">Rainbow School</h2>
              <p className="text-xs font-semibold text-gray-600 mt-1">Sultanate of Oman</p>
              <p className="text-[11px] text-gray-500">Muscat - Al Maabilah South</p>
            </div>
          </div>

          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <h1 className="text-2xl font-bold mb-2 flex flex-col gap-1">
              <span>{t('admissionFormTitle', { lng: 'ar' })}</span>
              <span dir="ltr" className="text-xl">{t('admissionFormTitle', { lng: 'en' })}</span>
            </h1>
            <p className="text-gray-600 mt-2 flex justify-center gap-2 text-sm">
              <span>{t('submissionDate', { lng: 'ar' })}:</span>
              <span dir="ltr">{new Date(admission.created_at).toLocaleDateString('en-GB')}</span>
              <span>:{t('submissionDate', { lng: 'en' })}</span>
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {/* Section: Student Info */}
          <section>
            <SectionHeader
              ar={`1. ${t('studentInfo', { lng: 'ar' })}`}
              en={`1. ${t('studentInfo', { lng: 'en' })}`}
            />
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 px-2">
              <Field ar={t('studentNameLabel', { lng: 'ar' })} en={t('studentNameLabel', { lng: 'en' })} value={admission.student_name} />
              <Field ar={t('gradeApplying', { lng: 'ar' })} en={t('gradeApplying', { lng: 'en' })} value={admission.class_applying} />
              <Field ar={t('fatherNameLabel', { lng: 'ar' })} en={t('fatherNameLabel', { lng: 'en' })} value={admission.father_name} />
              <Field ar={t('grandfatherNameLabel', { lng: 'ar' })} en={t('grandfatherNameLabel', { lng: 'en' })} value={admission.grandfather_name} />
              <Field ar={t('tribeNameLabel', { lng: 'ar' })} en={t('tribeNameLabel', { lng: 'en' })} value={admission.tribe_name} />
              <Field ar={t('nationality', { lng: 'ar' })} en={t('nationality', { lng: 'en' })} value={admission.nationality} />
              <Field ar={t('dateOfBirth', { lng: 'ar' })} en={t('dateOfBirth', { lng: 'en' })} value={admission.date_of_birth} />
              <Field ar={t('placeOfBirth', { lng: 'ar' })} en={t('placeOfBirth', { lng: 'en' })} value={admission.place_of_birth} />
              <Field
                ar={t('gender', { lng: 'ar' })}
                en={t('gender', { lng: 'en' })}
                value={admission.gender === 'male'
                  ? `${t('male', { lng: 'ar' })} / ${t('male', { lng: 'en' })}`
                  : `${t('female', { lng: 'ar' })} / ${t('female', { lng: 'en' })}`}
              />
              <Field ar={t('religionLabel', { lng: 'ar' })} en={t('religionLabel', { lng: 'en' })} value={admission.religion} />
              {admission.remarks && (
                <Field ar={t('remarksLabel', { lng: 'ar' })} en={t('remarksLabel', { lng: 'en' })} value={admission.remarks} fullWidth />
              )}
            </div>
          </section>

          {/* Section: Father Info */}
          <section>
            <SectionHeader
              ar={`2. ${t('fatherInfo', { lng: 'ar' })}`}
              en={`2. ${t('fatherInfo', { lng: 'en' })}`}
            />
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 px-2">
              <Field ar={t('parentNameLabel', { lng: 'ar' })} en={t('parentNameLabel', { lng: 'en' })} value={admission.parent_name} fullWidth />
              <Field ar={t('phoneNumber', { lng: 'ar' })} en={t('phoneNumber', { lng: 'en' })} value={<span dir="ltr">{admission.mobile_number}</span>} />
              <Field ar={t('workPhoneNumber', { lng: 'ar' })} en={t('workPhoneNumber', { lng: 'en' })} value={<span dir="ltr">{admission.work_mobile_number}</span>} />
              <Field ar={t('occupation', { lng: 'ar' })} en={t('occupation', { lng: 'en' })} value={admission.job} />
              <Field ar={t('workplace', { lng: 'ar' })} en={t('workplace', { lng: 'en' })} value={admission.place_of_work} />
            </div>
          </section>

          {/* Section: Mother Info */}
          <section>
            <SectionHeader
              ar={`3. ${t('motherInfo', { lng: 'ar' })}`}
              en={`3. ${t('motherInfo', { lng: 'en' })}`}
            />
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 px-2">
              <Field ar={t('motherNameLabel', { lng: 'ar' })} en={t('motherNameLabel', { lng: 'en' })} value={admission.mother_name} fullWidth />
              <Field ar={t('phoneNumber', { lng: 'ar' })} en={t('phoneNumber', { lng: 'en' })} value={<span dir="ltr">{admission.mother_mobile_number}</span>} />
              <Field ar={t('workPhoneNumber', { lng: 'ar' })} en={t('workPhoneNumber', { lng: 'en' })} value={<span dir="ltr">{admission.mother_work_mobile_number}</span>} />
              <Field ar={t('occupation', { lng: 'ar' })} en={t('occupation', { lng: 'en' })} value={admission.mother_job} />
              <Field ar={t('workplace', { lng: 'ar' })} en={t('workplace', { lng: 'en' })} value={admission.mother_place_of_work} />
            </div>
          </section>

          {/* Section: Relative & Previous School Info */}
          <section>
            <SectionHeader
              ar={`4. ${t('additionalInfo', { lng: 'ar' })}`}
              en={`4. ${t('additionalInfo', { lng: 'en' })}`}
            />
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 px-2">
              <Field ar={t('relativeNameLabel', { lng: 'ar' })} en={t('relativeNameLabel', { lng: 'en' })} value={admission.relative_name} />
              <Field ar={t('relativePhoneLabel', { lng: 'ar' })} en={t('relativePhoneLabel', { lng: 'en' })} value={<span dir="ltr">{admission.relative_phone}</span>} />
              {admission.previous_school && (
                <Field ar={t('previousSchool', { lng: 'ar' })} en={t('previousSchool', { lng: 'en' })} value={admission.previous_school} fullWidth />
              )}
            </div>
          </section>

          {/* Section: Transport Info */}
          <section>
            <SectionHeader
              ar={`5. ${t('transportHomeTitle', { lng: 'ar' })}`}
              en={`5. ${t('transportHomeTitle', { lng: 'en' })}`}
            />
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 px-2">
              <Field ar={t('regionLabel', { lng: 'ar' })} en={t('regionLabel', { lng: 'en' })} value={admission.region} />
              <Field ar={t('villageNoLabel', { lng: 'ar' })} en={t('villageNoLabel', { lng: 'en' })} value={admission.village_no} />
              <Field ar={t('houseNumberLabel', { lng: 'ar' })} en={t('houseNumberLabel', { lng: 'en' })} value={admission.house_number} />
              <Field
                ar={t('schoolTransportLabel', { lng: 'ar' })}
                en={t('schoolTransportLabel', { lng: 'en' })}
                value={admission.school_transport === 'yes'
                  ? `${t('yes', { lng: 'ar' })} / ${t('yes', { lng: 'en' })}`
                  : `${t('no', { lng: 'ar' })} / ${t('no', { lng: 'en' })}`}
              />
              {admission.school_transport === 'yes' && (
                <>
                  <Field ar={t('transportTypeLabel', { lng: 'ar' })} en={t('transportTypeLabel', { lng: 'en' })} value={admission.transportation_type} />
                  <Field
                    ar={t('tripTypeLabel', { lng: 'ar' })}
                    en={t('tripTypeLabel', { lng: 'en' })}
                    value={
                      admission.trip_type === 'twoWay'
                        ? `${t('tripTwoWay', { lng: 'ar' })} / ${t('tripTwoWay', { lng: 'en' })}`
                        : admission.trip_type === 'toSchool'
                          ? `${t('tripToSchool', { lng: 'ar' })} / ${t('tripToSchool', { lng: 'en' })}`
                          : `${t('tripFromSchool', { lng: 'ar' })} / ${t('tripFromSchool', { lng: 'en' })}`
                    }
                  />
                </>
              )}
              {admission.site_description && (
                <Field ar={t('siteDescriptionLabel', { lng: 'ar' })} en={t('siteDescriptionLabel', { lng: 'en' })} value={admission.site_description} fullWidth />
              )}
            </div>
          </section>
        </div>
        
        {/* Footer info or signatures */}
        <div className="mt-12 pt-8 border-t border-gray-300 flex justify-between px-8 text-gray-700 font-semibold text-sm">
          <div className="text-center">
            <div className="mb-8">{t('parentSignature', { lng: 'ar' })}</div>
            <div dir="ltr">{t('parentSignature', { lng: 'en' })}</div>
            <div className="mt-4">_______________________</div>
          </div>
          <div className="text-center">
            <div className="mb-8">{t('managementSignature', { lng: 'ar' })}</div>
            <div dir="ltr">{t('managementSignature', { lng: 'en' })}</div>
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
