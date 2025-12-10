'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Upload, X, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { createClient } from '@supabase/supabase-js';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

interface FileWithPreview {
  file: File;
  preview: string;
}

export default function CreateGalleryPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const currentLang = i18n.language;

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: FileWithPreview[] = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedFiles([...selectedFiles, ...newFiles]);
  }

  function removeFile(index: number) {
    URL.revokeObjectURL(selectedFiles[index].preview);
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      setError(t('pleaseSelectFile'));
      return;
    }

    // Check if any files are too large
    const hasLargeFiles = selectedFiles.some(f => f.file.size > MAX_FILE_SIZE);
    if (hasLargeFiles) {
      setError(currentLang === 'ar' 
        ? 'بعض الملفات أكبر من 50 ميجابايت. الحد الأقصى للملف 50MB.'
        : 'Some files are larger than 50MB. Maximum file size is 50MB.');
      return;
    }

    setError('');
    setLoading(true);
    setUploading(true);

    try {
      // Initialize Supabase client
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Upload all files directly to Supabase Storage
      const uploadPromises = selectedFiles.map(async (fileItem) => {
        const file = fileItem.file;
        
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `gallery/${fileName}`;

        // Convert File to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();

        // Upload directly to Supabase Storage
        const { data, error } = await supabase.storage
          .from('news-images')
          .upload(filePath, arrayBuffer, {
            contentType: file.type,
            cacheControl: '3600',
            upsert: false,
          });

        if (error) {
          console.error(`Upload error for ${file.name}:`, error);
          throw new Error(`${t('uploadFailed')} ${file.name}: ${error.message}`);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('news-images')
          .getPublicUrl(filePath);

        return {
          url: publicUrl,
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

        // Parse response
        let data;
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await res.json();
        } else {
          const text = await res.text();
          data = { error: text };
        }

        if (!res.ok) {
          throw new Error(`${t('saveFailed')}: ${data.error || res.statusText}`);
        }

        return data;
      });

      await Promise.all(createPromises);

      // Clean up object URLs
      selectedFiles.forEach(f => URL.revokeObjectURL(f.preview));

      router.push('/dashboard/gallery');
    } catch (err: any) {
      setError(err.message || t('errorOccurred'));
      setLoading(false);
      setUploading(false);
    }
  }

  const hasLargeFiles = selectedFiles.some(f => f.file.size > MAX_FILE_SIZE);
  const totalSize = selectedFiles.reduce((sum, f) => sum + f.file.size, 0);

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('addNewItem')}</h1>
        <Link
          href="/dashboard/gallery"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary"
        >
          {t('backToGallery')}
        </Link>
      </div>

      <div className="bg-white/50 backdrop-blur rounded-lg shadow p-6 border border-primary/20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('chooseMediaFiles')} *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
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
                  {t('clickToSelectFiles')}
                </span>
                <span className="text-sm text-gray-500">
                  {t('canSelectMultiple')}
                </span>
              </label>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <>
              <div className={`border rounded-lg p-4 ${
                hasLargeFiles ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    hasLargeFiles ? 'text-red-600' : 'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      hasLargeFiles ? 'text-red-900' : 'text-blue-900'
                    }`}>
                      {t('totalSize')}: {(totalSize / 1024 / 1024).toFixed(2)} {currentLang === 'ar' ? 'ميجابايت' : 'MB'}
                    </p>
                    {hasLargeFiles && (
                      <p className="text-sm text-red-700 mt-1 font-medium">
                        {currentLang === 'ar' 
                          ? 'بعض الملفات أكبر من 50 ميجابايت. الحد الأقصى 50MB لكل ملف.'
                          : 'Some files are larger than 50MB. Maximum 50MB per file.'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  {t('selectedFiles')} ({selectedFiles.length})
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedFiles.map((fileItem, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        {fileItem.file.type.startsWith('image/') ? (
                          <Image
                            src={fileItem.preview}
                            alt={fileItem.file.name}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800">
                            <span className="text-white text-xs">{t('video')}</span>
                          </div>
                        )}

                        {/* Size Badge */}
                        <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
                          fileItem.file.size > MAX_FILE_SIZE
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-800 text-white'
                          }`}>
                          {(fileItem.file.size / 1024 / 1024).toFixed(1)} MB
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-gray-600 mt-1 truncate">{fileItem.file.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded border border-red-200">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || uploading || selectedFiles.length === 0 || hasLargeFiles}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? t('uploading') : loading ? t('loading') : `${t('uploadFiles')} ${selectedFiles.length} ${t('files')}`}
            </button>
            <Link
              href="/dashboard/gallery"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              {t('cancel')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
