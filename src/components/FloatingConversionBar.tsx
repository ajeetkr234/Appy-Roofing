import React from 'react';
import { Phone, Calendar, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/roofingData';
import { trackConversion } from '../utils/analytics';

export const FloatingConversionBar: React.FC<{
  onOpenBooking: () => void;
}> = ({ onOpenBooking }) => {
  return (
    <>
      {/* Desktop Floating Action Dock (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2.5">
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          onClick={() => trackConversion('call_button_click', { location: 'floating_dock' })}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#091321]/90 hover:bg-[#101D30] text-white border border-slate-700/80 hover:border-amber-400 type-btn backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-105 group"
        >
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span>Call: {BUSINESS_INFO.phone}</span>
        </a>

        <button
          onClick={() => {
            trackConversion('estimate_button_click', { location: 'floating_dock' });
            onOpenBooking();
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 type-btn shadow-2xl shadow-amber-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Calendar className="w-4 h-4 text-slate-950" />
          <span>Free Estimate</span>
        </button>
      </div>

      {/* Mobile Fixed Bottom CTA Bar is rendered in Navbar.tsx (bottom-0 z-40) */}
    </>
  );
};
