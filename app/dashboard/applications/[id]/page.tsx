"use client"
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { 
  ArrowLeft, User, Users, Phone, MapPin, Bus, FileText, 
  CheckCircle, XCircle, Clock, Download, Eye 
} from "lucide-react";
import Image from "next/image";

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
  
  // Document URLs
  birth_certificate_url: string;
  vaccination_card_url: string;
  passport_url: string;
  parent_id_url: string;
  house_photo_url: string;
  
  // Status and Metadata
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
}

export default function AdmissionDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { t } = useTranslation();
  const [admission, setAdmission] = useState<AdmissionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

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

  const handleStatusChange = async (newStatus: "approved" | "rejected") => {
    if (!admission) return;
    
    setUpdating(true);
    try {
      const response = await fetch(`/api/admissions/${admission.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setAdmission({ ...admission, status: newStatus });
      } else {
        alert('فشل تحديث الحالة');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('حدث خطأ أثناء تحديث الحالة');
    } finally {
      setUpdating(false);
    }
  };

  const statusConfig = {
    pending: { label: "قيد المراجعة", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    approved: { label: "مقبول", color: "bg-green-100 text-green-800", icon: CheckCircle },
    rejected: { label: "مرفوض", color: "bg-red-100 text-red-800", icon: XCircle }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!admission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">الطلب غير موجود</p>
          <button
            onClick={() => router.push('/dashboard/applications')}
            className="text-primary hover:underline"
          >
            العودة إلى قائمة الطلبات
          </button>
        </div>
      </div>
    );
  }

  const StatusIcon = statusConfig[admission.status].icon;

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/dashboard/applications')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            العودة إلى قائمة الطلبات
          </button>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  طلب التسجيل - {admission.student_name}
                </h1>
                <p className="text-gray-600">
                  تاريخ التقديم: {new Date(admission.created_at).toLocaleDateString('ar-EG', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`px-4 py-2 rounded-full ${statusConfig[admission.status].color} flex items-center gap-2`}>
                  <StatusIcon className="w-5 h-5" />
                  <span className="font-semibold">{statusConfig[admission.status].label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {admission.status === 'pending' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">إجراءات</h3>
            <div className="flex gap-4">
              <button
                onClick={() => handleStatusChange('approved')}
                disabled={updating}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                قبول الطلب
              </button>
              <button
                onClick={() => handleStatusChange('rejected')}
                disabled={updating}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                رفض الطلب
              </button>
            </div>
          </motion.div>
        )}

        {/* Student Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <User className="w-6 h-6" />
            معلومات الطالب
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">الصف المتقدم له</p>
              <p className="font-semibold text-lg">{admission.class_applying}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">اسم الطالب</p>
              <p className="font-semibold text-lg">{admission.student_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">اسم الأب</p>
              <p className="font-semibold text-lg">{admission.father_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">اسم الجد</p>
              <p className="font-semibold text-lg">{admission.grandfather_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">اسم القبيلة</p>
              <p className="font-semibold text-lg">{admission.tribe_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">الجنسية</p>
              <p className="font-semibold text-lg">{admission.nationality}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">تاريخ الميلاد</p>
              <p className="font-semibold text-lg">{admission.date_of_birth}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">مكان الميلاد</p>
              <p className="font-semibold text-lg">{admission.place_of_birth}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">الجنس</p>
              <p className="font-semibold text-lg">{admission.gender === 'male' ? 'ذكر' : 'أنثى'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">الديانة</p>
              <p className="font-semibold text-lg">{admission.religion}</p>
            </div>
            {admission.remarks && (
              <div className="md:col-span-3">
                <p className="text-sm text-gray-600 mb-1">ملاحظات</p>
                <p className="font-semibold">{admission.remarks}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Father Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            معلومات ولي الأمر (الأب)
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">الاسم</p>
              <p className="font-semibold text-lg">{admission.parent_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">رقم الهاتف</p>
              <p className="font-semibold text-lg">{admission.mobile_number}</p>
            </div>
            {admission.work_mobile_number && (
              <div>
                <p className="text-sm text-gray-600 mb-1">رقم هاتف العمل</p>
                <p className="font-semibold text-lg">{admission.work_mobile_number}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600 mb-1">المهنة</p>
              <p className="font-semibold text-lg">{admission.job}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600 mb-1">جهة العمل</p>
              <p className="font-semibold text-lg">{admission.place_of_work}</p>
            </div>
          </div>
        </motion.div>

        {/* Mother Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            معلومات الأم
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">الاسم</p>
              <p className="font-semibold text-lg">{admission.mother_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">رقم الهاتف</p>
              <p className="font-semibold text-lg">{admission.mother_mobile_number}</p>
            </div>
            {admission.mother_work_mobile_number && (
              <div>
                <p className="text-sm text-gray-600 mb-1">رقم هاتف العمل</p>
                <p className="font-semibold text-lg">{admission.mother_work_mobile_number}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600 mb-1">المهنة</p>
              <p className="font-semibold text-lg">{admission.mother_job}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600 mb-1">جهة العمل</p>
              <p className="font-semibold text-lg">{admission.mother_place_of_work}</p>
            </div>
          </div>
        </motion.div>

        {/* Relative Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Phone className="w-6 h-6" />
            معلومات قريب
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">الاسم</p>
              <p className="font-semibold text-lg">{admission.relative_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">رقم الهاتف</p>
              <p className="font-semibold text-lg">{admission.relative_phone}</p>
            </div>
          </div>
        </motion.div>

        {/* Previous Education */}
        {admission.previous_school && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">التعليم السابق</h2>
            <div>
              <p className="text-sm text-gray-600 mb-1">المدرسة السابقة</p>
              <p className="font-semibold text-lg">{admission.previous_school}</p>
            </div>
          </motion.div>
        )}

        {/* Transport and Home Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            بيانات النقل والمنزل
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">المنطقة</p>
              <p className="font-semibold text-lg">{admission.region}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">رقم القرية</p>
              <p className="font-semibold text-lg">{admission.village_no}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">رقم المنزل</p>
              <p className="font-semibold text-lg">{admission.house_number}</p>
            </div>
            {admission.site_description && (
              <div className="md:col-span-3">
                <p className="text-sm text-gray-600 mb-1">وصف الموقع</p>
                <p className="font-semibold">{admission.site_description}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* School Transport */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Bus className="w-6 h-6" />
            النقل المدرسي
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">النقل المدرسي</p>
              <p className="font-semibold text-lg">{admission.school_transport === 'yes' ? 'نعم' : 'لا'}</p>
            </div>
            {admission.school_transport === 'yes' && (
              <>
                {admission.transportation_type && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">نوع النقل</p>
                    <p className="font-semibold text-lg">{admission.transportation_type}</p>
                  </div>
                )}
                {admission.trip_type && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">نوع الرحلة</p>
                    <p className="font-semibold text-lg">
                      {admission.trip_type === 'twoWay' ? 'رحلة ذهاب وعودة' :
                       admission.trip_type === 'toSchool' ? 'إلى المدرسة فقط' :
                       'من المدرسة فقط'}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            المستندات المرفقة
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key: 'birth_certificate_url', label: 'شهادة الميلاد' },
              { key: 'vaccination_card_url', label: 'بطاقة التطعيم' },
              { key: 'passport_url', label: 'جواز السفر' },
              { key: 'parent_id_url', label: 'البطاقة الشخصية لولي الأمر' },
              { key: 'house_photo_url', label: 'صورة للبيت' }
            ].map(({ key, label }) => {
              const url = admission[key as keyof AdmissionDetails] as string;
              return url ? (
                <div key={key} className="border rounded-lg p-4">
                  <p className="font-semibold mb-3">{label}</p>
                  <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden mb-3">
                    <Image
                      src={url}
                      alt={label}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center text-sm flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      عرض
                    </a>
                    <a
                      href={url}
                      download
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-center text-sm flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      تحميل
                    </a>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
