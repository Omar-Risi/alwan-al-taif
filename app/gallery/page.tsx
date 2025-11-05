'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Play, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail_url: string;
  created_at: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    try {
      const res = await fetch('/api/gallery?published=true');
      const data = await res.json();
      setGallery(data.gallery || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredGallery = gallery.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4"
      >
        <h1 className="text-3xl font-bold text-primary mb-2 text-center">معرض الصور والفيديوهات</h1>
        <p className="text-gray-600 text-center mb-8">استعرض أحدث الصور والفيديوهات من مدرسة ألوان الطيف</p>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-primary/10'
            }`}
          >
            الكل ({gallery.length})
          </button>
          <button
            onClick={() => setFilter('image')}
            className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              filter === 'image'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-primary/10'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            الصور ({gallery.filter(i => i.type === 'image').length})
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              filter === 'video'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-primary/10'
            }`}
          >
            <VideoIcon className="w-5 h-5" />
            الفيديوهات ({gallery.filter(i => i.type === 'video').length})
          </button>
        </div>

        {filteredGallery.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">لا توجد عناصر في المعرض حتى الآن</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedItem(item)}
                className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all"
              >
                {item.type === 'image' ? (
                  <Image
                    src={item.url}
                    alt="Gallery item"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <>
                    {item.thumbnail_url ? (
                      <Image
                        src={item.thumbnail_url}
                        alt="Video thumbnail"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <VideoIcon className="w-16 h-16 text-white" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-primary ml-1" />
                      </div>
                    </div>
                  </>
                )}
                <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-full">
                  {item.type === 'image' ? (
                    <ImageIcon className="w-4 h-4 text-primary" />
                  ) : (
                    <VideoIcon className="w-4 h-4 text-primary" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full max-h-[90vh] relative"
            >
              {selectedItem.type === 'image' ? (
                <div className="relative w-full h-[80vh]">
                  <Image
                    src={selectedItem.url}
                    alt="Gallery item"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[80vh] rounded-lg"
                >
                  متصفحك لا يدعم تشغيل الفيديو
                </video>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
