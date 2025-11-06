import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      about: "About Us",
      news: "News",
      gallery: "Gallery",
      contact: "Contact Us",
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
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      search: "Search",
      filter: "Filter",
      loading: "Loading...",
      
      // About Page
      aboutSchoolTitle: "About Rainbow School",
      aboutSchoolSubtitle: "We strive to provide an excellent educational environment that builds student character and achieves their ambitions",
      vision: "Our Vision",
      visionText: "Rainbow Private School is committed to providing an educational environment capable of attracting students to build a sound and distinguished personality that enables them to direct and employ their capabilities to achieve their ambitions.",
      mission: "Our Mission",
      missionText: "Opening the door of freedom for students and self-research, giving a major role to professional development to develop teacher competence by providing more teaching enhancements using:",
      workshops: "Workshops",
      workshopsText: "We offer specialized workshops to develop teachers' skills and improve the quality of education provided to students.",
      goals: "Our Goals",
      goalsText: "Creating a suitable environment for the advancement of students scientifically, morally and psychologically to prepare a sound generation capable of keeping pace with scientific and technological development in our society.",
      values: "Our Values",
      valuesTitle: "Values the School Adheres to",
      value1: "Following the educational recommendations, policies and teaching methods emanating from government policies and under the supervision of the Ministry of Education in the Sultanate.",
      value2: "Appreciating childhood as different from adults and achieving the principle of individual differences for them.",
      value3: "Enhancing self-confidence, independent thinking and rules of good behavior for students.",
      
      // Contact Page
      contactTitle: "Contact Us",
      contactSubtitle: "We are here to answer all your inquiries",
      callUs: "Call Us",
      emailUs: "Email Us",
      whatsapp: "WhatsApp",
      clickToContact: "Click to Contact",
      ourLocation: "Our Location",
      rainbowSchool: "Rainbow Private School",
      alMaabilah: "Al Maabilah South",
      muscat: "Muscat Governorate, Sultanate of Oman",
      viewOnMap: "View on Map",
      workingHours: "Working Hours",
      sunToThu: "Sunday - Thursday",
      friToSat: "Friday - Saturday",
      closed: "Closed",
      note: "Note:",
      whatsappNote: "You can contact us via WhatsApp anytime",
      haveQuestion: "Have a Question?",
      teamReady: "Our team is ready to answer all your questions about registration, curriculum, and school activities",
      registerNow: "Register Now",
      learnMore: "Learn More About Us",
      
      // Admission Page
      admissionTitle: "Admission Application",
      admissionSubtitle: "Please fill in all required fields and attach the necessary documents",
      studentInfo: "Student Information",
      studentNameEn: "Student Name (English)",
      studentNameAr: "Student Name (Arabic)",
      dateOfBirth: "Date of Birth",
      gender: "Gender",
      selectGender: "Select Gender",
      male: "Male",
      female: "Female",
      nationality: "Nationality",
      placeOfBirth: "Place of Birth",
      gradeApplying: "Grade Applying For",
      selectGrade: "Select Grade",
      kg1: "Kindergarten 1",
      kg2: "Kindergarten 2",
      grade1: "Grade 1",
      grade2: "Grade 2",
      grade3: "Grade 3",
      grade4: "Grade 4",
      previousSchool: "Previous School",
      
      // Parent Information
      fatherInfo: "Father's Information",
      motherInfo: "Mother's Information",
      parentNameEn: "Name (English)",
      parentNameAr: "Name (Arabic)",
      phoneNumber: "Phone Number",
      email: "Email",
      occupation: "Occupation",
      workplace: "Workplace",
      
      // Address
      addressInfo: "Address",
      fullAddress: "Full Address",
      city: "City",
      postalCode: "Postal Code",
      
      // Documents
      documentsRequired: "Required Documents",
      birthCertificate: "Birth Certificate",
      passport: "Passport Copy",
      schoolRecords: "Previous School Records",
      medicalRecords: "Medical Records",
      parentId: "Parent ID",
      
      // Additional Info
      additionalInfo: "Additional Information",
      medicalConditions: "Medical Conditions or Allergies",
      medicalConditionsPlaceholder: "Please mention any medical conditions or allergies",
      specialNeeds: "Special Needs",
      specialNeedsPlaceholder: "Please mention any special needs",
      additionalNotes: "Additional Notes",
      additionalNotesPlaceholder: "Any additional information you would like to share",
      submitApplication: "Submit Application",
      
      // News Page
      newsPageTitle: "Latest News",
      newsPageSubtitle: "Latest news and events from Rainbow School",
      noNewsYet: "No news available yet",
      followForUpdates: "Follow us for the latest news and events",
      readMore: "Read More",
      showing: "Showing",
      ofNews: "news articles",
      backToNews: "Back to News",
      share: "Share",
      relatedNews: "Related News",
      newsNotFound: "News article not found",
      
      // Dashboard Applications
      applicationsManagement: "Applications Management",
      applicationsSubtitle: "Manage and review submitted applications",
      searchPlaceholder: "Search for student or parent...",
      allStatuses: "All Statuses",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      studentName: "Student Name",
      grade: "Grade",
      parent: "Parent",
      submissionDate: "Submission Date",
      status: "Status",
      actions: "Actions",
      viewDetails: "View Details",
      downloadDocuments: "Download Documents",
      approve: "Approve",
      reject: "Reject",
      noApplications: "No matching applications found",
      applicationDetails: "Application Details",
      currentStatus: "Current Status",
      approveApplication: "Approve Application",
      rejectApplication: "Reject Application",
    }
  },
  ar: {
    translation: {
      // Navigation
      home: "الرئيسية",
      about: "من نحن",
      news: "الأخبار",
      gallery: "معرض الصور",
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
      submit: "إرسال",
      cancel: "إلغاء",
      save: "حفظ",
      edit: "تعديل",
      delete: "حذف",
      search: "بحث",
      filter: "تصفية",
      loading: "جاري التحميل...",
      
      // About Page
      aboutSchoolTitle: "عن مدرسة ألوان الطيف",
      aboutSchoolSubtitle: "نسعى لتوفير بيئة تعليمية متميزة تبني شخصية الطالب وتحقق طموحاته",
      vision: "رؤية المدرسة",
      visionText: "تلتزم مدرسة ألوان الطيف الخاصة بتوفير بيئة تعليمية لديها القدرة على جذب الطلاب لبناء الشخصية السوية المتميزة التي تمكنهم من توجيه وتوظيف الإمكانيات لتحقيق طموحاتهم.",
      mission: "رسالة المدرسة",
      missionText: "فتح باب الحرية للطلاب والبحث الذاتي وإعطاء دور كبير للإنماء المهني وذلك لتطوير كفاءة المعلمين وذلك من خلال توفير عمل أكبر من محسنات التعليم باستخدام:",
      workshops: "ورش عمل",
      workshopsText: "نقدم ورش عمل متخصصة لتطوير مهارات المعلمين وتحسين جودة التعليم المقدم للطلاب.",
      goals: "أهداف المدرسة",
      goalsText: "خلق بيئة مناسبة للنهوض بالطلاب علمياً وخلقياً ونفسياً لإعداد جيل سوي قادر على مواكبة التطور العلمي والتكنولوجي في مجتمعنا.",
      values: "القيم",
      valuesTitle: "القيم التي تلتزم بها المدرسة",
      value1: "اتباع التوصيات والسياسات التربوية وأساليب التعليم المنبثقة من السياسات الحكومية وتحت إشراف وزارة التربية والتعليم بالسلطنة.",
      value2: "تقدير الطفولة باعتبارها مختلفة عن البالغين وبما يتحقق لهم مبدأ الفروق الفردية.",
      value3: "تعزيز الثقة بالنفس والتفكير المستقل وقواعد السلوك القويم للتلاميذ.",
      
      // Contact Page
      contactTitle: "تواصل معنا",
      contactSubtitle: "نحن هنا للإجابة على جميع استفساراتكم",
      callUs: "اتصل بنا",
      emailUs: "راسلنا عبر البريد",
      whatsapp: "واتساب",
      clickToContact: "انقر للتواصل",
      ourLocation: "موقعنا",
      rainbowSchool: "مدرسة ألوان الطيف الخاصة",
      alMaabilah: "المعبيلة الجنوبية",
      muscat: "محافظة مسقط، سلطنة عمان",
      viewOnMap: "عرض على الخريطة",
      workingHours: "أوقات العمل",
      sunToThu: "الأحد - الخميس",
      friToSat: "الجمعة - السبت",
      closed: "مغلق",
      note: "ملاحظة:",
      whatsappNote: "يمكنكم التواصل معنا عبر الواتساب في أي وقت",
      haveQuestion: "هل لديك استفسار؟",
      teamReady: "فريقنا جاهز للإجابة على جميع أسئلتكم حول التسجيل، المناهج، والأنشطة المدرسية",
      registerNow: "التسجيل الآن",
      learnMore: "تعرف علينا أكثر",
      
      // Admission Page
      admissionTitle: "طلب التسجيل",
      admissionSubtitle: "يرجى ملء جميع الحقول المطلوبة وإرفاق المستندات اللازمة",
      studentInfo: "معلومات الطالب",
      studentNameEn: "اسم الطالب (بالإنجليزية)",
      studentNameAr: "اسم الطالب (بالعربية)",
      dateOfBirth: "تاريخ الميلاد",
      gender: "الجنس",
      selectGender: "اختر الجنس",
      male: "ذكر",
      female: "أنثى",
      nationality: "الجنسية",
      placeOfBirth: "مكان الميلاد",
      gradeApplying: "الصف المتقدم له",
      selectGrade: "اختر الصف",
      kg1: "روضة أولى",
      kg2: "روضة ثانية",
      grade1: "الصف الأول",
      grade2: "الصف الثاني",
      grade3: "الصف الثالث",
      grade4: "الصف الرابع",
      previousSchool: "المدرسة السابقة",
      
      // Parent Information
      fatherInfo: "معلومات ولي الأمر (الأب)",
      motherInfo: "معلومات ولي الأمر (الأم)",
      parentNameEn: "الاسم (بالإنجليزية)",
      parentNameAr: "الاسم (بالعربية)",
      phoneNumber: "رقم الهاتف",
      email: "البريد الإلكتروني",
      occupation: "المهنة",
      workplace: "جهة العمل",
      
      // Address
      addressInfo: "العنوان",
      fullAddress: "العنوان الكامل",
      city: "المدينة",
      postalCode: "الرمز البريدي",
      
      // Documents
      documentsRequired: "المستندات المطلوبة",
      birthCertificate: "شهادة الميلاد",
      passport: "نسخة من جواز السفر",
      schoolRecords: "سجلات المدرسة السابقة",
      medicalRecords: "السجلات الطبية",
      parentId: "هوية ولي الأمر",
      
      // Additional Info
      additionalInfo: "معلومات إضافية",
      medicalConditions: "الحالات الطبية أو الحساسية",
      medicalConditionsPlaceholder: "يرجى ذكر أي حالات طبية أو حساسية",
      specialNeeds: "احتياجات خاصة",
      specialNeedsPlaceholder: "يرجى ذكر أي احتياجات خاصة",
      additionalNotes: "ملاحظات إضافية",
      additionalNotesPlaceholder: "أي معلومات إضافية ترغب في مشاركتها",
      submitApplication: "إرسال الطلب",
      
      // News Page
      newsPageTitle: "آخر الأخبار",
      newsPageSubtitle: "آخر الأخبار والفعاليات من مدرسة ألوان الطيف",
      noNewsYet: "لا توجد أخبار حالياً",
      followForUpdates: "تابعونا للحصول على آخر الأخبار والفعاليات",
      readMore: "اقرأ المزيد",
      showing: "عرض",
      ofNews: "من الأخبار",
      backToNews: "العودة إلى الأخبار",
      share: "مشاركة",
      relatedNews: "أخبار ذات صلة",
      newsNotFound: "الخبر غير موجود",
      
      // Dashboard Applications
      applicationsManagement: "طلبات التسجيل",
      applicationsSubtitle: "إدارة ومراجعة طلبات التسجيل المقدمة",
      searchPlaceholder: "البحث عن طالب أو ولي أمر...",
      allStatuses: "جميع الحالات",
      pending: "قيد المراجعة",
      approved: "مقبول",
      rejected: "مرفوض",
      studentName: "اسم الطالب",
      grade: "الصف",
      parent: "ولي الأمر",
      submissionDate: "تاريخ التقديم",
      status: "الحالة",
      actions: "الإجراءات",
      viewDetails: "عرض التفاصيل",
      downloadDocuments: "تحميل المستندات",
      approve: "قبول",
      reject: "رفض",
      noApplications: "لا توجد طلبات مطابقة للبحث",
      applicationDetails: "تفاصيل الطلب",
      currentStatus: "الحالة الحالية",
      approveApplication: "قبول الطلب",
      rejectApplication: "رفض الطلب",
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
