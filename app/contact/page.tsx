"use client"
import { motion } from "motion/react";
import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: "اتصل بنا",
      titleEn: "Call Us",
      value: "+968 9123 4567",
      href: "tel:+96891234567",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      icon: Mail,
      title: "راسلنا عبر البريد",
      titleEn: "Email Us",
      value: "info@rainbowschool.om",
      href: "mailto:info@rainbowschool.om",
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600"
    },
    {
      icon: MessageCircle,
      title: "واتساب",
      titleEn: "WhatsApp",
      value: "+968 9123 4567",
      href: "https://wa.me/96891234567",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    }
  ];

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
            تواصل معنا
          </h1>
          <p className="text-xl text-gray-600">
            نحن هنا للإجابة على جميع استفساراتكم
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={index}
                href={method.href}
                target={method.icon === MessageCircle ? "_blank" : undefined}
                rel={method.icon === MessageCircle ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${method.color} ${method.hoverColor} text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-white/20 p-4 rounded-full">
                    <Icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold">{method.title}</h3>
                  <p className="text-white/90 text-lg font-semibold">{method.value}</p>
                  <div className="mt-4 bg-white/20 px-6 py-2 rounded-full">
                    <span className="text-sm font-semibold">انقر للتواصل</span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* School Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Location */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/20 p-3 rounded-full">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary">موقعنا</h3>
            </div>
            <div className="space-y-3 text-gray-700">
              <p className="text-lg leading-relaxed">
                مدرسة ألوان الطيف الخاصة
              </p>
              <p className="text-lg leading-relaxed">
                المعبيلة الجنوبية
              </p>
              <p className="text-lg leading-relaxed">
                محافظة مسقط، سلطنة عمان
              </p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              عرض على الخريطة
            </a>
          </div>

          {/* Working Hours */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/20 p-3 rounded-full">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary">أوقات العمل</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700 font-semibold">الأحد - الخميس</span>
                <span className="text-primary font-bold">7:00 ص - 2:00 م</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700 font-semibold">الجمعة - السبت</span>
                <span className="text-red-600 font-bold">مغلق</span>
              </div>
              <div className="mt-6 bg-primary/10 p-4 rounded-lg">
                <p className="text-gray-700 text-center">
                  <span className="font-semibold">ملاحظة:</span> يمكنكم التواصل معنا عبر الواتساب في أي وقت
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-primary mb-4">
            هل لديك استفسار؟
          </h3>
          <p className="text-gray-700 text-lg mb-6">
            فريقنا جاهز للإجابة على جميع أسئلتكم حول التسجيل، المناهج، والأنشطة المدرسية
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/admission"
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              التسجيل الآن
            </a>
            <a
              href="/about"
              className="bg-white text-primary px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold shadow-md hover:shadow-lg border-2 border-primary"
            >
              تعرف علينا أكثر
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
