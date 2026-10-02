'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Globe, 
  ShieldCheck, 
  TrendingDown, 
  Code, 
  Rocket, 
  Palette, 
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function PlatformCapabilities() {
  const { t, isRtl, language } = useLanguage();
  const [trafficTB, setTrafficTB] = useState(20);

  const traditionalCloudEgress = trafficTB * 40;

  return (
    <section id="features" className="py-16 sm:py-24 md:py-32 relative bg-[#F1F5F9] border-b border-[#0B1220]/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-3 uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{t.featuresTag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B1220] tracking-tight">
            {t.featuresTitle}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] font-normal">
            {t.featuresSubtitle}
          </p>
        </motion.div>

        {/* The 4 Core Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-24">
          
          {/* PILLAR 1: ZERO-CONFIG SIMPLICITY */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white border border-[#0B1220]/8 p-5 sm:p-8 md:p-10 flex flex-col justify-between hover:border-[#38BDF8]/40 transition-all duration-300 shadow-[0_10px_30px_rgba(11,18,32,0.04)] relative overflow-hidden group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#38BDF8]/15 border border-[#38BDF8]/25 flex items-center justify-center text-[#38BDF8] shrink-0">
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 fill-[#38BDF8]" />
                </div>
                <span className="text-[11px] sm:text-xs font-mono font-bold text-[#0B1220] bg-[#F8FAFC] px-3 py-1 rounded-full border border-[#0B1220]/10 shrink-0">
                  {t.feat1Badge}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B1220] tracking-tight">
                {t.feat1Title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
                {t.feat1Desc}
              </p>
            </div>

            <div className="mt-6 sm:mt-8 p-3.5 sm:p-4 rounded-2xl bg-[#F8FAFC] border border-[#0B1220]/8 font-mono text-xs text-[#475569] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-2.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0" />
                <span className="text-[#0B1220] font-bold">1. DRAG .ZIP</span>
              </div>
              <span className="text-[#64748B] hidden sm:inline">→</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] shrink-0" />
                <span className="text-[#0B1220] font-bold">2. AUTO-ENCRYPT</span>
              </div>
              <span className="text-[#64748B] hidden sm:inline">→</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0" />
                <span className="text-[#38BDF8] font-bold">3. LIVE URL (&lt;5s)</span>
              </div>
            </div>
          </motion.div>

          {/* PILLAR 2: GLOBAL EDGE DISTRIBUTION */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl bg-white border border-[#0B1220]/8 p-5 sm:p-8 md:p-10 flex flex-col justify-between hover:border-[#38BDF8]/40 transition-all duration-300 shadow-[0_10px_30px_rgba(11,18,32,0.04)] relative overflow-hidden group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#38BDF8]/15 border border-[#38BDF8]/25 flex items-center justify-center text-[#38BDF8] shrink-0">
                  <Globe className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="text-[11px] sm:text-xs font-mono font-bold text-[#0B1220] bg-[#F8FAFC] px-3 py-1 rounded-full border border-[#0B1220]/10 shrink-0">
                  {t.feat2Badge}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B1220] tracking-tight">
                {t.feat2Title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
                {t.feat2Desc}
              </p>
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs text-center">
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#0B1220]/8 flex sm:flex-col justify-between items-center sm:justify-center">
                <div className="text-[10px] text-[#64748B] font-bold">CAIRO, EGYPT</div>
                <div className="text-[#0B1220] font-black sm:mt-1 tabular-nums">4.8ms TTFB</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#0B1220]/8 flex sm:flex-col justify-between items-center sm:justify-center">
                <div className="text-[10px] text-[#64748B] font-bold">ASHBURN, US</div>
                <div className="text-[#0B1220] font-black sm:mt-1 tabular-nums">3.2ms TTFB</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#0B1220]/8 flex sm:flex-col justify-between items-center sm:justify-center">
                <div className="text-[10px] text-[#64748B] font-bold">TOKYO, JAPAN</div>
                <div className="text-[#0B1220] font-black sm:mt-1 tabular-nums">8.8ms TTFB</div>
              </div>
            </div>
          </motion.div>

          {/* PILLAR 3: INSTANT WILDCARD SUBDOMAINS */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl bg-white border border-[#0B1220]/8 p-5 sm:p-8 md:p-10 flex flex-col justify-between hover:border-[#38BDF8]/40 transition-all duration-300 shadow-[0_10px_30px_rgba(11,18,32,0.04)] relative overflow-hidden group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#A78BFA]/15 border border-[#A78BFA]/25 flex items-center justify-center text-[#A78BFA] shrink-0">
                  <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="text-[11px] sm:text-xs font-mono font-bold text-[#0B1220] bg-[#F8FAFC] px-3 py-1 rounded-full border border-[#0B1220]/10 shrink-0">
                  {t.feat3Badge}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B1220] tracking-tight">
                {t.feat3Title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
                {t.feat3Desc}
              </p>
            </div>

            <div className="mt-6 sm:mt-8 p-3.5 sm:p-4 rounded-2xl bg-[#F8FAFC] border border-[#0B1220]/8 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-w-0">
              <span className="text-[#0B1220] font-bold truncate min-w-0">https://project.hyptrix.com</span>
              <span className="text-[#38BDF8] font-bold text-[11px] shrink-0">INSTANT TLS 1.3</span>
            </div>
          </motion.div>

          {/* PILLAR 4: ZERO BANDWIDTH SURCHARGES */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl bg-white border border-[#0B1220]/8 p-5 sm:p-8 md:p-10 flex flex-col justify-between hover:border-[#38BDF8]/40 transition-all duration-300 shadow-[0_10px_30px_rgba(11,18,32,0.04)] relative overflow-hidden group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#38BDF8]/15 border border-[#38BDF8]/25 flex items-center justify-center text-[#38BDF8] shrink-0">
                  <TrendingDown className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="text-[11px] sm:text-xs font-mono font-bold text-[#0B1220] bg-[#F8FAFC] px-3 py-1 rounded-full border border-[#0B1220]/10 shrink-0">
                  {t.feat4Badge}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B1220] tracking-tight">
                {t.feat4Title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
                {t.feat4Desc}
              </p>
            </div>

            {/* Transparent Bandwidth Calculator */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#0B1220]/8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#0B1220] mb-2 gap-1 font-bold">
                <span className="text-[#475569]">PROJECTED MONTHLY TRAFFIC:</span>
                <span className="text-[#0B1220] font-black tabular-nums">{trafficTB} TB / Month</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={trafficTB}
                onChange={(e) => setTrafficTB(Number(e.target.value))}
                className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mt-4 text-center font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#0B1220]/8 flex sm:flex-col justify-between items-center sm:justify-center">
                  <div className="text-[10px] text-[#64748B] uppercase font-bold">Traditional Cloud Bill</div>
                  <div className="text-sm sm:text-base font-black text-[#475569] sm:mt-1 tabular-nums">${traditionalCloudEgress.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0B1220] text-[#F8FAFC] border border-[#0B1220] flex sm:flex-col justify-between items-center sm:justify-center shadow-sm">
                  <div className="text-[10px] text-[#38BDF8] uppercase font-bold">Hyptrix Architecture</div>
                  <div className="text-sm sm:text-base font-black text-[#F8FAFC] sm:mt-1 tabular-nums">$0 Bandwidth Markup</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* TARGET AUDIENCE: ENGINEERED FOR BUILDERS & TEAMS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white border border-[#0B1220]/8 p-5 sm:p-10 md:p-14 shadow-[0_10px_30px_rgba(11,18,32,0.04)]"
        >
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="text-xs font-mono text-[#A78BFA] mb-2 uppercase font-bold tracking-widest">
              {t.audienceTag}
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-[#0B1220] tracking-tight">
              {t.audienceTitle}
            </h3>
            <p className="text-xs sm:text-base text-[#475569] mt-2 font-normal">
              {t.audienceSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {/* Developers */}
            <div className="p-5 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-[#0B1220]/6 space-y-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/25 flex items-center justify-center text-[#38BDF8]">
                <Code className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-black text-[#0B1220]">{t.aud1Title}</h4>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                {t.aud1Desc}
              </p>
            </div>

            {/* Startups */}
            <div className="p-5 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-[#0B1220]/6 space-y-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#A78BFA]/15 border border-[#A78BFA]/25 flex items-center justify-center text-[#A78BFA]">
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-black text-[#0B1220]">{t.aud2Title}</h4>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                {t.aud2Desc}
              </p>
            </div>

            {/* Designers & Freelancers */}
            <div className="p-5 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-[#0B1220]/6 space-y-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/25 flex items-center justify-center text-[#38BDF8]">
                <Palette className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-black text-[#0B1220]">{t.aud3Title}</h4>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                {t.aud3Desc}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
