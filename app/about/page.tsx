'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HypnoticBackground from '@/components/HypnoticBackground';
import Link from 'next/link';
import { 
  Zap, 
  Globe, 
  ShieldCheck, 
  TrendingDown, 
  Sparkles, 
  ArrowRight,
  Code,
  Rocket,
  Palette
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function AboutPlatformPage() {
  const { language, isRtl } = useLanguage();

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0B1220] flex flex-col selection:bg-[#38BDF8] selection:text-[#0B1220]">
      <HypnoticBackground />
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-28 md:pt-36 pb-14 sm:pb-24 relative z-10 max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Hero Section */}
        <div className="max-w-3xl mb-10 sm:mb-16 min-w-0">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-3 uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <span>{language === 'ar' ? 'عن المنصة والرؤية الهندسية' : 'THE NEXT-GENERATION EDGE MANIFESTO'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0B1220] tracking-tight leading-[1.15] sm:leading-[1.1] break-words">
            {language === 'ar' ? (
              <>
                الجيل القادم من السحابة. <br className="hidden sm:inline" />
                <span className="text-[#0B1220] relative inline-block">
                  <span className="relative z-10">لاستضافة مواقع الويب بشفافية تامة.</span>
                  <span className="absolute bottom-1.5 left-0 right-0 h-3 bg-gradient-to-r from-[#38BDF8]/25 to-[#A78BFA]/25 -z-0 rounded-sm" />
                </span>
              </>
            ) : (
              <>
                Engineered for Speed. <br className="hidden sm:inline" />
                <span className="text-[#0B1220] relative inline-block">
                  <span className="relative z-10">Zero Bandwidth Surcharges.</span>
                  <span className="absolute bottom-1.5 left-0 right-0 h-3 bg-gradient-to-r from-[#38BDF8]/25 to-[#A78BFA]/25 -z-0 rounded-sm" />
                </span>
              </>
            )}
          </h1>
          <p className="mt-3 sm:mt-5 text-xs sm:text-base md:text-lg text-[#475569] leading-relaxed font-normal break-words">
            {language === 'ar'
              ? 'نحن هيبتريكس — منصة النشر السحابي المتقدمة على شبكة الحافة العالمية، صُممت خصيصاً لاستضافة مواقع وتطبيقات الويب بسرعة استثنائية. وُجدت هيبتريكس لتقديم بديل متطور يلغي تعقيدات الخوادم وتكاليف نقل البيانات المفاجئة، مع تجربة نشر فائقة السهولة تتيح إطلاق مشروعك بضغطة واحدة.'
              : 'We are Hyptrix—the next-generation Global Edge Cloud platform engineered exclusively to host modern websites and web applications with exceptional speed. Hyptrix eliminates the operational complexity of legacy servers and the unpredictable bandwidth fees of traditional cloud hosts, delivering a refined, zero-friction deployment experience.'}
          </p>
        </div>

        {/* The Problem We Solve */}
        <div className="rounded-3xl bg-white border-2 border-[#38BDF8]/40 p-5 sm:p-8 md:p-12 mb-12 sm:mb-16 shadow-[0_15px_40px_rgba(56,189,248,0.1)]">
          <div className="text-xs font-mono text-[#38BDF8] font-bold uppercase mb-2">
            {language === 'ar' ? 'المعضلة الهندسية التي نحلها' : 'THE INDUSTRY CHALLENGE WE SOLVE'}
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-[#0B1220] tracking-tight mb-3 sm:mb-4">
            {language === 'ar' ? 'معضلة فواتير نقل البيانات في المنصات التقليدية' : 'The Unpredictable Bandwidth Economics of Legacy Hosts'}
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-[#475569] leading-relaxed font-normal">
            {language === 'ar'
              ? 'العديد من المنصات التقليدية تبدأ بتقديم مستويات مجانية محدودة، ولكن بمجرد أن يحظى موقعك باهتمام واسع ويتضاعف عدد الزيارات، تفاجئك فواتير باهظة وغير متوقعة لاستهلاك البيانات (Egress/Bandwidth). أضف إلى ذلك متطلبات الإعداد البرمجية المعقدة. هيبتريكس تقدم حلاً جذرياً عبر بنية تحتية للتخزين الكائني فائق السرعة، ونقل بيانات بدون رسوم إضافية، وسرعة عالمية، ونشر أسهل وأكثر سلاسة.'
              : 'Traditional hosting platforms frequently attract teams with initial entry tiers, only to impose steep, unpredictable bandwidth overages when applications experience traffic surges. Furthermore, their configurations often require cumbersome DevOps processes. Hyptrix resolves this by pairing high-efficiency enterprise object storage with a global edge replication network—providing flat-rate predictability, rapid response times, and an upload process that takes mere seconds.'}
          </p>
        </div>

        {/* The 4 Architectural Pillars */}
        <div className="mb-16 sm:mb-20">
          <h3 className="text-2xl sm:text-3xl font-black text-[#0B1220] tracking-tight mb-6 sm:mb-8">
            {language === 'ar' ? 'الركائز الهندسية الأساسية' : 'Our Core Architectural Pillars'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="p-5 sm:p-7 rounded-3xl bg-white border border-[#0B1220]/8 space-y-3 shadow-sm">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#38BDF8]/15 border border-[#38BDF8]/25 flex items-center justify-center text-[#38BDF8]">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-[#38BDF8]" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#0B1220]">1. Zero-Config Simplicity</h4>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                No terminal, no server configuration, no coding required. Drag a .zip file into the UI. The Hyptrix engine unzips, encrypts, and distributes it across the global cloud in under 5 seconds.
              </p>
            </div>

            <div className="p-5 sm:p-7 rounded-3xl bg-white border border-[#0B1220]/8 space-y-3 shadow-sm">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#38BDF8]/15 border border-[#38BDF8]/25 flex items-center justify-center text-[#38BDF8]">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#0B1220]">2. Global Edge Distribution</h4>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                We do not isolate sites to one centralized server. We distribute replicas across an Anycast Global Edge Network. Whether a user visits from Cairo (Egypt), Ashburn (US), or Tokyo (Japan), content loads in milliseconds from the nearest geographical node.
              </p>
            </div>

            <div className="p-5 sm:p-7 rounded-3xl bg-white border border-[#0B1220]/8 space-y-3 shadow-sm">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#A78BFA]/15 border border-[#A78BFA]/25 flex items-center justify-center text-[#A78BFA]">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#0B1220]">3. Instant Wildcard Subdomains</h4>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                The second the upload bar reaches 100%, the user receives an active, professional domain (e.g., project.hyptrix.com) provisioned with complimentary TLS 1.3 encryption. Zero DNS propagation delay.
              </p>
            </div>

            <div className="p-5 sm:p-7 rounded-3xl bg-white border border-[#0B1220]/8 space-y-3 shadow-sm">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#38BDF8]/15 border border-[#38BDF8]/25 flex items-center justify-center text-[#38BDF8]">
                <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#0B1220]">4. Zero Bandwidth Surcharges</h4>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                Powered by modern enterprise object storage architecture, applications can comfortably absorb millions of visits without paying unexpected bandwidth surcharges.
              </p>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="rounded-3xl bg-white border border-[#0B1220]/8 p-5 sm:p-8 md:p-12 mb-16 sm:mb-20 shadow-sm">
          <div className="text-xs font-mono text-[#A78BFA] font-bold uppercase mb-2">
            {language === 'ar' ? 'الفئات المستفيدة' : 'ENGINEERED AUDIENCE'}
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#0B1220] tracking-tight mb-6 sm:mb-8">
            {language === 'ar' ? 'من صُممت هيبتريكس لخدمتهم' : 'Who We Are Built For'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#0B1220]/6 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#0B1220]">
                {language === 'ar' ? 'المطورون' : 'Developers'}
              </h4>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                {language === 'ar'
                  ? 'نشر فوري لتطبيقات React وVue والمواقع الثابتة دون الدخول في تفاصيل إدارة الخوادم وأدوات البنية التحتية المعقدة.'
                  : 'Need to deploy React, Vue, Next.js, or static web apps instantly without server-side overhead or terminal complexity.'}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#0B1220]/6 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#A78BFA]/15 text-[#A78BFA] flex items-center justify-center">
                <Rocket className="w-5 h-5" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#0B1220]">
                {language === 'ar' ? 'الشركات الناشئة' : 'Startups'}
              </h4>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                {language === 'ar'
                  ? 'أداء عالمي فائق واستقرار كامل مع تكاليف بنية تحتية واضحة ومستقرة تماماً مع نمو أعداد الزوار.'
                  : 'Need hyper-fast, rock-solid global stability without risking their operating budget on unpredictable server bills.'}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#0B1220]/6 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#0B1220]">
                {language === 'ar' ? 'المصممون والوكالات' : 'Designers & Agencies'}
              </h4>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                {language === 'ar'
                  ? 'استضافة مواقع العملاء وتقديم روابط معاينة حية واحترافية في ثوانٍ معدودة وبكل موثوقية.'
                  : 'Need a straightforward, highly professional environment to deliver client staging environments fast.'}
              </p>
            </div>
          </div>
        </div>

        {/* Clean Call to Action */}
        <div className="border-t border-[#0B1220]/8 pt-10 sm:pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
          <div>
            <h4 className="text-xl sm:text-2xl font-black text-[#0B1220]">
              {language === 'ar' ? 'تحدث مباشرة مع قيادة هيبتريكس' : 'Ready to Experience Hyptrix Edge?'}
            </h4>
            <p className="text-xs sm:text-sm text-[#475569] mt-1 font-normal">
              Direct founder line: <a href="mailto:founder@hyptrix.com" className="text-[#38BDF8] hover:underline font-bold">founder@hyptrix.com</a>
            </p>
          </div>
          <Link
            href="/deploy"
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-black text-[#F8FAFC] bg-[#0B1220] hover:bg-[#0B1220]/90 transition-all shadow-md flex items-center justify-center gap-2.5 shrink-0 active:scale-95"
          >
            <span>{language === 'ar' ? 'إطلاق لوحة النشر' : 'Launch Deployment Dashboard'}</span>
            <ArrowRight className={`w-4 h-4 text-[#38BDF8] ${isRtl ? 'rotate-180' : ''}`} />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
