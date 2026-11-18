import React from 'react';
import { ShieldCheck, FileCheck, Award, MessageSquare, HardHat, DollarSign, Clock, Users, ArrowRight, Wrench, Headphones } from 'lucide-react';
import { trackConversion } from '../utils/analytics';

export const WhyChooseUs: React.FC<{
  onOpenBooking: () => void;
  hideHeader?: boolean;
}> = ({ onOpenBooking, hideHeader = false }) => {
  const pillars = [
    {
      icon: <Users className="w-6 h-6 text-amber-400" />,
      title: "Experienced Roofing Professionals",
      desc: "Factory-trained Master Craftsmen with over 18 years of specialized residential and commercial installation experience."
    },
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: "Quality Roofing Materials",
      desc: "Only premium Class 4 impact shingles, 24-gauge standing seam steel, and certified membranes from GAF and CertainTeed."
    },
    {
      icon: <FileCheck className="w-6 h-6 text-amber-400" />,
      title: "Detailed Project Planning",
      desc: "4K drone aerial surveys and blueprint analysis ensuring exact measurements, ventilation balancing, and code compliance."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-amber-400" />,
      title: "Transparent Estimates",
      desc: "Itemized line-by-line written proposals covering materials, certified labor, tear-off disposal, and warranties with zero surprises."
    },
    {
      icon: <Wrench className="w-6 h-6 text-amber-400" />,
      title: "Professional Installation",
      desc: "Strict adherence to manufacturer nailing zones, high-temp underlayments, and precision counter-flashing fabrication."
    },
    {
      icon: <HardHat className="w-6 h-6 text-amber-400" />,
      title: "Worksite Safety",
      desc: "Strict 100% harness tie-off compliance, property protection landscaping tarps, and daily magnetic driveway nail sweeps."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-amber-400" />,
      title: "Customer Communication",
      desc: "Dedicated project coordinators, real-time photo portal tracking, and immediate answers from start to final inspection."
    },
    {
      icon: <Headphones className="w-6 h-6 text-amber-400" />,
      title: "Reliable Project Support",
      desc: "24/7 emergency storm response, post-job walkthroughs, and lifetime workmanship guarantee options protecting your home."
    }
  ];

  return (
    <section id="why-choose-us" className={`${hideHeader ? 'pt-4 pb-10 sm:pt-6 sm:pb-12' : 'py-8 sm:py-12 border-t border-slate-800'} bg-[#101D30] text-white relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideHeader && (
          /* Section Header */
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
              <Award className="w-3.5 h-3.5" />
              THE APPY ADVANTAGE
            </div>
            <h2 className="type-h2 text-white">
              Why Discerning Homeowners{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                Choose Appy Roofing
              </span>
            </h2>
            <p className="mt-3 type-body-lead text-slate-300">
              We hold ourselves to a higher standard of construction integrity, transparent pricing, and respectful customer service from initial drone flight to final cleanup.
            </p>
          </div>
        )}

        {/* 8 Value Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="bg-[#16253D]/80 backdrop-blur-md rounded-3xl p-6 border border-slate-700/70 hover:border-amber-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#101D30] border border-slate-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold font-heading text-white group-hover:text-amber-400 transition-colors mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-amber-500/20 via-[#16253D] to-[#16253D] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Experience the Difference on Your Property
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Book a no-obligation physical roof inspection and receive a detailed written estimate.
            </p>
          </div>
          <button
            onClick={() => {
              trackConversion('estimate_button_click', { location: 'why_choose_us_bar' });
              onOpenBooking();
            }}
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition shadow-md flex items-center gap-2 flex-shrink-0"
          >
            <span>Schedule Roof Inspection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
