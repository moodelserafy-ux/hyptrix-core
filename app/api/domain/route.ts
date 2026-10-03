import { NextResponse } from 'next/server';

const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const GLOBAL_KEY = process.env.CLOUDFLARE_GLOBAL_KEY;
const EMAIL = process.env.CLOUDFLARE_EMAIL;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const KV_ID = process.env.CLOUDFLARE_KV_NAMESPACE_ID;

// 1. فحص حالة الدومين (GET)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  if (!domain) return NextResponse.json({ error: 'Domain is required' }, { status: 400 });

  try {
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/custom_hostnames?hostname=${domain}`, {
      headers: { 'X-Auth-Email': EMAIL!, 'X-Auth-Key': GLOBAL_KEY! }
    });
    const data = await res.json();
    if (data.success && data.result.length > 0) {
      const status = data.result[0].status;
      return NextResponse.json({ status: 'success', dnsStatus: status === 'active' ? 'verified' : 'pending' });
    }
    return NextResponse.json({ status: 'success', dnsStatus: 'pending' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. ربط الدومين بكلاودفلير وتسجيله في الـ KV (POST)
export async function POST(request: Request) {
  try {
    const { domain, projectName } = await request.json();
    if (!domain) return NextResponse.json({ error: 'Domain is required' }, { status: 400 });

    // إضافة الدومين إلى Cloudflare for SaaS
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/custom_hostnames`, {
      method: 'POST',
      headers: { 'X-Auth-Email': EMAIL!, 'X-Auth-Key': GLOBAL_KEY!, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hostname: domain,
        ssl: { method: 'txt', type: 'dv', settings: { min_tls_version: '1.2' } }
      })
    });
    const data = await res.json();

    if (data.success) {
      // كتابة اسم المشروع والدومين في دفتر العناوين (KV)
      if (ACCOUNT_ID && KV_ID && projectName) {
        await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${KV_ID}/values/${domain}`, {
          method: 'PUT',
          headers: { 'X-Auth-Email': EMAIL!, 'X-Auth-Key': GLOBAL_KEY!, 'Content-Type': 'text/plain' },
          body: projectName
        });
      }
      return NextResponse.json({ status: 'success', result: data.result });
    } else {
      return NextResponse.json({ error: data.errors[0]?.message || 'Failed to link domain' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 3. مسح الدومين من كلاودفلير ومن الـ KV (DELETE)
export async function DELETE(request: Request) {
  try {
    const { domain } = await request.json();
    if (!domain) return NextResponse.json({ error: 'Domain is required' }, { status: 400 });

    // البحث عن الـ ID الخاص بالدومين
    const getRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/custom_hostnames?hostname=${domain}`, {
      headers: { 'X-Auth-Email': EMAIL!, 'X-Auth-Key': GLOBAL_KEY! }
    });
    const getData = await getRes.json();

    if (getData.success && getData.result.length > 0) {
      const hostnameId = getData.result[0].id;
      // مسح الدومين من Cloudflare
      await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/custom_hostnames/${hostnameId}`, {
        method: 'DELETE',
        headers: { 'X-Auth-Email': EMAIL!, 'X-Auth-Key': GLOBAL_KEY! }
      });
    }

    // مسح الدومين من دفتر العناوين (KV) أوتوماتيكياً
    if (ACCOUNT_ID && KV_ID) {
      await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${KV_ID}/values/${domain}`, {
        method: 'DELETE',
        headers: { 'X-Auth-Email': EMAIL!, 'X-Auth-Key': GLOBAL_KEY! }
      });
    }

    return NextResponse.json({ status: 'success', message: 'Domain removed completely' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
