'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HypnoticBackground from '@/components/HypnoticBackground';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UploadCloud, 
  CheckCircle2, 
  Globe, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Activity,
  Layers,
  X
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface TerminalLog {
  id: number;
  text: string;
  time: string;
}

interface DeploymentRecord {
  id: string;
  name: string;
  url: string;
  deployedAt: string;
  size: string;
  duration: string;
  status: 'active' | 'syncing';
}

export default function DeployDashboardPage() {
  const { language, isRtl } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [projectName, setProjectName] = useState('enterprise-app');
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [deploymentState, setDeploymentState] = useState<'idle' | 'deploying' | 'success'>('idle');
  const [deployProgress, setDeployProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([]);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Active deployments record list
  const [deployments, setDeployments] = useState<DeploymentRecord[]>([
    {
      id: 'dep-9041',
      name: 'core-platform',
      url: 'core-platform.hyptrix.com',
      deployedAt: '2 hours ago',
      size: '4.2 MB',
      duration: '3.1s',
      status: 'active',
    },
    {
      id: 'dep-8820',
      name: 'analytics-portal',
      url: 'analytics-portal.hyptrix.com',
      deployedAt: 'Yesterday',
      size: '7.8 MB',
      duration: '3.8s',
      status: 'active',
    },
  ]);

  const formattedSlug = projectName
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'app';

  const fullDomain = `${formattedSlug}.hyptrix.com`;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      });
      const baseName = file.name.split('.')[0];
      if (baseName) setProjectName(baseName);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      });
      const baseName = file.name.split('.')[0];
      if (baseName) setProjectName(baseName);
    }
  };

  const startDeployment = () => {
    setDeploymentState('deploying');
    setDeployProgress(0);
    setTerminalLogs([]);

    const logMessages = [
      { id: 1, text: 'Extracting .zip package and validating application payload...', delay: 250, progress: 20 },
      { id: 2, text: 'Generating SHA-256 integrity checksums and pushing to enterprise object storage...', delay: 650, progress: 50 },
      { id: 3, text: 'Replicating assets across Global Edge nodes (Cairo, Ashburn, Tokyo, London)...', delay: 1100, progress: 80 },
      { id: 4, text: 'Provisioning TLS 1.3 certificate with instant 0-RTT encryption...', delay: 1550, progress: 95 },
      { id: 5, text: 'Broadcast completed in 3.2 seconds. Production Anycast route active worldwide.', delay: 1950, progress: 100 },
    ];

    logMessages.forEach((item, index) => {
      setTimeout(() => {
        const timeNow = new Date().toISOString().substring(11, 19);
        setTerminalLogs((prev) => [
          ...prev,
          { id: item.id, text: item.text, time: timeNow },
        ]);
        setDeployProgress(item.progress);

        if (index === logMessages.length - 1) {
          setTimeout(() => {
            setDeploymentState('success');
            setDeployments((prev) => [
              {
                id: `dep-${Math.floor(1000 + Math.random() * 9000)}`,
                name: formattedSlug,
                url: fullDomain,
                deployedAt: 'Just now',
                size: selectedFile ? selectedFile.size : '3.6 MB',
                duration: '3.2s',
                status: 'active',
              },
              ...prev,
            ]);
          }, 350);
        }
      }, item.delay);
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://${fullDomain}`);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0B1220] flex flex-col selection:bg-[#38BDF8] selection:text-[#0B1220]">
      <HypnoticBackground />
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-28 md:pt-32 pb-14 sm:pb-24 relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Top Control Bar (Responsive Stacking, No Bleeding) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-8 mb-6 sm:mb-8 border-b border-[#0B1220]/8 min-w-0">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-1 uppercase font-bold tracking-wider">
              <Activity className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse shrink-0" />
              <span>{language === 'ar' ? 'غرفة عمليات النشر السحابي' : 'EDGE DEPLOYMENT FLIGHT-DECK'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0B1220] tracking-tight break-words">
              {language === 'ar' ? 'لوحة النشر الفوري لملفات ZIP' : 'Instant Deployment Dashboard'}
            </h1>
          </div>

          {/* Real-time Edge Health Status Badges */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs shrink-0">
            <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white border border-[#0B1220]/10 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping shrink-0" />
              <span className="text-[#0B1220] font-bold text-[10px] sm:text-xs">ANYCAST ACTIVE</span>
            </div>
            <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white border border-[#0B1220]/10 text-[#475569] text-[10px] sm:text-xs shadow-sm">
              <span className="text-[#A78BFA] font-bold">6 POPS ONLINE</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start min-w-0">
          
          {/* Main Upload & Execution Card (8 cols) */}
          <div className="lg:col-span-8 w-full min-w-0">
            <div className="rounded-3xl bg-white border border-[#0B1220]/8 p-4 sm:p-7 md:p-10 shadow-[0_15px_40px_rgba(11,18,32,0.04)] relative overflow-hidden min-w-0">
              
              {/* Card Header (Responsive Stacking) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-6 mb-5 sm:mb-8 border-b border-[#0B1220]/8 min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
                    <UploadCloud className="w-5 h-5 shrink-0" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-xl font-black text-[#0B1220] truncate">
                      {language === 'ar' ? 'إطلاق مشروع جديد' : 'New Deployment Package'}
                    </h2>
                    <p className="text-xs text-[#475569] mt-0.5 break-words">
                      {language === 'ar'
                        ? 'نشر ملفاتك الخاصة مباشرة دون أي قوالب مسبقة أو حزم معقدة'
                        : 'Deploy your own raw production archive directly to the global edge network'}
                    </p>
                  </div>
                </div>

                <span className="self-start sm:self-auto text-[10px] sm:text-[11px] font-mono px-2.5 sm:px-3 py-1 rounded-full bg-[#38BDF8]/10 text-[#0B1220] border border-[#38BDF8]/30 font-bold uppercase shrink-0">
                  &lt; 5s SLA
                </span>
              </div>

              {/* State 1: IDLE - Form & Drag/Drop Zone */}
              {deploymentState === 'idle' && (
                <div className="space-y-4 sm:space-y-6 min-w-0">
                  
                  {/* Project Slug Input */}
                  <div className="min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2 font-mono">
                      <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                        {language === 'ar' ? 'اسم المشروع وعنوان النطاق' : 'Project Name & Anycast Subdomain'}
                      </label>
                      <span className="self-start sm:self-auto text-[10px] px-2 py-0.5 rounded-full bg-[#38BDF8]/15 text-[#0B1220] border border-[#38BDF8]/30 font-bold shrink-0">
                        AUTOMATED SSL
                      </span>
                    </div>

                    <div className="relative min-w-0">
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="my-awesome-site"
                        className="w-full bg-[#F8FAFC] border border-[#0B1220]/12 rounded-2xl px-4 py-3 sm:py-3.5 text-base sm:text-base font-mono text-[#0B1220] placeholder:text-[#64748B]/50 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all min-w-0"
                      />
                    </div>
                    <p className="mt-2 text-xs text-[#64748B] font-mono break-all leading-normal min-w-0">
                      Target Production URL: <span className="text-[#38BDF8] font-bold break-all">https://{fullDomain}</span>
                    </p>
                  </div>

                  {/* Raw Drag & Drop Zone */}
                  <div className="min-w-0">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".zip,.tar.gz"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-3xl p-5 sm:p-10 md:p-12 text-center cursor-pointer transition-all duration-200 group w-full min-w-0 active:scale-[0.99] ${
                        isDragging
                          ? 'border-[#38BDF8] bg-[#38BDF8]/10 scale-[1.01]'
                          : 'border-[#0B1220]/15 hover:border-[#38BDF8]/60 bg-[#F8FAFC] hover:bg-white'
                      }`}
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-2xl bg-white border border-[#0B1220]/10 flex items-center justify-center text-[#38BDF8] group-hover:scale-110 group-hover:border-[#38BDF8]/50 transition-all duration-300 shrink-0 shadow-sm">
                        <UploadCloud className="w-6 h-6 sm:w-8 sm:h-8 shrink-0" />
                      </div>

                      <h3 className="text-sm sm:text-lg font-black text-[#0B1220] break-all max-w-full px-2">
                        {selectedFile
                          ? `Ready: ${selectedFile.name}`
                          : language === 'ar'
                          ? 'اسحب وأفلت ملف مشروعك (.zip) هنا'
                          : 'Drop your project .zip package here'}
                      </h3>

                      <p className="mt-1 text-xs text-[#475569] font-normal max-w-md mx-auto break-words px-2 leading-relaxed">
                        {selectedFile
                          ? `Size: ${selectedFile.size} · Click to choose a different archive`
                          : language === 'ar'
                          ? 'أو اضغط لتصفح ملفات جهازك. يتم فك الضغط والتشفير والنشر عالمياً في ثوانٍ'
                          : 'Or click to browse from your device. Raw, instant deployment of your production files'}
                      </p>

                      <div className="mt-4 sm:mt-5 inline-flex flex-wrap items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#A78BFA] bg-[#A78BFA]/10 border border-[#A78BFA]/20 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full max-w-full text-center leading-tight">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                        <span>Direct SHA-256 Extraction · Zero Intermediaries</span>
                      </div>
                    </div>
                  </div>

                  {/* Deploy Action Button */}
                  <div className="pt-1">
                    <button
                      onClick={startDeployment}
                      className="w-full py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-black text-[#F8FAFC] bg-[#0B1220] hover:bg-[#0B1220]/90 transition-all duration-200 shadow-[0_8px_25px_rgba(11,18,32,0.18)] flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
                    >
                      <Sparkles className="w-4 h-4 fill-[#38BDF8] text-[#38BDF8] shrink-0" />
                      <span>
                        {language === 'ar'
                          ? 'فك الضغط وبث المشروع عبر السحابة العالمية'
                          : 'Extract & Broadcast Across Global Edge'}
                      </span>
                    </button>
                  </div>

                </div>
              )}

              {/* State 2: DEPLOYING - Real-time Terminal Engine */}
              {deploymentState === 'deploying' && (
                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono mb-2">
                      <span className="text-[#38BDF8] font-bold text-[11px] sm:text-xs">
                        {language === 'ar' ? 'جاري فك الضغط والتشفير والنشر...' : 'EXTRACTING, ENCRYPTING & DISTRIBUTING'}
                      </span>
                      <span className="text-[#0B1220] font-black">{deployProgress}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[#E2E8F0] overflow-hidden p-0.5 border border-[#0B1220]/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#38BDF8] via-[#A78BFA] to-[#38BDF8]"
                        initial={{ width: 0 }}
                        animate={{ width: `${deployProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Animated Terminal (Authentic Dark Authority) */}
                  <div className="rounded-2xl bg-[#0B1220] border border-[#0B1220] p-3.5 sm:p-5 font-mono text-xs overflow-hidden shadow-xl min-w-0 text-[#F8FAFC]">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F8FAFC]/10 text-xs text-[#F8FAFC]/50 gap-2 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shrink-0" />
                        <span className="text-[#F8FAFC]/90 font-bold truncate">Hyptrix Edge Storage Pipeline</span>
                      </div>
                      <span className="text-[#A78BFA] text-[10px] sm:text-[11px] font-bold shrink-0">&lt; 5s SLA</span>
                    </div>

                    <div className="space-y-2.5 min-h-[140px] max-h-[220px] overflow-y-auto">
                      {terminalLogs.map((log) => (
                        <div key={log.id} className="flex items-start gap-2 leading-relaxed min-w-0">
                          <span className="text-[#F8FAFC]/40 shrink-0 tabular-nums font-mono text-[11px] sm:text-xs">[{log.time}]</span>
                          <span className="text-[#F8FAFC]/90 font-sans text-xs break-words min-w-0 flex-1">{log.text}</span>
                        </div>
                      ))}
                      {deployProgress < 100 && (
                        <div className="flex items-center gap-2 text-[#38BDF8] animate-pulse pt-1">
                          <span>&gt;</span>
                          <span className="w-2.5 h-4 bg-[#38BDF8] inline-block shrink-0" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* State 3: SUCCESS - Live Production Link & Inspector */}
              {deploymentState === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4 sm:space-y-6 min-w-0"
                >
                  <div className="p-4 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#38BDF8]/40 space-y-4 min-w-0">
                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8] shrink-0 mt-0.5 sm:mt-0">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-xl font-black text-[#0B1220] break-words">
                          {language === 'ar' ? 'مشروعك حي ويعمل عالمياً الآن' : 'Your Application is Active Worldwide'}
                        </h3>
                        <p className="text-xs text-[#475569] mt-0.5 break-words">
                          {language === 'ar'
                            ? 'تم التوزيع بنجاح عبر مراكز الحافة العالمية مع حماية SSL فورية'
                            : 'Synchronized across all Global Edge nodes with instant TLS 1.3 encryption.'}
                        </p>
                      </div>
                    </div>

                    {/* Production Link Bar */}
                    <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#0B1220]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0 shadow-sm">
                      <div className="flex items-center gap-2 min-w-0 font-mono text-xs sm:text-sm flex-1">
                        <Globe className="w-4 h-4 text-[#38BDF8] shrink-0" />
                        <span className="text-[#38BDF8] font-semibold shrink-0">https://</span>
                        <span className="text-[#0B1220] font-extrabold truncate min-w-0 flex-1">{fullDomain}</span>
                      </div>

                      <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto shrink-0">
                        <button
                          onClick={copyToClipboard}
                          className="px-3 py-2 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0B1220] text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#0B1220]/10 cursor-pointer active:scale-95"
                        >
                          {copiedUrl ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                              <span className="text-[#38BDF8]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 shrink-0" />
                              <span>Copy URL</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => setIsPreviewOpen(true)}
                          className="px-3 py-2 rounded-lg bg-[#0B1220] text-[#F8FAFC] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#0B1220]/90 transition-colors cursor-pointer active:scale-95 shadow-sm"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                          <span>Inspect Live</span>
                        </button>
                      </div>
                    </div>

                    {/* Quick Telemetry Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 font-mono text-xs text-center">
                      <div className="p-3 rounded-xl bg-white border border-[#0B1220]/8 flex sm:flex-col justify-between items-center sm:justify-center">
                        <div className="text-[#64748B] text-[10px] font-semibold uppercase">BANDWIDTH OVERAGE</div>
                        <div className="text-[#0B1220] font-bold text-xs sm:text-sm sm:mt-0.5">$0.00 / TB</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-[#0B1220]/8 flex sm:flex-col justify-between items-center sm:justify-center">
                        <div className="text-[#64748B] text-[10px] font-semibold uppercase">STORAGE BACKEND</div>
                        <div className="text-[#0B1220] font-bold text-xs sm:text-sm sm:mt-0.5">Enterprise Storage</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-[#0B1220]/8 flex sm:flex-col justify-between items-center sm:justify-center">
                        <div className="text-[#64748B] text-[10px] font-semibold uppercase">SSL ENCRYPTION</div>
                        <div className="text-[#38BDF8] font-bold text-xs sm:text-sm sm:mt-0.5">TLS 1.3 Active</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        setDeploymentState('idle');
                        setDeployProgress(0);
                        setSelectedFile(null);
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-[#F8FAFC] text-xs font-mono text-[#0B1220] border border-[#0B1220]/10 transition-all cursor-pointer font-bold active:scale-95 shadow-sm"
                    >
                      {language === 'ar' ? 'نشر مشروع آخر' : 'Deploy Another Project'}
                    </button>
                  </div>
                </motion.div>
              )}

            </div>
          </div>

          {/* Right Sidebar: Active Deployments & Specs (4 cols) */}
          <div className="lg:col-span-4 w-full space-y-5 sm:space-y-6 min-w-0">
            
            {/* Active Deployments Ledger */}
            <div className="rounded-3xl bg-white border border-[#0B1220]/8 p-4 sm:p-6 shadow-[0_10px_30px_rgba(11,18,32,0.04)] space-y-3.5 sm:space-y-4 min-w-0">
              <div className="flex items-center justify-between pb-3 border-b border-[#0B1220]/8 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Layers className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <h3 className="text-xs sm:text-sm font-bold text-[#0B1220] uppercase tracking-wider font-mono truncate">
                    {language === 'ar' ? 'المشاريع النشطة' : 'Active Projects'}
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#38BDF8]/15 text-[#0B1220] shrink-0">
                  {deployments.length} LIVE
                </span>
              </div>

              <div className="space-y-2.5 min-w-0">
                {deployments.map((dep) => (
                  <div
                    key={dep.id}
                    className="p-3 sm:p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#0B1220]/8 space-y-1.5 hover:border-[#38BDF8]/40 transition-colors min-w-0"
                  >
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <span className="text-xs font-bold text-[#0B1220] font-mono truncate min-w-0 flex-1">
                        {dep.name}
                      </span>
                      <span className="text-[10px] text-[#38BDF8] font-mono font-bold flex items-center gap-1 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                        {dep.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#38BDF8] font-mono truncate min-w-0 font-semibold">
                      https://{dep.url}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#64748B] font-mono pt-1 border-t border-[#0B1220]/5">
                      <span>{dep.size} · {dep.duration}</span>
                      <span>{dep.deployedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Highlights Box */}
            <div className="rounded-3xl bg-white border border-[#0B1220]/8 p-4 sm:p-6 shadow-[0_10px_30px_rgba(11,18,32,0.04)] space-y-3 sm:space-y-3.5 min-w-0">
              <div className="text-xs font-mono text-[#A78BFA] font-bold uppercase tracking-wider">
                {language === 'ar' ? 'معايير الأمان والسرعة' : 'DEPLOYMENT METRICS'}
              </div>

              <div className="space-y-2.5 text-xs text-[#475569] font-normal">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>Sub-5-second global broadcast guarantee</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>Automated TLS 1.3 wildcard certificate</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>High-efficiency enterprise storage backend</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>Multi-continent replication (Egypt, US, Japan)</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Live Preview Modal (Mobile Responsive Frame) */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B1220]/70 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-4xl bg-white border border-[#0B1220]/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="bg-[#F8FAFC] px-4 sm:px-5 py-3 sm:py-3.5 border-b border-[#0B1220]/8 flex items-center justify-between gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                </div>
                
                <div className="flex-1 max-w-md mx-auto bg-white border border-[#0B1220]/10 rounded-lg px-2.5 py-1 flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-[#0B1220] truncate shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                  <span className="text-[#38BDF8]">https://</span>
                  <span className="text-[#0B1220] font-bold truncate">{fullDomain}</span>
                  <span className="hidden sm:inline ml-auto text-[10px] text-[#A78BFA] font-bold">EDGE CLOUD</span>
                </div>

                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1 rounded-lg text-[#64748B] hover:text-[#0B1220] transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 sm:p-10 overflow-y-auto flex-1 bg-gradient-to-b from-white to-[#F8FAFC] text-center">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto p-2 rounded-2xl bg-[#F8FAFC] border border-[#0B1220]/10 flex items-center justify-center shadow-sm">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#0B1220] tracking-tight uppercase break-words">
                    {projectName}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                    This project is live across the Global Edge Network. Replicated across international edge nodes to absorb traffic surges with guaranteed billing predictability.
                  </p>

                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
                    <div className="p-3 rounded-xl bg-white border border-[#0B1220]/8 shadow-sm">
                      <div className="text-[10px] sm:text-[11px] text-[#64748B] uppercase font-mono">GLOBAL REPLICATION</div>
                      <div className="text-xs font-bold text-[#0B1220] mt-0.5">Egypt, US, Japan &amp; Europe</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#0B1220]/8 shadow-sm">
                      <div className="text-[10px] sm:text-[11px] text-[#64748B] uppercase font-mono">BANDWIDTH SURCHARGES</div>
                      <div className="text-xs font-bold text-[#38BDF8] mt-0.5">$0 Surcharges</div>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={() => setIsPreviewOpen(false)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-[#0B1220] text-[#F8FAFC] hover:bg-[#0B1220]/90 transition-colors cursor-pointer shadow-sm"
                    >
                      Close Inspector
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
