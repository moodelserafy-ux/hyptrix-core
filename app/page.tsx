'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HypnoticBackground from '@/components/HypnoticBackground';
import Hero from '@/components/Hero';
import PlatformCapabilities from '@/components/PlatformCapabilities';
import ComparisonSection from '@/components/ComparisonSection';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  UploadCloud, 
  Layers, 
  Coins, 
  ShieldCheck, 
  Mail, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function HomePage() {
  const { language, isRtl } = useLanguage();

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0B1220] overflow-x-hidden selection:bg-[#38BDF8] selection:text-[#0B1220]">
      {/* Hypnotic animated background */}
      <HypnoticBackground />

      {/* Commanding Fixed Navigation */}
      <Navbar />

      <main className="relative z-10">
        {/* Apple-Grade High-Tension Hero with Global Edge Distribution monitor & Fast-Redirect Upload Launcher */}
        <Hero />

        {/* Multi-Page Architecture Gateway Section (Alternate Section #FFFFFF) */}
        <section className="py-12 sm:py-16 md:py-24 border-y border-[#0B1220]/6 bg-white relative">
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
            
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 min-w-0">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-3 uppercase tracking-wider font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                <span>{language === 'ar' ? 'معمارية متعددة الصفحات' : 'MODULAR PLATFORM ECOSYSTEM'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0B1220] tracking-tight break-words">
                {language === 'ar' ? 'تصفح بيئات المنصة المستقلة' : 'Dedicated Environments for Every Workflow'}
              </h2>
              <p className="mt-3 text-xs sm:text-base text-[#475569] font-normal break-words leading-relaxed">
                {language === 'ar'
                  ? 'بنية معمارية متكاملة تتوزع عبر صفحات مخصصة ومستقلة لكل إجراء وهدف.'
                  : 'Structured as distinct, focused interfaces with dedicated spaces for deployment, specs, and economics.'}
              </p>
            </div>

            {/* 4 Distinct Environmental Portals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 min-w-0">
              
              {/* Portal 1: Deployment Dashboard */}
              <Link 
                href="/deploy" 
                className="group rounded-3xl bg-[#F8FAFC] hover:bg-white border border-[#38BDF8]/40 hover:border-[#38BDF8] p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-[0_15px_40px_rgba(56,189,248,0.14)] active:scale-[0.98] min-w-0"
              >
                <div className="min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] mb-4 sm:mb-5 group-hover:scale-110 transition-transform shrink-0">
                    <UploadCloud className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-[#38BDF8] font-bold uppercase mb-1">
                    DEDICATED CONSOLE
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#0B1220] group-hover:text-[#38BDF8] transition-colors break-words">
                    {language === 'ar' ? 'لوحة النشر الفوري' : 'Deploy Dashboard'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed font-normal break-words">
                    {language === 'ar'
                      ? 'غرفة عمليات مستقلة لرفع حزم .zip، التشفير المباشر، وتوليد الروابط المشفرة.'
                      : 'Dedicated space for raw .zip uploads, SHA-256 encryption, and instant wildcard URLs.'}
                  </p>
                </div>

                <div className="pt-5 sm:pt-6 flex items-center gap-1.5 text-xs font-mono font-bold text-[#38BDF8] shrink-0">
                  <span>{language === 'ar' ? 'فتح لوحة النشر' : 'Enter Deploy Console'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
                </div>
              </Link>

              {/* Portal 2: Architecture & Capabilities */}
              <Link 
                href="/features" 
                className="group rounded-3xl bg-[#F8FAFC] hover:bg-white border border-[#0B1220]/8 hover:border-[#38BDF8]/40 p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-lg active:scale-[0.98] min-w-0"
              >
                <div className="min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0B1220] flex items-center justify-center text-[#F8FAFC] mb-4 sm:mb-5 group-hover:scale-110 transition-transform shrink-0 shadow-sm">
                    <Layers className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-[#64748B] font-bold uppercase mb-1">
                    DEEP CAPABILITIES
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#0B1220] group-hover:text-[#38BDF8] transition-colors break-words">
                    {language === 'ar' ? 'المعمارية السحابية' : 'Platform Architecture'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed font-normal break-words">
                    {language === 'ar'
                      ? 'الركائز المعمارية الأربعة، ومراكز الحافة العالمية في مصر وأمريكا واليابان.'
                      : 'Explore Anycast routing, global replication nodes, and TLS 1.3 automated issuance.'}
                  </p>
                </div>

                <div className="pt-5 sm:pt-6 flex items-center gap-1.5 text-xs font-mono font-bold text-[#475569] group-hover:text-[#38BDF8] transition-colors shrink-0">
                  <span>{language === 'ar' ? 'استكشف المعمارية' : 'View Capabilities'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
                </div>
              </Link>

              {/* Portal 3: Pricing & Economics */}
              <Link 
                href="/pricing" 
                className="group rounded-3xl bg-[#F8FAFC] hover:bg-white border border-[#0B1220]/8 hover:border-[#38BDF8]/40 p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-lg active:scale-[0.98] min-w-0"
              >
                <div className="min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0B1220] flex items-center justify-center text-[#F8FAFC] mb-4 sm:mb-5 group-hover:scale-110 transition-transform shrink-0 shadow-sm">
                    <Coins className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-[#64748B] font-bold uppercase mb-1">
                    PREDICTABLE ECONOMICS
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#0B1220] group-hover:text-[#38BDF8] transition-colors break-words">
                    {language === 'ar' ? 'الباقات والأسعار' : 'Pricing & Free Trial'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed font-normal break-words">
                    {language === 'ar'
                      ? 'تجربة مجانية محددة بمشروع واحد، مع باقات إنتاجية واضحة بدون رسوم خروج.'
                      : 'Single-project free trial, plus transparent production tiers with zero bandwidth markups.'}
                  </p>
                </div>

                <div className="pt-5 sm:pt-6 flex items-center gap-1.5 text-xs font-mono font-bold text-[#475569] group-hover:text-[#38BDF8] transition-colors shrink-0">
                  <span>{language === 'ar' ? 'عرض خطط الأسعار' : 'Explore All Tiers'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
                </div>
              </Link>

              {/* Portal 4: Executive Inquiries */}
              <Link 
                href="/contact" 
                className="group rounded-3xl bg-[#F8FAFC] hover:bg-white border border-[#0B1220]/8 hover:border-[#A78BFA]/40 p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-lg active:scale-[0.98] min-w-0"
              >
                <div className="min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#A78BFA]/15 border border-[#A78BFA]/30 flex items-center justify-center text-[#A78BFA] mb-4 sm:mb-5 group-hover:scale-110 transition-transform shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-[#A78BFA] font-bold uppercase mb-1">
                    DIRECT DESK
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#0B1220] group-hover:text-[#A78BFA] transition-colors break-words">
                    {language === 'ar' ? 'التواصل المباشر' : 'Direct Channels'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed font-normal break-words">
                    {language === 'ar'
                      ? 'قنوات تواصل مباشرة مع المؤسسين وفرق هندسة السحابة العالمية.'
                      : 'Direct line to the founders and edge infrastructure engineering team.'}
                  </p>
                </div>

                <div className="pt-5 sm:pt-6 flex items-center gap-1.5 text-xs font-mono font-bold text-[#A78BFA] shrink-0">
                  <span>{language === 'ar' ? 'تواصل معنا' : 'Contact Leadership'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
                </div>
              </Link>

            </div>

          </div>
        </section>

        {/* Core Architectural Pillars */}
        <PlatformCapabilities />

        {/* Platform Economics & Comparison Ledger */}
        <ComparisonSection />
      </main>

      {/* Enterprise Footer */}
      <Footer />
    </div>
  );
}
