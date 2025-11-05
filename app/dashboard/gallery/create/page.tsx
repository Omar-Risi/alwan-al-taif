'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

export default function CreateGalleryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedItems, setUploadedItems] = useState<string[]>([]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setSelectedFiles(Array.from(files));
  }

  function removeFile(index: number) {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    if (selectedFiles.length === 0) {
      setError('الرجاء اختيار ملف واحد على الأقل');
      return;
    }

    setError('');
    setLoading(true);
    setUploading(true);

    try {
      // Upload all files first
      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`فشل رفع ${file.name}`);
        }

        const data = await res.json();
        return {
          url: data.url,
          type: file.type.startsWith('video/') ? 'video' : 'image',
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      setUploading(false);

      // Create gallery items
      const createPromises = uploadedFiles.map(async (file) => {
        const res = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: file.type,
            url: file.url,
            published: true,
          }),
        });

        if (!res.ok) {
          throw new Error('فشل حفظ الملف');
        }

        return res.json();
      });

      await Promise.all(createPromises);
      router.push('/dashboard/gallery');
    } catch (err: any) {
      setError(err.message || 'حدث خطأ');
      setLoading(false);
      setUploading(false);
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إضافة عنصر جديد للمعرض</h1>
        <Link
          href="/dashboard/gallery"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary"
        >
          العودة للمعرض
        </Link>
      </div>

      <div className="bg-white/50 backdrop-blur rounded-lg shadow p-6 border border-primary/20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اختر الصور أو الفيديوهات *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                disabled={uploading}
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <Upload className="w-16 h-16 text-gray-400 mb-3" />
                <span className="text-lg font-medium text-gray-700 mb-1">
                  اضغط لاختيار الملفات
                </span>
                <span className="text-sm text-gray-500">
                  يمكنك اختيار عدة صور أو فيديوهات
                </span>
              </label>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                الملفات المحددة ({selectedFiles.length})
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {file.type.startsWith('image/') ? (
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          <span className="text-white text-xs">فيديو</span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || uploading || selectedFiles.length === 0}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {uploading ? 'جاري رفع الملفات...' : loading ? 'جاري الحفظ...' : `رفع ${selectedFiles.length} ملف`}
            </button>
            <Link
              href="/dashboard/gallery"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              إلغاء
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
