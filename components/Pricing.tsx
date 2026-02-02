
import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { Language, PricingPlan } from '../types';

export const Pricing: React.FC<{ lang: Language }> = ({ lang }) => {
  const plans: PricingPlan[] = [
    {
      name: lang === 'en' ? 'Starter' : 'اسٹارٹر',
      price: 'PKR 1,999',
      features: [
        lang === 'en' ? '100 Active Garments' : '100 فعال لباس',
        lang === 'en' ? 'Standard AI Fitting' : 'اسٹینڈرڈ AI فٹنگ',
        lang === 'en' ? 'Basic Analytics' : 'بنیادی تجزیات',
        lang === 'en' ? 'Web Widget Support' : 'ویب وجیٹ سپورٹ',
      ],
      buttonText: lang === 'en' ? 'Get Started' : 'شروع کریں',
    },
    {
      name: lang === 'en' ? 'Business' : 'بزنس',
      price: 'PKR 4,999',
      features: [
        lang === 'en' ? 'Unlimited Garments' : 'لامحدود لباس',
        lang === 'en' ? 'Custom Brand Avatars' : 'کسٹم برانڈ اوتار',
        lang === 'en' ? 'Detailed Measurement CRM' : 'تفصیلی پیمائش CRM',
        lang === 'en' ? 'Priority Email Support' : 'ترجیحی سپورٹ',
      ],
      buttonText: lang === 'en' ? 'Try Business' : 'بزنس آزمائیں',
      popular: true,
    },
    {
      name: lang === 'en' ? 'Enterprise' : 'انٹرپرائز',
      price: 'Custom',
      features: [
        lang === 'en' ? 'Full API Access' : 'مکمل API رسائی',
        lang === 'en' ? 'White-label Integration' : 'وائٹ لیبل انٹیگریشن',
        lang === 'en' ? 'Dedicated Success Manager' : 'سرشار مینیجر',
        lang === 'en' ? 'SLA Guarantees' : 'ایس ایل اے ضمانت',
      ],
      buttonText: lang === 'en' ? 'Contact Sales' : 'رابطہ کریں',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className={`text-4xl lg:text-5xl font-bold text-slate-900 mb-4 ${lang === 'ur' ? 'font-urdu' : ''}`}>
            {lang === 'en' ? 'Simple, Transparent Pricing' : 'سادہ اور شفاف قیمتیں'}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Scale your boutique or brand with AI. Choose a plan that fits your volume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-3xl border ${plan.popular ? 'border-indigo-600 shadow-2xl shadow-indigo-100 ring-4 ring-indigo-50' : 'border-slate-200'} flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className={`text-xl font-bold text-slate-900 mb-2 ${lang === 'ur' ? 'font-urdu' : ''}`}>{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-slate-500 ml-1">/month</span>}
                </div>
              </div>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-slate-600">
                    <Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-slate-50 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-center gap-6 border border-slate-100">
          <ShieldCheck className="w-12 h-12 text-indigo-500" />
          <div className="text-left">
            <h4 className="font-bold text-slate-900">Security & Trust First</h4>
            <p className="text-slate-600 text-sm">We process measurement data with 256-bit encryption. No camera access required for avatar generation.</p>
          </div>
          <button className="bg-white border border-slate-200 px-6 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50">View Security Whitepaper</button>
        </div>
      </div>
    </section>
  );
};
