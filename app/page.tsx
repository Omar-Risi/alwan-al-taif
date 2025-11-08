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
    <div className="overflow-x-hidden w-full">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Fallback Background Image */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 to-accent/20">
          {/* You can add a background image here as fallback */}
        </div>

        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/6xwZQC2WGBw?autoplay=1&mute=1&loop=1&playlist=6xwZQC2WGBw&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ border: 'none' }}
          ></iframe>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            {t('welcome')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl drop-shadow-xl">
            {t('footerDescription')}
          </p>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-4 justify-center py-16 px-8 lg:px-24 bg-gradient-to-br from-primary via-primary/90 to-primary/80">

        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {t('quickLinks')}
        </h1>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 mt-8">

          {quickLinks.map(link => {
            const Icon = link.icon

            return (
              <div key={link.nameKey} className="bg-white rounded-xl p-6 aspect-sqare shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="bg-primary/20 p-3 rounded-lg w-fit">
                  <Icon className="text-primary w-8 h-8" />
                </div>
                <p className="text-xl font-bold text-primary mt-4">
                  {t(link.nameKey)}
                </p>
                <button className="text-white bg-primary px-6 py-3 font-semibold rounded-lg mt-4 hover:bg-primary/90 hover:shadow-lg transition-all">
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
                src="/school.jpg"
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

      <NewsSection />

    </div>
  );
}
