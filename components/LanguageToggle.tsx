"use client"
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export default function LanguageToggle({ isHomepage = false }: { isHomepage?: boolean }) {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('language') || 'ar';
    i18n.changeLanguage(savedLang);
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLang;
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-primary transition-all backdrop-blur-sm group"
      title={i18n.language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <Languages className="w-5 h-5 text-primary group-hover:text-white" />
      <span className="font-semibold text-primary group-hover:text-white">
        {i18n.language === 'ar' ? 'EN' : 'عربي'}
      </span>
    </button>
  );
}
