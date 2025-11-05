'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface PendingImage {
  file: File;
  preview: string;
}

export default function CreateNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title_ar: '',
    title_en: '',
    content_ar: '',
    content_en: '',
    published: false,
  });

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPendingImages: PendingImage[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPendingImages([...pendingImages, ...newPendingImages]);
    e.target.value = ''; // Reset input
  }

  function removePendingImage(index: number) {
    const newPending = [...pendingImages];
    URL.revokeObjectURL(newPending[index].preview); // Clean up memory
    newPending.splice(index, 1);
    setPendingImages(newPending);
  }

  function removeUploadedImage(index: number) {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  }



  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First, upload any pending images
      let allImages = [...uploadedImages];
      
      if (pendingImages.length > 0) {
        setUploading(true);
        const uploadPromises = pendingImages.map(async ({ file }) => {
          const formData = new FormData();
          formData.append('file', file);

          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'فشل رفع الصورة');
          }

          const data = await res.json();
          return data.url;
        });

        const newUrls = await Promise.all(uploadPromises);
        allImages = [...allImages, ...newUrls];
        
        // Clean up previews
        pendingImages.forEach(({ preview }) => URL.revokeObjectURL(preview));
        setUploading(false);
      }

      // Then create the news with all images
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images: allImages,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'حدث خطأ');
        setLoading(false);
        return;
      }

      router.push('/dashboard/news');
    } catch (err: any) {
      setError(err.message || 'حدث خطأ في الاتصال');
      setLoading(false);
      setUploading(false);
    }
  }

  return (
    <div className="p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إضافة خبر جديد</h1>
          <Link
            href="/dashboard/news"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary"
          >
            العودة للأخبار
          </Link>
        </div>

        <div className="bg-white/50 backdrop-blur rounded-lg shadow p-6 border border-primary/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                العنوان (عربي) *
              </label>
              <input
                type="text"
                required
                value={formData.title_ar}
                onChange={(e) =>
                  setFormData({ ...formData, title_ar: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="أدخل العنوان بالعربية"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                العنوان (English) *
              </label>
              <input
                type="text"
                required
                value={formData.title_en}
                onChange={(e) =>
                  setFormData({ ...formData, title_en: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter title in English"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المحتوى (عربي) *
              </label>
              <textarea
                required
                rows={6}
                value={formData.content_ar}
                onChange={(e) =>
                  setFormData({ ...formData, content_ar: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="أدخل المحتوى بالعربية"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المحتوى (English) *
              </label>
              <textarea
                required
                rows={6}
                value={formData.content_en}
                onChange={(e) =>
                  setFormData({ ...formData, content_en: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter content in English"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الصور
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    اضغط لاختيار الصور
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    يمكنك اختيار عدة صور ومعاينتها قبل الرفع
                  </span>
                </label>
              </div>

              {/* Pending Images - Preview before upload */}
              {pendingImages.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    الصور المحددة ({pendingImages.length}) - سيتم رفعها عند حفظ الخبر
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {pendingImages.map((item, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={item.preview}
                          alt={`معاينة ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-32 object-cover rounded-lg border-2 border-blue-400"
                        />
                        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          جاهزة للرفع
                        </div>
                        <button
                          type="button"
                          onClick={() => removePendingImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Uploaded Images */}
              {uploadedImages.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    الصور المرفوعة ({uploadedImages.length})
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {uploadedImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={url}
                          alt={`صورة ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-32 object-cover rounded-lg border-2 border-green-400"
                        />
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          ✓ مرفوعة
                        </div>
                        <button
                          type="button"
                          onClick={() => removeUploadedImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="published" className="mr-2 text-sm text-gray-700">
                نشر الخبر مباشرة
              </label>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || uploading}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                {uploading ? 'جاري رفع الصور...' : loading ? 'جاري الحفظ...' : 'حفظ الخبر'}
              </button>
              <Link
                href="/dashboard/news"
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                إلغاء
              </Link>
            </div>
            {pendingImages.length > 0 && (
              <p className="text-sm text-blue-600">
                ملاحظة: سيتم رفع {pendingImages.length} صورة عند الضغط على حفظ الخبر
              </p>
            )}
          </form>
        </div>
      </div>
  );
}
