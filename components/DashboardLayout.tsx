'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Newspaper, LogOut, Menu, X, Image, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isArabic = i18n.language === 'ar';

  const navItems = [
    { nameKey: 'dashboard', href: '/dashboard', icon: Home },
    { nameKey: 'news', href: '/dashboard/news', icon: Newspaper },
    { nameKey: 'gallery', href: '/dashboard/gallery', icon: Image },
    { nameKey: 'applications', href: '/dashboard/applications', icon: FileText },
  ];

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: isArabic ? '100%' : '-100%' },
  };

  const overlayVariants = {
    open: { opacity: 1, pointerEvents: 'auto' as const },
    closed: { opacity: 0, pointerEvents: 'none' as const },
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Top Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-0 ${isArabic ? 'right-0' : 'left-0'} w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
            
            <h1 className="text-xl font-bold text-primary">{t('dashboard')}</h1>
          </div>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            <form action="/api/logout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline font-medium">{t('logout')}</span>
              </button>
            </form>
          </div>
        </div>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            transition={{ duration: 0.2 }}
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`hidden lg:flex ${isArabic ? 'lg:order-2' : 'lg:order-1'} lg:static inset-y-0 z-40 w-64 bg-primary/10 ${isArabic ? 'border-l' : 'border-r'} border-primary/20 flex-col`}>
          <nav className="px-4 py-6 space-y-2 flex-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href);
            
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-700 hover:bg-primary/20 hover:translate-x-1'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{t(item.nameKey)}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        </aside>

        {/* Mobile Sidebar */}
        <motion.aside
          initial={false}
          animate={sidebarOpen ? 'open' : 'closed'}
          variants={sidebarVariants}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`lg:hidden fixed inset-y-0 ${isArabic ? 'right-0' : 'left-0'} z-40 w-64 bg-white ${isArabic ? 'border-l' : 'border-r'} border-gray-200 flex flex-col mt-16`}
        >
          <nav className="px-4 py-6 space-y-2 flex-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href);
            
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-700 hover:bg-primary/20 hover:translate-x-1'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{t(item.nameKey)}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        </motion.aside>

        {/* Main Content */}
        <main className={`flex-1 w-full lg:w-auto ${isArabic ? 'lg:order-1' : 'lg:order-2'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
        </main>
      </div>
    </div>
  );
}
