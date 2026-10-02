'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HypnoticBackground from '@/components/HypnoticBackground';
import ComparisonSection from '@/components/ComparisonSection';
import { useLanguage } from '@/lib/i18n';
import { Sparkles, Check } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const { language, isRtl } = useLanguage();

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0B1220] flex flex-col selection:bg-[#38BDF8] selection:text-[#0B1220]">
      <HypnoticBackground />
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-28 md:pt-36 pb-14 sm:pb-24 relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 min-w-0">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-3 uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <span>{language === 'ar' ? 'اقتصاديات واضحة ومستقرة' : 'PREDICTABLE INFRASTRUCTURE PRICING'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0B1220] tracking-tight break-words">
            {language === 'ar' ? 'تسعير شفاف. بلا رسوم خفية.' : 'Transparent Pricing. Zero Bandwidth Traps.'}
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-[#475569] max-w-2xl mx-auto font-normal break-words leading-relaxed">
            {language === 'ar'
              ? 'خطط واضحة تبدأ من تجربة مجانية محدودة بمشروع واحد فقط لاختبار المنصة، وتتدرج إلى باقات إنتاجية تعتمد على تقنيات التخزين الكائني فائقة السرعة لامتصاص ملايين الزيارات بلا فواتير مفاجئة.'
              : 'Flexible infrastructure plans starting with a strictly limited single-project free trial, scaling to predictable production tiers that absorb millions of requests with zero surprise overages.'}
          </p>
        </div>

        {/* 4 Clean Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-14 sm:mb-24 min-w-0">
          
          {/* TIER 0: FREE TRIAL PLAN */}
          <div className="rounded-3xl bg-white border border-[#0B1220]/8 p-5 sm:p-7 flex flex-col justify-between shadow-[0_10px_30px_rgba(11,18,32,0.04)]">
            <div>
              <div className="text-xs font-mono text-[#38BDF8] font-bold uppercase mb-2">
                {language === 'ar' ? 'تجربة مجانية محدودة' : 'TRIAL ACCESS'}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0B1220]">
                {language === 'ar' ? 'باقة التجربة' : 'Free Trial'}
              </h3>
              <p className="text-xs text-[#475569] mt-1 mb-5">
                {language === 'ar'
                  ? 'مخصصة حصرياً لأغراض التجربة واختبار سرعة محرك النشر.'
                  : 'Strictly for testing and evaluating our global deployment engine.'}
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl sm:text-4xl font-black text-[#0B1220]">$0</span>
                <span className="text-xs font-mono text-[#64748B]">
                  {language === 'ar' ? '/ للأبد' : '/ forever'}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-[#475569] font-normal">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span className="text-[#0B1220] font-bold">
                    {language === 'ar' ? 'حد أقصى: مشروع واحد بالضبط' : 'Maximum of exactly 1 project'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar' ? 'رفع ملفات أساسي (.zip)' : 'Basic file uploads (.zip)'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar' ? 'نطاق فرعي مجاني (*.hyptrix.com) مع SSL' : 'Free subdomain (*.hyptrix.com) with SSL'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                href="/deploy"
                className="block w-full py-3 text-center text-xs font-bold text-[#0B1220] bg-[#F8FAFC] hover:bg-white rounded-xl border border-[#0B1220]/10 transition-colors cursor-pointer shadow-sm"
              >
                {language === 'ar' ? 'ابدأ التجربة المجانية' : 'Start Free Trial'}
              </Link>
            </div>
          </div>

          {/* TIER 1: SOLO CREATOR ($5) */}
          <div className="rounded-3xl bg-white border border-[#0B1220]/8 p-5 sm:p-7 flex flex-col justify-between shadow-[0_10px_30px_rgba(11,18,32,0.04)]">
            <div>
              <div className="text-xs font-mono text-[#38BDF8] font-bold uppercase mb-2">
                {language === 'ar' ? 'باقة المطورين' : 'DEVELOPER TIER'}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0B1220]">
                {language === 'ar' ? 'المطور الفردي' : 'Solo Creator'}
              </h3>
              <p className="text-xs text-[#475569] mt-1 mb-5">
                {language === 'ar'
                  ? 'للمطورين والمستقلين لاستضافة مواقع متعددة للعملاء.'
                  : 'For developers & freelancers hosting multiple client applications.'}
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl sm:text-4xl font-black text-[#0B1220]">$5</span>
                <span className="text-xs font-mono text-[#64748B]">
                  {language === 'ar' ? '/ شهرياً' : '/ month'}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-[#475569] font-normal">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar' ? 'مشاريع غير محدودة عبر سحب ملفات .zip' : 'Unlimited .zip drag-and-drop projects'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar' ? 'نطاقات فرعية فورية مع تشفير TLS' : 'Instant Wildcard Subdomains'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar' ? 'تخزين كائني عالي السرعة بدون رسوم خروج' : 'Enterprise object storage absorption'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar' ? 'تشفير HTTPS تلقائي فوري' : 'Automated HTTPS encryption'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                href="/deploy"
                className="block w-full py-3 text-center text-xs font-bold text-[#0B1220] bg-[#F8FAFC] hover:bg-white rounded-xl border border-[#0B1220]/10 transition-colors cursor-pointer shadow-sm"
              >
                {language === 'ar' ? 'اختيار باقة المطور' : 'Choose Solo Creator'}
              </Link>
            </div>
          </div>

          {/* TIER 2: STARTUP PRO ($19 - HIGHLIGHTED) */}
          <div className="rounded-3xl bg-white border-2 border-[#38BDF8] p-5 sm:p-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(56,189,248,0.14)] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 sm:px-3 py-0.5 rounded-full bg-[#38BDF8] text-[#0B1220] font-black text-[8px] sm:text-[9px] uppercase font-mono tracking-wider shrink-0 whitespace-nowrap shadow-sm">
              {language === 'ar' ? 'الخيار الموصى به للشركات' : 'RECOMMENDED FOR STARTUPS'}
            </div>

            <div>
              <div className="text-xs font-mono text-[#38BDF8] font-bold uppercase mb-2">
                {language === 'ar' ? 'محرك النمو' : 'STARTUP PRO'}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0B1220]">
                {language === 'ar' ? 'الشركات الناشئة' : 'Growth Engine'}
              </h3>
              <p className="text-xs text-[#475569] mt-1 mb-5">
                {language === 'ar'
                  ? 'استيعاب زيادات الزيارات الكبيرة مع ضمان استقرار التكاليف.'
                  : 'Absorb viral traffic surges with guaranteed bandwidth stability.'}
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl sm:text-4xl font-black text-[#0B1220]">$19</span>
                <span className="text-xs font-mono text-[#64748B]">
                  {language === 'ar' ? '/ شهرياً' : '/ month'}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-[#475569] font-normal">
                <li className="flex items-start gap-2.5 font-semibold text-[#0B1220]">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar' ? 'ملايين الزيارات بدون أي رسوم بيانات إضافية' : 'Millions of hits with $0 extra egress'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar' ? 'استنساخ عبر مراكز الحافة (مصر، أمريكا، اليابان)' : 'Multi-region clones (Egypt, US, Japan)'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar' ? 'نطاقات مخصصة مع تشفير 0-RTT فوري' : 'Custom domains with instant 0-RTT TLS'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar' ? 'ضمان نشر في أقل من 5 ثوانٍ' : 'Sub-5-second deployment SLA'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                href="/deploy"
                className="block w-full py-3.5 text-center text-xs font-black text-[#F8FAFC] bg-[#0B1220] hover:bg-[#0B1220]/90 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                {language === 'ar' ? 'إطلاق باقة الشركات' : 'Launch Startup Plan'}
              </Link>
            </div>
          </div>

          {/* TIER 3: SCALE ENTERPRISE ($79) */}
          <div className="rounded-3xl bg-white border border-[#0B1220]/8 p-5 sm:p-7 flex flex-col justify-between shadow-[0_10px_30px_rgba(11,18,32,0.04)]">
            <div>
              <div className="text-xs font-mono text-[#A78BFA] font-bold uppercase mb-2">
                {language === 'ar' ? 'المؤسسات الكبرى' : 'SCALE ENTERPRISE'}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0B1220]">
                {language === 'ar' ? 'التوسع العالمي' : 'Global Scale'}
              </h3>
              <p className="text-xs text-[#475569] mt-1 mb-5">
                {language === 'ar'
                  ? 'للأنظمة الحيوية ذات متطلبات التشغيل الدقيق والدعم المباشر.'
                  : 'For mission-critical production systems needing direct SLA.'}
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl sm:text-4xl font-black text-[#0B1220]">$79</span>
                <span className="text-xs font-mono text-[#64748B]">
                  {language === 'ar' ? '/ شهرياً' : '/ month'}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-[#475569] font-normal">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar' ? 'استيعاب أعلى معدلات الزيارات المتزامنة عالمياً' : 'High-concurrency global absorption'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar' ? 'توجيه عبر عنقود تخزين كائني متعدد المناطق' : 'Multi-cluster edge storage routing'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar' ? 'تواصل مباشر مع المؤسسين وضمان استجابة < 15 دقيقة' : 'Direct founder access & < 15 min SLA'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar' ? 'مساعدة في الترحيل بدون أي توقف' : 'Assisted zero-downtime migration'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                href="/contact"
                className="block w-full py-3 text-center text-xs font-bold text-[#0B1220] bg-[#F8FAFC] hover:bg-white rounded-xl border border-[#0B1220]/10 transition-colors cursor-pointer shadow-sm"
              >
                {language === 'ar' ? 'تواصل مع القيادة' : 'Contact Leadership'}
              </Link>
            </div>
          </div>

        </div>

        {/* The Comparative Ledger */}
        <ComparisonSection />

      </main>

      <Footer />
    </div>
  );
}
