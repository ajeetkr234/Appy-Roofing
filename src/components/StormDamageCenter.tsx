import React, { useEffect, useRef, useState } from 'react';
import { CloudRain, Wind, AlertOctagon, Phone, CheckSquare, Upload, FileText, ArrowRight, ShieldCheck, HelpCircle, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/roofingData';
import { trackConversion } from '../utils/analytics';

export const StormDamageCenter: React.FC<{
  onOpenBooking: () => void;
}> = ({ onOpenBooking }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Section 8: Interactive Storm Assessment State
  const [experiencedHail, setExperiencedHail] = useState<'Yes' | 'No' | 'Unsure'>('Yes');
  const [shinglesMissing, setShinglesMissing] = useState<'Yes' | 'No' | 'A Few'>('A Few');
  const [waterLeakage, setWaterLeakage] = useState<'Active Leak' | 'Moisture Stains' | 'No'>('Moisture Stains');
  const [ceilingDamage, setCeilingDamage] = useState<'Yes' | 'Water Rings' | 'No'>('Water Rings');
  const [stormTiming, setStormTiming] = useState<'Within 48 Hours' | 'Past 2 Weeks' | 'Past Month' | 'Over 30 Days'>('Within 48 Hours');
  const [showGuidance, setShowGuidance] = useState(false);

  const [checklist, setChecklist] = useState([
    { id: 1, text: "Photograph collateral damage from the ground (gutters, AC units, window screens)", done: true },
    { id: 2, text: "Never climb on a wet or damaged roof - risk of sudden deck collapse", done: true },
    { id: 3, text: "Record the exact date and approximate time of the hail/wind event", done: false },
    { id: 4, text: "Schedule an emergency tarping if water is actively entering the attic", done: false },
    { id: 5, text: "Call Appy Roofing Co. for a forensic photographic insurance report", done: false },
    { id: 6, text: "Request Appy attend your insurance adjuster on-site walkthrough", done: false }
  ]);

  const toggleCheck = (id: number) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  // Rain Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const raindrops = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 4 + Math.random() * 5,
      len: 12 + Math.random() * 10
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
      ctx.lineWidth = 1.2;

      raindrops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 1, drop.y + drop.len);
        ctx.stroke();

        drop.y += drop.speed;
        drop.x -= 0.5;

        if (drop.y > height) {
          drop.y = -drop.len;
          drop.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="storm-center" className="py-8 sm:py-10 bg-[#060D17] text-white relative overflow-hidden border-t border-slate-800">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 type-badge mb-2">
            <CloudRain className="w-4 h-4 text-sky-400" />
            24/7 STORM & EMERGENCY CENTER
          </div>
          <h2 className="type-h2 text-white">
            Rapid Response Storm &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-amber-300 to-amber-500">
              Hail Damage Center
            </span>
          </h2>
          <p className="mt-2.5 type-body text-slate-300">
            When severe weather strikes, immediate action protects your family and preserves full insurance claim rights. We deploy 24/7 emergency tarping and handle adjuster walkthroughs.
          </p>
        </div>

        {/* 3 Pillar Cards: Hail, Wind, Emergency Dispatch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Card 1: Hail Damage */}
          <div className="p-6 rounded-3xl bg-[#101D30]/90 backdrop-blur-md border border-slate-700/80 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-5 text-amber-400">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-2">
                Hail Damage Forensics
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Hail impacts crush the internal fiberglass mat without tearing surface granules immediately. Left unaddressed, ultraviolet exposure erodes the exposed asphalt within months.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-amber-400 font-semibold">
              ✔ 10'x10' Test Square Verification
            </div>
          </div>

          {/* Card 2: High Wind Guidance */}
          <div className="p-6 rounded-3xl bg-[#101D30]/90 backdrop-blur-md border border-slate-700/80 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center mb-5 text-sky-400">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-2">
                Wind Uplift & Tear-Off
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Gale force gusts peel back thermal adhesive strips, allowing wind-driven rainfall to blow up underneath. We secure perimeter drip edges and replace missing shingles.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-sky-400 font-semibold">
              ✔ 130+ MPH Rated High-Wind Upgrades
            </div>
          </div>

          {/* Card 3: 24/7 Tarping Hotline */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/20 via-[#101D30] to-[#101D30] border border-amber-500/40 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mb-5 font-extrabold shadow-lg">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-2">
                24/7 Emergency Tarping
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Active leak or tree branch puncture? Our dedicated rapid-response storm trailers carry heavy-duty industrial tarps, lumber strapping, and interior water mitigation pumps.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                onClick={() => trackConversion('call_button_click', { location: 'storm_damage_hotline' })}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg"
              >
                <span>Dispatch: {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 8: Interactive Storm Damage Assessment Tool */}
        <div className="mb-8 bg-[#101D30] rounded-2xl p-5 sm:p-7 border border-slate-700/80 shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-400 block mb-1">
              Interactive Triage
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Preliminary Storm Damage Assessment
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Answer 5 quick questions about recent storm activity to receive immediate guidance on water mitigation and insurance claim eligibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Question 1: Hail */}
            <div className="p-4 rounded-2xl bg-[#16253D] border border-slate-700/70">
              <label className="block text-xs font-bold text-white mb-2">
                1. Did your property experience hail?
              </label>
              <div className="flex gap-2">
                {(['Yes', 'No', 'Unsure'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setExperiencedHail(opt)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition ${
                      experiencedHail === opt
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-[#101D30] text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Missing Shingles */}
            <div className="p-4 rounded-2xl bg-[#16253D] border border-slate-700/70">
              <label className="block text-xs font-bold text-white mb-2">
                2. Are shingles missing or damaged?
              </label>
              <div className="flex gap-2">
                {(['Yes', 'A Few', 'No'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setShinglesMissing(opt)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition ${
                      shinglesMissing === opt
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-[#101D30] text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Water Leakage */}
            <div className="p-4 rounded-2xl bg-[#16253D] border border-slate-700/70">
              <label className="block text-xs font-bold text-white mb-2">
                3. Do you notice water leakage?
              </label>
              <div className="flex gap-1.5">
                {(['Active Leak', 'Moisture Stains', 'No'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setWaterLeakage(opt)}
                    className={`flex-1 py-2 rounded-xl text-[11px] font-semibold border transition ${
                      waterLeakage === opt
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-[#101D30] text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4: Ceiling Damage */}
            <div className="p-4 rounded-2xl bg-[#16253D] border border-slate-700/70">
              <label className="block text-xs font-bold text-white mb-2">
                4. Is there visible ceiling damage?
              </label>
              <div className="flex gap-1.5">
                {(['Yes', 'Water Rings', 'No'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setCeilingDamage(opt)}
                    className={`flex-1 py-2 rounded-xl text-[11px] font-semibold border transition ${
                      ceilingDamage === opt
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-[#101D30] text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 5: When Storm Occurred */}
            <div className="p-4 rounded-2xl bg-[#16253D] border border-slate-700/70 sm:col-span-2 lg:col-span-2">
              <label className="block text-xs font-bold text-white mb-2">
                5. When did the storm occur?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Within 48 Hours', 'Past 2 Weeks', 'Past Month', 'Over 30 Days'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setStormTiming(opt)}
                    className={`py-2 rounded-xl text-[11px] font-semibold border transition ${
                      stormTiming === opt
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-[#101D30] text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preliminary Guidance Output Box */}
          <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#16253D] to-[#16253D] border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block">
                Preliminary Assessment Finding
              </span>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                {waterLeakage === 'Active Leak' || shinglesMissing === 'Yes'
                  ? 'High Severity Storm Damage Indicated: Active water entry requires immediate emergency tarping to prevent ceiling collapse and framing dry-rot.'
                  : experiencedHail === 'Yes' || ceilingDamage !== 'No'
                  ? 'Probable Sub-Surface Mat Fracturing: Hail stones frequently compromise shingle adhesive strips and puncture underlayment invisibly.'
                  : 'Low to Moderate Immediate Risk: Schedule a certified 21-point drone scan to verify granule loss and gutter alignment.'}
              </p>
            </div>
            <button
              onClick={() => {
                trackConversion('inspection_booking', { source: 'storm_damage_assessment' });
                onOpenBooking();
              }}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 flex-shrink-0 flex items-center gap-1.5"
            >
              <span>Schedule Storm Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mandatory Section 8 Disclaimer */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              Disclaimer: This preliminary self-assessment tool cannot replace a certified on-site professional roof inspection or determine insurance claim coverage decisions. Insurance claim determinations belong exclusively to your insurance carrier according to policy terms.
            </span>
          </div>
        </div>

        {/* Insurance Checklist & Safety Box */}
        <div className="bg-[#101D30] rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Checklist items (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Homeowner Insurance Claim Checklist
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Follow these critical steps to safeguard your property and maximize legitimate insurance restoration coverage.
              </p>

              <div className="space-y-3">
                {checklist.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className="w-full flex items-start gap-3 p-3 rounded-xl bg-[#16253D] hover:bg-[#1E3250] text-left transition border border-slate-700/60"
                  >
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => {}}
                      className="mt-0.5 w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-600 cursor-pointer"
                    />
                    <span className={`text-xs ${item.done ? 'text-slate-400 line-through' : 'text-slate-200 font-medium'}`}>
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Safety Warning & Action Box (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-rose-950/40 to-slate-900 p-6 rounded-2xl border border-rose-500/30 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold uppercase mb-3">
                <AlertOctagon className="w-3.5 h-3.5" />
                CRITICAL SAFETY WARNING
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                Do Not Climb on a Storm-Damaged Roof
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Wet shingles, severed nail strips, and rotted decking create severe fall hazards. Leave all roof measurements and photography to our OSHA-certified estimators equipped with 4K drone cameras.
              </p>

              <button
                onClick={() => {
                  trackConversion('inspection_booking', { source: 'storm_center_safety_cta' });
                  onOpenBooking();
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider transition shadow-xl shadow-amber-500/20"
              >
                <span>Request a Storm Damage Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
