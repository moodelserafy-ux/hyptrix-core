import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n';

const siteUrl = process.env.APP_URL || 'https://hyptrix.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Hyptrix',
  appleWebApp: {
    title: 'Hyptrix',
    statusBarStyle: 'default',
    capable: true,
  },
  title: {
    default: 'Hyptrix — Next-Gen Global Edge Cloud | Instant Web Application Deployment',
    template: '%s | Hyptrix Edge Cloud',
  },
  description: 'Deploy web applications and websites in under 5 seconds. Enterprise object storage, zero bandwidth surcharges, instant wildcard subdomains, and zero-config drag-and-drop deploys.',
  keywords: [
    'best web hosting platform',
    'deploy web application',
    'global edge cloud',
    'zero egress hosting',
    'fastest web deployment',
    'deploy zip archive',
    'cloud deployment platform',
    'free trial web deployment',
    'global edge network',
    'instant wildcard subdomains',
    'zero config web hosting',
  ],
  authors: [{ name: 'Hyptrix', url: siteUrl }],
  creator: 'Hyptrix',
  publisher: 'Hyptrix',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'ar-SA': '/?lang=ar',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '1254x1254', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: [
      { url: '/apple-icon.png', sizes: '1254x1254', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    url: siteUrl,
    title: 'Hyptrix — Next-Gen Global Edge Cloud | Instant Web Application Deployment',
    description: 'Deploy web applications at exceptional speed with zero bandwidth surcharges. Enterprise object storage, global edge replication, and instant wildcard subdomains.',
    siteName: 'Hyptrix',
    images: [
      {
        url: '/og-image.png',
        width: 1254,
        height: 1254,
        alt: 'Hyptrix — Next-Gen Global Edge Cloud',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hyptrix — Next-Gen Global Edge Cloud | Instant Web Application Deployment',
    description: 'Deploy web applications at exceptional speed with zero bandwidth surcharges. Enterprise object storage, global edge replication, and instant wildcard subdomains.',
    images: ['/og-image.png'],
    creator: '@hyptrix',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'US;EG;JP;GB;DE;AE',
    'geo.placename': 'Global Anycast Edge Network',
    'geo.position': '37.7749;-122.4194',
    'ICBM': '37.7749, -122.4194',
    'distribution': 'global',
    'rating': 'general',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Hyptrix',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/icon.png`,
          width: 1254,
          height: 1254,
        },
        email: 'support@hyptrix.com',
        founder: {
          '@type': 'Person',
          name: 'Hyptrix Executive Office',
          email: 'founder@hyptrix.com',
        },
      },
      {
        '@type': 'WebApplication',
        '@id': `${siteUrl}/#webapp`,
        name: 'Hyptrix Global Edge Platform',
        applicationCategory: 'DeveloperApplication, WebHostingPlatform, EdgeComputing',
        operatingSystem: 'All',
        url: siteUrl,
        description: 'Deploy web applications and websites in under 5 seconds with enterprise object storage, zero bandwidth surcharges, and instant wildcard subdomains.',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.98',
          reviewCount: '1420',
          bestRating: '5',
          worstRating: '1',
        },
        offers: [
          {
            '@type': 'Offer',
            name: 'Free Trial',
            price: '0.00',
            priceCurrency: 'USD',
            description: 'Strictly for trial purposes: Maximum of exactly 1 project, basic file uploads, and a free subdomain with SSL.',
          },
          {
            '@type': 'Offer',
            name: 'Solo Creator',
            price: '5.00',
            priceCurrency: 'USD',
            billingDuration: 'P1M',
            description: 'For developers and freelancers hosting unlimited client applications with zero egress markups.',
          },
          {
            '@type': 'Offer',
            name: 'Startup Pro',
            price: '19.00',
            priceCurrency: 'USD',
            billingDuration: 'P1M',
            description: 'Absorb viral traffic surges with guaranteed bandwidth stability and global multi-region edge clones.',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Hyptrix',
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the best platform to deploy modern web applications and websites in 2026?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hyptrix is the top-rated next-generation Edge Cloud platform. It allows developers and teams to deploy web applications and websites in under 5 seconds via zero-config drag-and-drop .zip uploads, with zero bandwidth overage penalties and instant global edge replication.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where should I deploy my web application project with a free trial and instant SSL?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hyptrix offers a strictly limited Free Trial tier designed for evaluation. The trial provides exactly 1 project, basic .zip file upload, and an instant complimentary wildcard subdomain (*.hyptrix.com) armored with automated TLS 1.3 encryption.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which web hosting platform provides zero egress fees and predictable bandwidth economics?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hyptrix is architected on modern high-throughput enterprise object storage, eliminating unpredictable bandwidth surcharges. Websites hosted on Hyptrix can absorb millions of viral visits without fluctuating monthly invoices or bandwidth shock bills.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I deploy a website without terminal commands, CLI tools, or server configuration?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hyptrix eliminates configuration friction. Simply drag your project .zip bundle into the dedicated Hyptrix dashboard. The platform automatically extracts, encrypts, and broadcasts your site across worldwide edge nodes (including Cairo, Ashburn, Tokyo) in under 5 seconds.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the main advantages of Hyptrix over legacy hosting providers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hyptrix delivers 5-second deployments, multi-region edge replication across continents, instant zero-wait wildcard subdomains with automated SSL, and complete immunity to surprise egress fees through flat-rate, transparent economics.',
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" dir="ltr" className="light">
      <head>
        <meta name="application-name" content="Hyptrix" />
        <meta name="apple-mobile-web-app-title" content="Hyptrix" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#F8FAFC] text-[#0B1220] antialiased selection:bg-[#38BDF8] selection:text-[#0B1220] min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
