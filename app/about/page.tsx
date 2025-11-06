"use client"
import Image from "next/image";
import { motion } from "motion/react";
import { Eye, Target, Heart, Users, BookOpen, Sparkles, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          عن مدرسة ألوان الطيف
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto px-4">
          نسعى لتوفير بيئة تعليمية متميزة تبني شخصية الطالب وتحقق طموحاته
        </p>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Eye className="w-10 h-10 text-primary" />
            <h2 className="text-3xl font-bold text-primary text-center">رؤية المدرسة</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/our-vision.jpg"
                alt="رؤية المدرسة"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/50 backdrop-blur rounded-2xl p-8 shadow-lg border border-primary/20"
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  تلتزم مدرسة ألوان الطيف الخاصة بتوفير بيئة تعليمية لديها القدرة على جذب الطلاب لبناء الشخصية السوية المتميزة التي تمكنهم من توجيه وتوظيف الإمكانيات لتحقيق طموحاتهم.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="py-16 bg-primary/5"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-12">
            <BookOpen className="w-10 h-10 text-primary" />
            <h2 className="text-3xl font-bold text-primary text-center">رسالة المدرسة</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 order-2 md:order-1"
            >
              <div className="bg-white backdrop-blur rounded-2xl p-6 shadow-lg border border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    فتح باب الحرية للطلاب والبحث الذاتي وإعطاء دور كبير للإنماء المهني وذلك لتطوير كفاءة المعلمين وذلك من خلال توفير عمل أكبر من محسنات التعليم باستخدام:
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">ورش عمل</h3>
                </div>
                <p className="text-gray-600">
                  نقدم ورش عمل متخصصة لتطوير مهارات المعلمين وتحسين جودة التعليم المقدم للطلاب.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative h-80 rounded-2xl overflow-hidden shadow-xl order-1 md:order-2"
            >
              <Image
                src="/workshop.jpg"
                alt="رسالة المدرسة"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Goals Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Target className="w-10 h-10 text-primary" />
            <h2 className="text-3xl font-bold text-primary text-center">أهداف المدرسة</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative h-80 rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/goals.jpg"
                alt="أهداف المدرسة"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/50 backdrop-blur rounded-2xl p-8 shadow-lg border border-primary/20"
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  خلق بيئة مناسبة للنهوض بالطلاب علمياً وخلقياً ونفسياً لإعداد جيل سوي قادر على مواكبة التطور العلمي والتكنولوجي في مجتمعنا.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="py-16 bg-primary/5"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Heart className="w-10 h-10 text-primary" />
            <h2 className="text-3xl font-bold text-primary text-center">القيم التي تلتزم بها المدرسة</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 order-2 md:order-1"
            >
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all hover:translate-x-2">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-full flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-primary block mb-2">١.</span>
                    <p className="text-gray-700 leading-relaxed">
                      اتباع التوصيات والسياسات التربوية وأساليب التعليم المنبثقة من السياسات الحكومية وتحت إشراف وزارة التربية والتعليم بالسلطنة.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all hover:translate-x-2">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-full flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-primary block mb-2">٢.</span>
                    <p className="text-gray-700 leading-relaxed">
                      تقدير الطفولة باعتبارها مختلفة عن البالغين وبما يتحقق لهم مبدأ الفروق الفردية.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all hover:translate-x-2">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-full flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-primary block mb-2">٣.</span>
                    <p className="text-gray-700 leading-relaxed">
                      تعزيز الثقة بالنفس والتفكير المستقل وقواعد السلوك القويم للتلاميذ.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-xl order-1 md:order-2"
            >
              <Image
                src="/boy.jpg"
                alt="القيم"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
