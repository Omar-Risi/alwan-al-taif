# Media Compression Feature - Documentation

## Overview
The media upload feature now includes automatic compression for files larger than 50MB and is fully bilingual (Arabic/English).

## What Was Fixed

### 1. Bilingual Support
All user-facing text in the media upload system is now bilingual:
- Upload API error messages
- Gallery management page
- Gallery create/upload page
- Compression progress messages
- Success/error notifications

### 2. Features

#### Image Compression
- Uses FFmpeg to compress images
- Progressive quality reduction (85% → 50%)
- Scales images to max 4K resolution (3840x2160)
- Automatically compresses images over 50MB

#### Video Compression
- Three compression levels:
  - High quality: 1080p, CRF 28
  - Medium quality: 720p, CRF 32
  - Low quality: 480p, CRF 35
- Uses H.264 codec with AAC audio
- Optimized for web streaming (faststart)

#### UI Features
- Real-time compression progress
- Visual file size indicators
- Color-coded badges:
  - Red: File too large (>50MB)
  - Green: Successfully compressed
  - Gray: Normal size
- Compression savings percentage display
- Multi-file batch upload support

## Translation Keys Added

### English
```
addNewItem: "Add New Item"
backToGallery: "Back to Gallery"
chooseMediaFiles: "Choose Images or Videos"
clickToSelectFiles: "Click to select files"
canSelectMultiple: "You can select multiple images or videos"
totalSize: "Total Size"
someLargeFiles: "Some files are larger than 50 MB. Please compress them before uploading."
compressLargeFiles: "Compress Large Files"
compressing: "Compressing..."
selectedFiles: "Selected Files"
video: "Video"
image: "Image"
compressionFailed: "Failed to compress"
loadCompressorFailed: "Failed to load compressor"
unsupportedFileType: "Unsupported file type"
compressionSuccess: "Compressed successfully! Saved"
ofSpace: "of space"
pleaseSelectFile: "Please select at least one file"
filesNeedCompression: "Some files are larger than 50 MB. Please compress them first."
uploadFailed: "Upload failed"
saveFailed: "Failed to save file"
errorOccurred: "An error occurred"
uploadFiles: "Upload"
files: "files"
deleteConfirmTitle: "Confirm Delete"
deleteConfirmMessage: "Are you sure you want to delete this item? This action cannot be undone."
deleteButton: "Delete"
saved: "Saved"
fileTooLarge: "File too large"
maximumIs50MB: "Maximum is 50MB"
noFileProvided: "No file provided"
cannotCompressVideo: "Cannot compress video under 50 MB. Final size"
```

### Arabic
All corresponding Arabic translations are in `lib/i18n.ts`

## Usage

### For Users

1. **Navigate to Gallery Management**
   - Go to Dashboard → Gallery Management
   - Click "Add New Item"

2. **Upload Files**
   - Click to select files or drag & drop
   - Can select multiple images/videos at once
   - System shows total size and warns if files are too large

3. **Compress Large Files**
   - If any files exceed 50MB, a "Compress Large Files" button appears
   - Click to start automatic compression
   - Progress bar shows real-time compression status
   - Success message shows space saved

4. **Upload**
   - Once all files are under 50MB, click "Upload"
   - Files are uploaded to Supabase Storage
   - Automatically added to gallery

### For Developers

#### API Endpoint
```typescript
POST /api/upload
Content-Type: multipart/form-data

Body:
- file: File (required)
- lang: string (optional, 'ar' or 'en', defaults to 'ar')

Response:
{
  url: string,
  size: number
}
```

#### Compression Functions

**Image Compression:**
```typescript
compressImage(file: File, index: number): Promise<Blob>
```
- Uses FFmpeg with quality reduction loop
- Target: < 50MB
- Max resolution: 3840x2160

**Video Compression:**
```typescript
compressVideo(file: File, index: number): Promise<Blob>
```
- Three compression levels
- Uses H.264 with AAC audio
- Target: < 50MB

## Files Modified

1. `/lib/i18n.ts` - Added 30+ new translation keys
2. `/app/api/upload/route.ts` - Added language parameter and bilingual errors
3. `/app/dashboard/gallery/create/page.tsx` - Full bilingual implementation
4. `/app/dashboard/gallery/page.tsx` - Updated to use translations

## Configuration

### Maximum File Size
```typescript
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
```

To change the limit, update this constant in:
- `/app/api/upload/route.ts`
- `/app/dashboard/gallery/create/page.tsx`

### FFmpeg CDN
Current version: `@ffmpeg/core@0.12.6`
CDN: `https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd`

### Compression Settings

**Images:**
- Quality range: 85% → 50%
- Step: 10%
- Max resolution: 3840x2160 (4K)

**Videos:**
1. High: 1080p, CRF 28, preset medium
2. Medium: 720p, CRF 32, preset fast
3. Low: 480p, CRF 35, preset faster

Audio: AAC, 128kbps

## Storage Requirements

### Supabase Storage
Ensure the `news-images` bucket exists:

```sql
-- Create bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('news-images', 'news-images', true);

-- Storage policies
CREATE POLICY "Anyone can upload to news-images"
  ON storage.objects FOR INSERT TO public
  WITH CHECK (bucket_id = 'news-images');

CREATE POLICY "Anyone can view news-images"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'news-images');
```

## Browser Support

FFmpeg.wasm requires:
- SharedArrayBuffer support
- Cross-Origin Isolation headers
- Modern browser (Chrome 87+, Firefox 79+, Safari 15.2+)

## Performance

- **Image compression**: ~2-5 seconds for 10MB image
- **Video compression**: ~30-60 seconds per minute of video
- Client-side processing (no server load)
- Progress feedback for better UX

## Error Handling

All errors are caught and displayed in both languages:
- Compression failures
- Upload failures
- Storage errors
- FFmpeg loading errors

## Future Improvements

1. **Background Processing**: Use Web Workers for better performance
2. **Resume Upload**: Add ability to resume interrupted uploads
3. **Custom Compression**: Let users choose quality level
4. **Batch Operations**: Parallel compression for faster batch processing
5. **Preview Before Upload**: Show compressed preview before uploading

## Testing Checklist

- [ ] Upload image under 50MB (no compression needed)
- [ ] Upload image over 50MB (compression required)
- [ ] Upload video over 50MB (compression required)
- [ ] Multiple files upload
- [ ] Switch language and verify all text changes
- [ ] Cancel during compression
- [ ] Error handling for unsupported formats
- [ ] Storage quota exceeded handling

## Support

For issues or questions:
1. Check browser console for errors
2. Verify Supabase Storage is configured
3. Confirm FFmpeg CDN is accessible
4. Test with smaller files first

---

**Last Updated**: December 10, 2025
**Version**: 1.0.0

