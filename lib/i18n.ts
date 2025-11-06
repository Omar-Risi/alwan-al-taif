import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      about: "About",
      news: "News",
      gallery: "Gallery",
      contact: "Contact",
      admission: "Admission",
      calendar: "Calendar",
      login: "Login",
      logout: "Logout",
      
      // Dashboard
      dashboard: "Dashboard",
      applications: "Applications",
      
      // Common
      welcome: "Welcome to Rainbow School",
      quickLinks: "Quick Links",
      goToPage: "Go to Page",
      
      // Vision, Mission, Goals, Values
      vision: "Our Vision",
      mission: "Our Mission",
      goals: "Our Goals",
      values: "Our Values",
    }
  },
  ar: {
    translation: {
      // Navigation
      home: "الرئيسية",
      about: "عن المدرسة",
      news: "الأخبار",
      gallery: "المعرض",
      contact: "تواصل معنا",
      admission: "التسجيل",
      calendar: "التقويم",
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      
      // Dashboard
      dashboard: "لوحة التحكم",
      applications: "طلبات التسجيل",
      
      // Common
      welcome: "مرحبًا بكم في مدرسة ألوان الطيف",
      quickLinks: "الروابط السريعة",
      goToPage: "الانتقال للصفحة",
      
      // Vision, Mission, Goals, Values
      vision: "رؤية المدرسة",
      mission: "رسالة المدرسة",
      goals: "أهداف المدرسة",
      values: "القيم التي تلتزم بها المدرسة",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
