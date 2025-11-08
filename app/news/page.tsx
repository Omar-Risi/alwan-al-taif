"use client"
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, ArrowRight, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface NewsArticle {
  id: string;
  title_ar: string;
  title_en: string;
  content_ar: string;
  content_en: string;
  images: string[];
  published: boolean;
  created_at: string;
}

export default function NewsPage() {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      if (response.ok) {
        const data = await response.json();
        const publishedNews = (data.news || []).filter((article: NewsArticle) => article.published);
        setNews(publishedNews);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const isArabic = i18n.language === 'ar';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <Newspaper className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              {t('news')}
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-4">
            آخر الأخبار والفعاليات من مدرسة ألوان الطيف
          </p>
          {!loading && news.length > 0 && (
            <div className="inline-block bg-primary/10 px-6 py-2 rounded-full">
              <p className="text-gray-700">
                {isArabic ? 'إجمالي الأخبار: ' : 'Total Posts: '}
                <span className="font-bold text-primary text-lg">{news.length}</span>
              </p>
            </div>
          )}
        </motion.div>

        {/* News Grid */}
        {news.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">لا توجد أخبار حالياً</h3>
            <p className="text-gray-500">تابعونا للحصول على آخر الأخبار والفعاليات</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image */}
                {article.images && article.images.length > 0 && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={article.images[0]}
                      alt={isArabic ? article.title_ar : article.title_en}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Clock className="w-4 h-4" />
                    <time>{formatDate(article.created_at)}</time>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary transition-colors">
                    {isArabic ? article.title_ar : article.title_en}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {getExcerpt(isArabic ? article.content_ar : article.content_en)}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={`/news/${article.id}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    <span>{t('readMore')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}


      </div>
    </div>
  );
}
