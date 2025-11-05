'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary/10 border-t border-primary/20 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-primary mb-4">مدرسة ألوان الطيف</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              مدرسة خاصة لتعليم الأطفال في المعبيلة الجنوبية، نقدم تعليماً متميزاً في بيئة آمنة ومحفزة.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-primary mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/admission" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  التسجيل
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  التقويم
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-primary mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">المعبيلة الجنوبية، سلطنة عمان</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+96812345678" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  +968 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@alwanaltaif.com" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  info@alwanaltaif.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-primary mb-4">تابعنا</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>

            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-8 border-t border-primary/20 text-center"
        >
          <p className="text-gray-600 text-sm">
            © {currentYear} مدرسة ألوان الطيف. جميع الحقوق محفوظة.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
