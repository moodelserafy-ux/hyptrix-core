'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Zap, UploadCloud, Layers, Coins, Sparkles, Mail, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t, isRtl } = useLanguage();

  // Scroll listener with instant reaction (< 10px)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* 
        The Living Navbar:
        Hero State (Absolute Top): Full-width, oversized, completely transparent glass, massive bold logo.
        Morph State (On Scroll): Morphs with buttery liquid smoothness into a sleek, centered Floating Capsule 
        with semi-transparent #F8FAFC frosted glass, ultra-soft shadow, and razor-thin border.
      */}
      <div 
        className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'top-2.5 sm:top-4 inset-x-2.5 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 w-auto sm:w-[90%] max-w-5xl'
            : 'top-0 left-0 right-0 w-full'
        }`}
      >
        <header
          className={`w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled
              ? 'rounded-full bg-[#F8FAFC]/85 backdrop-blur-2xl border border-[#0B1220]/8 shadow-[0_16px_40px_-8px_rgba(11,18,32,0.08),0_0_1px_1px_rgba(11,18,32,0.04)] px-3.5 sm:px-6 h-14 sm:h-16'
              : 'bg-transparent border-b border-transparent px-4 sm:px-8 lg:px-12 h-20 sm:h-28 md:h-32'
          } flex items-center justify-between gap-3`}
        >
          {/* Living Logo (Progressively Scales with Liquid Smoothness) */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 sm:gap-4 group tracking-tight hover:opacity-90 transition-all shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div 
              className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center shrink-0 ${
                isScrolled
                  ? 'w-8 h-8 sm:w-9 sm:h-9'
                  : 'w-12 h-12 sm:w-16 sm:h-16'
              }`}
            >
              <div className="absolute inset-0 bg-[#38BDF8]/20 rounded-2xl blur-md group-hover:bg-[#38BDF8]/35 transition-all duration-300" />
              <div className="relative w-full h-full p-0.5 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Hyptrix Logo"
                  width={64}
                  height={64}
                  priority
                  className="object-contain w-full h-full filter drop-shadow-[0_2px_8px_rgba(56,189,248,0.25)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <span 
                className={`font-black tracking-tight text-[#0B1220] leading-none transition-all duration-500 ${
                  isScrolled
                    ? 'text-lg sm:text-xl'
                    : 'text-2xl sm:text-3xl md:text-4xl'
                }`}
              >
                HYPTRIX
              </span>
              <span 
                className={`uppercase font-bold tracking-[0.24em] text-[#38BDF8] font-mono transition-all duration-500 ${
                  isScrolled 
                    ? 'hidden' 
                    : 'hidden sm:block text-[9px] sm:text-[10px] mt-1'
                }`}
              >
                GLOBAL EDGE CLOUD
              </span>
            </div>
          </Link>

          {/* Clean Navigation Links (The Reading Layer #475569 - Slate) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold text-[#475569]">
            <Link 
              href="/features" 
              className="hover:text-[#0B1220] transition-colors duration-200 whitespace-nowrap"
            >
              {t.navFeatures}
            </Link>
            <Link 
              href="/pricing" 
              className="hover:text-[#0B1220] transition-colors duration-200 whitespace-nowrap"
            >
              {t.navPricing}
            </Link>
            <Link 
              href="/deploy" 
              className="text-[#0B1220] hover:text-[#38BDF8] transition-colors duration-200 whitespace-nowrap flex items-center gap-1.5 font-extrabold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse shrink-0" />
              <span>{t.navDeploy}</span>
            </Link>
            <Link 
              href="/about" 
              className="hover:text-[#0B1220] transition-colors duration-200 whitespace-nowrap"
            >
              {t.navAbout}
            </Link>
            <Link 
              href="/contact" 
              className="hover:text-[#0B1220] transition-colors duration-200 whitespace-nowrap"
            >
              {t.navContact}
            </Link>
          </nav>

          {/* Desktop Controls (High Authority #0B1220 & Interaction Accent #38BDF8) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-white/90 border border-[#0B1220]/10 rounded-full p-0.5 text-xs font-semibold shadow-sm shrink-0">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#0B1220] text-[#F8FAFC] font-extrabold shadow-sm'
                    : 'text-[#64748B] hover:text-[#0B1220]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-3.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  language === 'ar'
                    ? 'bg-[#0B1220] text-[#F8FAFC] font-black shadow-sm'
                    : 'text-[#64748B] hover:text-[#0B1220]'
                }`}
              >
                العربية
              </button>
            </div>

            {/* Dynamic Deploy CTA Button */}
            <Link
              href="/deploy"
              className={`group relative inline-flex items-center gap-2 font-extrabold text-[#F8FAFC] bg-[#0B1220] hover:bg-[#0B1220]/90 transition-all duration-300 shadow-[0_4px_16px_rgba(11,18,32,0.12)] whitespace-nowrap cursor-pointer active:scale-95 shrink-0 ${
                isScrolled 
                  ? 'px-4 py-2 text-xs rounded-full' 
                  : 'px-6 py-3 text-xs sm:text-sm rounded-xl'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-[#38BDF8] text-[#38BDF8] shrink-0" />
              <span>{t.navDeployNow}</span>
            </Link>
          </div>

          {/* Mobile controls (Compact, Perfectly Spaced) */}
          <div className="md:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Mobile Language Toggle */}
            <div className="flex items-center bg-white/90 border border-[#0B1220]/10 rounded-full p-0.5 text-[11px] shrink-0 shadow-sm">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full font-bold transition-all cursor-pointer ${
                  language === 'en' ? 'bg-[#0B1220] text-[#F8FAFC]' : 'text-[#64748B]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-2.5 py-0.5 rounded-full font-black transition-all cursor-pointer ${
                  language === 'ar' ? 'bg-[#0B1220] text-[#F8FAFC]' : 'text-[#64748B]'
                }`}
              >
                عربي
              </button>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-full bg-white/90 border border-[#0B1220]/10 text-[#0B1220] hover:text-[#38BDF8] focus:outline-none cursor-pointer flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-sm"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 shrink-0" /> : <Menu className="w-4 h-4 shrink-0" />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-[#0B1220]/40 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Mobile Drawer (Native App Experience on #F8FAFC Light Canvas) */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-3 top-20 z-50 md:hidden rounded-3xl border border-[#0B1220]/10 bg-[#F8FAFC]/98 backdrop-blur-3xl px-4 py-5 space-y-4 animate-in fade-in slide-in-from-top-3 duration-300 shadow-2xl max-h-[calc(100dvh-5.5rem)] overflow-y-auto">
          
          {/* Quick Launch Console Tile */}
          <Link 
            href="/deploy" 
            onClick={() => setMobileMenuOpen(false)}
            className="p-3.5 rounded-2xl bg-white border border-[#38BDF8]/40 text-[#0B1220] flex items-center justify-between shadow-md active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/15 flex items-center justify-center text-[#38BDF8] shrink-0">
                <UploadCloud className="w-5 h-5 shrink-0" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
                  FLIGHT-DECK CONSOLE
                </div>
                <div className="text-sm font-black text-[#0B1220] truncate">
                  {t.navDeploy}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] font-mono uppercase bg-[#0B1220] text-[#F8FAFC] px-2 py-0.5 rounded-full font-black">
                LAUNCH
              </span>
              <ChevronRight className={`w-4 h-4 text-[#0B1220] shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
            </div>
          </Link>

          {/* Navigation Links with Icons */}
          <div className="flex flex-col space-y-1 text-sm font-bold text-[#475569]">
            <Link 
              href="/features" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3.5 rounded-xl hover:bg-white flex items-center justify-between transition-colors border border-transparent hover:border-[#0B1220]/5 active:bg-white"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span className="text-[#0B1220]">{t.navFeatures}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 text-[#64748B] shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>

            <Link 
              href="/pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3.5 rounded-xl hover:bg-white flex items-center justify-between transition-colors border border-transparent hover:border-[#0B1220]/5 active:bg-white"
            >
              <div className="flex items-center gap-3">
                <Coins className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span className="text-[#0B1220]">{t.navPricing}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 text-[#64748B] shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>

            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3.5 rounded-xl hover:bg-white flex items-center justify-between transition-colors border border-transparent hover:border-[#0B1220]/5 active:bg-white"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#A78BFA] shrink-0" />
                <span className="text-[#0B1220]">{t.navAbout}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 text-[#64748B] shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>

            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3.5 rounded-xl hover:bg-white flex items-center justify-between transition-colors border border-transparent hover:border-[#0B1220]/5 active:bg-white"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span className="text-[#0B1220]">{t.navContact}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 text-[#64748B] shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2 border-t border-[#0B1220]/10">
            <Link
              href="/deploy"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 text-center text-sm font-black text-[#F8FAFC] bg-[#0B1220] rounded-xl hover:bg-[#0B1220]/90 shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-[#38BDF8] text-[#38BDF8] shrink-0" />
              <span>{t.navDeployNow}</span>
            </Link>
          </div>

        </div>
      )}
    </>
  );
}
