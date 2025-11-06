'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from '@/components/ConfirmDialog';

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

export default function NewsManagementPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<News | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(data.news || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  }

  function openDeleteDialog(newsItem: News) {
    setNewsToDelete(newsItem);
    setDeleteDialogOpen(true);
  }

  function closeDeleteDialog() {
    setDeleteDialogOpen(false);
    setNewsToDelete(null);
  }

  async function confirmDelete() {
    if (!newsToDelete) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/news/${newsToDelete.id}`, { method: 'DELETE' });
      if (res.ok) {
        setNews(news.filter((item) => item.id !== newsToDelete.id));
        closeDeleteDialog();
      } else {
        const data = await res.json();
        alert(data.error || 'فشل حذف الخبر');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('حدث خطأ أثناء حذف الخبر');
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p>{t('loading')}</p>
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
          <h2 className="text-2xl font-bold">{t('newsManagement')}</h2>
          <Link
            href="/dashboard/news/create"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">{t('addNewNews')}</span>
            <span className="sm:hidden">{t('addNews')}</span>
          </Link>
        </motion.div>

        {news.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/50 backdrop-blur rounded-lg shadow p-8 text-center border border-primary/20"
          >
            <p className="text-gray-500">{t('noNewsYetDashboard')}</p>
          </motion.div>
        ) : (
          <>
            {/* Desktop Table View */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:block bg-white/50 backdrop-blur rounded-lg shadow overflow-hidden border border-primary/20"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-primary/10">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                        {t('titleArabic')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                        {t('titleEnglish')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                        {t('status')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                        {t('date')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                        {t('actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {news.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-primary/5 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {item.title_ar}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.title_en}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              item.published
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {item.published ? t('published') : t('draft')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(item.created_at).toLocaleDateString('ar-SA')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => router.push(`/news/${item.id}`)}
                              className="text-green-600 hover:text-green-900"
                              title={t('preview')}
                            >
                              <Eye className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => router.push(`/dashboard/news/edit/${item.id}`)}
                              className="text-blue-600 hover:text-blue-900"
                              title={t('edit')}
                            >
                              <Edit className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openDeleteDialog(item)}
                              className="text-red-600 hover:text-red-900"
                              title={t('delete')}
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {news.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/50 backdrop-blur rounded-lg shadow p-4 border border-primary/20"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{item.title_ar}</h3>
                      <p className="text-sm text-gray-600">{item.title_en}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                        item.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {item.published ? t('published') : t('draft')}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-3">
                    {new Date(item.created_at).toLocaleDateString('ar-SA')}
                  </p>

                  <div className="flex gap-2 justify-end">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(`/news/${item.id}`)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title={t('preview')}
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(`/dashboard/news/edit/${item.id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title={t('edit')}
                    >
                      <Edit className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openDeleteDialog(item)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title={t('delete')}
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={deleteDialogOpen}
          onClose={closeDeleteDialog}
          onConfirm={confirmDelete}
          title={t('confirmDelete')}
          message={`${t('deleteNewsMessage')} "${newsToDelete?.title_ar}"؟ ${t('cannotUndo')}`}
          confirmText={t('delete')}
          cancelText={t('cancel')}
          isLoading={deleting}
        />
      </div>
  );
}
