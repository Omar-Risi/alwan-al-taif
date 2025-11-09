"use client"
import { useState } from "react";
import { motion } from "motion/react";
import { User, Users, MapPin, Phone, Bus, FileText, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdmissionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Student Information
    classApplying: "",
    studentName: "",
    fatherName: "",
    grandfatherName: "",
    tribeName: "",
    nationality: "",
    dateOfBirth: "",
    placeOfBirth: "",
    gender: "",
    religion: "",
    remarks: "",
    
    // Father Information
    parentName: "",
    mobileNumber: "",
    workMobileNumber: "",
    job: "",
    placeOfWork: "",
    
    // Mother Information
    motherName: "",
    motherMobileNumber: "",
    motherWorkMobileNumber: "",
    motherJob: "",
    motherPlaceOfWork: "",
    
    // Relative Information
    relativeName: "",
    relativePhone: "",
    
    // Previous Education
    previousSchool: "",
    
    // Transport and Home Data
    region: "",
    villageNo: "",
    houseNumber: "",
    siteDescription: "",
    schoolTransport: "",
    transportationType: "",
    tripType: "",
  });

  const [files, setFiles] = useState({
    birthCertificate: null as File | null,
    vaccinationCard: null as File | null,
    passport: null as File | null,
    parentId: null as File | null,
    housePhoto: null as File | null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [filePreviews, setFilePreviews] = useState<{[key: string]: string}>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFiles({
        ...files,
        [fieldName]: file
      });
      
      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreviews(prev => ({
            ...prev,
            [fieldName]: reader.result as string
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append files
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formDataToSend.append(key, file);
        }
      });

      console.log('Submitting form...');
      
      const response = await fetch('/api/admissions', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      console.log('Response:', result);

      if (!response.ok) {
        console.error('Server error:', result);
        throw new Error(result.details || result.error || 'Failed to submit application');
      }

      setSubmitted(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting application:', error);
      alert(`حدث خطأ أثناء إرسال الطلب:\n${error.message}\n\nيرجى المحاولة مرة أخرى.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">طلب التسجيل</h1>
          <p className="text-gray-600 text-lg">
            يرجى ملء جميع الحقول المطلوبة
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-8"
        >
          {/* Student Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <User className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">معلومات الطالب</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  الصف المتقدم له *
                </label>
                <select
                  name="classApplying"
                  value={formData.classApplying}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">اختر الصف</option>
                  <option value="KG1">KG1</option>
                  <option value="KG2">KG2</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  اسم الطالب *
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="اسم الطالب"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  اسم الأب *
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="اسم الأب"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  اسم الجد *
                </label>
                <input
                  type="text"
                  name="grandfatherName"
                  value={formData.grandfatherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="اسم الجد"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  اسم القبيلة *
                </label>
                <input
                  type="text"
                  name="tribeName"
                  value={formData.tribeName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="اسم القبيلة"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  الجنسية *
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="الجنسية"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  تاريخ الميلاد *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  مكان الميلاد *
                </label>
                <input
                  type="text"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="مكان الميلاد"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  الجنس *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">اختر الجنس</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  الديانة *
                </label>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="الديانة"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  ملاحظات
                </label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="أي ملاحظات إضافية"
                />
              </div>
            </div>
          </div>

          {/* Father Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">معلومات ولي الأمر (الأب)</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  اسم ولي الأمر *
                </label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="اسم ولي الأمر"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+968 XXXX XXXX"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  رقم هاتف العمل
                </label>
                <input
                  type="tel"
                  name="workMobileNumber"
                  value={formData.workMobileNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+968 XXXX XXXX"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  المهنة *
                </label>
                <input
                  type="text"
                  name="job"
                  value={formData.job}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="المهنة"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  جهة العمل *
                </label>
                <input
                  type="text"
                  name="placeOfWork"
                  value={formData.placeOfWork}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="جهة العمل"
                />
              </div>
            </div>
          </div>

          {/* Mother Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">معلومات الأم</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  اسم الأم *
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="اسم الأم"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  name="motherMobileNumber"
                  value={formData.motherMobileNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+968 XXXX XXXX"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  رقم هاتف العمل
                </label>
                <input
                  type="tel"
                  name="motherWorkMobileNumber"
                  value={formData.motherWorkMobileNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+968 XXXX XXXX"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  المهنة *
                </label>
                <input
                  type="text"
                  name="motherJob"
                  value={formData.motherJob}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="المهنة"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  جهة العمل *
                </label>
                <input
                  type="text"
                  name="motherPlaceOfWork"
                  value={formData.motherPlaceOfWork}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="جهة العمل"
                />
              </div>
            </div>
          </div>

          {/* Relative Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <Phone className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">معلومات قريب</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  اسم القريب *
                </label>
                <input
                  type="text"
                  name="relativeName"
                  value={formData.relativeName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="اسم القريب"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  رقم هاتف القريب *
                </label>
                <input
                  type="tel"
                  name="relativePhone"
                  value={formData.relativePhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+968 XXXX XXXX"
                />
              </div>
            </div>
          </div>

          {/* Previous Education Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <User className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">التعليم السابق</h2>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                هل درس الطفل في مكان آخر من قبل؟
              </label>
              <input
                type="text"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="اسم المدرسة السابقة (إن وجدت)"
              />
            </div>
          </div>

          {/* Transport and Home Data Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">بيانات النقل والمنزل</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  المنطقة *
                </label>
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="المنطقة"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  رقم القرية *
                </label>
                <input
                  type="text"
                  name="villageNo"
                  value={formData.villageNo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="رقم القرية"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  رقم المنزل *
                </label>
                <input
                  type="text"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="رقم المنزل"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  وصف الموقع أو أي معلم
                </label>
                <input
                  type="text"
                  name="siteDescription"
                  value={formData.siteDescription}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="وصف الموقع"
                />
              </div>
            </div>
          </div>

          {/* School Transport Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <Bus className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">النقل المدرسي</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  النقل المدرسي *
                </label>
                <select
                  name="schoolTransport"
                  value={formData.schoolTransport}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">اختر</option>
                  <option value="yes">نعم</option>
                  <option value="no">لا</option>
                </select>
              </div>

              {formData.schoolTransport === "yes" && (
                <>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      نوع النقل *
                    </label>
                    <input
                      type="text"
                      name="transportationType"
                      value={formData.transportationType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="نوع النقل"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">
                      نوع الرحلة *
                    </label>
                    <select
                      name="tripType"
                      value={formData.tripType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">اختر نوع الرحلة</option>
                      <option value="twoWay">رحلة ذهاب وعودة</option>
                      <option value="toSchool">إلى المدرسة فقط</option>
                      <option value="fromSchool">من المدرسة فقط</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Documents Upload Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">المستندات المطلوبة</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  شهادة الميلاد *
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "birthCertificate")}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer hover:file:bg-primary/90"
                />
                {files.birthCertificate && (
                  <p className="text-sm text-green-600 mt-2">✓ {files.birthCertificate.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  بطاقة التطعيم *
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "vaccinationCard")}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer hover:file:bg-primary/90"
                />
                {files.vaccinationCard && (
                  <p className="text-sm text-green-600 mt-2">✓ {files.vaccinationCard.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  جواز السفر *
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "passport")}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer hover:file:bg-primary/90"
                />
                {files.passport && (
                  <p className="text-sm text-green-600 mt-2">✓ {files.passport.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  البطاقة الشخصية لولي الأمر *
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "parentId")}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer hover:file:bg-primary/90"
                />
                {files.parentId && (
                  <p className="text-sm text-green-600 mt-2">✓ {files.parentId.name}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  صورة للبيت *
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "housePhoto")}
                  accept=".jpg,.jpeg,.png"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer hover:file:bg-primary/90"
                />
                {files.housePhoto && (
                  <p className="text-sm text-green-600 mt-2">✓ {files.housePhoto.name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center gap-4 pt-6">
            {submitted ? (
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 text-green-600 mb-4">
                  <CheckCircle className="w-12 h-12" />
                  <p className="text-2xl font-bold">تم إرسال الطلب بنجاح!</p>
                </div>
                <p className="text-gray-600">سيتم تحويلك إلى الصفحة الرئيسية...</p>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="px-8 py-4 rounded-lg font-bold text-lg bg-white text-primary border-2 border-primary hover:bg-primary/10 transition-colors shadow-lg hover:shadow-xl"
                >
                  معاينة البيانات
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-12 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl ${
                    submitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {submitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
                </button>
              </>
            )}
          </div>
        </motion.form>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-primary text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">معاينة البيانات</h2>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Student Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <User className="w-6 h-6" />
                    معلومات الطالب
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><span className="font-semibold">الصف:</span> {formData.classApplying}</div>
                    <div><span className="font-semibold">اسم الطالب:</span> {formData.studentName}</div>
                    <div><span className="font-semibold">اسم الأب:</span> {formData.fatherName}</div>
                    <div><span className="font-semibold">اسم الجد:</span> {formData.grandfatherName}</div>
                    <div><span className="font-semibold">اسم القبيلة:</span> {formData.tribeName}</div>
                    <div><span className="font-semibold">الجنسية:</span> {formData.nationality}</div>
                    <div><span className="font-semibold">تاريخ الميلاد:</span> {formData.dateOfBirth}</div>
                    <div><span className="font-semibold">مكان الميلاد:</span> {formData.placeOfBirth}</div>
                    <div><span className="font-semibold">الجنس:</span> {formData.gender === 'male' ? 'ذكر' : 'أنثى'}</div>
                    <div><span className="font-semibold">الديانة:</span> {formData.religion}</div>
                    {formData.remarks && (
                      <div className="md:col-span-2"><span className="font-semibold">ملاحظات:</span> {formData.remarks}</div>
                    )}
                  </div>
                </div>

                {/* Father Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    معلومات ولي الأمر (الأب)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><span className="font-semibold">الاسم:</span> {formData.parentName}</div>
                    <div><span className="font-semibold">رقم الهاتف:</span> {formData.mobileNumber}</div>
                    {formData.workMobileNumber && (
                      <div><span className="font-semibold">رقم هاتف العمل:</span> {formData.workMobileNumber}</div>
                    )}
                    <div><span className="font-semibold">المهنة:</span> {formData.job}</div>
                    <div className="md:col-span-2"><span className="font-semibold">جهة العمل:</span> {formData.placeOfWork}</div>
                  </div>
                </div>

                {/* Mother Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    معلومات الأم
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><span className="font-semibold">الاسم:</span> {formData.motherName}</div>
                    <div><span className="font-semibold">رقم الهاتف:</span> {formData.motherMobileNumber}</div>
                    {formData.motherWorkMobileNumber && (
                      <div><span className="font-semibold">رقم هاتف العمل:</span> {formData.motherWorkMobileNumber}</div>
                    )}
                    <div><span className="font-semibold">المهنة:</span> {formData.motherJob}</div>
                    <div className="md:col-span-2"><span className="font-semibold">جهة العمل:</span> {formData.motherPlaceOfWork}</div>
                  </div>
                </div>

                {/* Relative Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Phone className="w-6 h-6" />
                    معلومات قريب
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><span className="font-semibold">الاسم:</span> {formData.relativeName}</div>
                    <div><span className="font-semibold">رقم الهاتف:</span> {formData.relativePhone}</div>
                  </div>
                </div>

                {/* Previous Education */}
                {formData.previousSchool && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-primary mb-4">التعليم السابق</h3>
                    <div><span className="font-semibold">المدرسة السابقة:</span> {formData.previousSchool}</div>
                  </div>
                )}

                {/* Transport and Home Data */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    بيانات النقل والمنزل
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><span className="font-semibold">المنطقة:</span> {formData.region}</div>
                    <div><span className="font-semibold">رقم القرية:</span> {formData.villageNo}</div>
                    <div><span className="font-semibold">رقم المنزل:</span> {formData.houseNumber}</div>
                    {formData.siteDescription && (
                      <div><span className="font-semibold">وصف الموقع:</span> {formData.siteDescription}</div>
                    )}
                  </div>
                </div>

                {/* School Transport */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Bus className="w-6 h-6" />
                    النقل المدرسي
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><span className="font-semibold">النقل المدرسي:</span> {formData.schoolTransport === 'yes' ? 'نعم' : 'لا'}</div>
                    {formData.schoolTransport === 'yes' && (
                      <>
                        {formData.transportationType && (
                          <div><span className="font-semibold">نوع النقل:</span> {formData.transportationType}</div>
                        )}
                        {formData.tripType && (
                          <div><span className="font-semibold">نوع الرحلة:</span> {
                            formData.tripType === 'twoWay' ? 'رحلة ذهاب وعودة' :
                            formData.tripType === 'toSchool' ? 'إلى المدرسة فقط' :
                            'من المدرسة فقط'
                          }</div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Uploaded Files */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    المستندات المرفقة
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(files).map(([key, file]) => (
                      file && (
                        <div key={key} className="border rounded-lg p-4">
                          <p className="font-semibold mb-2">
                            {key === 'birthCertificate' ? 'شهادة الميلاد' :
                             key === 'vaccinationCard' ? 'بطاقة التطعيم' :
                             key === 'passport' ? 'جواز السفر' :
                             key === 'parentId' ? 'البطاقة الشخصية لولي الأمر' :
                             'صورة للبيت'}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">{file.name}</p>
                          {filePreviews[key] && (
                            <img 
                              src={filePreviews[key]} 
                              alt={file.name}
                              className="w-full h-32 object-cover rounded"
                            />
                          )}
                          {!filePreviews[key] && (
                            <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center">
                              <FileText className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t p-6 rounded-b-2xl flex justify-center gap-4">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-8 py-3 rounded-lg font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
