"use client"
import Image from "next/image";
import { motion } from "motion/react";
import { Calendar, Pen, Phone, Eye, Target, Heart, Users, BookOpen, Sparkles, Award, ArrowUpRight } from "lucide-react";
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

const alwanSubjects = [
  'alwanSubjectQuran',
  'alwanSubjectArabic',
  'alwanSubjectEnglish',
  'alwanSubjectMath',
  'alwanSubjectCivilization',
];

const alwanLevels = [
  'alwanLevelPreparatory',
  'alwanLevelKindergarten',
  'alwanLevelAdvanced',
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="w-full">
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
        className="py-20 px-6 md:px-12 bg-gradient-to-br from-primary via-primary/95 to-primary/80"
      >
        <div className="max-w-6xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold">
            {t('quickLinks')}
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/80">
            {t('quickLinksDescription')}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              const description = t(`${link.nameKey}Description`, {
                defaultValue: '',
              });

              return (
                <Link
                  key={link.nameKey}
                  href={link.href}
                  className="group relative flex h-full overflow-hidden rounded-2xl border border-white/20 bg-white/90 p-[1px] shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40 focus:ring-offset-transparent"
                >
                  <div className="relative flex h-full w-full flex-col gap-6 rounded-[calc(theme(borderRadius.2xl)-1px)] bg-white/95 p-8 text-left">
                    <span className="pointer-events-none absolute -top-16 -right-10 h-36 w-36 rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-125" />
                    <div className="relative flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary transition-transform duration-300 group-hover:rotate-6">
                        <Icon className="h-7 w-7" />
                      </div>
                    </div>
                    <div className="relative">
                      <h3 className="text-xl font-bold text-primary">
                        {t(link.nameKey)}
                      </h3>
                      {description && (
                        <p className="mt-2 text-sm text-gray-600">
                          {description}
                        </p>
                      )}
                    </div>
                    <span className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary/80 transition-all duration-300 group-hover:text-primary">
                      {t('goToPage')}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 px-6 bg-white"
      >
        <div className="max-w-6xl mx-auto rounded-3xl border border-primary/15 bg-gradient-to-br from-white via-white to-primary/5 p-10 shadow-xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <h2 className="mt-4 text-3xl font-bold text-primary">
                {t('alwanSectionHeading')}
              </h2>
              <p className="mt-3 text-gray-600">
                {t('alwanSectionDescription')}
              </p>
            </div>

            <div className="grid w-full gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-primary/10 bg-white/90 p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-primary">
                  {t('alwanSubjectsTitle')}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {alwanSubjects.map((subjectKey) => (
                    <li key={subjectKey}>• {t(subjectKey)}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-primary/10 bg-white/90 p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-primary">
                  {t('alwanLevelsTitle')}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {alwanLevels.map((levelKey) => (
                    <li key={levelKey}>• {t(levelKey)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <NewsSection />

    </div>
  );
}
