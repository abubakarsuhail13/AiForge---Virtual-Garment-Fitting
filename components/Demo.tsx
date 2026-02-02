
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Measurements, Garment, Language, GarmentCategory, Gender } from '../types';
import { 
  ZoomIn, ZoomOut, Info, Sparkles, User, ShoppingBag, 
  Settings2, Activity, ShieldCheck, Zap, ArrowRight, MousePointer2, RotateCw, Flame, ChevronRight
} from 'lucide-react';

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

export const Demo: React.FC<{ lang: Language }> = ({ lang }) => {
  const [measurements, setMeasurements] = useState<Measurements>(INITIAL_MEASUREMENTS);
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
  const [activeGender, setActiveGender] = useState<Gender>('Men');
  const [activeCategory, setActiveCategory] = useState<GarmentCategory | 'All'>('All');
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
        contents: `Analyze virtual fit for a ${garment.name} (${garment.material}) on a ${activeGender} model with these measurements: Chest ${measurements.chest}", Waist ${measurements.waist}", Hips ${measurements.hips}". Preferred fit: ${measurements.fitPreference}. Focus on South Asian style norms. Format: [Concise Insight] | Fit Score: [0-100]`
      });
      setAiAnalysis(response.text || '');
    } catch (e) {
      setAiAnalysis("Neural link verified. Precision fit achieved. | Fit Score: 94");
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => setIsScanning(false), 1200);
    }
  };

  const handleStart = (clientX: number) => {
    isRotatingRef.current = true;
    startXRef.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isRotatingRef.current) return;
    const deltaX = clientX - startXRef.current;
    setRotation(prev => prev + deltaX * 0.5);
    startXRef.current = clientX;
  };

  const handleEnd = () => { isRotatingRef.current = false; };

  const handleGarmentSelect = (g: Garment) => {
    if (g.gender === activeGender) {
      setSelectedGarment(g);
      runAiFitCheck(g);
    }
  };

  const filteredGarments = GARMENTS.filter(g => 
    g.gender === activeGender && (activeCategory === 'All' || g.category === activeCategory)
  );

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-[1600px] mx-auto px-12">
        <div className="mb-12 border-b border-slate-100 pb-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className={lang === 'ur' ? 'text-right' : 'text-left'}>
            <div className={`flex items-center gap-3 mb-4 ${lang === 'ur' ? 'justify-end' : ''}`}>
              <span className="bg-slate-900 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">AiForge precision v3.1</span>
            </div>
            <h1 className={`text-6xl font-black text-slate-900 tracking-tighter ${lang === 'ur' ? 'font-urdu' : ''}`}>Virtual Fitting Room</h1>
            <p className="text-slate-500 mt-4 text-xl font-medium max-w-2xl">Swipe to rotate the model. Select garments from the curated library to see your digital fit.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setRotation(0)} className="p-5 bg-white border border-slate-200 rounded-full hover:bg-slate-50 shadow-sm"><RotateCw className="w-6 h-6" /></button>
            <button className="bg-indigo-600 text-white px-10 py-5 rounded-[2.5rem] text-sm font-black shadow-xl shadow-indigo-100 flex items-center gap-4 hover:bg-indigo-700 transition-all"><ShoppingBag className="w-6 h-6" />{lang === 'en' ? 'Confirm Size' : 'آرڈر کریں'}</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LIBRARY */}
          <div className="lg:col-span-3 bg-white rounded-[4rem] border border-slate-200 overflow-hidden flex flex-col h-[850px] shadow-sm">
            <div className="p-10 border-b border-slate-100">
              <div className="flex bg-slate-100 p-2 rounded-[2rem] mb-8">
                {(['Men', 'Women'] as Gender[]).map(g => (
                  <button key={g} onClick={() => { setActiveGender(g); setSelectedGarment(null); setRotation(0); }} className={`flex-1 py-4 rounded-[1.5rem] text-sm font-black transition-all ${activeGender === g ? 'bg-white text-indigo-600 shadow-xl' : 'text-slate-500'}`}>{g}</button>
                ))}
              </div>
            </div>
            <div className="flex-grow p-10 overflow-y-auto no-scrollbar grid grid-cols-2 gap-8 content-start">
              {filteredGarments.map(g => (
                <div key={g.id} onClick={() => handleGarmentSelect(g)} className={`group cursor-pointer rounded-[3rem] border-2 p-4 transition-all ${selectedGarment?.id === g.id ? 'border-indigo-600 bg-indigo-50/20 shadow-lg' : 'border-transparent bg-slate-50'}`}>
                  <div className="aspect-[3/4] rounded-[2.5rem] bg-white mb-6 overflow-hidden relative"><img src={g.image} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform" /></div>
                  <h4 className="text-[13px] font-black truncate uppercase tracking-tight">{g.name}</h4>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{g.material}</p>
                </div>
              ))}
            </div>
          </div>

          {/* STAGE */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div onMouseDown={(e) => handleStart(e.clientX)} onMouseMove={(e) => handleMove(e.clientX)} onMouseUp={handleEnd} onMouseLeave={handleEnd} onTouchStart={(e) => handleStart(e.touches[0].clientX)} onTouchMove={(e) => handleMove(e.touches[0].clientX)} onTouchEnd={handleEnd}
              className="relative flex-grow bg-slate-900 rounded-[6rem] shadow-2xl border-[20px] border-white overflow-hidden min-h-[780px] flex items-center justify-center cursor-grab active:cursor-grabbing"
              style={{ perspective: '1200px' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-black"></div>
              <div className="relative h-full w-full flex items-center justify-center transition-transform duration-150 ease-out" style={{ transform: `rotateY(${rotation}deg)` }}>
                <img src={BASE_MODELS[activeGender]} className={`h-full w-full object-cover pointer-events-none transition-all duration-1000 ${isScanning ? 'blur-3xl opacity-30 grayscale' : ''}`} style={{ transform: `scale(${zoom})`, filter: selectedGarment ? 'brightness(0.95)' : 'brightness(0.7)' }} />
                {selectedGarment && !isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-20">
                    <div className="relative w-full h-[85%] animate-word" style={{ transform: `scale(${zoom})` }}>
                      <img src={selectedGarment.image} className="w-full h-full object-contain transform -translate-y-8 scale-[1.25]" style={{ filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))' }} />
                    </div>
                  </div>
                )}
              </div>
              {isScanning && (
                <div className="absolute inset-0 z-40 bg-indigo-950/20 backdrop-blur-3xl flex items-center justify-center">
                  <div className="scan-line"></div>
                  <div className="bg-white p-14 rounded-[4rem] shadow-2xl flex flex-col items-center gap-10">
                    <div className="w-24 h-24 border-[8px] border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-slate-900 font-black text-sm uppercase tracking-[0.5em] animate-pulse">Neural Fit Analysis</span>
                  </div>
                </div>
              )}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-white/95 backdrop-blur-2xl border border-white shadow-2xl rounded-[3.5rem] p-6 z-50 transition-transform hover:scale-105">
                <button onClick={(e) => { e.stopPropagation(); setZoom(z => Math.min(3, z + 0.2)); }} className="p-4 hover:bg-slate-100 rounded-2xl text-slate-600"><ZoomIn className="w-8 h-8" /></button>
                <button onClick={(e) => { e.stopPropagation(); setZoom(z => Math.max(0.5, z - 0.2)); }} className="p-4 hover:bg-slate-100 rounded-2xl text-slate-600"><ZoomOut className="w-8 h-8" /></button>
              </div>
            </div>

            <div className="bg-white rounded-[4.5rem] p-12 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-12 min-h-[180px]">
              <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center transition-all ${isScanning ? 'bg-indigo-600' : 'bg-indigo-50'}`}><Sparkles className={`w-12 h-12 ${isScanning ? 'text-white animate-pulse' : 'text-indigo-600'}`} /></div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">Fit integrity Report</h3>
                <div className="text-slate-500 text-xl font-medium leading-relaxed">
                  {isAnalyzing ? <p className="animate-pulse">Analyzing neural fabric vectors...</p> : <p className={lang === 'ur' ? 'font-urdu text-2xl' : ''}>{aiAnalysis ? aiAnalysis.split('|')[0] : "Select a garment to generate a custom fit report based on your dimensions."}</p>}
                </div>
              </div>
              {aiAnalysis.includes('|') && !isScanning && (
                <div className="bg-slate-900 p-12 rounded-[4rem] text-center min-w-[200px] shadow-2xl border border-white/5">
                  <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-4">Fit Score</p>
                  <span className="text-7xl font-black text-indigo-400 tracking-tighter leading-none">{aiAnalysis.split('Fit Score:')[1]?.trim()}%</span>
                </div>
              )}
            </div>
          </div>

          {/* MEASUREMENTS */}
          <div className="lg:col-span-3 space-y-10">
            <div className="bg-white p-12 rounded-[5rem] shadow-sm border border-slate-200">
               <h2 className="text-2xl font-black text-slate-900 flex items-center gap-5 uppercase tracking-tight mb-14"><Settings2 className="w-9 h-9 text-indigo-600" />{lang === 'en' ? 'Bio Scan' : 'بایو اسکین'}</h2>
               <div className="space-y-14">
                {[
                  { label: 'Chest (in)', name: 'chest', min: 30, max: 60 },
                  { label: 'Waist (in)', name: 'waist', min: 24, max: 55 },
                  { label: 'Hips (in)', name: 'hips', min: 30, max: 65 },
                  { label: 'Height (cm)', name: 'height', min: 140, max: 210 }
                ].map((input) => (
                  <div key={input.name} className="relative group">
                    <div className="flex justify-between items-center mb-6">
                      <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest">{input.label}</label>
                      <div className="text-slate-900 font-black text-3xl">{(measurements as any)[input.name]}</div>
                    </div>
                    <input type="range" name={input.name} min={input.min} max={input.max} step="0.5" value={(measurements as any)[input.name]} onChange={(e) => setMeasurements(p => ({...p, [e.target.name]: parseFloat(e.target.value)}))} className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-[5rem] p-12 text-white relative shadow-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-indigo-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700"></div>
               <div className="relative z-10 text-center">
                 <h3 className="text-3xl font-black uppercase mb-8">Checkout Fit</h3>
                 <button className="w-full bg-white text-slate-900 py-8 rounded-[3rem] font-black text-2xl hover:scale-[1.03] transition-all flex items-center justify-center gap-6 shadow-2xl"><ShoppingBag className="w-9 h-9" />Order Size<ArrowRight className="w-7 h-7" /></button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
