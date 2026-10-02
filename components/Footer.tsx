'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';

export default function Footer() {
  const { t, isRtl, language } = useLanguage();

  return (
    <footer className="border-t border-[#0B1220]/8 bg-[#F8FAFC] text-[#475569] text-xs relative z-10 w-full min-w-0">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-[#0B1220]/8 min-w-0">
          
          {/* Brand Column with commanding scaled logo */}
          <div className="sm:col-span-2 space-y-4 min-w-0">
            <Link href="/" className="flex items-center gap-3 text-[#0B1220] group min-w-0">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 p-1 rounded-2xl bg-white border border-[#0B1220]/10 flex items-center justify-center shadow-sm shrink-0">
                <Image
                  src="/logo.png"
                  alt="Hyptrix Logo"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0B1220] leading-none truncate">
                  HYPTRIX
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-[0.2em] text-[#38BDF8] mt-1 font-mono">
                  GLOBAL EDGE CLOUD
                </span>
              </div>
            </Link>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed max-w-sm font-normal break-words">
              {t.footerDesc}
            </p>
            <div className="pt-1 text-xs text-[#475569] space-y-1 font-mono">
              <div className="truncate">Leadership: <a href="mailto:founder@hyptrix.com" className="text-[#0B1220] hover:text-[#38BDF8] hover:underline font-bold">founder@hyptrix.com</a></div>
              <div className="truncate">Direct Support: <a href="mailto:support@hyptrix.com" className="text-[#0B1220] hover:text-[#A78BFA] hover:underline font-bold">support@hyptrix.com</a></div>
            </div>
          </div>

          {/* Platform Column (Clean routes only!) */}
          <div className="space-y-3 font-sans">
            <div className="text-[#0B1220] font-bold uppercase tracking-wider text-xs">Hyptrix Engine</div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/deploy" className="text-[#0B1220] hover:text-[#38BDF8] transition-colors font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0" />
                  <span>{t.navDeploy}</span>
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[#0B1220] transition-colors">
                  {t.navFeatures}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#0B1220] transition-colors">
                  {t.navPricing}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0B1220] transition-colors">
                  {t.navAbout}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0B1220] transition-colors">
                  {t.navContact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Legal Column (Clean routes only!) */}
          <div className="space-y-3 font-sans">
            <div className="text-[#0B1220] font-bold uppercase tracking-wider text-xs">Trust &amp; Legal</div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-[#0B1220] transition-colors">
                  {t.footerPrivacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#0B1220] transition-colors">
                  {t.footerTerms}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#0B1220] transition-colors">
                  Predictable Billing Guarantee
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#0B1220] transition-colors">
                  Zero-Retention Data Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar with clean links */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#64748B] font-sans text-center sm:text-start">
          <div className="text-xs">
            © 2026 Hyptrix Inc. {t.footerRights}
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6 text-[#64748B] text-xs font-medium">
            <Link href="/privacy" className="hover:text-[#0B1220] transition-colors">
              {t.footerPrivacy}
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-[#0B1220] transition-colors">
              {t.footerTerms}
            </Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-[#0B1220] transition-colors">
              {t.footerContact}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
