'use client';

import React, { createContext, useContext, useEffect, useCallback, useSyncExternalStore } from 'react';

export type Language = 'en' | 'ar';

function subscribeLang(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('hyptrix-lang-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('hyptrix-lang-change', callback);
  };
}

function getLangSnapshot(): Language {
  try {
    const val = localStorage.getItem('hyptrix_lang');
    return val === 'ar' ? 'ar' : 'en';
  } catch {
    return 'en';
  }
}

function getServerLangSnapshot(): Language {
  return 'en';
}

interface Translations {
  // Navigation
  navFeatures: string;
  navPricing: string;
  navDeploy: string;
  navAbout: string;
  navContact: string;
  navDeployNow: string;

  // Hero
  heroBadge: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroSubheadline: string;
  heroCtaPrimary: string;
  heroStat1: string;
  heroStat1Label: string;
  heroStat2: string;
  heroStat2Label: string;
  heroStat3: string;
  heroStat3Label: string;
  heroStat4: string;
  heroStat4Label: string;

  // Core Engine (Deployment Flight-Deck)
  engineTag: string;
  engineTitle: string;
  engineSubtitle: string;
  engineProjectLabel: string;
  engineSslBadge: string;
  engineDropTitle: string;
  engineDropSubtitle: string;
  engineDeployBtn: string;
  engineDeployingTitle: string;
  engineSuccessTitle: string;
  engineSuccessSubtitle: string;
  engineAssignedUrl: string;
  engineCopyUrl: string;
  engineCopied: string;
  engineVisitBtn: string;
  engineDeployAnother: string;

  // The 4 Core Architectural Pillars
  featuresTag: string;
  featuresTitle: string;
  featuresSubtitle: string;

  feat1Title: string;
  feat1Desc: string;
  feat1Badge: string;

  feat2Title: string;
  feat2Desc: string;
  feat2Badge: string;

  feat3Title: string;
  feat3Desc: string;
  feat3Badge: string;

  feat4Title: string;
  feat4Desc: string;
  feat4Badge: string;

  // Target Audience (Engineered For)
  audienceTag: string;
  audienceTitle: string;
  audienceSubtitle: string;
  aud1Title: string;
  aud1Desc: string;
  aud2Title: string;
  aud2Desc: string;
  aud3Title: string;
  aud3Desc: string;

  // Comparison Section
  compTag: string;
  compTitle: string;
  compSubtitle: string;
  compHyptrixHeader: string;
  compOtherHeader: string;

  // Footer
  footerDesc: string;
  footerRights: string;
  footerPrivacy: string;
  footerTerms: string;
  footerContact: string;
}

const translations: Record<Language, Translations> = {
  en: {
    navFeatures: 'Capabilities',
    navPricing: 'Pricing & Plans',
    navDeploy: 'Deploy Dashboard',
    navAbout: 'Platform',
    navContact: 'Direct Inquiries',
    navDeployNow: 'Launch Deployment',

    heroBadge: 'NEXT-GENERATION GLOBAL EDGE CLOUD',
    heroHeadline1: 'Deploy Web Applications at Exceptional Speed.',
    heroHeadline2: 'Zero Bandwidth Surcharges.',
    heroSubheadline: 'The premier global Edge Cloud engineered to host modern web applications with sub-millisecond precision. Eliminate complex server overhead, enjoy predictable economics, and deploy in seconds.',
    heroCtaPrimary: 'Deploy Your Project',
    heroStat1: '< 5 Seconds',
    heroStat1Label: 'Deploy from .Zip to Live',
    heroStat2: 'Global Edge',
    heroStat2Label: 'Replicated in Egypt, US & Japan',
    heroStat3: 'Object Storage',
    heroStat3Label: 'Predictable Bandwidth Storage',
    heroStat4: 'Zero Config',
    heroStat4Label: 'No Server Administration Needed',

    engineTag: 'INSTANT ZIP DEPLOYMENT DASHBOARD',
    engineTitle: 'Deploy Your Application in Under 5 Seconds',
    engineSubtitle: 'No terminal configuration. No server management. Drag your raw .zip package into Hyptrix to automatically extract, encrypt, and broadcast across our global edge infrastructure.',
    engineProjectLabel: 'Select Your Project Name',
    engineSslBadge: 'AUTOMATED HTTPS',
    engineDropTitle: 'Drop your project .zip package here',
    engineDropSubtitle: 'Raw, instant deployment of your own production .zip archive',
    engineDeployBtn: 'Extract & Broadcast Across Global Edge',
    engineDeployingTitle: 'EXTRACTING, ENCRYPTING & DISTRIBUTING GLOBALLY',
    engineSuccessTitle: 'Your Application is Active Worldwide',
    engineSuccessSubtitle: 'Synchronized across our global edge nodes. Configured to handle millions of requests with predictable, transparent billing.',
    engineAssignedUrl: 'PRODUCTION ANYCAST DOMAIN',
    engineCopyUrl: 'Copy URL',
    engineCopied: 'Copied',
    engineVisitBtn: 'Open Live Application',
    engineDeployAnother: 'Deploy Another Project',

    featuresTag: 'CORE ARCHITECTURAL PILLARS',
    featuresTitle: 'Engineered for Unmatched Precision & Scale',
    featuresSubtitle: 'We focus on four foundational architectural pillars that deliver seamless global performance, total pricing transparency, and zero operational friction.',

    feat1Title: 'Zero-Config Simplicity',
    feat1Desc: 'Deploy without terminal commands or server configuration. Drag a .zip package into the interface, and our engine extracts, encrypts, and broadcasts your application across the edge in under 5 seconds.',
    feat1Badge: 'UNDER 5 SECONDS',

    feat2Title: 'Global Edge Distribution',
    feat2Desc: 'Applications are replicated across a worldwide network of edge nodes. Whether visited from Egypt, the United States, or Japan, your content loads in milliseconds from the geographically nearest node.',
    feat2Badge: 'WORLDWIDE CLONES',

    feat3Title: 'Instant Wildcard Subdomains',
    feat3Desc: 'The moment your package uploads, you receive an active, professional domain (e.g., project.hyptrix.com) protected by automated TLS 1.3 encryption with zero DNS propagation delay.',
    feat3Badge: 'ZERO WAIT DNS',

    feat4Title: 'Zero Bandwidth Surcharges',
    feat4Desc: 'Built on modern, high-throughput object storage architecture, your projects absorb traffic surges without unexpected bandwidth penalties or fluctuating monthly invoices.',
    feat4Badge: 'ENTERPRISE STORAGE',

    audienceTag: 'ENGINEERED FOR BUILDERS & TEAMS',
    audienceTitle: 'Tailored for High-Velocity Creators',
    audienceSubtitle: 'Designed specifically to eliminate server administration and unpredictable overage costs for three core groups.',

    aud1Title: 'Web Developers',
    aud1Desc: 'Deploy modern web applications in seconds without DevOps complexity or server management.',

    aud2Title: 'Growth Startups',
    aud2Desc: 'Deliver enterprise-grade stability and worldwide performance with reliable, transparent infrastructure costs as your audience expands.',

    aud3Title: 'Designers & Agencies',
    aud3Desc: 'Deliver client websites with instant staging URLs and seamless client presentations in a polished, reliable environment.',

    compTag: 'TRANSPARENT ECONOMICS',
    compTitle: 'Predictable Value by Design',
    compSubtitle: 'Traditional hosting models frequently introduce complex tier limits and unpredictable bandwidth overages. Hyptrix provides straightforward, transparent infrastructure.',
    compHyptrixHeader: 'HYPTRIX (EDGE CLOUD)',
    compOtherHeader: 'Traditional Cloud Hosts',

    footerDesc: 'The premier next-generation Edge Cloud platform built for high-performance web applications with predictable bandwidth economics.',
    footerRights: 'All rights reserved.',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerContact: 'Direct Inquiries',
  },
  ar: {
    navFeatures: 'المعمارية السحابية',
    navPricing: 'الباقات والأسعار',
    navDeploy: 'لوحة النشر',
    navAbout: 'عن المنصة',
    navContact: 'تواصل مباشر',
    navDeployNow: 'إطلاق المشروع',

    heroBadge: 'المنصة العالمية الرائدة لاستضافة تطبيقات ومواقع الويب',
    heroHeadline1: 'انشر تطبيقات الويب بأعلى سرعة هندسية.',
    heroHeadline2: 'دون أي رسوم بيانات مفاجئة.',
    heroSubheadline: 'الجيل القادم من السحابة العالمية المصممة لاستضافة مواقع وتطبيقات الويب بدقة متناهية وسرعة فورية. تخلص من تعقيدات إدارة الخوادم، وتمتع باستقرار كامل وتكلفة واضحة وثابتة.',
    heroCtaPrimary: 'اسحب ملف مشروعك وانشر فوراً',
    heroStat1: 'أقل من 5 ثوانٍ',
    heroStat1Label: 'من ملف Zip إلى رابط حي مباشر',
    heroStat2: 'حافة عالمية حقيقية',
    heroStat2Label: 'موزع في مصر، أمريكا، واليابان',
    heroStat3: 'تخزين كائني متقدم',
    heroStat3Label: 'بنية استهلاك واضحة وثابتة',
    heroStat4: 'صفر إعدادات خوادم',
    heroStat4Label: 'دون أوامر طرفية أو تعقيد',

    engineTag: 'لوحة الإطلاق الفوري لملفات ZIP',
    engineTitle: 'انشر تطبيقك في أقل من 5 ثوانٍ',
    engineSubtitle: 'لا تحتاج لأوامر برمجية أو إعدادات خوادم. اسحب ملف الـ .zip داخل الواجهة، وسيتولى محرك هيبتريكس فك الضغط والتشفير والنشر عبر السحابة العالمية فوراً.',
    engineProjectLabel: 'حدد اسم مشروعك المميز',
    engineSslBadge: 'حماية وتشفير فوري',
    engineDropTitle: 'اسحب ملف مشروعك (.zip) هنا',
    engineDropSubtitle: 'نشر خام ومباشر لملفاتك دون أي قوالب مسبقة أو حزم خارجية',
    engineDeployBtn: 'فك الضغط وإطلاق الموقع عالمياً',
    engineDeployingTitle: 'جاري فك الضغط، التشفير، والنشر عبر شبكة الحافة العالمية...',
    engineSuccessTitle: 'تطبيقك حي ويعمل عالمياً الآن',
    engineSuccessSubtitle: 'تم استنساخ موقعك عبر شبكة الحافة العالمية، وهو جاهز لاستقبال ملايين الزيارات مع وضوح تام في التكاليف وبلا مفاجآت.',
    engineAssignedUrl: 'عنوان موقعك الرسمي المباشر',
    engineCopyUrl: 'نسخ الرابط',
    engineCopied: 'تم النسخ',
    engineVisitBtn: 'زيارة الموقع الحي',
    engineDeployAnother: 'نشر مشروع جديد',

    featuresTag: 'الركائز الهندسية الأساسية',
    featuresTitle: 'أربعة محاور معمارية مصممة لأعلى أداء',
    featuresSubtitle: 'نركز على أربع ركائز هندسية متطورة تمنحك سرعة فائقة عالمياً، وشفافية تسعير تامة، وتجربة نشر سلسة وخالية من أي تعقيد.',

    feat1Title: 'سلاسة النشر بلا إعدادات (Zero-Config)',
    feat1Desc: 'انشر مشاريعك دون الحاجة لأوامر طرفية أو إدارة خوادم. اسحب ملف .zip فقط إلى واجهة الاستخدام، وسيقوم المحرك بفك الضغط والتشفير والنشر في أقل من 5 ثوانٍ.',
    feat1Badge: 'أقل من 5 ثوانٍ',

    feat2Title: 'التوزيع الجغرافي على الحافة العالمية',
    feat2Desc: 'يتم توزيع نسخ متطابقة من موقعك عبر شبكة عالمية من مراكز الحافة. سواء فتح الزائر موقعك من مصر، أو أمريكا، أو اليابان، فإنه يحمل في أجزاء من الثانية من أقرب خادم جغرافي.',
    feat2Badge: 'استنساخ عالمي متزامن',

    feat3Title: 'نطاقات فرعية فورية مع تشفير تلقائي',
    feat3Desc: 'بمجرد اكتمال الرفع، تحصل على رابط رسمي مباشر (مثل project.hyptrix.com) مدعم بحماية وتشفير TLS 1.3 فوري ودون فترات انتظار لتحديثات DNS.',
    feat3Badge: 'رابط مباشر مع تشفير',

    feat4Title: 'انعدام رسوم نقل البيانات المفاجئة',
    feat4Desc: 'بفضل بنيتنا التحتية المعتمدة على تقنيات التخزين الكائني الحديثة، تستوعب مواقعك زيادات الزيارات الكبيرة دون فواتير نقل بيانات مبالغ فيها أو تكاليف غير متوقعة.',
    feat4Badge: 'تخزين عالي الكفاءة',

    audienceTag: 'مصممة للفرق والمبدعين',
    audienceTitle: 'حلول متكاملة لرواد التطوير الرقمي',
    audienceSubtitle: 'صممنا المنصة لتوفير بيئة نشر سريعة وموثوقة لثلاث فئات أساسية.',

    aud1Title: 'مطوروا البرمجيات والويب',
    aud1Desc: 'نشر فوري لتطبيقات ومواقع الويب دون الدخول في تفاصيل إدارة الخوادم وأدوات البنية التحتية المعقدة.',

    aud2Title: 'الشركات الناشئة سريعة النمو',
    aud2Desc: 'أداء عالمي فائق واستقرار كامل مع تكاليف بنية تحتية واضحة ومستقرة تماماً مع نمو أعداد الزوار.',

    aud3Title: 'المصممون والوكالات الإبداعية',
    aud3Desc: 'استضافة مواقع العملاء وتقديم روابط معاينة حية واحترافية في ثوانٍ معدودة وبكل موثوقية.',

    compTag: 'اقتصاديات واضحة ومستقرة',
    compTitle: 'قيمة موثوقة ونموذج شفاف',
    compSubtitle: 'النماذج التقليدية غالباً ما تبدأ بحدود مجانية غير واضحة ثم تفرض فواتير باهظة عند زيادة الزيارات. هيبتريكس تمنحك استقراراً تاماً.',
    compHyptrixHeader: 'هيبتريكس (سحابة الحافة)',
    compOtherHeader: 'الاستضافات السحابية التقليدية',

    footerDesc: 'المنصة العالمية الرائدة لاستضافة تطبيقات ومواقع الويب بأعلى سرعة هندسية واقتصاديات واضحة ومستقرة.',
    footerRights: 'جميع الحقوق محفوظة.',
    footerPrivacy: 'سياسة الخصوصية',
    footerTerms: 'شروط الخدمة',
    footerContact: 'تواصل مباشر',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
  isRtl: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribeLang, getLangSnapshot, getServerLangSnapshot);

  const setLanguage = useCallback((lang: Language) => {
    try {
      localStorage.setItem('hyptrix_lang', lang);
      window.dispatchEvent(new Event('hyptrix-lang-change'));
    } catch {
      // Ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
    isRtl: language === 'ar',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
