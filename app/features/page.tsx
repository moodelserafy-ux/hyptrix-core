'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HypnoticBackground from '@/components/HypnoticBackground';
import PlatformCapabilities from '@/components/PlatformCapabilities';
import { useLanguage } from '@/lib/i18n';
import { Sparkles } from 'lucide-react';

export default function FeaturesPage() {
  const { language } = useLanguage();

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0B1220] flex flex-col selection:bg-[#38BDF8] selection:text-[#0B1220]">
      <HypnoticBackground />
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-28 md:pt-36 pb-14 sm:pb-24 relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 min-w-0">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-3 uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <span>{language === 'ar' ? 'الركائز الهندسية الأساسية' : 'CORE CAPABILITIES'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0B1220] tracking-tight break-words">
            {language === 'ar' ? 'أربعة محاور معمارية مصممة لأعلى أداء' : 'Engineered for Scale, Speed & Transparency'}
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-[#475569] max-w-2xl mx-auto font-normal break-words leading-relaxed">
            {language === 'ar' 
              ? 'بنية تحتية هندسية بلا أي تعقيد. سرعة استثنائية ونشر مباشر في أقل من 5 ثوانٍ مع استقرار تام للتكاليف.'
              : 'Zero bloated configurations. Experience fast, unhindered web application deployment and predictable bandwidth infrastructure.'}
          </p>
        </div>

        <PlatformCapabilities />
      </main>

      <Footer />
    </div>
  );
}
