"use client"
import Image from "next/image";
import { motion } from "motion/react";
import { Calendar, LucideIcon, Pen, Phone } from "lucide-react";
import Link from "next/link";
import NewsSection from "@/components/NewsSection";


const quickLinks: { name?: string, icon?: LucideIcon, href?: string }[] = [
  {
    name: 'تواصل معنا',
    icon: Phone,
    href: "/contact"
  },
  {
    name: 'التقويم',
    icon: Calendar,
    href: "/calendar"
  },
  {
    name: 'التسجيل',
    icon: Pen,
    href: "/admission"
  },
]

export default function Home() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
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
          مرحبًا بكم في مدرسة الوان الطيف
        </h1>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center  gap-4 justify-center py-8 mt-24">

        قريبا الرؤية

      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center  gap-4 justify-center py-8 mt-24">

        <h1 className="text-2xl font-bold text-primary">
          الروابط السريعة
        </h1>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 mt-8">

          {quickLinks.map(link => {
            const Icon = link.icon

            return (
              <div key={link.name} className="bg-white rounded-md p-4 aspect-sqare shadow-md">
                <div className="bg-primary/25 p-2 rounded w-fit">
                  <Icon className="text-primary" />
                </div>
                <p className="text-xl font-bold text-primary mt-4">
                  {link.name}
                </p>
                <button className="text-white bg-primary px-4 py-2 font-semibold rounded-md mt-4 hover:bg-white hover:text-primary transition-colors ">
                  <Link href={link.href}>
                    الانتقال للصفحة
                  </Link>
                </button>
              </div>
            )
          })}
        </div>

      </motion.section>

      <NewsSection />

    </>
  );
}
