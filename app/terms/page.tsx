import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HypnoticBackground from '@/components/HypnoticBackground';
import { ShieldCheck, FileCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0B1220] flex flex-col selection:bg-[#38BDF8] selection:text-[#0B1220]">
      <HypnoticBackground />
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-28 md:pt-36 pb-14 sm:pb-24 relative z-10 max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        
        <div className="mb-8 sm:mb-12 border-b border-[#0B1220]/8 pb-6 sm:pb-8 min-w-0">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-3 uppercase tracking-wider font-semibold">
            <FileCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Developer Service Agreement</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0B1220] tracking-tight break-words">
            Terms of Service &amp; SLA
          </h1>
          <p className="mt-2 text-xs font-mono text-[#64748B]">
            Effective Date: October 2026 · Hyptrix Inc.
          </p>
        </div>

        <div className="space-y-10 text-[#475569] text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1220] font-sans flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#38BDF8]" />
              1. 99.999% High Availability SLA Guarantee
            </h2>
            <p>
              Hyptrix guarantees a minimum edge availability of 99.999% across our global Anycast points of presence. Because our routing infrastructure operates on autonomous multi-homed BGP mesh rings, failure of an individual data center or upstream transit provider triggers sub-millisecond rerouting without dropped connections.
            </p>
            <div className="p-4 rounded-xl bg-white border border-[#0B1220]/8 shadow-sm font-mono text-xs text-[#0B1220]">
              In the event that monthly uptime falls below 99.999%, enterprise customers are entitled to 100x service credits calculated pro-rata across their billing cycle.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1220] font-sans flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#38BDF8]" />
              2. Zero Egress Fee Covenant
            </h2>
            <p>
              Hyptrix enters into an irrevocable contractual covenant with developers: standard outbound egress bandwidth will forever remain at zero dollars ($0.00) per terabyte. We do not bill unexpected overage invoices for virality, high-bandwidth streaming, or multi-gigabyte static asset delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1220] font-sans flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-[#A78BFA]" />
              3. Acceptable Use &amp; Network Protection
            </h2>
            <p>
              You agree not to deploy applications intended for illicit cryptographic mining, malicious volumetric DDoS attacks, spam dissemination, or unlawful distribution of copyrighted assets. Hyptrix reserves the right to terminate isolates actively engaged in network abuse.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1220] font-sans flex items-center gap-2.5">
              <FileCheck className="w-5 h-5 text-[#A78BFA]" />
              4. Contact &amp; Legal Notices
            </h2>
            <p>
              For legal representation, subpoena service, or formal contract amendments, direct inquiries to:
            </p>
            <div className="p-4 rounded-xl bg-white border border-[#0B1220]/8 shadow-sm font-mono text-xs space-y-1 text-[#475569]">
              <div>Legal Counsel: <a href="mailto:founder@hyptrix.com" className="text-[#38BDF8] hover:underline font-semibold">founder@hyptrix.com</a></div>
              <div>General Support: <a href="mailto:support@hyptrix.com" className="text-[#A78BFA] hover:underline font-semibold">support@hyptrix.com</a></div>
            </div>
          </section>

        </div>

      </main>

      <Footer />
    </div>
  );
}
