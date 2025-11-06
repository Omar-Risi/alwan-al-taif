"use client"
import { motion } from "motion/react";
import { Download, Palette, Type } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function IdentityPage() {
  const { t } = useTranslation();

  const colors = [
    { name: "Primary", nameAr: "اللون الأساسي", hex: "#2E3A66", rgb: "46, 58, 102" },
    { name: "Accent", nameAr: "اللون المميز", hex: "#FFD447", rgb: "255, 212, 71" },
    { name: "Background", nameAr: "لون الخلفية", hex: "#F0F0F0", rgb: "240, 240, 240" },
  ];

  const handleDownloadLogo = (format: string) => {
    // In a real implementation, this would download the actual logo file
    const link = document.createElement('a');
    link.href = '/alwan-al-taif-logo.png';
    link.download = `rainbow-school-logo.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(t('copied') || 'تم النسخ!');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {t('brandIdentity')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('brandIdentitySubtitle')}
          </p>
        </motion.div>

        {/* Logo Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            {t('schoolLogo')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Logo Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center">
              <div className="relative w-full h-64">
                <Image
                  src="/alwan-al-taif-logo.png"
                  alt="Rainbow School Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Download Options */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Download className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold text-primary">{t('downloadLogo')}</h3>
              </div>
              
              <p className="text-gray-700 mb-6">
                {t('downloadLogoDescription')}
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => handleDownloadLogo('png')}
                  className="w-full bg-primary text-white px-6 py-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold shadow-md hover:shadow-lg flex items-center justify-between"
                >
                  <span>{t('downloadAs')} PNG</span>
                  <Download className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 p-4 bg-white/50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">{t('note')}:</span> {t('logoUsageNote')}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Colors Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Palette className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-primary text-center">
              {t('brandColors')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {colors.map((color, index) => (
              <motion.div
                key={color.hex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div
                  className="h-40 w-full"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {color.nameAr}
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">HEX</p>
                      <button
                        onClick={() => copyToClipboard(color.hex)}
                        className="w-full text-left px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-mono text-sm"
                      >
                        {color.hex}
                      </button>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">RGB</p>
                      <button
                        onClick={() => copyToClipboard(color.rgb)}
                        className="w-full text-left px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-mono text-sm"
                      >
                        {color.rgb}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Typography Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Type className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-primary text-center">
              {t('typography')}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-primary mb-4">{t('primaryFont')}</h3>
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8">
                <p className="text-6xl font-bold text-primary mb-4">Cairo</p>
                <p className="text-2xl text-gray-700 mb-2">
                  مدرسة ألوان الطيف الخاصة
                </p>
                <p className="text-xl text-gray-600">
                  Rainbow Private School
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h4 className="text-lg font-bold text-primary mb-3">{t('fontWeights')}</h4>
                <div className="space-y-2">
                  <p className="font-light text-gray-700">Light (300)</p>
                  <p className="font-normal text-gray-700">Regular (400)</p>
                  <p className="font-semibold text-gray-700">SemiBold (600)</p>
                  <p className="font-bold text-gray-700">Bold (700)</p>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl">
                <h4 className="text-lg font-bold text-primary mb-3">{t('usage')}</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• {t('headingsUsage')}</li>
                  <li>• {t('bodyTextUsage')}</li>
                  <li>• {t('arabicEnglishSupport')}</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">{t('fontSource')}:</span> Google Fonts - 
                <a 
                  href="https://fonts.google.com/specimen/Cairo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline mx-1"
                >
                  Cairo Font Family
                </a>
              </p>
            </div>
          </div>
        </motion.section>

        {/* Usage Guidelines */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            {t('usageGuidelines')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-600 mb-3">✓ {t('doTitle')}</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {t('do1')}</li>
                <li>• {t('do2')}</li>
                <li>• {t('do3')}</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-600 mb-3">✗ {t('dontTitle')}</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {t('dont1')}</li>
                <li>• {t('dont2')}</li>
                <li>• {t('dont3')}</li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
