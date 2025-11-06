"use client"
import Image from "next/image";
import { motion } from "motion/react";
import { Eye, Target, Heart, Users, BookOpen, Sparkles, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          {t('aboutSchoolTitle')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto px-4">
          {t('aboutSchoolSubtitle')}
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
            <h2 className="text-3xl font-bold text-primary text-center">{t('vision')}</h2>
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
                  {t('visionText')}
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
            <h2 className="text-3xl font-bold text-primary text-center">{t('mission')}</h2>
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
                    {t('missionText')}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">{t('workshops')}</h3>
                </div>
                <p className="text-gray-600">
                  {t('workshopsText')}
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
            <h2 className="text-3xl font-bold text-primary text-center">{t('goals')}</h2>
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
                  {t('goalsText')}
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
            <h2 className="text-3xl font-bold text-primary text-center">{t('valuesTitle')}</h2>
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
                  <p className="text-gray-700 leading-relaxed">
                    {t('value1')}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all hover:translate-x-2">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-full flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {t('value2')}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all hover:translate-x-2">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-full flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {t('value3')}
                  </p>
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
