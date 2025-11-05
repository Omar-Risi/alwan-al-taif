'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`/api/news/${params.id}`);
        if (!res.ok) {
          router.push('/');
          return;
        }
        const data = await res.json();
        setNews(data.news);
      } catch (error) {
        console.error('Error fetching news:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchNews();
    }
  }, [params.id, router]);

  const nextImage = () => {
    if (news && news.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % news.images.length);
    }
  };

  const prevImage = () => {
    if (news && news.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + news.images.length) % news.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">جاري التحميل...</p>
      </div>
    );
  }

  if (!news) {
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => router.push('/')}
          className="mb-6 text-primary hover:underline flex items-center gap-2"
        >
          ← العودة للرئيسية
        </button>

        <div className="bg-white/50 backdrop-blur rounded-lg shadow-lg overflow-hidden border border-primary/20">
          {news.images && news.images.length > 0 && (
            <div className="relative w-full h-96 bg-white/30">
              <Image
                src={news.images[currentImageIndex]}
                alt={news.title_ar}
                fill
                className="object-contain"
              />
              
              {news.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    aria-label="الصورة السابقة"
                  >
                    <ChevronLeft className="w-6 h-6 text-primary" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    aria-label="الصورة التالية"
                  >
                    <ChevronRight className="w-6 h-6 text-primary" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {news.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-primary' : 'bg-white/60'
                        }`}
                        aria-label={`الصورة ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="p-8">
            <h1 className="text-3xl font-bold text-primary mb-4">
              {news.title_ar}
            </h1>
            
            <p className="text-sm text-gray-500 mb-6">
              {new Date(news.created_at).toLocaleDateString('ar-SA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {news.content_ar}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
