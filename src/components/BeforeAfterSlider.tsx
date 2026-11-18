import React, { useState, useRef } from 'react';
import { Sliders, Sparkles, MapPin, ArrowRight } from 'lucide-react';

const COMPARISON_PROJECTS = [
  {
    id: 'comp-1',
    title: 'Severe Storm Hail Damage to Standing Seam Metal',
    location: 'Highland Park, Dallas, TX',
    scope: '46 Squares • 24-Gauge Matte Charcoal • Lifetime Warranty',
    beforeImage: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    beforeLabel: 'Before: Fractured Shingles & Rotted Decking',
    afterLabel: 'After: Appy Standing Seam Modern Metal'
  },
  {
    id: 'comp-2',
    title: 'Aged 25-Year Shingles to Dimensional Architectural System',
    location: 'Westlake Hills, Austin, TX',
    scope: '38 Squares • CertainTeed Landmark Pro • 50-Year Non-Prorated',
    beforeImage: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    beforeLabel: 'Before: Blown-off Shingles & Water Ingress',
    afterLabel: 'After: High-Definition Architectural Shingles'
  },
  {
    id: 'comp-3',
    title: 'Cracked Tile Roof to Spanish Barrel Mission Tile',
    location: 'Stone Oak, San Antonio, TX',
    scope: '52 Squares • Handcrafted Terracotta Clay • 75-Yr Durability',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    beforeLabel: 'Before: Leaking Chimney Flashing & Cracked Mud Caps',
    afterLabel: 'After: Handcrafted Mediterranean Clay System'
  }
];

export const BeforeAfterSlider: React.FC<{
  onOpenBooking: () => void;
}> = ({ onOpenBooking }) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = COMPARISON_PROJECTS[activeProjectIndex];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-8 sm:py-10 bg-[#101D30] text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
            <Sliders className="w-3.5 h-3.5" />
            Verified Transformations
          </div>
          <h2 className="type-h2 text-white">
            See the Difference{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              Quality Roofing Makes
            </span>
          </h2>
          <p className="mt-2.5 type-body-lead text-slate-300">
            Drag the slider horizontally to compare distressed, hail-damaged roofs with completed Appy installations.
          </p>

          {/* Project Switcher Pills */}
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {COMPARISON_PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => { setActiveProjectIndex(idx); setSliderPosition(50); }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  activeProjectIndex === idx
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-[#16253D] text-slate-300 hover:bg-[#1E3250] border border-slate-700/60'
                }`}
              >
                Project #{idx + 1}: {proj.title.split(' to ')[1] || proj.title}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="max-w-5xl mx-auto bg-[#091321] rounded-3xl p-4 sm:p-6 border border-slate-700/80 shadow-2xl">
          {/* Active Project Title Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                {activeProject.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeProject.location}</span>
                <span>•</span>
                <span>{activeProject.scope}</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 self-start sm:self-auto">
              Interactive Comparison
            </span>
          </div>

          {/* Slider Container */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onClick={(e) => handleMove(e.clientX)}
            className="relative h-[360px] sm:h-[500px] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-slate-800 shadow-inner group"
          >
            {/* After Image (Background) */}
            <img
              src={activeProject.afterImage}
              alt="After roof replacement"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* After Label Pill */}
            <span className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-emerald-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider shadow-lg">
              {activeProject.afterLabel}
            </span>

            {/* Before Image (Clipped Foreground) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeProject.beforeImage}
                alt="Before roof replacement"
                className="absolute inset-y-0 left-0 max-w-none h-full object-cover"
                style={{ width: containerRef.current?.clientWidth || '100%' }}
              />
              {/* Before Label Pill */}
              <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-rose-950/85 backdrop-blur-md border border-rose-500/40 text-rose-400 text-xs font-bold uppercase tracking-wider shadow-lg">
                {activeProject.beforeLabel}
              </span>
            </div>

            {/* Draggable Divider Line & Knob */}
            <div
              className="absolute inset-y-0 z-20 flex flex-col items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Vertical Line */}
              <div className="w-1 h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
              {/* Center Handle Knob */}
              <div className="absolute w-11 h-11 rounded-full bg-amber-500 text-slate-950 border-2 border-white shadow-2xl flex items-center justify-center pointer-events-auto cursor-ew-resize">
                <Sliders className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>

          {/* Instructions Bar */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <span>👈 Drag or tap anywhere to slide between Before & After</span>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition"
            >
              <span>Get this level of craftsmanship for your home</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
