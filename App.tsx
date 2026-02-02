
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Demo } from './components/Demo';
import { Pricing } from './components/Pricing';
import { About } from './components/About';
import { Brands } from './components/Brands';
import { Language } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [lang, setLang] = useState<Language>('en');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onTryDemo={() => setCurrentPage('demo')} lang={lang} />;
      case 'demo': return <Demo lang={lang} />;
      // Sections are now integrated into Home, but keeping components for direct navigation if needed
      case 'pricing': return <Home onTryDemo={() => setCurrentPage('demo')} lang={lang} />;
      case 'brands': return <Home onTryDemo={() => setCurrentPage('demo')} lang={lang} />;
      case 'about': return <Home onTryDemo={() => setCurrentPage('demo')} lang={lang} />;
      default: return <Home onTryDemo={() => setCurrentPage('demo')} lang={lang} />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage} 
      lang={lang} 
      setLang={setLang}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;
