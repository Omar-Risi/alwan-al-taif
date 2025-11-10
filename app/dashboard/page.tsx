'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Newspaper, Image, FileText, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push('/login');
      }
    } catch {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 md:p-8">
        <p className="text-red-600">No user found. Redirecting...</p>
      </div>
    );
  }

  console.log('Dashboard rendering for user:', user.email);

  const quickLinks = [
    {
      title: t('manageNews'),
      description: t('manageNewsDesc'),
      href: '/dashboard/news',
      icon: Newspaper,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: t('manageGallery'),
      description: t('manageGalleryDesc'),
      href: '/dashboard/gallery',
      icon: Image,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: t('applicationsManagement'),
      description: t('applicationsSubtitle'),
      href: '/dashboard/applications',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    }
  ];

  console.log('Quick links:', quickLinks);

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t('welcomeDashboard')}</h2>
        <p className="text-gray-600 text-lg">
          {t('loggedInAs')}: <strong className="text-primary">{user.email}</strong>
        </p>
      </motion.div>

      {/* Quick Links */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('quickLinks')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative p-6">
                  {/* Icon */}
                  <div className={`${link.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${link.iconColor}`} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-4">
                    {link.description}
                  </p>
                  
                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    <span>{t('goToPage')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
