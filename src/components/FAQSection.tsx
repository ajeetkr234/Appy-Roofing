import React, { useState } from 'react';
import { FAQ_DATA } from '../data/roofingData';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/roofingData';

export const FAQSection: React.FC<{
  onOpenBooking: () => void;
}> = ({ onOpenBooking }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-8 sm:py-10 bg-[#091321] text-white relative border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="type-h2 text-white">
            Clear Answers to Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              Roofing Questions
            </span>
          </h2>
          <p className="mt-2.5 type-body-lead text-slate-300">
            Everything you need to know about roof replacements, insurance claims, warranties, timelines, and material longevity.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#101D30] rounded-2xl border border-slate-700/80 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-[#16253D] transition"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-amber-500/20">
                      {idx + 1}
                    </span>
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-300 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 type-body text-slate-300 leading-relaxed border-t border-slate-800/80 animate-in fade-in">
                    <p className="mt-2.5">{item.answer}</p>
                    <div className="mt-4 pt-3 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Category: {item.category}</span>
                      <button
                        onClick={onOpenBooking}
                        className="text-amber-400 hover:text-amber-300 font-semibold underline"
                      >
                        Ask inspector on-site
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-2xl bg-[#16253D] border border-slate-700 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white">Have a question not listed here?</h4>
            <p className="text-xs text-slate-300 mt-0.5">Our master roofing estimators are available to help.</p>
          </div>
          <div className="flex gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-semibold text-xs border border-slate-700 hover:bg-slate-750 flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Us</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase hover:bg-amber-400 transition"
            >
              Schedule Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
