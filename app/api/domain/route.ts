import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { domain } = await request.json();

    if (!domain || typeof domain !== 'string' || !domain.trim()) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    // تنظيف الدومين لضمان قبوله كـ FQDN صحيح في Cloudflare
    const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');

    const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
    const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

    // إذا لم تكن المفاتيح موجودة، يفشل الطلب مباشرة وبشكل حقيقي
    if (!ZONE_ID || !API_TOKEN) {
      return NextResponse.json(
        { error: 'Cloudflare credentials missing (CLOUDFLARE_ZONE_ID or CLOUDFLARE_API_TOKEN)' },
        { status: 500 }
      );
    }

    // إرسال الطلب الفعلي لـ Cloudflare لربط الدومين واستخراج شهادة SSL
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/custom_hostnames`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hostname: cleanDomain,
        ssl: {
          method: 'http',
          type: 'dv',
        },
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({
        status: 'success',
        message: 'Domain linked successfully to Hyptrix Edge!',
        hostname: data.result?.hostname || cleanDomain,
        dnsStatus: data.result?.status === 'active' ? 'verified' : 'pending',
      });
    } else {
      const errorMsg = data.errors?.[0]?.message || 'Failed to link domain in Cloudflare';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// فحص حالة الدومين الحقيقية من Cloudflare
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
      return NextResponse.json({ error: 'Missing domain parameter' }, { status: 400 });
    }

    const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
    const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
    const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

    if (!ZONE_ID || !API_TOKEN) {
      return NextResponse.json(
        { error: 'Cloudflare credentials missing' },
        { status: 500 }
      );
    }

    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/custom_hostnames?hostname=${cleanDomain}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.success && data.result && data.result.length > 0) {
      const item = data.result[0];
      const isVerified = item.status === 'active' && item.ssl?.status === 'active';
      return NextResponse.json({
        status: 'success',
        domain: cleanDomain,
        dnsStatus: isVerified ? 'verified' : 'pending',
        sslStatus: item.ssl?.status || 'pending',
        cloudflareStatus: item.status,
      });
    } else {
      return NextResponse.json({
        status: 'error',
        error: data.errors?.[0]?.message || 'Domain not found in Cloudflare Custom Hostnames',
      }, { status: 404 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error checking domain status';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
