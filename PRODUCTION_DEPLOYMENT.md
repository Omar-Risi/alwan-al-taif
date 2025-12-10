# Production Deployment Guide

## Issue Fixed: "Unexpected token 'R', Request En..." JSON Parse Error

### Problem
The error occurs when the production server returns non-JSON responses (like "Request Entity Too Large") which the client tries to parse as JSON.

### Root Causes in Production
1. **Body Size Limits**: Production servers (Vercel, etc.) have stricter limits than local dev
2. **Non-JSON Error Responses**: Server errors are returned as plain text instead of JSON
3. **Missing Error Handling**: Client code expected all responses to be valid JSON

## Solutions Implemented

### 1. API Route Configuration (`app/api/upload/route.ts`)

#### Added Runtime Configuration
```typescript
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
```

#### Improved Error Handling
- Detects non-JSON responses
- Handles "Request Entity Too Large" errors specifically
- Returns proper JSON error responses with status codes
- Bilingual error messages based on Accept-Language header

#### Safe FormData Parsing
```typescript
try {
  const formData = await req.formData();
  // ... process file
} catch (error) {
  // Handle payload too large errors
  if (error?.message?.includes('PayloadTooLargeError')) {
    return NextResponse.json({
      error: 'File too large for server. Maximum 50MB.'
    }, { status: 413 });
  }
}
```

### 2. Client-Side Error Handling (`app/dashboard/gallery/create/page.tsx`)

#### Safe JSON Parsing
All fetch calls now check content-type before parsing:

```typescript
const contentType = res.headers.get('content-type');
if (contentType && contentType.includes('application/json')) {
  data = await res.json();
} else {
  const text = await res.text();
  data = { error: text };
}
```

#### Applied to:
- File upload fetch
- Gallery creation fetch
- Gallery listing fetch
- Delete operations

### 3. Next.js Configuration (`next.config.ts`)

Added body size limit for server actions:

```typescript
experimental: {
  serverActions: {
    bodySizeLimit: '50mb',
  },
}
```

### 4. Vercel Configuration (`vercel.json`)

#### Function Timeouts and Memory
```json
{
  "functions": {
    "app/api/upload/route.ts": {
      "maxDuration": 60,
      "memory": 1024
    }
  }
}
```

#### CORS Headers
Proper CORS configuration for API routes to prevent CORS-related JSON errors.

## Deployment Checklist

### For Vercel Deployment

1. **Environment Variables**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_key
   ```

2. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Function Configuration**
   - `vercel.json` is automatically detected
   - Upload route gets 60s timeout and 1GB memory

4. **Deployment**
   ```bash
   npm run build  # Test locally first
   vercel --prod  # Deploy to production
   ```

### For Other Platforms (Netlify, AWS, etc.)

1. **Increase Body Size Limits**
   - Netlify: Add to `netlify.toml`:
     ```toml
     [functions]
     payload_size_limit = "50mb"
     ```
   - AWS Lambda: Configure in API Gateway (10MB max, use S3 presigned URLs for larger files)

2. **Set Timeouts**
   - Upload functions need at least 60s timeout
   - Default is often 10s which is too short

3. **Memory Allocation**
   - FFmpeg compression needs 1GB+ memory
   - Increase from default 128MB/256MB

## Testing Production Build

### Local Production Test
```bash
npm run build
npm start
```

### Test Scenarios
1. ✅ Upload file under 50MB (no compression)
2. ✅ Upload file over 50MB (with compression)
3. ✅ Test both languages (English/Arabic)
4. ✅ Test error scenarios:
   - No file selected
   - Network error
   - Server error
5. ✅ Multiple file upload
6. ✅ Cancel during upload

## Common Production Issues

### Issue: "413 Payload Too Large"
**Solution**: 
- Check `vercel.json` configuration
- Ensure files are compressed before upload
- Verify Supabase storage limits

### Issue: "504 Gateway Timeout"
**Solution**:
- Increase function timeout in `vercel.json`
- Consider compressing files more aggressively
- Use fewer compression attempts

### Issue: CORS Errors
**Solution**:
- Verify CORS headers in `vercel.json`
- Check Supabase CORS settings
- Ensure API routes return proper headers

### Issue: Memory Errors
**Solution**:
- Increase memory in `vercel.json`
- Process files sequentially instead of parallel
- Reduce FFmpeg quality settings

## Monitoring

### Check Logs
```bash
vercel logs --follow
```

### Monitor Function Performance
- Check Vercel dashboard for:
  - Function execution time
  - Memory usage
  - Error rates

### Debug Production Errors
1. Enable detailed error logging in API routes
2. Use `console.error()` liberally
3. Check browser Network tab for actual responses
4. Verify Supabase logs for storage errors

## Performance Optimization

### Current Settings
- Max file size: 50MB
- Image quality: 85% → 50% progressive
- Video quality: 1080p → 720p → 480p
- Client-side compression (no server load)

### Optimization Options

#### Option 1: Server-Side Compression
- Pros: Better compression, consistent results
- Cons: Increases server load and costs

#### Option 2: Direct S3/Supabase Upload
- Use presigned URLs
- Upload directly to storage
- Pros: No server bottleneck
- Cons: More complex implementation

#### Option 3: Chunked Uploads
- Split large files into chunks
- Upload chunks separately
- Pros: Better reliability for large files
- Cons: More complex, requires reconstruction

## Rollback Plan

If production deployment fails:

1. **Revert to Previous Version**
   ```bash
   vercel rollback
   ```

2. **Quick Fix: Disable Compression**
   - Comment out compression code
   - Deploy emergency fix
   - Files will be rejected if over 50MB

3. **Alternative: Reduce Limit**
   - Change `MAX_FILE_SIZE` to 10MB
   - Faster, more reliable uploads
   - Update user messaging

## Future Improvements

1. **Background Processing**
   - Use Web Workers for compression
   - Better UI responsiveness

2. **Progressive Upload**
   - Show upload progress per file
   - Allow cancel/retry individual files

3. **Smarter Compression**
   - Analyze file content
   - Choose optimal compression settings
   - Skip already-compressed files

4. **Cloud Functions**
   - Move compression to Supabase Edge Functions
   - Reduce client-side processing
   - Better for mobile devices

## Support

### Get Help
1. Check browser console for errors
2. Check Vercel function logs
3. Verify Supabase Storage dashboard
4. Test with smaller files first

### Report Issues
Include:
- File size and type
- Error message from console
- Network tab screenshot
- Browser and OS version

---

**Last Updated**: December 10, 2025  
**Version**: 2.0.0 - Production Ready

