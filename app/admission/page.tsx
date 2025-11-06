"use client"
import { useState } from "react";
import { motion } from "motion/react";
import { Upload, User, Users, FileText, Phone, Mail, MapPin, Calendar, GraduationCap } from "lucide-react";

export default function AdmissionPage() {
  const [formData, setFormData] = useState({
    // Child Information
    childName: "",
    childNameArabic: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    placeOfBirth: "",
    previousSchool: "",
    gradeApplying: "",
    
    // Parent/Guardian Information
    fatherName: "",
    fatherNameArabic: "",
    fatherPhone: "",
    fatherEmail: "",
    fatherOccupation: "",
    fatherWorkplace: "",
    
    motherName: "",
    motherNameArabic: "",
    motherPhone: "",
    motherEmail: "",
    motherOccupation: "",
    motherWorkplace: "",
    
    // Address
    address: "",
    city: "",
    postalCode: "",
    
    // Additional Information
    medicalConditions: "",
    specialNeeds: "",
    additionalNotes: "",
  });

  const [files, setFiles] = useState({
    birthCertificate: null as File | null,
    passport: null as File | null,
    previousSchoolRecords: null as File | null,
    medicalRecords: null as File | null,
    parentId: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({
        ...files,
        [fieldName]: e.target.files[0]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement submission logic
    console.log("Form Data:", formData);
    console.log("Files:", files);
    alert("سيتم إضافة وظيفة الإرسال قريباً");
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">طلب التسجيل</h1>
          <p className="text-gray-600 text-lg">
            يرجى ملء جميع الحقول المطلوبة وإرفاق المستندات اللازمة
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-8"
        >
          {/* Child Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <User className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">معلومات الطالب</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  اسم الطالب (بالإنجليزية) *
                </label>
                <input
                  type="text"
                  name="childName"
                  value={formData.childName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Student Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  اسم الطالب (بالعربية) *
                </label>
                <input
                  type="text"
                  name="childNameArabic"
                  value={formData.childNameArabic}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                  placeholder="اسم الطالب"
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
                  الصف المتقدم له *
                </label>
                <select
                  name="gradeApplying"
                  value={formData.gradeApplying}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">اختر الصف</option>
                  <option value="kg1">روضة أولى</option>
                  <option value="kg2">روضة ثانية</option>
                  <option value="grade1">الصف الأول</option>
                  <option value="grade2">الصف الثاني</option>
                  <option value="grade3">الصف الثالث</option>
                  <option value="grade4">الصف الرابع</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  المدرسة السابقة
                </label>
                <input
                  type="text"
                  name="previousSchool"
                  value={formData.previousSchool}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="اسم المدرسة السابقة"
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
                  اسم الأب (بالإنجليزية) *
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Father Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  اسم الأب (بالعربية) *
                </label>
                <input
                  type="text"
                  name="fatherNameArabic"
                  value={formData.fatherNameArabic}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                  placeholder="اسم الأب"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  name="fatherPhone"
                  value={formData.fatherPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+968 XXXX XXXX"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  name="fatherEmail"
                  value={formData.fatherEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  المهنة
                </label>
                <input
                  type="text"
                  name="fatherOccupation"
                  value={formData.fatherOccupation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="المهنة"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  جهة العمل
                </label>
                <input
                  type="text"
                  name="fatherWorkplace"
                  value={formData.fatherWorkplace}
                  onChange={handleInputChange}
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
              <h2 className="text-2xl font-bold text-primary">معلومات ولي الأمر (الأم)</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  اسم الأم (بالإنجليزية) *
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Mother Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  اسم الأم (بالعربية) *
                </label>
                <input
                  type="text"
                  name="motherNameArabic"
                  value={formData.motherNameArabic}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                  placeholder="اسم الأم"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  name="motherPhone"
                  value={formData.motherPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+968 XXXX XXXX"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  name="motherEmail"
                  value={formData.motherEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  المهنة
                </label>
                <input
                  type="text"
                  name="motherOccupation"
                  value={formData.motherOccupation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="المهنة"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  جهة العمل
                </label>
                <input
                  type="text"
                  name="motherWorkplace"
                  value={formData.motherWorkplace}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="جهة العمل"
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">العنوان</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  العنوان الكامل *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="العنوان التفصيلي"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  المدينة *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="المدينة"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  الرمز البريدي
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="الرمز البريدي"
                />
              </div>
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
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "birthCertificate")}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer hover:file:bg-primary/90"
                  />
                </div>
                {files.birthCertificate && (
                  <p className="text-sm text-green-600 mt-2">✓ {files.birthCertificate.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  نسخة من جواز السفر *
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
                  سجلات المدرسة السابقة
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "previousSchoolRecords")}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer hover:file:bg-primary/90"
                />
                {files.previousSchoolRecords && (
                  <p className="text-sm text-green-600 mt-2">✓ {files.previousSchoolRecords.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  السجلات الطبية
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "medicalRecords")}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer hover:file:bg-primary/90"
                />
                {files.medicalRecords && (
                  <p className="text-sm text-green-600 mt-2">✓ {files.medicalRecords.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  هوية ولي الأمر *
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
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">معلومات إضافية</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  الحالات الطبية أو الحساسية
                </label>
                <textarea
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="يرجى ذكر أي حالات طبية أو حساسية"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  احتياجات خاصة
                </label>
                <textarea
                  name="specialNeeds"
                  value={formData.specialNeeds}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="يرجى ذكر أي احتياجات خاصة"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  ملاحظات إضافية
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="أي معلومات إضافية ترغب في مشاركتها"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="bg-primary text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
            >
              إرسال الطلب
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
