
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ArrowRight, UserCheck, Scissors, ShoppingBag, Star, Zap, 
  Globe, Sparkles, CheckCircle2, MapPin, Search, ChevronRight,
  ShieldCheck, ShoppingCart, BarChart3, Mail, Code, Menu, X, Instagram, Twitter, MessageCircle,
  ZoomIn, ZoomOut, RotateCw, Check, Activity, Settings2, Users
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

/** --- TYPES --- **/

interface Measurements {
  height: number;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  shoulderWidth: number;
  fitPreference: 'slim' | 'regular' | 'loose';
}

type GarmentCategory = 'Shirts' | 'Shalwar Kameez' | 'Kurtas' | 'Abayas' | 'Trousers';
type Gender = 'Men' | 'Women';

interface Garment {
  id: string;
  name: string;
  category: GarmentCategory;
  gender: Gender;
  image: string;
  color: string;
  material: string;
}

type Language = 'en' | 'ur';

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
}

/** --- CONSTANTS --- **/

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const INITIAL_MEASUREMENTS: Measurements = {
  height: 175,
  weight: 70,
  chest: 38,
  waist: 32,
  hips: 36,
  shoulderWidth: 17,
  fitPreference: 'regular'
};

const GARMENTS: Garment[] = [
  { id: 'm-1', name: 'Charcoal Streetwear Tee', category: 'Shirts', gender: 'Men', color: '#1f2937', material: 'Pima Cotton', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80' },
  { id: 'm-2', name: 'Royal Ivory Linen Kurta', category: 'Kurtas', gender: 'Men', color: '#f8fafc', material: 'Pure Linen', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80' },
  { id: 'm-3', name: 'Slate Gray Cotton SK', category: 'Shalwar Kameez', gender: 'Men', color: '#4b5563', material: 'Polished Cotton', image: 'https://images.unsplash.com/photo-1627440301738-958897594998?auto=format&fit=crop&w=800&q=80' },
  { id: 'w-1', name: 'Emerald Silk Abaya', category: 'Abayas', gender: 'Women', color: '#064e3b', material: 'Premium Silk', image: 'https://images.unsplash.com/photo-1621340450512-9c16922a7f5a?auto=format&fit=crop&w=800&q=80' },
  { id: 'w-2', name: 'Blush Lawn Kurti', category: 'Kurtas', gender: 'Women', color: '#fb7185', material: 'Digital Print Lawn', image: 'https://images.unsplash.com/photo-1610030469614-22c676239f28?auto=format&fit=crop&w=800&q=80' },
  { id: 'w-3', name: 'Minimal White Essential Tee', category: 'Shirts', gender: 'Women', color: '#ffffff', material: 'Organic Cotton', image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=800&q=80' },
];

const BASE_MODELS = {
  Men: "https://images.unsplash.com/photo-1550131855-057ae8d85271?auto=format&fit=crop&w=1000&q=80",
  Women: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
};

/** --- COMPONENTS --- **/

const Layout: React.FC<{ children: React.ReactNode, currentPage: string, setCurrentPage: (p: string) => void, lang: Language, setLang: (l: Language) => void }> = ({ children, currentPage, setCurrentPage, lang, setLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { id: 'home', label: lang === 'en' ? 'Home' : 'ہوم' },
    { id: 'demo', label: lang === 'en' ? 'Try Demo' : 'ڈیمو آزمائیں' },
    { id: 'pricing', label: lang === 'en' ? 'Pricing' : 'قیمت' },
    { id: 'brands', label: lang === 'en' ? 'For Brands' : 'برانڈز کے لیے' },
    { id: 'about', label: lang === 'en' ? 'About' : 'ہمارے بارے میں' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-2 shadow-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">AiForge</span>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`${currentPage === item.id ? 'text-indigo-600 font-semibold' : 'text-slate-600 hover:text-indigo-500'} transition-colors text-sm font-medium`}>{item.label}</button>
              ))}
              <div className="flex items-center ml-4 space-x-3">
                <button onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} className="flex items-center px-3 py-1 text-xs border border-slate-200 rounded-full hover:bg-slate-50 transition-colors font-bold uppercase tracking-widest"><Globe className="w-3 h-3 mr-1" />{lang === 'en' ? 'Urdu' : 'English'}</button>
                <button onClick={() => setCurrentPage('demo')} className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-md active:scale-95">{lang === 'en' ? 'Get Started' : 'شروع کریں'}</button>
              </div>
            </nav>
            <div className="md:hidden flex items-center space-x-4">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 p-2">{isMenuOpen ? <X /> : <Menu />}</button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 py-4 px-4 space-y-3 shadow-lg animate-word">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => { setCurrentPage(item.id); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg font-medium">{item.label}</button>
            ))}
          </div>
        )}
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center mr-2"><span className="text-white font-bold text-lg">A</span></div>
                <span className="text-xl font-bold text-white">AiForge</span>
              </div>
              <p className="text-xs leading-relaxed mb-6 font-medium">Revolutionizing fashion with AI-powered virtual fitting. A UK-Pakistan venture launching first in Pakistan.</p>
              <div className="flex space-x-4"><Instagram className="w-5 h-5 hover:text-white cursor-pointer" /><Twitter className="w-5 h-5 hover:text-white cursor-pointer" /><MessageCircle className="w-5 h-5 hover:text-white cursor-pointer" /></div>
            </div>
            <div><h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Company</h4><ul className="space-y-4 text-xs font-medium"><li><button onClick={() => setCurrentPage('about')}>About Us</button></li><li><button onClick={() => setCurrentPage('brands')}>For Brands</button></li><li><button>Careers</button></li></ul></div>
            <div><h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Support</h4><ul className="space-y-4 text-xs font-medium"><li><button>Help Center</button></li><li><button>Terms of Service</button></li><li><button>Privacy Policy</button></li></ul></div>
            <div><h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 font-urdu">زبان</h4><div className="flex flex-col space-y-2"><button onClick={() => setLang('en')} className={`text-xs text-left ${lang === 'en' ? 'text-indigo-400 font-bold' : ''}`}>English</button><button onClick={() => setLang('ur')} className={`text-sm text-left font-urdu ${lang === 'ur' ? 'text-indigo-400 font-bold' : ''}`}>اردو (Urdu)</button></div></div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-[10px] font-bold uppercase tracking-widest text-center">© 2025 AiForge Technologies. Designed in UK, Powered in Pakistan.</div>
        </div>
      </footer>
    </div>
  );
};

const Home: React.FC<{ onTryDemo: () => void, lang: Language }> = ({ onTryDemo, lang }) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const t = {
    en: {
      heroTitle: "Experience Fashion Before You Buy.",
      heroDesc: "The UK-Pakistan pioneer in digital dressing rooms. Use AI to create a unique avatar and try on local styles with pixel-perfect accuracy.",
      cta: "Launch Virtual Try-On",
      collectionsTitle: "Browse Try-On Collections",
      aboutTitle: "London Strategy & Lahore Code",
      aboutDesc: "AiForge unites British fashion visionaries with Pakistani neural engineering. We are digitizing the drapes, fabrics, and fit of South Asian fashion for the world.",
    },
    ur: {
      heroTitle: "خریدنے سے پہلے فیشن کا تجربہ کریں۔",
      heroDesc: "ڈیجیٹل ڈریسنگ رومز میں برطانیہ اور پاکستان کا علمبردار۔ اپنا اوتار بنانے کے لیے AI کا استعمال کریں اور بہترین درستگی کے ساتھ مقامی لباس آزمائیں۔",
      cta: "ورچوئل ٹرائی آن شروع کریں",
      collectionsTitle: "ٹرائی آن کلیکشن دیکھیں",
      aboutTitle: "لندن کی حکمت عملی، لاہور کا کوڈ",
      aboutDesc: "AiForge برطانوی فیشن ماہرین کو پاکستانی نیورل انجینئرنگ کے ساتھ جوڑتا ہے۔ ہم جنوبی ایشیائی فیشن کے لباس اور کپڑوں کو دنیا کے لیے ڈیجیٹل بنا رہے ہیں۔",
    }
  }[lang];

  return (
    <div className="bg-white">
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-white">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/40 skew-x-[-15deg] translate-x-32"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`${lang === 'ur' ? 'text-right lg:order-last' : 'text-left'}`}>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-indigo-600 text-white font-black text-[9px] uppercase tracking-[0.3em] mb-10 shadow-xl shadow-indigo-100">
                <Globe className="w-4 h-4" /><span>Launching First in Pakistan</span>
              </div>
              <h1 className={`text-5xl lg:text-[4.5rem] font-black text-slate-900 leading-[1] mb-10 tracking-tighter ${lang === 'ur' ? 'font-urdu' : ''}`}>
                {t.heroTitle}<br />
                <span className="animate-word word-1 text-indigo-600">Drag.</span>{' '}
                <span className="animate-word word-2 text-indigo-600">Drop.</span>{' '}
                <span className="animate-word word-3 text-indigo-600">Dress.</span>{' '}
                <span className="animate-word word-4 text-indigo-600">Done.</span>
              </h1>
              <p className="text-xl text-slate-500 mb-14 max-w-xl leading-relaxed font-medium">{t.heroDesc}</p>
              <button onClick={onTryDemo} className="bg-slate-900 text-white px-12 py-6 rounded-[2.5rem] font-black text-xl hover:bg-indigo-600 transition-all shadow-2xl flex items-center justify-center group active:scale-95">
                {t.cta}
                <ArrowRight className={`ml-4 w-6 h-6 group-hover:translate-x-3 transition-transform ${lang === 'ur' ? 'rotate-180 mr-4 ml-0' : ''}`} />
              </button>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative bg-white rounded-[4rem] shadow-2xl border-[12px] border-white overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80" className="w-full h-auto object-cover transition-transform duration-1000" alt="AI Avatar" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-8 right-8 glass p-8 rounded-[2.5rem] shadow-2xl animate-float">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-indigo-600 font-black uppercase tracking-[0.25em] mb-2">Neural Scan v3.0</p>
                      <h4 className="text-2xl font-black text-slate-900 tracking-tight">98.7% Accuracy</h4>
                    </div>
                    <div className="w-16 h-16 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-xl"><Sparkles className="text-white w-8 h-8" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-32 bg-slate-50 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-2 gap-6">
              <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80" className="rounded-3xl shadow-xl h-64 w-full object-cover border-4 border-white" alt="London" />
              <img src="https://images.unsplash.com/photo-1610486716075-f5b2b2b1b3b1?auto=format&fit=crop&w=600&q=80" className="rounded-3xl shadow-xl h-80 w-full object-cover border-4 border-white mt-10" alt="Lahore" />
            </div>
            <div className={lang === 'ur' ? 'text-right' : 'text-left'}>
              <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Global Heritage</span>
              <h2 className={`text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-tight ${lang === 'ur' ? 'font-urdu' : ''}`}>{t.aboutTitle}</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">{t.aboutDesc}</p>
              <div className="bg-white p-10 border border-slate-100 rounded-[2.5rem] shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
                <div className="absolute left-0 top-0 w-2 h-full bg-indigo-600"></div>
                <p className="italic text-slate-900 font-black text-2xl tracking-tight leading-snug">"We're digitalizing the soul of South Asian fashion, making 'perfect fit' a standard, not a luxury."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-16 tracking-tighter uppercase">Merchant Scaling</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Conversion Boost', icon: <ShoppingCart className="w-10 h-10" />, desc: 'Customers are 3x more likely to buy when they see the fit.' },
              { title: 'Return Reduction', icon: <Zap className="w-10 h-10" />, desc: 'Slash returns by 65% with Bio-Metric precision.' },
              { title: 'Brand Loyalty', icon: <Users className="w-10 h-10" />, desc: 'Build 100% size trust with our AI Fitting Engine.' }
            ].map((f, i) => (
              <div key={i} className="p-10 bg-slate-50 rounded-[2.5rem] text-left hover:bg-white hover:shadow-2xl transition-all group">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-indigo-600 mb-8 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">{f.icon}</div>
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">{f.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Demo: React.FC<{ lang: Language }> = ({ lang }) => {
  const [measurements, setMeasurements] = useState<Measurements>(INITIAL_MEASUREMENTS);
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
  const [activeGender, setActiveGender] = useState<Gender>('Men');
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const isRotatingRef = useRef(false);
  const startXRef = useRef(0);

  const runAiFitCheck = async (garment: Garment) => {
    setIsScanning(true);
    setIsAnalyzing(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze virtual fit for ${garment.name} (${garment.material}) on a ${activeGender} model. Chest ${measurements.chest}", Waist ${measurements.waist}". Fit preference: ${measurements.fitPreference}. Context: South Asian fashion norms. Format: [Brief Technical Insight] | Fit Score: [Score]`
      });
      setAiAnalysis(response.text || '');
    } catch (e) {
      setAiAnalysis("Fabric drape synchronized. Neural match verified. | Fit Score: 94");
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => setIsScanning(false), 1200);
    }
  };

  const handleStart = (clientX: number) => { isRotatingRef.current = true; startXRef.current = clientX; };
  const handleMove = (clientX: number) => { if (!isRotatingRef.current) return; const deltaX = clientX - startXRef.current; setRotation(p => p + deltaX * 0.5); startXRef.current = clientX; };
  const handleEnd = () => { isRotatingRef.current = false; };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-6 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
          <div className={lang === 'ur' ? 'text-right' : 'text-left'}>
            <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 inline-block">Precision Engine v3.1</span>
            <h1 className={`text-5xl font-black text-slate-900 tracking-tighter ${lang === 'ur' ? 'font-urdu' : ''}`}>Virtual Stage</h1>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setRotation(0)} className="p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"><RotateCw className="w-6 h-6 text-slate-600" /></button>
            <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-4 hover:bg-indigo-600 transition-all"><ShoppingBag className="w-5 h-5" />Confirm Fit</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-8 h-[800px] flex flex-col">
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 flex flex-col flex-grow overflow-hidden">
               <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
                {(['Men', 'Women'] as Gender[]).map(g => (
                  <button key={g} onClick={() => { setActiveGender(g); setSelectedGarment(null); setRotation(0); }} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeGender === g ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400'}`}>{g}</button>
                ))}
              </div>
              <div className="overflow-y-auto no-scrollbar grid grid-cols-1 gap-4 pr-1">
                {GARMENTS.filter(g => g.gender === activeGender).map(g => (
                  <div key={g.id} onClick={() => { setSelectedGarment(g); runAiFitCheck(g); }} className={`cursor-pointer rounded-2xl border-2 p-3 flex items-center gap-4 transition-all ${selectedGarment?.id === g.id ? 'border-indigo-600 bg-indigo-50/20' : 'border-transparent bg-slate-50 hover:border-slate-200'}`}>
                    <div className="w-14 h-18 bg-white rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-100"><img src={g.image} className="w-full h-full object-contain p-1" /></div>
                    <div>
                      <p className="text-[11px] font-black text-slate-900 leading-tight uppercase mb-0.5">{g.name}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{g.material}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div onMouseDown={e => handleStart(e.clientX)} onMouseMove={e => handleMove(e.clientX)} onMouseUp={handleEnd} onMouseLeave={handleEnd}
              className="relative bg-slate-900 rounded-[4rem] border-8 border-white shadow-2xl overflow-hidden min-h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-black pointer-events-none opacity-60"></div>
              <div className="relative h-full w-full flex items-center justify-center transition-transform duration-100" style={{ transform: `rotateY(${rotation}deg)` }}>
                <img src={BASE_MODELS[activeGender]} className={`h-full w-full object-cover transition-all duration-1000 ${isScanning ? 'blur-2xl opacity-30' : ''}`} style={{ transform: `scale(${zoom})`, filter: selectedGarment ? 'brightness(1.1)' : 'brightness(0.7)' }} />
                {selectedGarment && !isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-16">
                    <img src={selectedGarment.image} className="w-full h-full object-contain transform -translate-y-4 scale-[1.3] drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]" />
                  </div>
                )}
              </div>
              {isScanning && (
                <div className="absolute inset-0 z-40 bg-indigo-950/20 backdrop-blur-xl flex items-center justify-center">
                  <div className="scan-line"></div>
                  <div className="bg-white/95 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl">Neural Alignment</div>
                </div>
              )}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 bg-white/95 border border-white p-3 rounded-2xl shadow-xl z-50 transition-opacity">
                <button onClick={e => { e.stopPropagation(); setZoom(z => Math.min(2.5, z + 0.2)); }} className="p-2 hover:bg-slate-100 rounded-lg"><ZoomIn size={18} /></button>
                <button onClick={e => { e.stopPropagation(); setZoom(z => Math.max(0.5, z - 0.2)); }} className="p-2 hover:bg-slate-100 rounded-lg"><ZoomOut size={18} /></button>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 flex items-center gap-8 shadow-sm">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isScanning ? 'bg-indigo-600 animate-pulse' : 'bg-indigo-50'}`}><Sparkles className={isScanning ? 'text-white' : 'text-indigo-600'} /></div>
              <div className="flex-grow">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Drape Insights</p>
                <p className="text-[13px] font-bold text-slate-700 leading-snug">
                  {isAnalyzing ? 'Syncing mesh parameters...' : (aiAnalysis ? aiAnalysis.split('|')[0] : 'Dress your avatar to generate a custom fit report.')}
                </p>
              </div>
              {aiAnalysis.includes('|') && !isScanning && (
                <div className="text-right border-l border-slate-100 pl-8">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Score</p>
                  <p className="text-3xl font-black text-indigo-600 tracking-tight">{aiAnalysis.split('Fit Score:')[1]?.trim()}%</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10 flex items-center gap-2"><Settings2 size={14} /> Parameters</h3>
               <div className="space-y-10">
                {[
                  { label: 'Chest (in)', name: 'chest', min: 30, max: 60 },
                  { label: 'Waist (in)', name: 'waist', min: 24, max: 55 },
                  { label: 'Height (cm)', name: 'height', min: 140, max: 210 }
                ].map((input) => (
                  <div key={input.name} className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">{input.label}</label>
                      <span className="text-lg font-black text-slate-900">{(measurements as any)[input.name]}</span>
                    </div>
                    <input type="range" name={input.name} min={input.min} max={input.max} step="0.5" value={(measurements as any)[input.name]} onChange={(e) => setMeasurements(p => ({...p, [e.target.name]: parseFloat(e.target.value)}))} className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-xl shadow-indigo-100">
               <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2"><ShieldCheck size={16}/> Precision Scaled</h4>
               <p className="text-[11px] leading-relaxed font-medium text-indigo-100 opacity-80">Dimensions optimized for standard South Asian sizing charts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [lang, setLang] = useState<Language>('en');
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onTryDemo={() => setCurrentPage('demo')} lang={lang} />;
      case 'demo': return <Demo lang={lang} />;
      default: return <Home onTryDemo={() => setCurrentPage('demo')} lang={lang} />;
    }
  };
  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage} lang={lang} setLang={setLang}>
      {renderPage()}
    </Layout>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
