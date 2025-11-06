'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface News {
  id: string;
  title_ar: string;
  title_en: string;
  content_ar: string;
  content_en: string;
  images: string[];
  published: boolean;
  created_at: string;
}

export default function NewsSection() {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news?published=true&limit=3');
        const data = await res.json();
        setNews(data.news || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="flex flex-col items-center gap-4 justify-center py-8 mt-24">
        <h1 className="text-2xl font-bold text-primary">{t('news')}</h1>
        <p className="text-gray-500">{t('loading')}</p>
      </section>
    );
  }

  if (news.length === 0) {
    return null;
  }

  const isArabic = i18n.language === 'ar';

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-4 justify-center py-8 mt-24"
    >
      <h1 className="text-2xl font-bold text-primary">{t('news')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-6xl px-4">
        {news.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {item.images && item.images.length > 0 && (
              <div className="relative w-full h-48">
                <Image
                  src={item.images[0]}
                  alt={isArabic ? item.title_ar : item.title_en}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold text-primary mb-2">
                {isArabic ? item.title_ar : item.title_en}
              </h3>
              <p className="text-gray-600 line-clamp-3 mb-4">
                {isArabic ? item.content_ar : item.content_en}
              </p>
              <Link
                href={`/news/${item.id}`}
                className="inline-block text-white bg-primary px-4 py-2 font-semibold rounded-md hover:bg-white hover:text-primary transition-colors border border-primary"
              >
                {t('readMore')}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
