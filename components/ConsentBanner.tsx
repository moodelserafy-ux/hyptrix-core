'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Cookie, ChevronDown, ChevronUp, Check, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface ConsentPreferences {
  essential: boolean;
  performance: boolean;
  timestamp: string;
  choice: 'all' | 'essential' | 'custom';
}

export default function ConsentBanner() {
  const { language, isRtl } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [allowPerformance, setAllowPerformance] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('hyptrix_cookie_consent');
      if (!saved) {
        // Small delay for smooth, magical entrance after initial paint
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, []);

  const saveConsent = (choice: 'all' | 'essential' | 'custom') => {
    const preferences: ConsentPreferences = {
      essential: true,
      performance: choice === 'all' ? true : choice === 'essential' ? false : allowPerformance,
      timestamp: new Date().toISOString(),
      choice,
    };

    try {
      localStorage.setItem('hyptrix_cookie_consent', JSON.stringify(preferences));
    } catch (e) {
      console.error(e);
    }

    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-3 sm:bottom-6 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 max-w-2xl w-full z-50 pointer-events-auto"
        >
          <div className="relative rounded-3xl bg-[#F8FAFC]/95 backdrop-blur-2xl border border-[#0B1220]/10 p-4 sm:p-6 shadow-[0_20px_50px_-10px_rgba(11,18,32,0.18),0_0_1px_1px_rgba(56,189,248,0.15)] overflow-hidden">
            
            {/* Subtle Radiant Ambient Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#38BDF8]/20 to-[#A78BFA]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[#A78BFA]/15 to-[#38BDF8]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              
              {/* Header with Glowing Shield Icon */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#38BDF8]/20 to-[#A78BFA]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0 shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-[#38BDF8]" />
                  </div>
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-[#A78BFA]" />
                      <span>{language === 'ar' ? 'الخصوصية والأمان المتقدم' : 'PRIVACY & DATA COVENANT'}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-[#0B1220] tracking-tight truncate">
                      {language === 'ar' 
                        ? 'إشعار الخصوصية وملفات الارتباط' 
                        : 'Privacy Policy & Essential Cookies'}
                    </h3>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-[#64748B] shrink-0">
                  <Cookie className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span>TLS 1.3</span>
                </div>
              </div>

              {/* Explanatory Reading Copy */}
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                {language === 'ar' ? (
                  <>
                    نستخدم ملفات الارتباط الضرورية لضمان التوجيه السحابي فائق السرعة، واستقرار جلسات النشر، وحماية شبكة الحافة Anycast. يمكنك مراجعة{' '}
                    <Link href="/privacy" className="text-[#38BDF8] font-bold hover:underline">
                      سياسة الخصوصية
                    </Link>{' '}
                    و{' '}
                    <Link href="/terms" className="text-[#38BDF8] font-bold hover:underline">
                      شروط الاستخدام
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    We deploy essential cryptographic cookies to ensure sub-millisecond Anycast edge routing, secure project isolation, and zero-downtime deployments. Review our{' '}
                    <Link href="/privacy" className="text-[#38BDF8] font-bold hover:underline">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link href="/terms" className="text-[#38BDF8] font-bold hover:underline">
                      Terms of Service
                    </Link>
                    .
                  </>
                )}
              </p>

              {/* Collapsible Granular Controls */}
              {isCustomizing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-2 space-y-2.5 border-t border-[#0B1220]/8"
                >
                  <div className="p-3 rounded-2xl bg-white border border-[#0B1220]/8 flex items-center justify-between gap-3 shadow-sm">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#0B1220] flex items-center gap-1.5">
                        <span>{language === 'ar' ? 'ملفات الارتباط الضرورية' : 'Strictly Necessary Cookies'}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#38BDF8]/15 text-[#0B1220] font-black">
                          {language === 'ar' ? 'إلزامي' : 'ALWAYS ACTIVE'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                        {language === 'ar'
                          ? 'مطلوبة لتوجيه الـ DNS والـ SSL ومزامنة الـ LocalStorage'
                          : 'Essential for TLS encryption, Anycast routing, and local dashboard state'}
                      </p>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8] shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-[#0B1220]/8 flex items-center justify-between gap-3 shadow-sm">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#0B1220]">
                        {language === 'ar' ? 'قياسات سرعة وتجاوب الشبكة (TTFB)' : 'Edge Performance Telemetry'}
                      </div>
                      <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                        {language === 'ar'
                          ? 'تساعدنا على فحص أقرب عقدة جغرافية لتقليل زمن الاستجابة'
                          : 'Measures ping and node latency to optimize nearest continental edge POP'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAllowPerformance(!allowPerformance)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        allowPerformance ? 'bg-[#0B1220]' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          allowPerformance
                            ? isRtl ? '-translate-x-5' : 'translate-x-5'
                            : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <button
                  onClick={() => setIsCustomizing(!isCustomizing)}
                  className="px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold text-[#475569] hover:text-[#0B1220] hover:bg-white transition-all flex items-center justify-center gap-1.5 border border-transparent hover:border-[#0B1220]/10 cursor-pointer order-3 sm:order-1"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>{language === 'ar' ? 'تخصيص الخيارات' : 'Preferences'}</span>
                  {isCustomizing ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 order-1 sm:order-2">
                  <button
                    onClick={() => saveConsent('essential')}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#0B1220] bg-white hover:bg-[#F1F5F9] border border-[#0B1220]/12 transition-all cursor-pointer shadow-sm active:scale-95 text-center"
                  >
                    {language === 'ar' ? 'الضروري فقط' : 'Essential Only'}
                  </button>

                  <button
                    onClick={() => saveConsent(isCustomizing ? 'custom' : 'all')}
                    className="px-5 py-2.5 rounded-xl text-xs font-black text-[#F8FAFC] bg-[#0B1220] hover:bg-[#0B1220]/90 transition-all cursor-pointer shadow-[0_4px_16px_rgba(11,18,32,0.18)] active:scale-95 text-center flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>
                      {isCustomizing
                        ? (language === 'ar' ? 'حفظ اختياراتي' : 'Save Choices')
                        : (language === 'ar' ? 'موافق وقبول الكل' : 'Accept All')}
                    </span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
