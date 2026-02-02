
import React from 'react';
import { Language } from '../types';

export const About: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <div className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute -left-20 top-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -right-20 bottom-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Origin Story</span>
              <h2 className={`text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight ${lang === 'ur' ? 'font-urdu' : ''}`}>
                {lang === 'en' ? 'A Bridge Between London & Lahore' : 'لندن اور لاہور کے درمیان ایک پل'}
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  AiForge was founded by a team of fashion designers from London and AI researchers from Lahore. We realized that while global fashion was digitizing fast, South Asian clothing—with its unique drapes, complex embroidery, and specific fitting requirements—was being left behind.
                </p>
                <p>
                  Our mission is simple: To eliminate the "size anxiety" of online shopping in Pakistan. Whether it's a slim-fit Kurta or a traditional Abaya, we want every Pakistani to buy clothes that fit perfectly, every time.
                </p>
                <p className="italic border-l-4 border-indigo-600 pl-4 py-2 bg-indigo-50 rounded-r-lg font-medium text-indigo-900">
                  "We're not just building tech; we're empowering the local textile industry to compete on a global scale."
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://picsum.photos/seed/uk/400/500" alt="London Office" className="rounded-2xl shadow-lg mt-8" />
                <img src="https://picsum.photos/seed/pk/400/500" alt="Lahore Dev Hub" className="rounded-2xl shadow-lg" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold">AiForge Presence</h4>
                  <span className="text-indigo-600 font-bold">2 Global Hubs</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-5 bg-blue-800 rounded-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-red-600 h-1 top-2"></div>
                      <div className="absolute inset-x-0 h-full w-1 bg-red-600 left-3.5"></div>
                    </div>
                    <span className="text-sm font-medium">Design & Strategy - London, UK</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-5 bg-green-800 rounded-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">Engineering - Lahore, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
