import { NextResponse } from 'next/server';

// 1. دالة الربط (لإرسال الدومين إلى Cloudflare)
export async function POST(request: Request) {
  try {
    const { domain } = await request.json();

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
    const GLOBAL_KEY = process.env.CLOUDFLARE_GLOBAL_KEY;
    const EMAIL = process.env.CLOUDFLARE_EMAIL;

    if (!ZONE_ID || !GLOBAL_KEY || !EMAIL) {
      return NextResponse.json({ error: 'Cloudflare configuration missing' }, { status: 500 });
    }

    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/custom_hostnames`, {
      method: 'POST',
      headers: {
        'X-Auth-Email': EMAIL,
        'X-Auth-Key': GLOBAL_KEY,
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

    if (response.ok && data.success) {
      return NextResponse.json({ status: 'success', message: 'Domain linked successfully!' });
    } else {
      return NextResponse.json({ error: data.errors?.[0]?.message || 'Failed to link domain' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. دالة الفحص (للتحقق من حالة الدومين بعد ربطه للزرار Check Status)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
    const GLOBAL_KEY = process.env.CLOUDFLARE_GLOBAL_KEY;
    const EMAIL = process.env.CLOUDFLARE_EMAIL;

    if (!ZONE_ID || !GLOBAL_KEY || !EMAIL) {
      return NextResponse.json({ error: 'Cloudflare configuration missing' }, { status: 500 });
    }

    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/custom_hostnames?hostname=${domain}`, {
      method: 'GET',
      headers: {
        'X-Auth-Email': EMAIL,
        'X-Auth-Key': GLOBAL_KEY,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok && data.success && data.result.length > 0) {
      const hostnameData = data.result[0];
      // لو الحالة active يبقى العميل ربط الـ DNS صح
      const isVerified = hostnameData.status === 'active'; 
      
      return NextResponse.json({ 
        status: 'success', 
        dnsStatus: isVerified ? 'verified' : 'pending' 
      });
    } else {
       return NextResponse.json({ status: 'success', dnsStatus: 'pending' });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
