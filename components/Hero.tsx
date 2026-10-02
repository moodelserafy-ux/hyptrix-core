'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { 
  Zap, 
  Globe, 
  UploadCloud,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface EdgeNode {
  code: string;
  city: string;
  ping: number;
  coordinates: { x: number; y: number };
}

const GLOBAL_NODES: EdgeNode[] = [
  { code: 'CAI-01', city: 'Cairo, Egypt', ping: 4.8, coordinates: { x: 57, y: 44 } },
  { code: 'IAD-01', city: 'Ashburn, US', ping: 3.2, coordinates: { x: 26, y: 38 } },
  { code: 'NRT-01', city: 'Tokyo, Japan', ping: 8.8, coordinates: { x: 84, y: 36 } },
  { code: 'LHR-01', city: 'London, UK', ping: 4.4, coordinates: { x: 48, y: 30 } },
  { code: 'FRA-02', city: 'Frankfurt, DE', ping: 5.1, coordinates: { x: 53, y: 32 } },
  { code: 'DXB-01', city: 'Dubai, UAE', ping: 6.2, coordinates: { x: 64, y: 46 } },
];

export default function Hero() {
  const router = useRouter();
  const [activeNode, setActiveNode] = useState<EdgeNode>(GLOBAL_NODES[0]);
  const [isSimulatingPacket, setIsSimulatingPacket] = useState(false);
  const [isHoveringDrop, setIsHoveringDrop] = useState(false);
  const { t, isRtl, language } = useLanguage();

  const dispatchProbe = (node: EdgeNode) => {
    setActiveNode(node);
    setIsSimulatingPacket(true);
    setTimeout(() => setIsSimulatingPacket(false), 700);
  };

  const handleLaunchDeploy = () => {
    router.push('/deploy');
  };

  return (
    <section className="relative pt-28 sm:pt-36 md:pt-44 pb-14 sm:pb-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        
        {/* Asymmetrical High-Tension Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Wing: Luxurious Display Typography & Professional Value Prop (7 cols) */}
          <div className="lg:col-span-7 text-start space-y-5 sm:space-y-7 min-w-0 w-full">
            
            {/* Distinguished Status Capsule */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex flex-wrap items-center gap-2 max-w-full px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#0B1220]/10 bg-white/80 backdrop-blur-md shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold tracking-wider text-[#0B1220] uppercase truncate max-w-[200px] sm:max-w-none">
                {t.heroBadge}
              </span>
              <span className="text-[#A78BFA] text-[9px] sm:text-xs font-mono font-bold shrink-0">
                · OBJECT STORAGE
              </span>
            </motion.div>

            {/* Heavy Artillery Text (#0B1220 - Deep Navy): Pure Executive Authority */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#0B1220] leading-[1.12] sm:leading-[1.08] break-words"
            >
              {t.heroHeadline1}{' '}
              <span className="text-[#0B1220] relative inline-block">
                <span className="relative z-10">{t.heroHeadline2}</span>
                <span className="absolute bottom-1.5 left-0 right-0 h-3 bg-gradient-to-r from-[#38BDF8]/25 to-[#A78BFA]/25 -z-0 rounded-sm" />
              </span>
            </motion.h1>

            {/* The Reading Layer (#475569 - Slate): Comfortable reading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-[#475569] max-w-2xl font-normal leading-relaxed break-words"
            >
              {t.heroSubheadline}
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1 w-full"
            >
              <button
                onClick={handleLaunchDeploy}
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-black text-[#F8FAFC] bg-[#0B1220] hover:bg-[#0B1220]/90 transition-all duration-200 shadow-[0_8px_25px_rgba(11,18,32,0.18)] flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 shrink-0"
              >
                <Zap className="w-4 h-4 fill-[#38BDF8] text-[#38BDF8] shrink-0" />
                <span>{t.heroCtaPrimary}</span>
              </button>

              <Link
                href="/pricing"
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold font-mono text-[#475569] bg-white border border-[#0B1220]/12 hover:border-[#38BDF8] hover:text-[#0B1220] transition-all text-center flex items-center justify-center gap-2 active:scale-95 shrink-0 shadow-sm"
              >
                <span>View Transparent Pricing</span>
              </Link>
            </motion.div>

            {/* Interactive Fast-Redirect Upload Launcher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsHoveringDrop(true);
              }}
              onDragLeave={() => setIsHoveringDrop(false)}
              onDrop={(e) => {
                e.preventDefault();
                handleLaunchDeploy();
              }}
              onClick={handleLaunchDeploy}
              className={`rounded-2xl border-2 border-dashed p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer transition-all duration-200 w-full min-w-0 shadow-sm ${
                isHoveringDrop
                  ? 'border-[#38BDF8] bg-[#38BDF8]/10 scale-[1.01]'
                  : 'border-[#0B1220]/15 bg-white/80 hover:border-[#38BDF8] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3 w-full min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[#F1F5F9] border border-[#0B1220]/8 flex items-center justify-center text-[#38BDF8] shrink-0">
                  <UploadCloud className="w-5 h-5 shrink-0" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-bold text-[#0B1220] leading-snug break-words">
                    {language === 'ar'
                      ? 'اسحب وأفلت ملف مشروعك (.zip) هنا أو اضغط للفتح'
                      : 'Drag and drop your project file (.zip) or Click to upload'}
                  </div>
                  <div className="text-[11px] text-[#38BDF8] font-mono mt-0.5 leading-tight break-words font-semibold">
                    {language === 'ar'
                      ? 'ينقلك مباشرة للوحة النشر الفوري المخصصة'
                      : 'Instantly opens the dedicated Deployment Dashboard →'}
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-bold text-[#64748B] shrink-0">
                <span>OPEN CONSOLE</span>
                <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
              </div>
            </motion.div>

            {/* Authoritative Verified Indices (Responsive Mobile Card Grid) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="pt-4 sm:pt-5 border-t border-[#0B1220]/10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 text-xs font-mono w-full min-w-0"
            >
              <div className="p-2.5 sm:p-0 rounded-xl bg-white sm:bg-transparent border border-[#0B1220]/8 sm:border-0 min-w-0 shadow-sm sm:shadow-none">
                <div className="text-[#64748B] text-[9px] sm:text-[10px] uppercase font-bold truncate">SPEED</div>
                <div className="text-xs sm:text-base font-black text-[#0B1220] mt-0.5 tabular-nums truncate">{t.heroStat1}</div>
                <div className="text-[9px] sm:text-[10px] text-[#475569] mt-0.5 leading-tight break-words">{t.heroStat1Label}</div>
              </div>
              <div className="p-2.5 sm:p-0 rounded-xl bg-white sm:bg-transparent border border-[#0B1220]/8 sm:border-0 min-w-0 shadow-sm sm:shadow-none">
                <div className="text-[#64748B] text-[9px] sm:text-[10px] uppercase font-bold truncate">TOPOLOGY</div>
                <div className="text-xs sm:text-base font-black text-[#0B1220] mt-0.5 truncate">{t.heroStat2}</div>
                <div className="text-[9px] sm:text-[10px] text-[#475569] mt-0.5 leading-tight break-words">{t.heroStat2Label}</div>
              </div>
              <div className="p-2.5 sm:p-0 rounded-xl bg-white sm:bg-transparent border border-[#0B1220]/8 sm:border-0 min-w-0 shadow-sm sm:shadow-none">
                <div className="text-[#64748B] text-[9px] sm:text-[10px] uppercase font-bold truncate">BANDWIDTH</div>
                <div className="text-xs sm:text-base font-black text-[#0B1220] mt-0.5 truncate">{t.heroStat3}</div>
                <div className="text-[9px] sm:text-[10px] text-[#475569] mt-0.5 leading-tight break-words">{t.heroStat3Label}</div>
              </div>
              <div className="p-2.5 sm:p-0 rounded-xl bg-white sm:bg-transparent border border-[#0B1220]/8 sm:border-0 min-w-0 shadow-sm sm:shadow-none">
                <div className="text-[#64748B] text-[9px] sm:text-[10px] uppercase font-bold truncate">CONFIG</div>
                <div className="text-xs sm:text-base font-black text-[#0B1220] mt-0.5 truncate">{t.heroStat4}</div>
                <div className="text-[9px] sm:text-[10px] text-[#475569] mt-0.5 leading-tight break-words">{t.heroStat4Label}</div>
              </div>
            </motion.div>

          </div>

          {/* Right Wing: Interactive Anycast Edge Telemetry Stage (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full min-w-0"
          >
            <div className="rounded-3xl bg-white border border-[#0B1220]/10 p-4 sm:p-6 shadow-[0_20px_50px_rgba(11,18,32,0.06)] relative overflow-hidden backdrop-blur-xl">
              
              <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#0B1220]/8 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Globe className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-mono font-black text-[#0B1220] uppercase tracking-wider truncate">
                    GLOBAL EDGE TOPOLOGY
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#38BDF8]/15 text-[#0B1220] border border-[#38BDF8]/30 shrink-0">
                  ANYCAST ACTIVE
                </span>
              </div>

              {/* Node Selectors */}
              <div className="space-y-1.5 mb-4 sm:mb-5">
                <div className="text-[10px] sm:text-[11px] font-mono text-[#64748B] uppercase mb-2 font-bold">
                  SELECT GEOGRAPHICAL NODE:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {GLOBAL_NODES.map((node) => {
                    const isSelected = activeNode.code === node.code;
                    return (
                      <button
                        key={node.code}
                        onClick={() => dispatchProbe(node)}
                        className={`p-2 sm:p-2.5 rounded-xl border font-mono text-xs flex items-center justify-between transition-all cursor-pointer min-w-0 active:scale-95 ${
                          isSelected
                            ? 'bg-[#38BDF8]/15 border-[#38BDF8] text-[#0B1220] font-black shadow-sm'
                            : 'bg-[#F8FAFC] border-[#0B1220]/8 hover:border-[#0B1220]/20 text-[#475569]'
                        }`}
                      >
                        <span className="font-bold truncate text-[11px] sm:text-xs">{node.code}</span>
                        <span className={`text-[10px] tabular-nums shrink-0 ml-1 ${isSelected ? 'text-[#0B1220] font-black' : 'text-[#64748B]'}`}>
                          {node.ping}ms
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Telemetry Visualizer Frame (High-Contrast Precision Screen) */}
              <div className="relative h-36 sm:h-44 rounded-2xl bg-[#0B1220] border border-[#0B1220]/15 overflow-hidden mb-3.5 sm:mb-4 p-3.5 sm:p-4 flex flex-col justify-between text-[#F8FAFC] shadow-inner">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#F8FAFC]/50">
                  <span>ROUTE: ANYCAST BGP</span>
                  <span className="text-[#38BDF8] font-bold">TLS 1.3 0-RTT</span>
                </div>

                {/* Simulated Waveform & Ping Beacon */}
                <div className="relative flex items-center justify-center my-auto">
                  <div className="absolute w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#38BDF8]/15 animate-ping pointer-events-none" />
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#070B14] border-2 border-[#38BDF8] flex flex-col items-center justify-center z-10 shadow-lg shrink-0">
                    <span className="text-xs sm:text-sm font-black text-[#F8FAFC] tabular-nums">
                      {activeNode.ping}
                    </span>
                    <span className="text-[7px] sm:text-[9px] text-[#38BDF8] font-mono uppercase font-bold">
                      ms TTFB
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-[#F8FAFC]/70 gap-2">
                  <span className="truncate max-w-[130px] sm:max-w-[190px]">TARGET: {activeNode.city}</span>
                  <span className="text-[#38BDF8] flex items-center gap-1 font-bold shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-[#38BDF8] shrink-0" /> READY
                  </span>
                </div>

                {isSimulatingPacket && (
                  <div className="absolute inset-x-0 bottom-3 text-center px-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/40 text-[9px] sm:text-[10px] font-mono text-[#38BDF8] font-bold max-w-full truncate">
                      <Zap className="w-3 h-3 animate-spin shrink-0" /> SYNCHRONIZING WITH {activeNode.code}...
                    </span>
                  </div>
                )}
              </div>

              {/* Active Node Live Telemetry */}
              <div className="p-3 sm:p-4 rounded-2xl bg-[#F8FAFC] border border-[#0B1220]/8 font-mono text-xs space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2">
                  <span className="text-[#64748B] text-[10px] sm:text-[11px] truncate font-bold">GEOGRAPHICAL NODE:</span>
                  <span className="text-[#0B1220] font-black truncate">{activeNode.city}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2">
                  <span className="text-[#64748B] text-[10px] sm:text-[11px] truncate font-bold">MEASURED TTFB SPEED:</span>
                  <span className="text-[#0B1220] font-black tabular-nums text-xs sm:text-sm">
                    {activeNode.ping} ms
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2">
                  <span className="text-[#64748B] text-[10px] sm:text-[11px] truncate font-bold">STORAGE ARCHITECTURE:</span>
                  <span className="text-[#0B1220] font-black text-[10px] sm:text-xs truncate">Enterprise Object Storage</span>
                </div>
              </div>

              <div className="mt-3 pt-2 text-center">
                <Link
                  href="/features"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1220] hover:text-[#38BDF8] transition-colors"
                >
                  <span>Explore All Core Capabilities</span>
                </Link>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
