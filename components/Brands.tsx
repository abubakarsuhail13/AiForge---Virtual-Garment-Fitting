
import React from 'react';
import { ShoppingCart, BarChart3, Users, Zap, CheckCircle } from 'lucide-react';
import { Language } from '../types';

export const Brands: React.FC<{ lang: Language }> = ({ lang }) => {
  const benefits = [
    { title: 'Increase Conversion', desc: 'Customers are 3x more likely to buy when they see the fit.', icon: <ShoppingCart /> },
    { title: 'Slash Returns', desc: 'Reduce sizing-related returns by up to 60%.', icon: <Zap /> },
    { title: 'Data Insights', desc: 'Understand the average body dimensions of your real buyers.', icon: <BarChart3 /> },
    { title: 'Brand Loyalty', desc: 'Build trust with a "Perfect Fit" guarantee.', icon: <Users /> },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8">Empower Your Boutique with AI.</h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Integrate AiForge directly into your Shopify, WooCommerce, or custom website in under 5 minutes. Give your customers the digital dressing room they deserve.
            </p>
            <div className="flex gap-4">
              <button className="bg-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all">Schedule a Demo</button>
              <button className="bg-white/10 border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">View Integration Docs</button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 hidden lg:block">
           <div className="w-full h-full bg-gradient-to-l from-indigo-500 to-transparent"></div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Why the biggest Pakistani brands choose us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-50 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                   <h2 className="text-4xl font-bold text-slate-900 mb-8">The Integration is Seamless</h2>
                   <div className="space-y-6">
                      {[
                        "One line of code for your website",
                        "Automatic mapping to your size charts",
                        "Customizable UI to match your brand",
                        "Mobile-optimized out of the box"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                           <CheckCircle className="text-indigo-600 w-6 h-6 flex-shrink-0" />
                           <span className="text-lg font-medium text-slate-700">{item}</span>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl shadow-2xl">
                   <pre className="text-indigo-400 text-sm overflow-x-auto p-4 leading-relaxed">
{`<!-- AiForge Widget -->
<script src="https://cdn.aiforge.pk/v1/widget.js"></script>
<script>
  AiForge.init({
    brandId: 'YOUR_BRAND_ID',
    productType: 'kurta',
    sizeChart: 'standard-pk'
  });
</script>
<div id="aiforge-try-on"></div>`}
                   </pre>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};
