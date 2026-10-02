import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HypnoticBackground from '@/components/HypnoticBackground';
import { ShieldCheck, Lock, EyeOff, Server, FileText } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0B1220] flex flex-col selection:bg-[#38BDF8] selection:text-[#0B1220]">
      <HypnoticBackground />
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-28 md:pt-36 pb-14 sm:pb-24 relative z-10 max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        
        <div className="mb-8 sm:mb-12 border-b border-[#0B1220]/8 pb-6 sm:pb-8 min-w-0">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-3 uppercase tracking-wider font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>SOC-2 Type II · GDPR · ISO 27001</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0B1220] tracking-tight break-words">
            Privacy &amp; Data Security Policy
          </h1>
          <p className="mt-2 text-xs font-mono text-[#64748B]">
            Last Updated: October 2026 · Hyptrix Infrastructure Inc.
          </p>
        </div>

        <div className="space-y-10 text-[#475569] text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1220] font-sans flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-[#38BDF8]" />
              1. Zero-Retention Edge Philosophy
            </h2>
            <p>
              Hyptrix is engineered so that application payloads, user sessions, and private network telemetry are never inspected, stored, or sold. Unlike conventional web analytics platforms, our edge routing nodes execute stateless isolates and drop volatile request frames from memory immediately upon TCP frame acknowledgement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1220] font-sans flex items-center gap-2.5">
              <Server className="w-5 h-5 text-[#38BDF8]" />
              2. Data Collected &amp; Purpose
            </h2>
            <p>
              We collect strictly the minimum metadata necessary to maintain operational routing integrity and prevent distributed denial-of-service (DDoS) attacks:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#475569]">
              <li><strong className="text-[#0B1220]">Account Credentials:</strong> Developer email addresses and authentication tokens for console access.</li>
              <li><strong className="text-[#0B1220]">Deployment Artifacts:</strong> Cryptographically hashed code archives stored encrypted at rest with AES-256-GCM.</li>
              <li><strong className="text-[#0B1220]">Edge Access Metrics:</strong> Aggregated throughput, HTTP status codes, and latency distributions. IP addresses are truncated to /24 subnets in memory and never persisted to disk.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1220] font-sans flex items-center gap-2.5">
              <EyeOff className="w-5 h-5 text-[#38BDF8]" />
              3. Cryptographic Asset Guarantees
            </h2>
            <p>
              All code artifacts uploaded through the Hyptrix Core Engine or CLI are fingerprinted via BLAKE3-256 cryptographic hashes. Your environment variables and proprietary code logic are sealed inside Hardware Security Modules (HSM) and distributed only to verified edge isolates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1220] font-sans flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-[#A78BFA]" />
              4. Direct Inquiries &amp; Compliance Officer
            </h2>
            <p>
              For data deletion requests, GDPR compliance verification, or custom enterprise Data Processing Agreements (DPA), contact our security team directly:
            </p>
            <div className="p-4 rounded-xl bg-white border border-[#0B1220]/8 font-mono text-xs space-y-1 shadow-sm">
              <div>Privacy Officer: <a href="mailto:founder@hyptrix.com" className="text-[#0B1220] hover:text-[#38BDF8] hover:underline font-bold">founder@hyptrix.com</a></div>
              <div>General Compliance: <a href="mailto:support@hyptrix.com" className="text-[#0B1220] hover:text-[#A78BFA] hover:underline font-bold">support@hyptrix.com</a></div>
            </div>
          </section>

        </div>

      </main>

      <Footer />
    </div>
  );
}
