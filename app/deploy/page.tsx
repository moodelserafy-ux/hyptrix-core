'use client';

import React, { useState, useRef, useEffect, useMemo, useSyncExternalStore } from 'react';
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
  X,
  User,
  Trash2,
  HardDrive,
  Settings,
  Link2,
  RefreshCw,
  AlertCircle
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
  customDomain?: string;
  dnsStatus?: 'pending' | 'verified';
  deployedAt: string;
  size: string;
  duration: string;
  status: 'active' | 'syncing';
}

interface LocalUserProfile {
  id: string;
  name: string;
  email: string;
  plan: string;
  memberSince: string;
  totalDeploys: number;
}

const DEFAULT_DEPLOYMENTS: DeploymentRecord[] = [
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
];

function subscribeStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('hyptrix-storage-sync', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('hyptrix-storage-sync', callback);
  };
}

function getDeploymentsSnapshot(): string {
  try {
    return localStorage.getItem('hyptrix_deployments') || '';
  } catch {
    return '';
  }
}

function getServerDeploymentsSnapshot(): string {
  return '';
}

function getUserProfileSnapshot(): string {
  try {
    return localStorage.getItem('hyptrix_user') || '';
  } catch {
    return '';
  }
}

function getServerUserProfileSnapshot(): string {
  return '';
}

export default function DeployDashboardPage() {
  const { language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [projectName, setProjectName] = useState('enterprise-app');
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>(null);
  const [actualFile, setActualFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [deploymentState, setDeploymentState] = useState<'idle' | 'deploying' | 'success'>('idle');
  const [deployProgress, setDeployProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([]);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewProject, setPreviewProject] = useState({ name: 'enterprise-app', domain: 'enterprise-app.hyptrix.com' });

  // Custom Domain & Settings Modal State
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
  const [selectedDepForDomain, setSelectedDepForDomain] = useState<DeploymentRecord | null>(null);
  const [customDomainInput, setCustomDomainInput] = useState('');
  const [isDomainLinked, setIsDomainLinked] = useState(false);
  const [isLinkingDomain, setIsLinkingDomain] = useState(false);
  const [domainError, setDomainError] = useState<string | null>(null);
  const [isVerifyingDns, setIsVerifyingDns] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Persistent storage subscriptions (zero setState in effect)
  const rawDeployments = useSyncExternalStore(subscribeStorage, getDeploymentsSnapshot, getServerDeploymentsSnapshot);
  const rawUserProfile = useSyncExternalStore(subscribeStorage, getUserProfileSnapshot, getServerUserProfileSnapshot);

  // Initialize storage defaults if not present
  useEffect(() => {
    try {
      if (!localStorage.getItem('hyptrix_deployments')) {
        localStorage.setItem('hyptrix_deployments', JSON.stringify(DEFAULT_DEPLOYMENTS));
        window.dispatchEvent(new Event('hyptrix-storage-sync'));
      }
      if (!localStorage.getItem('hyptrix_user')) {
        const initialUser: LocalUserProfile = {
          id: `usr-${Math.floor(1000 + Math.random() * 9000)}`,
          name: 'Hyptrix Developer',
          email: 'developer@hyptrix.local',
          plan: 'Free Trial',
          memberSince: 'Oct 2026',
          totalDeploys: DEFAULT_DEPLOYMENTS.length,
        };
        localStorage.setItem('hyptrix_user', JSON.stringify(initialUser));
        window.dispatchEvent(new Event('hyptrix-storage-sync'));
      }
    } catch {
      // Ignore
    }
  }, []);

  const deployments: DeploymentRecord[] = useMemo(() => {
    if (!rawDeployments) return DEFAULT_DEPLOYMENTS;
    try {
      const parsed = JSON.parse(rawDeployments);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DEPLOYMENTS;
    } catch {
      return DEFAULT_DEPLOYMENTS;
    }
  }, [rawDeployments]);

  const userProfile: LocalUserProfile = useMemo(() => {
    if (!rawUserProfile) {
      return {
        id: 'usr-8924',
        name: 'Hyptrix Developer',
        email: 'developer@hyptrix.local',
        plan: 'Free Trial',
        memberSince: 'Oct 2026',
        totalDeploys: 2,
      };
    }
    try {
      return JSON.parse(rawUserProfile);
    } catch {
      return {
        id: 'usr-8924',
        name: 'Hyptrix Developer',
        email: 'developer@hyptrix.local',
        plan: 'Free Trial',
        memberSince: 'Oct 2026',
        totalDeploys: 2,
      };
    }
  }, [rawUserProfile]);

  const saveDeployments = (newRecords: DeploymentRecord[]) => {
    try {
      localStorage.setItem('hyptrix_deployments', JSON.stringify(newRecords));
      window.dispatchEvent(new Event('hyptrix-storage-sync'));
    } catch (e) {
      console.error(e);
    }
  };

  const saveUserProfile = (newProfile: LocalUserProfile) => {
    try {
      localStorage.setItem('hyptrix_user', JSON.stringify(newProfile));
      window.dispatchEvent(new Event('hyptrix-storage-sync'));
    } catch (e) {
      console.error(e);
    }
  };

  const formattedSlug = projectName
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'app';

  const fullDomain = `${formattedSlug}.hyptrix.com`;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setActualFile(file);
      setSelectedFile({ name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(2)} MB` });
      const baseName = file.name.split('.')[0];
      if (baseName) setProjectName(baseName);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setActualFile(file);
      setSelectedFile({ name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(2)} MB` });
      const baseName = file.name.split('.')[0];
      if (baseName) setProjectName(baseName);
    }
  };

  const startDeployment = async () => {
    if (!actualFile) return;

    setDeploymentState('deploying');
    setDeployProgress(15);
    setTerminalLogs([{ id: Date.now(), text: 'Connecting to Hyptrix Core Engine...', time: new Date().toISOString().substring(11, 19) }]);

    const formData = new FormData();
    formData.append('site_name', formattedSlug);
    formData.append('site_file', actualFile);

    try {
      setDeployProgress(45);
      setTerminalLogs(prev => [...prev, { id: Date.now() + 1, text: 'Uploading and extracting archive directly to Cloudflare Edge / Storage...', time: new Date().toISOString().substring(11, 19) }]);

      // Real deployment request to server-side engine
      const response = await fetch('/api/deploy', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status === 'success') {
        setDeployProgress(100);
        setTerminalLogs(prev => [...prev, { id: Date.now() + 2, text: 'Deployment successful! Routing active worldwide.', time: new Date().toISOString().substring(11, 19) }]);

        setTimeout(() => {
          setDeploymentState('success');
          
          const newRecord: DeploymentRecord = {
            id: `dep-${Math.floor(1000 + Math.random() * 9000)}`,
            name: formattedSlug,
            url: fullDomain,
            deployedAt: 'Just now',
            size: selectedFile ? selectedFile.size : 'Unknown',
            duration: 'Live',
            status: 'active',
          };

          const updatedDeployments = [newRecord, ...deployments];
          saveDeployments(updatedDeployments);

          // Update user deploy count in local storage
          saveUserProfile({
            ...userProfile,
            totalDeploys: userProfile.totalDeploys + 1,
          });

          setPreviewProject({ name: formattedSlug, domain: fullDomain });
        }, 800);
      } else {
        alert('Deployment Failed: ' + (data.error || 'Unknown error'));
        setDeploymentState('idle');
      }
    } catch {
      alert('Network error connecting to Engine.');
      setDeploymentState('idle');
    }
  };

  const copyToClipboard = (urlToCopy?: string) => {
    const url = urlToCopy || `https://${fullDomain}`;
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const copyDnsField = (field: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const deleteDeployment = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(language === 'ar' ? 'هل تريد حذف هذا الرابط من سجلك المحلي؟' : 'Remove this project link from your local records?')) {
      const filtered = deployments.filter((d) => d.id !== id);
      saveDeployments(filtered);
    }
  };

  const openInspectorFor = (dep: DeploymentRecord) => {
    setPreviewProject({ name: dep.name, domain: dep.url });
    setIsPreviewOpen(true);
  };

  // Open Custom Domain & Settings Modal
  const openDomainModalFor = (dep: DeploymentRecord) => {
    setSelectedDepForDomain(dep);
    setCustomDomainInput(dep.customDomain || '');
    setIsDomainLinked(Boolean(dep.customDomain));
    setDomainError(null);
    setIsLinkingDomain(false);
    setIsDomainModalOpen(true);
  };

  // Handle Domain Linking via API
  const handleLinkDomain = async () => {
    setDomainError(null);
    const rawInput = customDomainInput.trim();

    if (!rawInput) {
      setDomainError(language === 'ar' ? 'يرجى إدخال اسم النطاق أولاً' : 'Please enter a domain name first');
      return;
    }

    const cleanDomain = rawInput.toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');

    setIsLinkingDomain(true);

    try {
      const response = await fetch('/api/domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: cleanDomain }),
      });

      const data = await response.json();

      if (response.ok && (data.status === 'success' || data.success)) {
        // Only show DNS card when API responds with success
        setIsDomainLinked(true);
        setDomainError(null);

        if (selectedDepForDomain) {
          const updated = deployments.map(d => {
            if (d.id === selectedDepForDomain.id) {
              return {
                ...d,
                customDomain: cleanDomain,
                dnsStatus: 'pending' as const,
              };
            }
            return d;
          });
          saveDeployments(updated);
          setSelectedDepForDomain(prev => prev ? { ...prev, customDomain: cleanDomain, dnsStatus: 'pending' } : null);
        }
      } else {
        setIsDomainLinked(false);
        setDomainError(data.error || data.message || (language === 'ar' ? 'فشل ربط النطاق، يرجى التحقق من صحة الاسم والمحاولة مجدداً' : 'Failed to link domain. Please verify the domain and try again.'));
      }
    } catch (err: unknown) {
      setIsDomainLinked(false);
      const errorMsg = err instanceof Error ? err.message : (language === 'ar' ? 'حدث خطأ في الاتصال بالخادم' : 'Network error connecting to API');
      setDomainError(errorMsg);
    } finally {
      setIsLinkingDomain(false);
    }
  };

  // Check & verify real DNS propagation from Cloudflare API
  const handleVerifyDns = async () => {
    setIsVerifyingDns(true);
    try {
      const res = await fetch(`/api/domain?domain=${encodeURIComponent(customDomainInput.trim())}`);
      const data = await res.json();
      
      if (res.ok && data.status === 'success') {
        if (data.dnsStatus === 'verified') {
          if (selectedDepForDomain) {
            const updated = deployments.map(d => {
              if (d.id === selectedDepForDomain.id) {
                return {
                  ...d,
                  dnsStatus: 'verified' as const,
                };
              }
              return d;
            });
            saveDeployments(updated);
            setSelectedDepForDomain(prev => prev ? { ...prev, dnsStatus: 'verified' } : null);
          }
        } else {
          // Still pending in Cloudflare
          alert(language === 'ar' ? 'سجلات DNS لا تزال قيد الانتشار لدى مزود النطاق. يرجى التأكد من إضافة سجل CNAME والانتظار قليلاً.' : 'DNS records are still propagating across authoritative name servers. Please verify your CNAME record.');
        }
      } else {
        alert(data.error || (language === 'ar' ? 'فشل التحقق من حالة الدومين' : 'Failed to verify domain status'));
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : (language === 'ar' ? 'خطأ في الاتصال بالخادم' : 'Network error');
      alert(errorMsg);
    } finally {
      setIsVerifyingDns(false);
    }
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

          {/* User Account Session & Real-time Edge Badges */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs shrink-0">
            {/* User Session Badge stored in LocalStorage */}
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#0B1220]/10 flex items-center gap-2 shadow-sm text-[#0B1220]">
              <div className="w-5 h-5 rounded-full bg-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8] shrink-0">
                <User className="w-3 h-3" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-[#0B1220] leading-none">{userProfile.name}</span>
                <span className="text-[9px] text-[#64748B] leading-none mt-0.5">{userProfile.id} · {userProfile.plan}</span>
              </div>
            </div>

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
                      disabled={!selectedFile}
                      className={`w-full py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-black transition-all duration-200 flex items-center justify-center gap-2.5 shadow-[0_8px_25px_rgba(11,18,32,0.18)] ${
                        selectedFile
                          ? 'text-[#F8FAFC] bg-[#0B1220] hover:bg-[#0B1220]/90 cursor-pointer active:scale-98'
                          : 'text-[#94A3B8] bg-[#E2E8F0] cursor-not-allowed'
                      }`}
                    >
                      <Sparkles className={`w-4 h-4 shrink-0 ${selectedFile ? 'fill-[#38BDF8] text-[#38BDF8]' : 'text-[#94A3B8]'}`} />
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
                            ? 'تم حفظ المشروع والرابط في جهازك بنجاح، ومزامنته عبر مراكز الحافة مع حماية SSL فورية'
                            : 'Saved to your persistent local deployments. Synchronized across Global Edge with TLS 1.3 encryption.'}
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
                          onClick={() => copyToClipboard()}
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

                        {/* Quick Custom Domain Link Trigger */}
                        <button
                          onClick={() => openDomainModalFor({
                            id: 'current-deploy',
                            name: formattedSlug,
                            url: fullDomain,
                            deployedAt: 'Just now',
                            size: selectedFile ? selectedFile.size : 'Unknown',
                            duration: 'Live',
                            status: 'active',
                          })}
                          className="col-span-2 sm:col-span-1 px-3 py-2 rounded-lg bg-white text-[#0B1220] hover:bg-[#F1F5F9] text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#0B1220]/12 cursor-pointer active:scale-95 shadow-sm"
                        >
                          <Link2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                          <span>Custom Domain</span>
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
                        <div className="text-[#64748B] text-[10px] font-semibold uppercase">PERSISTENT STATUS</div>
                        <div className="text-[#38BDF8] font-bold text-xs sm:text-sm sm:mt-0.5">Saved Locally</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        setDeploymentState('idle');
                        setDeployProgress(0);
                        setSelectedFile(null);
                        setActualFile(null);
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
            
            {/* Active Deployments Ledger (Persistent in LocalStorage) */}
            <div className="rounded-3xl bg-white border border-[#0B1220]/8 p-4 sm:p-6 shadow-[0_10px_30px_rgba(11,18,32,0.04)] space-y-3.5 sm:space-y-4 min-w-0">
              <div className="flex items-center justify-between pb-3 border-b border-[#0B1220]/8 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Layers className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <h3 className="text-xs sm:text-sm font-bold text-[#0B1220] uppercase tracking-wider font-mono truncate">
                    {language === 'ar' ? 'المشاريع والروابط المحفوظة' : 'Saved Projects & Links'}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#38BDF8]/15 text-[#0B1220]">
                    {deployments.length} LIVE
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 min-h-[160px] max-h-[380px] overflow-y-auto pr-1">
                {deployments.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[#64748B] font-mono border border-dashed border-[#0B1220]/10 rounded-2xl">
                    {language === 'ar' ? 'لا توجد مشاريع منشأة حالياً' : 'No deployed projects yet.'}
                  </div>
                ) : (
                  deployments.map((dep) => (
                    <div
                      key={dep.id}
                      onClick={() => openInspectorFor(dep)}
                      className="p-3 sm:p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#0B1220]/8 space-y-1.5 hover:border-[#38BDF8]/60 transition-all min-w-0 cursor-pointer group shadow-sm hover:shadow"
                    >
                      <div className="flex items-center justify-between gap-2 min-w-0">
                        <span className="text-xs font-bold text-[#0B1220] font-mono truncate min-w-0 flex-1 group-hover:text-[#38BDF8] transition-colors">
                          {dep.name}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-[10px] text-[#38BDF8] font-mono font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                            {dep.status.toUpperCase()}
                          </span>
                          
                          {/* Settings / Custom Domain Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openDomainModalFor(dep);
                            }}
                            title={language === 'ar' ? 'إعدادات النطاق المخصص' : 'Custom Domain & Settings'}
                            className="p-1 rounded text-[#64748B] hover:text-[#0B1220] hover:bg-white transition-colors cursor-pointer ml-0.5"
                          >
                            <Settings className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={(e) => deleteDeployment(dep.id, e)}
                            title={language === 'ar' ? 'حذف من السجل' : 'Delete from history'}
                            className="p-1 rounded text-[#94A3B8] hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-[11px] text-[#38BDF8] font-mono truncate min-w-0 font-semibold flex items-center justify-between">
                        <span className="truncate">https://{dep.url}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(`https://${dep.url}`);
                          }}
                          className="text-[10px] bg-white border border-[#0B1220]/10 px-1.5 py-0.5 rounded text-[#0B1220] hover:bg-[#F1F5F9] shrink-0 ml-2 cursor-pointer font-bold"
                        >
                          Copy
                        </button>
                      </div>

                      {/* Display Custom Domain if Linked */}
                      {dep.customDomain && (
                        <div className="flex items-center justify-between text-[10px] font-mono bg-white px-2 py-1 rounded-lg border border-[#38BDF8]/30 text-[#0B1220]">
                          <div className="flex items-center gap-1 truncate min-w-0">
                            <Globe className="w-3 h-3 text-[#38BDF8] shrink-0" />
                            <span className="truncate font-bold">{dep.customDomain}</span>
                          </div>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold shrink-0 ml-1 ${
                            dep.dnsStatus === 'verified' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-amber-100 text-amber-800 animate-pulse'
                          }`}>
                            {dep.dnsStatus === 'verified' ? 'DNS OK' : 'DNS PENDING'}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[10px] text-[#64748B] font-mono pt-1 border-t border-[#0B1220]/5">
                        <span>{dep.size} · {dep.duration}</span>
                        <span>{dep.deployedAt}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Architecture Highlights Box */}
            <div className="rounded-3xl bg-white border border-[#0B1220]/8 p-4 sm:p-6 shadow-[0_10px_30px_rgba(11,18,32,0.04)] space-y-3 sm:space-y-3.5 min-w-0">
              <div className="text-xs font-mono text-[#A78BFA] font-bold uppercase tracking-wider flex items-center gap-2">
                <HardDrive className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'معايير الأمان والسرعة' : 'DEPLOYMENT METRICS'}</span>
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
                  <span className="text-[#0B1220] font-bold truncate">{previewProject.domain}</span>
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
                    {previewProject.name}
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

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2">
                    <button
                      onClick={() => copyToClipboard(`https://${previewProject.domain}`)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-[#38BDF8] text-[#0B1220] hover:bg-[#38BDF8]/90 transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedUrl ? 'Copied' : 'Copy Project URL'}</span>
                    </button>
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

      {/* Custom Domain / Settings Modal (Premium Enterprise Bento-Box Vibe) */}
      <AnimatePresence>
        {isDomainModalOpen && selectedDepForDomain && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B1220]/75 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl bg-white border border-[#0B1220]/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="bg-[#F8FAFC] px-5 sm:px-7 py-4 sm:py-5 border-b border-[#0B1220]/8 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-[#0B1220] text-[#38BDF8] flex items-center justify-center shrink-0 shadow-md">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
                      <Settings className="w-3 h-3 text-[#A78BFA]" />
                      <span>{language === 'ar' ? 'إعدادات النطاق والتوجيه السحابي' : 'ENTERPRISE DOMAIN ROUTING'}</span>
                    </div>
                    <h2 className="text-base sm:text-xl font-black text-[#0B1220] tracking-tight truncate">
                      {language === 'ar' ? 'ربط نطاق مخصص (Custom Domain)' : 'Custom Domain & DNS Settings'}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => setIsDomainModalOpen(false)}
                  className="p-1.5 rounded-xl text-[#64748B] hover:text-[#0B1220] hover:bg-[#0B1220]/5 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
                
                {/* Active Subdomain Overview Box */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F8FAFC] border border-[#0B1220]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block">Assigned Edge Endpoint</span>
                    <span className="text-[#0B1220] font-black break-all">https://{selectedDepForDomain.url}</span>
                  </div>
                  <span className="self-start sm:self-auto text-[10px] px-2.5 py-0.5 rounded-full bg-[#38BDF8]/15 text-[#0B1220] border border-[#38BDF8]/30 font-bold shrink-0">
                    ANYCAST 0-RTT
                  </span>
                </div>

                {/* Input Field Section (Sleek Modern Input) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#475569] uppercase font-mono tracking-wider">
                    {language === 'ar' ? 'أدخل اسم النطاق الخاص بك' : 'Enter Your Custom Domain'}
                  </label>
                  
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <div className="relative flex-1 min-w-0">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                        <Globe className="w-4 h-4 text-[#38BDF8]" />
                      </div>
                      <input
                        type="text"
                        value={customDomainInput}
                        onChange={(e) => {
                          setCustomDomainInput(e.target.value);
                          if (domainError) setDomainError(null);
                        }}
                        placeholder="www.example.com or app.mybrand.io"
                        className="w-full bg-[#F8FAFC] border border-[#0B1220]/15 rounded-2xl pl-10 pr-4 py-3 text-sm font-mono text-[#0B1220] placeholder:text-[#64748B]/50 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all"
                      />
                    </div>

                    <button
                      onClick={handleLinkDomain}
                      disabled={!customDomainInput.trim() || isLinkingDomain}
                      className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 shrink-0 ${
                        customDomainInput.trim() && !isLinkingDomain
                          ? 'bg-[#0B1220] text-[#F8FAFC] hover:bg-[#0B1220]/90 shadow-[0_4px_16px_rgba(11,18,32,0.18)] cursor-pointer active:scale-95'
                          : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                      }`}
                    >
                      {isLinkingDomain ? (
                        <>
                          <RefreshCw className="w-4 h-4 text-[#38BDF8] animate-spin shrink-0" />
                          <span>{language === 'ar' ? 'جاري الربط...' : 'Linking...'}</span>
                        </>
                      ) : (
                        <>
                          <Link2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                          <span>{language === 'ar' ? 'ربط النطاق' : 'Link Domain'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Error State Banner */}
                  {domainError && (
                    <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span className="break-words font-semibold">{domainError}</span>
                    </div>
                  )}
                  
                  <p className="text-[11px] text-[#64748B]">
                    {language === 'ar' 
                      ? 'مثال: www.yourcompany.com أو portal.domain.io. لا تحتاج لنقل النطاق، فقط أضف سجل CNAME.'
                      : 'Example: www.yourcompany.com or portal.brand.io. You keep your domain at your registrar; just add a CNAME record.'}
                  </p>
                </div>

                {/* DNS Instructions Card: Dark-themed Bento-Box style */}
                {isDomainLinked && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-3xl bg-[#0B1220] border border-[#0B1220] p-5 sm:p-6 text-[#F8FAFC] shadow-2xl space-y-5"
                  >
                    {/* Bento Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-[#F8FAFC]/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                          <h3 className="text-sm font-black text-[#F8FAFC] tracking-tight uppercase font-mono">
                            DNS Configuration Records
                          </h3>
                        </div>
                        <p className="text-xs text-[#F8FAFC]/60 mt-0.5">
                          Add the following canonical record at your DNS registrar (Cloudflare, Namecheap, GoDaddy, Route53, etc.)
                        </p>
                      </div>

                      <span className="self-start sm:self-auto text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30 font-bold shrink-0">
                        CNAME REQUIRED
                      </span>
                    </div>

                    {/* Bento Box Grid (3 columns for Type, Name, Target) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      
                      {/* Box 1: Record Type */}
                      <div className="p-3.5 rounded-2xl bg-[#070C16] border border-[#F8FAFC]/10 space-y-1.5 flex flex-col justify-between">
                        <div className="text-[10px] font-mono uppercase text-[#F8FAFC]/50 font-bold">Record Type</div>
                        <div className="text-base font-black font-mono text-[#38BDF8]">CNAME</div>
                        <button
                          onClick={() => copyDnsField('type', 'CNAME')}
                          className="self-start text-[10px] font-mono font-bold px-2 py-1 rounded bg-[#F8FAFC]/10 hover:bg-[#F8FAFC]/20 text-[#F8FAFC] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === 'type' ? <Check className="w-3 h-3 text-[#38BDF8]" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === 'type' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      {/* Box 2: Record Name / Host */}
                      <div className="p-3.5 rounded-2xl bg-[#070C16] border border-[#F8FAFC]/10 space-y-1.5 flex flex-col justify-between">
                        <div className="text-[10px] font-mono uppercase text-[#F8FAFC]/50 font-bold">Name / Host</div>
                        <div className="text-base font-black font-mono text-[#F8FAFC] truncate">@ (or www)</div>
                        <button
                          onClick={() => copyDnsField('name', customDomainInput.startsWith('www.') ? 'www' : '@')}
                          className="self-start text-[10px] font-mono font-bold px-2 py-1 rounded bg-[#F8FAFC]/10 hover:bg-[#F8FAFC]/20 text-[#F8FAFC] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === 'name' ? <Check className="w-3 h-3 text-[#38BDF8]" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === 'name' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      {/* Box 3: Target Value */}
                      <div className="p-3.5 rounded-2xl bg-[#070C16] border border-[#F8FAFC]/10 space-y-1.5 flex flex-col justify-between">
                        <div className="text-[10px] font-mono uppercase text-[#F8FAFC]/50 font-bold">Target Value</div>
                        <div className="text-xs font-black font-mono text-[#38BDF8] truncate">cname.hyptrix.com</div>
                        <button
                          onClick={() => copyDnsField('target', 'cname.hyptrix.com')}
                          className="self-start text-[10px] font-mono font-bold px-2 py-1 rounded bg-[#F8FAFC]/10 hover:bg-[#F8FAFC]/20 text-[#F8FAFC] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === 'target' ? <Check className="w-3 h-3 text-[#38BDF8]" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === 'target' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                    </div>

                    {/* Pending / Verification State Banner */}
                    <div className="p-4 rounded-2xl bg-[#070C16] border border-[#F8FAFC]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {selectedDepForDomain.dnsStatus === 'verified' ? (
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center shrink-0">
                            <span className="w-3 h-3 rounded-full bg-[#38BDF8] animate-ping" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#F8FAFC] flex items-center gap-1.5">
                            <span>
                              {selectedDepForDomain.dnsStatus === 'verified'
                                ? 'DNS Record Verified & Active'
                                : 'Verifying DNS Propagation...'}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#F8FAFC]/60 mt-0.5">
                            {selectedDepForDomain.dnsStatus === 'verified'
                              ? 'Wildcard TLS 1.3 certificate successfully issued. Serving live worldwide.'
                              : 'Listening across global edge resolvers. Propagation usually completes in 10-60 seconds.'}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleVerifyDns}
                        disabled={isVerifyingDns}
                        className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-[#0B1220] bg-[#38BDF8] hover:bg-[#38BDF8]/90 transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-sm active:scale-95 disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isVerifyingDns ? 'animate-spin' : ''}`} />
                        <span>{isVerifyingDns ? 'Checking...' : 'Check Status'}</span>
                      </button>
                    </div>

                  </motion.div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="bg-[#F8FAFC] px-5 sm:px-7 py-3.5 border-t border-[#0B1220]/8 flex items-center justify-end gap-2.5">
                <button
                  onClick={() => setIsDomainModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#0B1220] bg-white border border-[#0B1220]/10 hover:bg-[#F1F5F9] transition-all cursor-pointer shadow-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
