
import React, { useEffect, useRef } from 'react';
import { 
  ArrowRight, UserCheck, Scissors, ShoppingBag, Star, Zap, 
  Globe, Sparkles, CheckCircle2, MapPin, Search, ChevronRight,
  ShieldCheck, ShoppingCart, BarChart3, Mail, Code
} from 'lucide-react';
import { Language } from '../types';

interface HomeProps {
  onTryDemo: () => void;
  lang: Language;
}

export const Home: React.FC<HomeProps> = ({ onTryDemo, lang }) => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const collectionItems = [
    { title: "Summer Kurtas", category: "Men", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80", tag: "Hot Seller" },
    { title: "Silk Abayas", category: "Women", img: "https://images.unsplash.com/photo-1621340450512-9c16922a7f5a?auto=format&fit=crop&w=600&q=80", tag: "Luxury" },
    { title: "Oxford Shirts", category: "Men", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80", tag: "Formal" },
    { title: "Lawn Collection", category: "Women", img: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&w=600&q=80", tag: "Digital Print" },
  ];

  const t = {
    en: {
      heroTitle: "Experience Fashion Before You Buy.",
      heroDesc: "The UK-Pakistan pioneer in digital dressing rooms. Use AI to create a unique avatar and try on local styles with pixel-perfect accuracy.",
      cta: "Launch Virtual Try-On",
      collectionsTitle: "Browse Try-On Collections",
      aboutTitle: "London Strategy & Lahore Code",
      aboutDesc: "AiForge unites British fashion visionaries with Pakistani neural engineering. We are digitizing the drapes, fabrics, and fit of South Asian fashion for the world.",
      pricingTitle: "Smart SaaS Plans",
    },
    ur: {
      heroTitle: "خریدنے سے پہلے فیشن کا تجربہ کریں۔",
      heroDesc: "ڈیجیٹل ڈریسنگ رومز میں برطانیہ اور پاکستان کا علمبردار۔ اپنا اوتار بنانے کے لیے AI کا استعمال کریں اور بہترین درستگی کے ساتھ مقامی لباس آزمائیں۔",
      cta: "ورچوئل ٹرائی آن شروع کریں",
      collectionsTitle: "ٹرائی آن کلیکشن دیکھیں",
      aboutTitle: "لندن کی حکمت عملی، لاہور کا کوڈ",
      aboutDesc: "AiForge برطانوی فیشن ماہرین کو پاکستانی نیورل انجینئرنگ کے ساتھ جوڑتا ہے۔ ہم جنوبی ایشیائی فیشن کے لباس اور کپڑوں کو دنیا کے لیے ڈیجیٹل بنا رہے ہیں۔",
      pricingTitle: "اسمارٹ SaaS پلانز",
    }
  }[lang];

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-white">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/40 skew-x-[-15deg] translate-x-32"></div>
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-[180px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`${lang === 'ur' ? 'text-right lg:order-last' : 'text-left'}`}>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-indigo-600 text-white font-black text-[11px] uppercase tracking-[0.3em] mb-10 shadow-xl shadow-indigo-100">
                <Globe className="w-4 h-4" />
                <span>Launching First in Pakistan</span>
              </div>
              
              <h1 className={`text-6xl lg:text-[5.5rem] font-black text-slate-900 leading-[1] mb-10 tracking-tighter ${lang === 'ur' ? 'font-urdu' : ''}`}>
                {t.heroTitle}<br />
                <span className="animate-word word-1 text-indigo-600">Drag.</span>{' '}
                <span className="animate-word word-2 text-indigo-600">Drop.</span>{' '}
                <span className="animate-word word-3 text-indigo-600">Dress.</span>{' '}
                <span className="animate-word word-4 text-indigo-600">Done.</span>
              </h1>
              
              <p className="text-2xl text-slate-500 mb-14 max-w-xl leading-relaxed font-medium">
                {t.heroDesc}
              </p>

              <button 
                onClick={onTryDemo}
                className="bg-slate-900 text-white px-14 py-8 rounded-[3rem] font-black text-2xl hover:bg-indigo-600 transition-all shadow-2xl flex items-center justify-center group active:scale-95"
              >
                {t.cta}
                <ArrowRight className={`ml-4 w-7 h-7 group-hover:translate-x-3 transition-transform ${lang === 'ur' ? 'rotate-180 mr-4 ml-0' : ''}`} />
              </button>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative bg-white rounded-[5rem] shadow-2xl border-[16px] border-white overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80" 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000" 
                  alt="AI Avatar Dressing" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-16 left-12 right-12 glass p-10 rounded-[3rem] shadow-2xl animate-float">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-indigo-600 font-black uppercase tracking-[0.25em] mb-3">Neural Scan v3.0</p>
                      <h4 className="text-3xl font-black text-slate-900 tracking-tight">98.7% Accuracy</h4>
                    </div>
                    <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-xl">
                      <Sparkles className="text-white w-10 h-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS SECTION */}
      <section className="py-40 reveal" ref={el => sectionRefs.current[0] = el}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div className={lang === 'ur' ? 'text-right' : 'text-left'}>
              <span className="text-indigo-600 font-black text-sm uppercase tracking-[0.3em] mb-6 block">Curated Styles</span>
              <h2 className={`text-6xl font-black text-slate-900 tracking-tighter ${lang === 'ur' ? 'font-urdu' : ''}`}>{t.collectionsTitle}</h2>
            </div>
            <button onClick={onTryDemo} className="flex items-center gap-4 bg-slate-100 px-10 py-5 rounded-[2rem] font-black text-sm hover:bg-slate-200 transition-all uppercase tracking-widest group">
              View Stage
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {collectionItems.map((item, i) => (
              <div key={i} onClick={onTryDemo} className="group cursor-pointer">
                <div className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.title} />
                  <div className="absolute top-8 left-8">
                    <span className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-xl">{item.tag}</span>
                  </div>
                </div>
                <div className={lang === 'ur' ? 'text-right' : ''}>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.category}</p>
                  <h4 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORIGIN STORY (LAHORE IMAGE PROMINENT) */}
      <section className="py-48 bg-slate-50 reveal" ref={el => sectionRefs.current[1] = el}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 items-center">
            <div className="relative">
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <div className="rounded-[4rem] overflow-hidden shadow-2xl h-80 border-8 border-white">
                      <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="London" />
                    </div>
                  </div>
                  <div className="space-y-8 pt-20">
                    <div className="rounded-[4rem] overflow-hidden shadow-2xl h-96 border-8 border-white relative group">
                      <img src="https://images.unsplash.com/photo-1610486716075-f5b2b2b1b3b1?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Lahore Hub" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 text-white font-black text-sm uppercase tracking-widest">Lahore Hub</div>
                    </div>
                  </div>
               </div>
               <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-indigo-100/50 rounded-full blur-[150px]"></div>
            </div>

            <div className={lang === 'ur' ? 'text-right' : 'text-left'}>
              <span className="text-indigo-600 font-black text-sm uppercase tracking-[0.4em] mb-10 block">Global Heritage</span>
              <h2 className={`text-6xl lg:text-7xl font-black text-slate-900 mb-12 tracking-tighter leading-[1.05] ${lang === 'ur' ? 'font-urdu' : ''}`}>
                {t.aboutTitle}
              </h2>
              <p className="text-2xl text-slate-500 font-medium leading-relaxed mb-12">{t.aboutDesc}</p>
              <div className="p-12 bg-white border border-slate-100 rounded-[4rem] shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="absolute left-0 top-0 w-3 h-full bg-indigo-600"></div>
                <p className="italic text-slate-900 font-black text-3xl tracking-tight leading-snug">
                  "We're digitalizing the soul of South Asian fashion, making 'perfect fit' a standard, not a luxury."
                </p>
                <div className="mt-10 flex items-center gap-6">
                  <div className="w-16 h-16 bg-slate-100 rounded-full p-1"><img src="https://i.pravatar.cc/100?u=ayesha" className="rounded-full" alt="CEO" /></div>
                  <div>
                    <p className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Ayesha Siddiqua</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">CEO, AiForge</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SaaS FEATURES & PRICING */}
      <section className="py-48 bg-slate-900 text-white overflow-hidden reveal" ref={el => sectionRefs.current[2] = el}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-32">
            <h2 className="text-6xl font-black mb-10 tracking-tighter">Empower Your Brand</h2>
            <p className="text-slate-400 text-2xl max-w-4xl mx-auto font-medium leading-relaxed">Join 200+ Pakistani boutiques using AiForge to slash returns and boost conversions.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 items-center mb-48">
             <div className="space-y-12">
               {[
                 { title: 'Conversion Boost', desc: 'Customers are 3x more likely to buy when they see the fit.', icon: <ShoppingCart className="w-12 h-12" /> },
                 { title: 'Return Reduction', desc: 'Reduce sizing-related returns by up to 65% instantly.', icon: <Zap className="w-12 h-12" /> },
                 { title: 'Real-time Analytics', desc: 'Understand body dimension trends in the South Asian market.', icon: <BarChart3 className="w-12 h-12" /> },
               ].map((b, idx) => (
                 <div key={idx} className="flex gap-10 group">
                    <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center flex-shrink-0 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">{b.icon}</div>
                    <div>
                      <h4 className="text-3xl font-black mb-4 tracking-tight">{b.title}</h4>
                      <p className="text-slate-400 text-xl leading-relaxed">{b.desc}</p>
                    </div>
                 </div>
               ))}
             </div>
             <div className="relative bg-[#0f172a] rounded-[5rem] p-14 shadow-2xl border border-white/10">
                <div className="flex gap-3 mb-10"><div className="w-4 h-4 rounded-full bg-red-500"></div><div className="w-4 h-4 rounded-full bg-yellow-500"></div><div className="w-4 h-4 rounded-full bg-green-500"></div></div>
                <div className="flex items-center gap-5 mb-10 pb-10 border-b border-white/5">
                   <Code className="text-indigo-500 w-8 h-8" /><span className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-500">Merchant Widget Integration</span>
                </div>
                <pre className="text-indigo-400 text-lg font-mono leading-loose overflow-x-auto no-scrollbar">
{`<!-- AiForge Try-On -->
<script src="https://cdn.aiforge.pk/v3.js"></script>
<script>
  AiForge.mount({
    merchantId: 'BOUTIQUE-PK',
    productSku: 'lawn-2025'
  });
</script>`}
                </pre>
             </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="bg-slate-900 rounded-[6rem] p-28 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[160px]"></div>
             <div className="relative z-10 max-w-5xl mx-auto">
               <h2 className="text-6xl lg:text-[6.5rem] font-black text-white mb-14 tracking-tighter leading-[1.05]">Ready to eliminate sizing doubts forever?</h2>
               <div className="flex flex-col sm:flex-row justify-center gap-8">
                 <button onClick={onTryDemo} className="bg-white text-slate-900 px-16 py-9 rounded-[3rem] font-black text-2xl shadow-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-6 group">
                   <Zap className="fill-slate-900 group-hover:fill-indigo-600 transition-colors w-8 h-8" />Launch Demo
                 </button>
                 <button className="bg-white/5 border border-white/20 text-white px-16 py-9 rounded-[3rem] font-black text-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-6">
                   <Mail className="w-8 h-8" />Contact Sales
                 </button>
               </div>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};
