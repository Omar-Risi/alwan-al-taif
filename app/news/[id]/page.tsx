"use client"
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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

export default function NewsArticlePage() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
  
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    if (params.id) {
      fetchArticle(params.id as string);
      fetchRelatedNews(params.id as string);
    }
  }, [params.id]);

  const fetchArticle = async (id: string) => {
    try {
      const response = await fetch(`/api/news/${id}`);
      if (response.ok) {
        const data = await response.json();
        setArticle(data);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedNews = async (currentId: string) => {
    try {
      const response = await fetch('/api/news');
      if (response.ok) {
        const data = await response.json();
        const filtered = (data.news || [])
          .filter((item: NewsArticle) => item.published && item.id !== currentId)
          .slice(0, 3);
        setRelatedNews(filtered);
      }
    } catch (error) {
      console.error('Error fetching related news:', error);
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

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        const title = isArabic ? (article.title_ar || article.title_en) : (article.title_en || article.title_ar);
        const content = isArabic ? (article.content_ar || article.content_en) : (article.content_en || article.content_ar);
        await navigator.share({
          title: title,
          text: content?.substring(0, 100) || '',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert(t('copied') || 'تم نسخ الرابط');
    }
  };

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

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">{t('newsNotFound')}</h2>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('backToNews')}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('backToNews')}</span>
          </Link>
        </motion.div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Featured Image */}
          {article.images && article.images.length > 0 && (
            <div className="relative h-96 w-full">
              <Image
                src={article.images[0]}
                alt={isArabic ? article.title_ar : article.title_en}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Meta */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-5 h-5" />
                <time className="text-sm">{formatDate(article.created_at)}</time>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-semibold">{t('share')}</span>
              </button>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {isArabic ? (article.title_ar || article.title_en) : (article.title_en || article.title_ar)}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {isArabic ? (article.content_ar || article.content_en) : (article.content_en || article.content_ar)}
              </p>
            </div>
          </div>
        </motion.article>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-primary mb-8">{t('relatedNews')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedNews.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/news/${relatedArticle.id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  {relatedArticle.images && relatedArticle.images.length > 0 && (
                    <div className="relative h-40 w-full">
                      <Image
                        src={relatedArticle.images[0]}
                        alt={isArabic ? relatedArticle.title_ar : relatedArticle.title_en}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 line-clamp-2 mb-2">
                      {isArabic ? (relatedArticle.title_ar || relatedArticle.title_en) : (relatedArticle.title_en || relatedArticle.title_ar)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(relatedArticle.created_at)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
