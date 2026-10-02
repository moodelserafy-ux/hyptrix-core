'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Check, X, Sparkles, MoveHorizontal } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function ComparisonSection() {
  const { t, isRtl, language } = useLanguage();

  const comparisonRows = [
    {
      featureEn: 'Bandwidth Overages When Viral',
      featureAr: 'تكاليف الباندويث عند انتشار الموقع',
      hyptrix: '$0 Surcharges (Enterprise Storage)',
      other1: '$40.00 / TB (Tier Overcharges)',
      other2: '$90.00 / TB (High-Volume Egress Markups)',
    },
    {
      featureEn: 'Deployment Friction & Complexity',
      featureAr: 'سهولة النشر بدون تعقيد خوادم',
      hyptrix: 'Zero Config (Drag .Zip Package, <5s)',
      other1: 'Complex CLI / Framework configs',
      other2: 'Heavy SAM / CloudFormation manifests',
    },
    {
      featureEn: 'Global Node Replication',
      featureAr: 'التوزيع والاستنساخ العالمي',
      hyptrix: 'Cloned Globally (Egypt, US, Japan)',
      other1: 'Single Region or Paid Add-ons',
      other2: 'Multi-region setup requires DevOps',
    },
    {
      featureEn: 'Instant Wildcard Subdomain & TLS',
      featureAr: 'نطاقات وحماية مشفرة فورية',
      hyptrix: 'Instant (< 1s zero DNS wait)',
      other1: '5 – 30 min DNS verification',
      other2: 'Complex manual Route53 / ACM',
    },
    {
      featureEn: 'Pricing Predictability',
      featureAr: 'وضوح واستقرار الفواتير',
      hyptrix: 'Predictable Flat Economics',
      other1: 'Free Tier Bait → Overage Trap',
      other2: 'Unpredictable utility billing',
    },
  ];

  return (
    <section className="py-16 sm:py-24 md:py-28 relative bg-white border-b border-[#0B1220]/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-3 uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.compTag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B1220] tracking-tight">
            {t.compTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-[#475569] font-normal">
            {t.compSubtitle}
          </p>
        </motion.div>

        {/* Mobile-Native Comparison Cards (Phone Supremacy - Zero Table Cutoff) */}
        <div className="md:hidden space-y-4">
          {comparisonRows.map((row, index) => (
            <div 
              key={index}
              className="rounded-2xl bg-[#F8FAFC] border border-[#0B1220]/8 p-4 space-y-3.5 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-[#0B1220]/8 pb-2.5">
                <span className="text-xs font-bold text-[#0B1220] tracking-tight">
                  {language === 'ar' ? row.featureAr : row.featureEn}
                </span>
                <span className="text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-2 py-0.5 rounded-full font-bold">
                  0{index + 1}
                </span>
              </div>

              {/* Hyptrix Highlight Box */}
              <div className="p-3 rounded-xl bg-white border border-[#38BDF8]/40 space-y-1 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#38BDF8] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                    HYPTRIX EDGE
                  </span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#38BDF8]/15 text-[#38BDF8]">
                    RECOMMENDED
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-0.5">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span className="text-xs font-extrabold text-[#0B1220] leading-snug">
                    {row.hyptrix}
                  </span>
                </div>
              </div>

              {/* Legacy Competitors (Muted Rows) */}
              <div className="space-y-2 pt-0.5 font-mono text-[11px]">
                <div className="flex items-start justify-between gap-2 p-2 rounded-lg bg-white border border-[#0B1220]/6">
                  <span className="text-[#64748B] shrink-0">Traditional:</span>
                  <div className="flex items-center gap-1 text-[#475569] text-end">
                    <X className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                    <span>{row.other1}</span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-2 p-2 rounded-lg bg-white border border-[#0B1220]/6">
                  <span className="text-[#64748B] shrink-0">Legacy Cloud:</span>
                  <div className="flex items-center gap-1 text-[#475569] text-end">
                    <X className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                    <span>{row.other2}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Comparison Ledger (Screens >= md) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="hidden md:block rounded-3xl border border-[#0B1220]/8 bg-white overflow-hidden shadow-[0_15px_40px_rgba(11,18,32,0.04)]"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse min-w-[580px]">
              <thead>
                <tr className="border-b border-[#0B1220]/8 bg-[#F8FAFC]">
                  <th className="py-4 sm:py-5 px-4 sm:px-6 text-xs sm:text-sm font-bold text-[#475569] uppercase tracking-wider text-start">
                    Core Capability
                  </th>
                  <th className="py-4 sm:py-5 px-4 sm:px-6 text-xs sm:text-base font-black text-[#0B1220] bg-white border-x border-[#38BDF8]/30 text-start">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shrink-0" />
                      <span className="text-[#0B1220] font-mono tracking-tight font-black">{t.compHyptrixHeader}</span>
                    </div>
                  </th>
                  <th className="py-4 sm:py-5 px-4 sm:px-6 text-xs sm:text-sm font-bold text-[#64748B] uppercase tracking-wider text-start">
                    Traditional Platforms
                  </th>
                  <th className="py-4 sm:py-5 px-4 sm:px-6 text-xs sm:text-sm font-bold text-[#64748B] uppercase tracking-wider text-start">
                    Legacy Cloud Hosts
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B1220]/6 text-xs sm:text-sm font-sans">
                {comparisonRows.map((row) => (
                  <tr 
                    key={row.featureEn}
                    className="hover:bg-[#F8FAFC]/80 transition-colors"
                  >
                    <td className="py-4 sm:py-5 px-4 sm:px-6 text-[#0B1220] font-bold text-start">
                      {language === 'ar' ? row.featureAr : row.featureEn}
                    </td>
                    <td className="py-4 sm:py-5 px-4 sm:px-6 text-[#0B1220] font-extrabold bg-white/70 border-x border-[#38BDF8]/30 text-start">
                      <div className="flex items-center gap-2 text-[#0B1220]">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#38BDF8] shrink-0" />
                        <span>{row.hyptrix}</span>
                      </div>
                    </td>
                    <td className="py-4 sm:py-5 px-4 sm:px-6 text-[#475569] text-start">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-[#94A3B8] shrink-0" />
                        <span>{row.other1}</span>
                      </div>
                    </td>
                    <td className="py-4 sm:py-5 px-4 sm:px-6 text-[#475569] text-start">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-[#94A3B8] shrink-0" />
                        <span>{row.other2}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Clean Link to dedicated pricing page */}
        <div className="mt-8 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#38BDF8] hover:text-[#0B1220] transition-colors"
          >
            <span>Explore Complete Tier Breakdown &amp; Architecture →</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
