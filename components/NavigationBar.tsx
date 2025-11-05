"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: "/about", label: "من نحن" },
    { href: "/adimission", label: "التسجيل" },
    { href: "/news", label: "الأخبار" },
    { href: "/gallery", label: "معرض الصور" },
    { href: "/contact", label: "تواصل معنا" },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
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
    <header className="px-8 py-4 lg:px-24 flex items-center justify-between w-full relative">
      <div>
        <Link href="/">
          <Image
            src="/alwan-al-taif-logo.png"
            alt="شعار مدرسة الوان الطيف"
            width={200}
            height={50}
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-4 text-lg font-semibold">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hover:bg-primary px-2 py-1 hover:text-white rounded-sm transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden z-50 relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          className="w-6 h-0.5 bg-current block"
          transition={{ duration: 0.3 }}
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="w-6 h-0.5 bg-current block"
          transition={{ duration: 0.3 }}
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          className="w-6 h-0.5 bg-current block"
          transition={{ duration: 0.3 }}
        />
      </button>

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
              className="fixed top-0 right-0 h-screen w-64 bg-white shadow-2xl z-40 lg:hidden flex flex-col pt-20 px-8"
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
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
