import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import AdmZip from 'adm-zip';

// تجهيز الاتصال بخزنة Cloudflare R2
const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('site_file') as File;
    const siteName = formData.get('site_name') as string;

    if (!file || !siteName) {
      return NextResponse.json({ error: 'Missing file or site name' }, { status: 400 });
    }

    // تحويل الملف لبيانات قابلة للقراءة
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // لو الملف مضغوط ZIP، نفكه ونرفع الملفات
    if (file.name.endsWith('.zip')) {
      const zip = new AdmZip(buffer);
      const zipEntries = zip.getEntries();

      for (const entry of zipEntries) {
        if (!entry.isDirectory) {
          // تحديد نوع الملف (عشان المتصفح يقرأه صح)
          const contentType = entry.name.endsWith('.html') ? 'text/html; charset=utf-8' :
                              entry.name.endsWith('.css') ? 'text/css' :
                              entry.name.endsWith('.js') ? 'application/javascript' :
                              entry.name.endsWith('.png') ? 'image/png' :
                              entry.name.endsWith('.jpg') || entry.name.endsWith('.jpeg') ? 'image/jpeg' :
                              entry.name.endsWith('.svg') ? 'image/svg+xml' :
                              'application/octet-stream';

          const uploadParams = {
            Bucket: process.env.R2_BUCKET_NAME,
            Key: `${siteName}/${entry.entryName}`,
            Body: entry.getData(),
            ContentType: contentType,
          };
          // الرفع المباشر لـ Cloudflare Edge
          await s3.send(new PutObjectCommand(uploadParams));
        }
      }
    } else {
       // لو العميل رفع ملف HTML مباشر من غير ضغط
       const uploadParams = {
          Bucket: process.env.R2_BUCKET_NAME,
          Key: `${siteName}/${file.name}`,
          Body: buffer,
          ContentType: 'text/html; charset=utf-8',
        };
        await s3.send(new PutObjectCommand(uploadParams));
    }

    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    console.error("Deploy error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
