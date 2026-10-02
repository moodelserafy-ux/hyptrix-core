import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { domain } = await request.json();

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    // هنجيب المفاتيح دي من كلاودفلير في الخطوة الجاية
    const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
    const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

    if (!ZONE_ID || !API_TOKEN) {
      return NextResponse.json({ error: 'Cloudflare configuration missing' }, { status: 500 });
    }

    // إرسال الطلب لـ Cloudflare لربط الدومين واستخراج شهادة SSL
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/custom_hostnames`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hostname: domain,
        ssl: {
          method: 'http',
          type: 'dv'
        }
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ status: 'success', message: 'Domain linked successfully to Hyptrix Edge!' });
    } else {
      return NextResponse.json({ error: data.errors[0]?.message || 'Failed to link domain' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
