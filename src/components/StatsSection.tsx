import React, { useState, useEffect } from 'react';
import { DEMO_STATISTICS } from '../data/roofingData';
import { Award, CheckCircle2, ShieldCheck, MapPin, Heart } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const [counts, setCounts] = useState(DEMO_STATISTICS.map(() => 0));

  useEffect(() => {
    const duration = 1800;
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCounts(
        DEMO_STATISTICS.map((item) => {
          const target = item.value;
          const current = (target / steps) * step;
          return step >= steps ? target : Math.round(current * 10) / 10;
        })
      );

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const icons = [
    <Award className="w-4 h-4 text-amber-400" />,
    <ShieldCheck className="w-4 h-4 text-amber-400" />,
    <Heart className="w-4 h-4 text-amber-400" />,
    <CheckCircle2 className="w-4 h-4 text-amber-400" />,
    <MapPin className="w-4 h-4 text-amber-400" />
  ];

  return (
    <section id="statistics" className="py-6 sm:py-8 bg-[#101D30] border-y border-slate-800/80 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metric Cards Grid - Compact and space-efficient */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {DEMO_STATISTICS.map((stat, idx) => (
            <div
              key={stat.label}
              className="bg-[#14233a]/80 backdrop-blur-sm rounded-xl p-3.5 sm:p-4 border border-slate-700/60 hover:border-amber-500/30 transition-all shadow-sm group"
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                  {icons[idx]}
                </div>
                <div className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight leading-none flex items-baseline">
                  <span>{counts[idx]}</span>
                  <span className="text-amber-400 text-base sm:text-lg font-bold ml-0.5">
                    {stat.suffix}
                  </span>
                </div>
              </div>

              <div className="text-xs sm:text-[13px] font-semibold text-slate-200 truncate">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 truncate mt-0.5 font-normal">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3.5 text-center text-[11px] text-slate-400/80">
          Historical craftsmanship metrics audited across regional service territories.
        </div>
      </div>
    </section>
  );
};
