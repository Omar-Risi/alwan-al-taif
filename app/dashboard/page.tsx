'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

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
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{t('welcomeDashboard')}</h2>
        <p className="text-gray-600">{t('loggedInAs')}: <strong>{user.email}</strong></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          href="/dashboard/news"
          className="block p-6 bg-white/50 backdrop-blur rounded-lg shadow hover:shadow-lg transition-shadow border border-primary/20"
        >
          <h3 className="text-xl font-bold text-primary mb-2">{t('manageNews')}</h3>
          <p className="text-gray-600">{t('manageNewsDesc')}</p>
        </a>
        
        <a
          href="/dashboard/gallery"
          className="block p-6 bg-white/50 backdrop-blur rounded-lg shadow hover:shadow-lg transition-shadow border border-primary/20"
        >
          <h3 className="text-xl font-bold text-primary mb-2">{t('manageGallery')}</h3>
          <p className="text-gray-600">{t('manageGalleryDesc')}</p>
        </a>
        
        <a
          href="/dashboard/applications"
          className="block p-6 bg-white/50 backdrop-blur rounded-lg shadow hover:shadow-lg transition-shadow border border-primary/20"
        >
          <h3 className="text-xl font-bold text-primary mb-2">{t('applicationsManagement')}</h3>
          <p className="text-gray-600">{t('applicationsSubtitle')}</p>
        </a>
      </div>
    </div>
  );
}
