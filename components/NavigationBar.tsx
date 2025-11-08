"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";

export function NavigationBar({ isHomepage = false }: { isHomepage?: boolean }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: "/about", labelKey: "about" },
    { href: "/admission", labelKey: "admission" },
    { href: "/news", labelKey: "news" },
    { href: "/gallery", labelKey: "gallery" },
    { href: "/contact", labelKey: "contact" },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
    },
    open: {
      opacity: 1,
      x: 0,
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <header className="w-full flex justify-center py-6 px-4">
      <div className={`max-w-7xl w-full mx-auto px-6 py-4 rounded-full backdrop-blur-md border shadow-lg flex items-center justify-between ${
        isHomepage 
          ? 'bg-white/10 border-white/20' 
          : 'bg-primary/20 border-primary/50'
      }`}>
        <div>
          <Link href="/">
            <Image
              src="/alwan-al-taif-logo.png"
              alt="شعار مدرسة الوان الطيف"
              width={120}
              height={32}
              className="drop-shadow-lg"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-full hover:bg-white/20 backdrop-blur-sm transition-all font-semibold ${
                isHomepage ? 'text-white' : 'text-primary'
              }`}
            >
              {t(item.labelKey)}
            </Link>
          ))}
          <div className="ml-2">
            <LanguageToggle isHomepage={isHomepage} />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden z-50 relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white block"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-white block"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white block"
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleMenu}
            />

            {/* Menu */}
            <motion.nav
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-screen w-64 bg-white/95 backdrop-blur-lg shadow-2xl z-40 lg:hidden flex flex-col pt-20 px-8"
            >
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  custom={i}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Link
                    href={item.href}
                    onClick={toggleMenu}
                    className="block text-lg font-semibold py-4 border-b border-gray-200 hover:text-primary transition-colors"
                  >
                    {t(item.labelKey)}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6">
                <LanguageToggle />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
