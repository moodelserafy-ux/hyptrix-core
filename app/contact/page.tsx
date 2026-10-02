'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HypnoticBackground from '@/components/HypnoticBackground';
import { Copy, Check, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function ContactPage() {
  const { language, isRtl } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    tier: 'Enterprise (<15m SLA)',
    message: '',
  });

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0B1220] flex flex-col selection:bg-[#38BDF8] selection:text-[#0B1220]">
      <HypnoticBackground />
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-28 md:pt-36 pb-14 sm:pb-24 relative z-10 max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 min-w-0">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-3 uppercase tracking-wider font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <span>{language === 'ar' ? 'قنوات الاتصال المباشرة' : 'EXECUTIVE & ARCHITECTURE CHANNELS'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0B1220] tracking-tight break-words">
            {language === 'ar' ? 'تواصل مع فريق هيبتريكس' : 'Direct Engineering Line'}
          </h1>
          <p className="mt-3 text-[#475569] text-xs sm:text-base md:text-lg font-normal break-words leading-relaxed">
            {language === 'ar' 
              ? 'تحدث مباشرة مع مؤسسي المنصة وفريق هندسة الخوادم العالمية. لا وسطاء ولا تذاكر دعم معقدة.'
              : 'Direct access to the founding team and 24/7 edge systems architects. Zero outsourced queues.'}
          </p>
        </div>

        {/* Two-Column Layout (Fluid Mobile Stacking) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start min-w-0">
          
          {/* Left: Direct Emails */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            
            {/* Founder Direct Box */}
            <div className="rounded-3xl bg-white border border-[#38BDF8]/40 p-5 sm:p-7 relative overflow-hidden shadow-sm">
              <div className="text-xs font-mono text-[#38BDF8] mb-2 flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                {language === 'ar' ? 'مباشرة مع المؤسس' : 'EXECUTIVE DESK'}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-2">
                {language === 'ar' ? 'البريد المباشر للمؤسس' : 'Founder Direct Line'}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-4 sm:mb-5 font-normal">
                {language === 'ar' 
                  ? 'للشراكات الاستراتيجية وخطط ترحيل أعباء البيانات الكبرى وتوفير آلاف الدولارات شهرياً.'
                  : 'For enterprise partnerships, unmetered bandwidth migration planning, and private clusters.'}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 sm:p-3.5 rounded-xl bg-[#F8FAFC] border border-[#0B1220]/8 font-mono text-xs">
                <span className="text-[#38BDF8] font-bold select-all truncate">founder@hyptrix.com</span>
                <button
                  onClick={() => copyEmail('founder@hyptrix.com')}
                  className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#0B1220] transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-bold border border-[#0B1220]/10 shrink-0 shadow-sm"
                >
                  {copiedEmail === 'founder@hyptrix.com' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span className="text-[#38BDF8] text-xs">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Support Direct Box */}
            <div className="rounded-3xl bg-white border border-[#0B1220]/8 p-5 sm:p-7 relative overflow-hidden shadow-sm">
              <div className="text-xs font-mono text-[#A78BFA] mb-2 flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A78BFA]" />
                {language === 'ar' ? 'فريق العمليات السحابية 24/7' : '24/7/365 EDGE OPERATIONS'}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-2">
                {language === 'ar' ? 'الدعم الفني المباشر' : 'Systems & Operations'}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-4 sm:mb-5 font-normal">
                {language === 'ar' 
                  ? 'مهندسو خوادم على مدار الساعة لمراقبة بروتوكول Anycast والشهادات الرقمية والأداء.'
                  : 'Round-the-clock systems engineers monitoring Anycast routing, storage replication, and TLS minting.'}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 sm:p-3.5 rounded-xl bg-[#F8FAFC] border border-[#0B1220]/8 font-mono text-xs">
                <span className="text-[#A78BFA] font-bold select-all truncate">support@hyptrix.com</span>
                <button
                  onClick={() => copyEmail('support@hyptrix.com')}
                  className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#0B1220] transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-bold border border-[#0B1220]/10 shrink-0 shadow-sm"
                >
                  {copiedEmail === 'support@hyptrix.com' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#A78BFA]" />
                      <span className="text-[#A78BFA] text-xs">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* SLA Committments */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#0B1220]/8 font-mono text-xs space-y-2 shadow-sm">
              <div className="text-[#64748B] uppercase font-bold text-[10px]">Guaranteed Latencies</div>
              <div className="flex justify-between text-[#0B1220]">
                <span className="text-[#475569]">Enterprise SLA:</span>
                <span className="text-[#38BDF8] font-bold">&lt; 15 Minutes</span>
              </div>
              <div className="flex justify-between text-[#0B1220]">
                <span className="text-[#475569]">Standard Inquiries:</span>
                <span className="text-[#0B1220] font-bold">&lt; 2 Hours</span>
              </div>
            </div>

          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-[#0B1220]/8 p-5 sm:p-8 md:p-10 relative shadow-[0_10px_30px_rgba(11,18,32,0.04)]">
              
              {submitted ? (
                <div className="text-center py-10 sm:py-12 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B1220]">
                    {language === 'ar' ? 'تم إرسال الرسالة بنجاح' : 'Transmission Dispatched'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] max-w-sm mx-auto">
                    {language === 'ar'
                      ? 'تم تحويل رسالتك إلى البريد المباشر للفريق، وسيصلك الرد في أقل من 15 دقيقة.'
                      : 'Your dispatch has been delivered. An edge infrastructure engineer will respond within the SLA threshold.'}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 rounded-xl bg-[#F8FAFC] text-[#38BDF8] border border-[#38BDF8]/30 text-xs font-mono font-bold hover:bg-[#38BDF8]/10 transition-colors"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-2 font-mono">
                        {language === 'ar' ? 'الاسم الكامل' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Connor"
                        className="w-full bg-[#F8FAFC] border border-[#0B1220]/12 rounded-xl px-4 py-3 text-base sm:text-sm font-sans text-[#0B1220] placeholder:text-[#64748B]/50 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-2 font-mono">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Direct Email *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@skynet.com"
                        className="w-full bg-[#F8FAFC] border border-[#0B1220]/12 rounded-xl px-4 py-3 text-base sm:text-sm font-sans text-[#0B1220] placeholder:text-[#64748B]/50 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-2 font-mono">
                        {language === 'ar' ? 'الشركة أو المنظمة' : 'Organization'}
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Cyberdyne Systems"
                        className="w-full bg-[#F8FAFC] border border-[#0B1220]/12 rounded-xl px-4 py-3 text-base sm:text-sm font-sans text-[#0B1220] placeholder:text-[#64748B]/50 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-2 font-mono">
                        {language === 'ar' ? 'مستوى الخدمة المطلوب' : 'Inquiry Category'}
                      </label>
                      <select
                        value={formData.tier}
                        onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-[#0B1220]/12 rounded-xl px-4 py-3 text-base sm:text-sm font-sans text-[#0B1220] focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all"
                      >
                        <option value="Enterprise (<15m SLA)">Enterprise Architecture Migration</option>
                        <option value="High-Bandwidth Cluster">Zero-Egress Dedicated Storage</option>
                        <option value="Custom Domain SLA">Custom Anycast Domain Routing</option>
                        <option value="General Query">General Platform Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-2 font-mono">
                      {language === 'ar' ? 'تفاصيل الرسالة أو الاستفسار' : 'Project Architecture Details *'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Current monthly bandwidth, migration timeline, custom PoP region requirements..."
                      className="w-full bg-[#F8FAFC] border border-[#0B1220]/12 rounded-xl px-4 py-3 text-base sm:text-sm font-sans text-[#0B1220] placeholder:text-[#64748B]/50 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-black text-[#F8FAFC] bg-[#0B1220] hover:bg-[#0B1220]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
                  >
                    <Send className="w-4 h-4 fill-[#38BDF8] text-[#38BDF8]" />
                    <span>{language === 'ar' ? 'إرسال الرسالة إلى مهندسي الحافة' : 'Transmit Message to Edge Architects'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
