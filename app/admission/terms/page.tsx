"use client"
import { useState } from "react";
import { motion } from "motion/react";
import { FileText, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function AdmissionTermsPage() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [agreed, setAgreed] = useState(false);
  const isArabic = i18n.language === 'ar';

  const handleContinue = () => {
    if (agreed) {
      router.push("/admission/form");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-primary">{t('termsTitle')}</h1>
          </div>
          <p className="text-gray-600 text-lg">
            {t('termsSubtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
        >
          <div className={`prose prose-lg max-w-none space-y-6 ${isArabic ? 'text-right' : 'text-left'}`}>
            <div className={`bg-primary/5 p-6 rounded-lg mb-6 ${isArabic ? 'border-r-4' : 'border-l-4'} border-primary`}>
              <p className="text-gray-800 font-semibold leading-relaxed">
                {t('termsIntro')}
              </p>
            </div>

            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <div key={num} className={`flex gap-4 ${isArabic ? 'flex-row' : 'flex-row'}`}>
                  <span className="text-primary font-bold text-xl flex-shrink-0">{isArabic ? `.${num}` : `${num}.`}</span>
                  <p className="text-gray-700 leading-relaxed">
                    {t(`term${num}`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-primary/10 p-6 rounded-lg mt-8">
              <h3 className="text-2xl font-bold text-primary mb-4">{t('rulesTitle')}</h3>
              
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => (
                  <div key={num} className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">{isArabic ? `${num}.` : `${num}.`}</span>
                    <p className="text-gray-700">{t(`rule${num}`)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`bg-primary/5 p-6 rounded-lg mt-6 ${isArabic ? 'border-r-4' : 'border-l-4'} border-primary`}>
              <p className="text-gray-800 font-semibold leading-relaxed">
                {t('finalCommitment')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Agreement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-6 h-6 mt-1 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
            />
            <label htmlFor="agree" className="text-gray-700 text-lg leading-relaxed cursor-pointer">
              {t('agreeToTerms')}
            </label>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!agreed}
              className={`px-12 py-4 rounded-lg font-bold text-lg transition-all shadow-lg ${
                agreed
                  ? "bg-primary text-white hover:bg-primary/90 hover:shadow-xl cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {agreed ? (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  {t('continueToForm')}
                </span>
              ) : (
                t('pleaseAgree')
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
