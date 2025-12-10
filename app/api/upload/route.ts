import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

// Configure route to handle larger files
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const lang = req.headers.get('accept-language')?.includes('en') ? 'en' : 'ar';
  
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const langParam = formData.get('lang') as string;
    const currentLang = langParam || lang;

    if (!file) {
      const errorMsg = currentLang === 'ar' ? 'لم يتم تقديم ملف' : 'No file provided';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      const errorMsg = currentLang === 'ar' 
        ? `الملف كبير جداً: ${(file.size / 1024 / 1024).toFixed(2)} ميجابايت. الحد الأقصى 50 ميجابايت.`
        : `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Maximum is 50MB.`;
      return NextResponse.json({
        error: errorMsg,
      }, { status: 400 });
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    console.log('Uploading file:', filePath, 'Size:', arrayBuffer.byteLength, 'Type:', file.type);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('news-images')
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);

      // Check if bucket exists
      const { data: buckets } = await supabase.storage.listBuckets();
      console.log('Available buckets:', buckets?.map(b => b.name));

      const hint = currentLang === 'ar'
        ? 'قم بتشغيل SQL في supabase-storage-setup.sql لإنشاء bucket والصلاحيات'
        : 'Run the SQL in supabase-storage-setup.sql to create the bucket and policies';

      return NextResponse.json({
        error: error.message,
        hint
      }, { status: 500 });
    }

    console.log('Upload successful:', data);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('news-images')
      .getPublicUrl(filePath);

    console.log('Public URL:', publicUrl);

    return NextResponse.json({
      url: publicUrl,
      size: file.size,
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    const errorMsg = lang === 'ar' ? 'فشل الرفع' : 'Upload failed';
    const details = lang === 'ar' ? 'تحقق من سجلات الخادم لمزيد من المعلومات' : 'Check server logs for more information';
    
    // Handle request entity too large error
    if (error?.message?.includes('PayloadTooLargeError') || error?.message?.includes('Request Entity Too Large')) {
      return NextResponse.json({
        error: lang === 'ar' 
          ? 'الملف كبير جداً للخادم. الحد الأقصى 50 ميجابايت.'
          : 'File too large for server. Maximum 50MB.',
        details
      }, { status: 413 });
    }
    
    return NextResponse.json({
      error: error?.message || errorMsg,
      details
    }, { status: 500 });
  }
}
