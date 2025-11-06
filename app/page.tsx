"use client"
import Image from "next/image";
import { motion } from "motion/react";
import { Calendar, Pen, Phone, Eye, Target, Heart, Users, BookOpen, Sparkles, Award } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import NewsSection from "@/components/NewsSection";

const quickLinks = [
  {
    nameKey: 'contact',
    icon: Phone,
    href: "/contact"
  },
  {
    nameKey: 'calendar',
    icon: Calendar,
    href: "/calendar"
  },
  {
    nameKey: 'admission',
    icon: Pen,
    href: "/admission"
  },
]

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center  gap-4 justify-center py-8">

        <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-md ">
          <iframe
            src="https://drive.google.com/file/d/13zj9amNOhpQRx6R0iJ3wR4QcvhlCjex9/preview"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        <h1 className="text-2xl font-bold text-primary">
          {t('welcome')}
        </h1>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center  gap-4 justify-center py-8 mt-24">

        <h1 className="text-2xl font-bold text-primary">
          {t('quickLinks')}
        </h1>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 mt-8">

          {quickLinks.map(link => {
            const Icon = link.icon

            return (
              <div key={link.nameKey} className="bg-white rounded-md p-4 aspect-sqare shadow-md">
                <div className="bg-primary/25 p-2 rounded w-fit">
                  <Icon className="text-primary" />
                </div>
                <p className="text-xl font-bold text-primary mt-4">
                  {t(link.nameKey)}
                </p>
                <button className="text-white bg-primary px-4 py-2 font-semibold rounded-md mt-4 hover:bg-white hover:text-primary transition-colors ">
                  <Link href={link.href}>
                    {t('goToPage')}
                  </Link>
                </button>
              </div>
            )
          })}
        </div>

      </motion.section>

      {/* Vision Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-16 mt-24"
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
        viewport={{ once: true }}
        className="py-16 mt-12 bg-primary/5"
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
        viewport={{ once: true }}
        className="py-16 mt-12"
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
        viewport={{ once: true }}
        className="py-16 mt-12 bg-primary/5"
      >
        <div className="max-w-6xl mx-auto px-auto">
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

      <NewsSection />

    </>
  );
}
