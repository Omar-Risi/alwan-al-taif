'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, Image as ImageIcon, Video } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from '@/components/ConfirmDialog';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail_url: string;
  published: boolean;
  created_at: string;
}

export default function GalleryManagementPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setGallery(data.gallery || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  }

  function openDeleteDialog(item: GalleryItem) {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  }

  function closeDeleteDialog() {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  }

  async function confirmDelete() {
    if (!itemToDelete) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/gallery/${itemToDelete.id}`, { method: 'DELETE' });
      if (res.ok) {
        setGallery(gallery.filter((item) => item.id !== itemToDelete.id));
        closeDeleteDialog();
      } else {
        const data = await res.json();
        alert(data.error || 'فشل حذف العنصر');
      }
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      alert('حدث خطأ أثناء حذف العنصر');
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
      >
        <h2 className="text-2xl font-bold">{t('galleryManagement')}</h2>
        <Link
          href="/dashboard/gallery/create"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">إضافة عنصر جديد</span>
          <span className="sm:hidden">إضافة</span>
        </Link>
      </motion.div>

      {gallery.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/50 backdrop-blur rounded-lg shadow p-8 text-center border border-primary/20"
        >
          <p className="text-gray-500">{t('noMediaYet')}</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/50 backdrop-blur rounded-lg shadow overflow-hidden border border-primary/20 hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gray-200">
                {item.type === 'image' ? (
                  <Image
                    src={item.url}
                    alt="Gallery item"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    {item.thumbnail_url ? (
                      <Image
                        src={item.thumbnail_url}
                        alt="Video thumbnail"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Video className="w-16 h-16 text-white" />
                    )}
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                  {item.type === 'image' ? (
                    <ImageIcon className="w-4 h-4 text-primary" />
                  ) : (
                    <Video className="w-4 h-4 text-primary" />
                  )}
                  <span className="text-xs font-medium">{item.type === 'image' ? 'صورة' : 'فيديو'}</span>
                </div>
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      item.published
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}
                  >
                    {item.published ? 'منشور' : 'مسودة'}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <p className="text-xs text-gray-500 mb-3">
                  {new Date(item.created_at).toLocaleDateString('ar-SA')}
                </p>

                <div className="flex gap-2 justify-end">

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openDeleteDialog(item)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        title="تأكيد الحذف"
        message={`هل أنت متأكد من حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.`}
        confirmText="حذف"
        cancelText="إلغاء"
        isLoading={deleting}
      />
    </div>
  );
}
