"use client"
import { useState } from "react";
import { motion } from "motion/react";
import { User, Users, MapPin, Phone, Bus, FileText, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { createClient } from "@supabase/supabase-js";

export default function AdmissionPage() {
  const router = useRouter();
  const { t } = useTranslation();
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
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Upload each file directly to Supabase Storage (bypasses Vercel 4.5MB limit)
      const uploadedUrls: Record<string, string | null> = {};
      for (const [fieldName, file] of Object.entries(files)) {
        if (file) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `admissions/${fileName}`;

          const arrayBuffer = await file.arrayBuffer();
          const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, arrayBuffer, { contentType: file.type, upsert: false });

          if (uploadError) {
            throw new Error(`Failed to upload ${fieldName}: ${uploadError.message}`);
          }

          const { data: { publicUrl } } = supabase.storage
            .from('documents')
            .getPublicUrl(filePath);

          uploadedUrls[fieldName] = publicUrl;
        } else {
          uploadedUrls[fieldName] = null;
        }
      }

      // Submit form data as JSON with file URLs (tiny request, no Vercel limit issue)
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          birthCertificateUrl: uploadedUrls.birthCertificate,
          vaccinationCardUrl: uploadedUrls.vaccinationCard,
          passportUrl: uploadedUrls.passport,
          parentIdUrl: uploadedUrls.parentId,
          housePhotoUrl: uploadedUrls.housePhoto,
        }),
      });

      let result;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || 'Server error');
      }

      if (!response.ok) {
        throw new Error(result.details || result.error || 'Failed to submit application');
      }

      setSubmitted(true);
      setTimeout(() => { router.push('/'); }, 3000);
    } catch (error: any) {
      console.error('Error submitting application:', error);
      alert(t('submissionError', { message: error.message }));
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
          <h1 className="text-4xl font-bold text-primary mb-4">{t('admissionTitle')}</h1>
          <p className="text-gray-600 text-lg">{t('admissionSubtitle')}</p>
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
              <h2 className="text-2xl font-bold text-primary">{t('studentInfo')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('gradeApplying')} *
                </label>
                <select
                  name="classApplying"
                  value={formData.classApplying}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">{t('selectGrade')}</option>
                  <option value="KG1">{t('kg1')}</option>
                  <option value="KG2">{t('kg2')}</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('studentNameLabel')} *
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('studentNameLabel')}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('fatherNameLabel')} *
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('fatherNameLabel')}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('grandfatherNameLabel')} *
                </label>
                <input
                  type="text"
                  name="grandfatherName"
                  value={formData.grandfatherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('grandfatherNameLabel')}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('tribeNameLabel')} *
                </label>
                <input
                  type="text"
                  name="tribeName"
                  value={formData.tribeName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('tribeNameLabel')}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('nationality')} *
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('nationality')}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('dateOfBirth')} *
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
                  {t('placeOfBirth')} *
                </label>
                <input
                  type="text"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('placeOfBirth')}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('gender')} *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">{t('selectGender')}</option>
                  <option value="male">{t('male')}</option>
                  <option value="female">{t('female')}</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('religionLabel')} *
                </label>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('religionLabel')}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('remarksLabel')}
                </label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('remarksPlaceholder')}
                />
              </div>
            </div>
          </div>

          {/* Father Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">{t('fatherInfo')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('parentNameLabel')} *
                </label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('parentNameLabel')}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('phoneNumber')} *
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
                  {t('workPhoneNumber')}
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
                  {t('occupation')} *
                </label>
                <input
                  type="text"
                  name="job"
                  value={formData.job}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('occupation')}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('workplace')} *
                </label>
                <input
                  type="text"
                  name="placeOfWork"
                  value={formData.placeOfWork}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('workplace')}
                />
              </div>
            </div>
          </div>

          {/* Mother Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">{t('motherInfo')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('motherNameLabel')} *
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('motherNameLabel')}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('phoneNumber')} *
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
                  {t('workPhoneNumber')}
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
                  {t('occupation')} *
                </label>
                <input
                  type="text"
                  name="motherJob"
                  value={formData.motherJob}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('occupation')}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('workplace')} *
                </label>
                <input
                  type="text"
                  name="motherPlaceOfWork"
                  value={formData.motherPlaceOfWork}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('workplace')}
                />
              </div>
            </div>
          </div>

          {/* Relative Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <Phone className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">{t('relativeInfo')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('relativeNameLabel')} *
                </label>
                <input
                  type="text"
                  name="relativeName"
                  value={formData.relativeName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('relativeNameLabel')}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('relativePhoneLabel')} *
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
              <h2 className="text-2xl font-bold text-primary">{t('previousEducationTitle')}</h2>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                {t('previousSchoolQuestion')}
              </label>
              <input
                type="text"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('previousSchoolPlaceholder')}
              />
            </div>
          </div>

          {/* Transport and Home Data Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">{t('transportHomeTitle')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('regionLabel')} *
                </label>
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('regionLabel')}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('villageNoLabel')} *
                </label>
                <input
                  type="text"
                  name="villageNo"
                  value={formData.villageNo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('villageNoLabel')}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('houseNumberLabel')} *
                </label>
                <input
                  type="text"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('houseNumberLabel')}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('siteDescriptionLabel')}
                </label>
                <input
                  type="text"
                  name="siteDescription"
                  value={formData.siteDescription}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('siteDescriptionPlaceholder')}
                />
              </div>
            </div>
          </div>

          {/* School Transport Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
              <Bus className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">{t('schoolTransportTitle')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('schoolTransportLabel')} *
                </label>
                <select
                  name="schoolTransport"
                  value={formData.schoolTransport}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">{t('selectOption')}</option>
                  <option value="yes">{t('yes')}</option>
                  <option value="no">{t('no')}</option>
                </select>
              </div>

              {formData.schoolTransport === "yes" && (
                <>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t('transportTypeLabel')} *
                    </label>
                    <input
                      type="text"
                      name="transportationType"
                      value={formData.transportationType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('transportTypePlaceholder')}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t('tripTypeLabel')} *
                    </label>
                    <select
                      name="tripType"
                      value={formData.tripType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">{t('selectTripType')}</option>
                      <option value="twoWay">{t('tripTwoWay')}</option>
                      <option value="toSchool">{t('tripToSchool')}</option>
                      <option value="fromSchool">{t('tripFromSchool')}</option>
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
              <h2 className="text-2xl font-bold text-primary">{t('documentsRequired')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('birthCertificate')} *
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
                  {t('vaccinationCard')} *
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
                  {t('passport')} *
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
                  {t('parentId')} *
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
                  {t('housePhoto')} *
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
                  <p className="text-2xl font-bold">{t('submitSuccessTitle')}</p>
                </div>
                <p className="text-gray-600">{t('submitSuccessSubtitle')}</p>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="px-8 py-4 rounded-lg font-bold text-lg bg-white text-primary border-2 border-primary hover:bg-primary/10 transition-colors shadow-lg hover:shadow-xl"
                >
                  {t('previewData')}
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
                  {submitting ? t('submittingApplication') : t('submitApplication')}
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
                  <h2 className="text-2xl font-bold">{t('previewTitle')}</h2>
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
                    {t('studentInfo')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><span className="font-semibold">{t('grade')}:</span> {formData.classApplying}</div>
                    <div><span className="font-semibold">{t('studentNameLabel')}:</span> {formData.studentName}</div>
                    <div><span className="font-semibold">{t('fatherNameLabel')}:</span> {formData.fatherName}</div>
                    <div><span className="font-semibold">{t('grandfatherNameLabel')}:</span> {formData.grandfatherName}</div>
                    <div><span className="font-semibold">{t('tribeNameLabel')}:</span> {formData.tribeName}</div>
                    <div><span className="font-semibold">{t('nationality')}:</span> {formData.nationality}</div>
                    <div><span className="font-semibold">{t('dateOfBirth')}:</span> {formData.dateOfBirth}</div>
                    <div><span className="font-semibold">{t('placeOfBirth')}:</span> {formData.placeOfBirth}</div>
                    <div><span className="font-semibold">{t('gender')}:</span> {formData.gender === 'male' ? t('male') : t('female')}</div>
                    <div><span className="font-semibold">{t('religionLabel')}:</span> {formData.religion}</div>
                    {formData.remarks && (
                      <div className="md:col-span-2"><span className="font-semibold">{t('remarksLabel')}:</span> {formData.remarks}</div>
                    )}
                  </div>
                </div>

                {/* Father Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    {t('fatherInfo')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><span className="font-semibold">{t('parentNameLabel')}:</span> {formData.parentName}</div>
                    <div><span className="font-semibold">{t('phoneNumber')}:</span> {formData.mobileNumber}</div>
                    {formData.workMobileNumber && (
                      <div><span className="font-semibold">{t('workPhoneNumber')}:</span> {formData.workMobileNumber}</div>
                    )}
                    <div><span className="font-semibold">{t('occupation')}:</span> {formData.job}</div>
                    <div className="md:col-span-2"><span className="font-semibold">{t('workplace')}:</span> {formData.placeOfWork}</div>
                  </div>
                </div>

                {/* Mother Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    {t('motherInfo')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><span className="font-semibold">{t('motherNameLabel')}:</span> {formData.motherName}</div>
                    <div><span className="font-semibold">{t('phoneNumber')}:</span> {formData.motherMobileNumber}</div>
                    {formData.motherWorkMobileNumber && (
                      <div><span className="font-semibold">{t('workPhoneNumber')}:</span> {formData.motherWorkMobileNumber}</div>
                    )}
                    <div><span className="font-semibold">{t('occupation')}:</span> {formData.motherJob}</div>
                    <div className="md:col-span-2"><span className="font-semibold">{t('workplace')}:</span> {formData.motherPlaceOfWork}</div>
                  </div>
                </div>

                {/* Relative Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Phone className="w-6 h-6" />
                    {t('relativeInfo')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><span className="font-semibold">{t('relativeNameLabel')}:</span> {formData.relativeName}</div>
                    <div><span className="font-semibold">{t('relativePhoneLabel')}:</span> {formData.relativePhone}</div>
                  </div>
                </div>

                {/* Previous Education */}
                {formData.previousSchool && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-primary mb-4">{t('previousEducationTitle')}</h3>
                    <div><span className="font-semibold">{t('previousSchool')}:</span> {formData.previousSchool}</div>
                  </div>
                )}

                {/* Transport and Home Data */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    {t('transportHomeTitle')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><span className="font-semibold">{t('regionLabel')}:</span> {formData.region}</div>
                    <div><span className="font-semibold">{t('villageNoLabel')}:</span> {formData.villageNo}</div>
                    <div><span className="font-semibold">{t('houseNumberLabel')}:</span> {formData.houseNumber}</div>
                    {formData.siteDescription && (
                      <div><span className="font-semibold">{t('siteDescriptionLabel')}:</span> {formData.siteDescription}</div>
                    )}
                  </div>
                </div>

                {/* School Transport */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Bus className="w-6 h-6" />
                    {t('schoolTransportTitle')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><span className="font-semibold">{t('schoolTransportLabel')}:</span> {formData.schoolTransport === 'yes' ? t('yes') : t('no')}</div>
                    {formData.schoolTransport === 'yes' && (
                      <>
                        {formData.transportationType && (
                          <div><span className="font-semibold">{t('transportTypeLabel')}:</span> {formData.transportationType}</div>
                        )}
                        {formData.tripType && (
                          <div><span className="font-semibold">{t('tripTypeLabel')}:</span> {
                            formData.tripType === 'twoWay' ? t('tripTwoWay') :
                            formData.tripType === 'toSchool' ? t('tripToSchool') :
                            t('tripFromSchool')
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
                    {t('documentsRequired')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(files).map(([key, file]) => (
                      file && (
                        <div key={key} className="border rounded-lg p-4">
                          <p className="font-semibold mb-2">
                             {key === 'birthCertificate' ? t('birthCertificate') :
                              key === 'vaccinationCard' ? t('vaccinationCard') :
                              key === 'passport' ? t('passport') :
                              key === 'parentId' ? t('parentId') :
                              t('housePhoto')}
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
                  {t('close')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
