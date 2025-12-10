'use client';

import { useState, FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Upload, X, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { useTranslation } from 'react-i18next';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

interface FileWithPreview {
  file: File;
  preview: string;
  compressed?: boolean;
  originalSize?: number;
  compressedSize?: number;
}

export default function CreateGalleryPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [compressionProgress, setCompressionProgress] = useState<{ [key: number]: number }>({});
  const ffmpegRef = useRef(new FFmpeg());
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const currentLang = i18n.language;

  const loadFFmpeg = async () => {
    if (ffmpegLoaded) return;

    const ffmpeg = ffmpegRef.current;

    ffmpeg.on('log', ({ message }) => {
      console.log(message);
    });

    ffmpeg.on('progress', ({ progress }) => {
      console.log('FFmpeg progress:', progress);
    });

    try {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      setFfmpegLoaded(true);
    } catch (error) {
      console.error('Failed to load FFmpeg:', error);
      throw new Error(t('loadCompressorFailed'));
    }
  };

  const compressImage = async (file: File, index: number): Promise<Blob> => {
    const ffmpeg = ffmpegRef.current;
    const inputName = 'input.' + file.name.split('.').pop();
    const outputName = 'output.jpg';

    await ffmpeg.writeFile(inputName, await fetchFile(file));

    let quality = 85;
    let compressed: Uint8Array | null = null;

    while (quality >= 50) {
      setCompressionProgress(prev => ({ ...prev, [index]: Math.round((85 - quality) / 35 * 50) }));

      await ffmpeg.exec([
        '-i', inputName,
        '-vf', 'scale=\'min(3840,iw)\':\'min(2160,ih)\':force_original_aspect_ratio=decrease',
        '-q:v', Math.round((100 - quality) / 3).toString(),
        '-y',
        outputName
      ]);

      compressed = await ffmpeg.readFile(outputName) as Uint8Array;

      if (compressed.length <= MAX_FILE_SIZE || quality === 50) {
        break;
      }

      quality -= 10;
    }

    setCompressionProgress(prev => ({ ...prev, [index]: 100 }));
    return new Blob([new Uint8Array(compressed!)], { type: 'image/jpeg' });
  };

  const compressVideo = async (file: File, index: number): Promise<Blob> => {
    const ffmpeg = ffmpegRef.current;
    const inputName = 'input.' + file.name.split('.').pop();
    const outputName = 'output.mp4';

    await ffmpeg.writeFile(inputName, await fetchFile(file));

    const configs = [
      { crf: 28, preset: 'medium', scale: '-2:1080', label: 'عالية' },
      { crf: 32, preset: 'fast', scale: '-2:720', label: 'متوسطة' },
      { crf: 35, preset: 'faster', scale: '-2:480', label: 'منخفضة' },
    ];

    let compressed: Uint8Array | null = null;

    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];
      setCompressionProgress(prev => ({ ...prev, [index]: Math.round((i / configs.length) * 100) }));

      await ffmpeg.exec([
        '-i', inputName,
        '-vf', `scale=${config.scale}`,
        '-c:v', 'libx264',
        '-crf', config.crf.toString(),
        '-preset', config.preset,
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
        '-y',
        outputName
      ]);

      compressed = await ffmpeg.readFile(outputName) as Uint8Array;

      if (compressed.length <= MAX_FILE_SIZE) {
        break;
      }
    }

    if (compressed!.length > MAX_FILE_SIZE) {
      throw new Error(`${t('cannotCompressVideo')}: ${(compressed!.length / 1024 / 1024).toFixed(2)} ${t('maximumIs50MB').includes('MB') ? 'MB' : 'ميجابايت'}`);
    }

    setCompressionProgress(prev => ({ ...prev, [index]: 100 }));
    return new Blob([new Uint8Array(compressed!)], { type: 'video/mp4' });
  };

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: FileWithPreview[] = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      originalSize: file.size,
    }));

    setSelectedFiles([...selectedFiles, ...newFiles]);
  }

  function removeFile(index: number) {
    URL.revokeObjectURL(selectedFiles[index].preview);
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    setCompressionProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[index];
      return newProgress;
    });
  }

  async function compressFiles() {
    setCompressing(true);
    setError('');

    try {
      await loadFFmpeg();

      const compressedFiles: FileWithPreview[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const fileItem = selectedFiles[i];
        const file = fileItem.file;

        // Skip if already under size limit
        if (file.size <= MAX_FILE_SIZE) {
          compressedFiles.push(fileItem);
          setCompressionProgress(prev => ({ ...prev, [i]: 100 }));
          continue;
        }

        try {
          let compressedBlob: Blob;

          if (file.type.startsWith('image/')) {
            compressedBlob = await compressImage(file, i);
          } else if (file.type.startsWith('video/')) {
            compressedBlob = await compressVideo(file, i);
          } else {
            throw new Error(t('unsupportedFileType'));
          }

          // Create new File from Blob
          const compressedFile = new File([compressedBlob], file.name, {
            type: compressedBlob.type,
          });

          compressedFiles.push({
            file: compressedFile,
            preview: fileItem.preview,
            compressed: true,
            originalSize: file.size,
            compressedSize: compressedBlob.size,
          });

        } catch (err: any) {
          console.error(`Compression failed for ${file.name}:`, err);
          throw new Error(`${t('compressionFailed')} ${file.name}: ${err.message}`);
        }
      }

      setSelectedFiles(compressedFiles);
      setCompressing(false);
      setCompressionProgress({});

      // Show success message
      const totalOriginal = compressedFiles.reduce((sum, f) => sum + (f.originalSize || 0), 0);
      const totalCompressed = compressedFiles.reduce((sum, f) => sum + (f.compressedSize || f.file.size), 0);
      const reduction = ((1 - totalCompressed / totalOriginal) * 100).toFixed(1);

      alert(`${t('compressionSuccess')} ${reduction}% ${t('ofSpace')}`);

    } catch (err: any) {
      setError(err.message || t('compressionFailed'));
      setCompressing(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      setError(t('pleaseSelectFile'));
      return;
    }

    // Check if any files need compression
    const needsCompression = selectedFiles.some(f => f.file.size > MAX_FILE_SIZE);
    if (needsCompression) {
      setError(t('filesNeedCompression'));
      return;
    }

    setError('');
    setLoading(true);
    setUploading(true);

    try {
      // Upload all files
      const uploadPromises = selectedFiles.map(async (fileItem) => {
        const formData = new FormData();
        formData.append('file', fileItem.file);
        formData.append('lang', currentLang);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
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
          throw new Error(`${t('uploadFailed')} ${fileItem.file.name}: ${data.error || res.statusText}`);
        }

        return {
          url: data.url,
          type: fileItem.file.type.startsWith('video/') ? 'video' : 'image',
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
                disabled={uploading || compressing}
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">
                      {t('totalSize')}: {(totalSize / 1024 / 1024).toFixed(2)} {currentLang === 'ar' ? 'ميجابايت' : 'MB'}
                    </p>
                    {hasLargeFiles && (
                      <p className="text-sm text-blue-700 mt-1">
                        {t('someLargeFiles')}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {hasLargeFiles && (
                <button
                  type="button"
                  onClick={compressFiles}
                  disabled={compressing}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {compressing ? t('compressing') : t('compressLargeFiles')}
                </button>
              )}

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

                        {/* Compression Progress */}
                        {compressionProgress[index] !== undefined && compressionProgress[index] < 100 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-white text-sm mb-2">
                                {compressionProgress[index]}%
                              </div>
                              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 transition-all duration-300"
                                  style={{ width: `${compressionProgress[index]}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Size Badge */}
                        <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${fileItem.file.size > MAX_FILE_SIZE
                            ? 'bg-red-500 text-white'
                            : fileItem.compressed
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-800 text-white'
                          }`}>
                          {(fileItem.file.size / 1024 / 1024).toFixed(1)} MB
                        </div>

                        {fileItem.compressed && fileItem.originalSize && (
                          <div className="absolute bottom-2 left-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                            {t('saved')} {((1 - fileItem.file.size / fileItem.originalSize) * 100).toFixed(0)}%
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        disabled={compressing}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:cursor-not-allowed"
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
              disabled={loading || uploading || compressing || selectedFiles.length === 0 || hasLargeFiles}
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
