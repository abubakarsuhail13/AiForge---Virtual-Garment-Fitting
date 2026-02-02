
import React from 'react';
import { Menu, X, Globe, Instagram, Twitter, MessageCircle } from 'lucide-react';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage, lang, setLang }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: lang === 'en' ? 'Home' : 'ہوم' },
    { id: 'demo', label: lang === 'en' ? 'Try Demo' : 'ڈیمو آزمائیں' },
    { id: 'pricing', label: lang === 'en' ? 'Pricing' : 'قیمت' },
    { id: 'brands', label: lang === 'en' ? 'For Brands' : 'برانڈز کے لیے' },
    { id: 'about', label: lang === 'en' ? 'About' : 'ہمارے بارے میں' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                AiForge
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`${
                    currentPage === item.id 
                    ? 'text-indigo-600 font-semibold' 
                    : 'text-slate-600 hover:text-indigo-500'
                  } transition-colors`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center ml-4 space-x-3">
                <button 
                  onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
                  className="flex items-center px-3 py-1 text-sm border border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
                >
                  <Globe className="w-4 h-4 mr-1" />
                  {lang === 'en' ? 'Urdu' : 'English'}
                </button>
                <button 
                  onClick={() => setCurrentPage('demo')}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition-all shadow-sm"
                >
                  {lang === 'en' ? 'Get Started' : 'شروع کریں'}
                </button>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
               <button 
                  onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
                  className="text-xs border border-slate-200 px-2 py-1 rounded"
                >
                  {lang === 'en' ? 'UR' : 'EN'}
                </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 p-2"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 py-4 px-4 space-y-3 shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => {
                setCurrentPage('demo');
                setIsMenuOpen(false);
              }}
              className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium"
            >
              {lang === 'en' ? 'Get Started' : 'شروع کریں'}
            </button>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold text-white">AiForge</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Revolutionizing fashion with AI-powered virtual fitting. A UK-Pakistan venture launching first in Pakistan.
              </p>
              <div className="flex space-x-4">
                <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
                <MessageCircle className="w-5 h-5 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => setCurrentPage('about')}>About Us</button></li>
                <li><button onClick={() => setCurrentPage('brands')}>For Brands</button></li>
                <li><button>Careers</button></li>
                <li><button>Press Kit</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Support</h4>
              <ul className="space-y-4 text-sm">
                <li><button>Help Center</button></li>
                <li><button>Terms of Service</button></li>
                <li><button>Privacy Policy</button></li>
                <li><button>Contact Us</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Language</h4>
              <div className="flex flex-col space-y-2">
                <button onClick={() => setLang('en')} className={`text-sm text-left ${lang === 'en' ? 'text-indigo-400' : ''}`}>English</button>
                <button onClick={() => setLang('ur')} className={`text-sm text-left font-urdu ${lang === 'ur' ? 'text-indigo-400' : ''}`}>اردو (Urdu)</button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-sm text-center">
            © {new Date().getFullYear()} AiForge Technologies. All rights reserved. Designed in UK, Powered in Pakistan.
          </div>
        </div>
      </footer>
    </div>
  );
};
