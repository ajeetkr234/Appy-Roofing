import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight, CheckCircle2, AlertCircle, DollarSign, ShieldAlert, Sparkles } from 'lucide-react';

export const CostEstimator: React.FC<{
  onOpenBookingWithEstimate: (estimateDetails: any) => void;
}> = ({ onOpenBookingWithEstimate }) => {
  const [sqft, setSqft] = useState(2400);
  const [material, setMaterial] = useState('Architectural Asphalt Shingles');
  const [stories, setStories] = useState(1);
  const [pitch, setPitch] = useState('Medium (6/12 - 8/12)');
  const [tearOff, setTearOff] = useState(true);
  const [zipCode, setZipCode] = useState('75201');
  const [calculation, setCalculation] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateEstimate = async () => {
    setIsCalculating(true);
    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          squareFootage: sqft,
          material,
          stories,
          pitch,
          existingTearOff: tearOff,
          zipCode
        })
      });
      const data = await res.json();
      setCalculation(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    calculateEstimate();
  }, [sqft, material, stories, pitch, tearOff, zipCode]);

  const materialsList = [
    { name: 'Architectural Asphalt Shingles', rateDesc: '$430 / Square' },
    { name: 'Standing Seam Metal Roofing', rateDesc: '$880 / Square' },
    { name: 'Spanish Clay Tile', rateDesc: '$1,250 / Square' },
    { name: 'Natural Slate', rateDesc: '$1,650 / Square' },
    { name: 'Commercial TPO Membrane', rateDesc: '$620 / Square' }
  ];

  return (
    <section id="cost-estimator" className="py-8 sm:py-10 bg-[#101D30] text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
            <Calculator className="w-3.5 h-3.5" />
            Instant Cost Calculator
          </div>
          <h2 className="type-h2 text-white">
            Transparent Roofing Estimates{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              Calculated Instantly
            </span>
          </h2>
          <p className="mt-2.5 type-body-lead text-slate-300">
            Customize roof dimensions, architectural materials, pitch complexity, and tear-off options to preview realistic regional pricing benchmarks.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column (7 Cols) */}
          <div className="lg:col-span-7 bg-[#091321] rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
            {/* Square Footage Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider font-bold text-slate-300">
                  Estimated Roof Area (Square Footage)
                </label>
                <div className="text-sm font-bold text-amber-400 font-mono">
                  {sqft.toLocaleString()} sq ft ({Math.ceil(sqft / 100)} Squares)
                </div>
              </div>
              <input
                type="range"
                min="1000"
                max="6500"
                step="100"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>Small Home (1,000 sq ft)</span>
                <span>Average (2,400 sq ft)</span>
                <span>Large Estate (6,500 sq ft)</span>
              </div>
            </div>

            {/* Material Selection */}
            <div>
              <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-2.5">
                Roofing Material System
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {materialsList.map((m) => {
                  const isSelected = material === m.name;
                  return (
                    <button
                      key={m.name}
                      onClick={() => setMaterial(m.name)}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                          : 'bg-[#16253D] border-slate-700/60 text-slate-200 hover:bg-[#1E3250]'
                      }`}
                    >
                      <span className="text-xs font-bold">{m.name}</span>
                      <span className="text-[11px] text-slate-400 mt-1">{m.rateDesc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stories & Pitch in 2 Cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-1.5">
                  Building Stories
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStories(s)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                        stories === s
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-[#16253D] border-slate-700 text-slate-200 hover:bg-[#1E3250]'
                      }`}
                    >
                      {s} {s === 1 ? 'Story' : s === 3 ? '3+ Stories' : 'Stories'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-1.5">
                  Roof Pitch & Slope
                </label>
                <select
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#16253D] border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-amber-500"
                >
                  <option value="Low Slope (2/12 - 4/12)">Low Slope (2/12 - 4/12)</option>
                  <option value="Medium (6/12 - 8/12)">Medium Standard (6/12 - 8/12)</option>
                  <option value="Steep Mansard/Gable (9/12+)">Steep Gable (9/12+)</option>
                </select>
              </div>
            </div>

            {/* Existing Tear-off & ZIP Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-[#16253D] border border-slate-700/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tearOff}
                  onChange={(e) => setTearOff(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-600 focus:ring-amber-400"
                />
                <span className="text-xs text-slate-200 font-medium">
                  Tear-off & Disposal of Existing Roof
                </span>
              </label>

              <div>
                <input
                  type="text"
                  maxLength={5}
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Enter 5-digit ZIP"
                  className="w-full py-3 px-3.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Output Quotation Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#091321] rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl relative">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Indicative Range
            </span>
            <h3 className="text-xl font-bold font-heading text-white">
              Estimated Total Investment
            </h3>

            {calculation && calculation.breakdown ? (
              <div className="mt-5 space-y-5">
                {/* Price Range Banner */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#16253D] to-[#101D30] border border-amber-500/30 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                    ${calculation.breakdown.estimatedLow.toLocaleString()} – ${calculation.breakdown.estimatedHigh.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Midpoint Average: ${calculation.breakdown.suggestedAverage.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-amber-400/90 font-medium mt-1">
                    Expected Lifespan: {calculation.lifespanExpectancy}
                  </div>
                </div>

                {/* Line Item Breakdown */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Architectural Materials</span>
                    <span className="font-semibold text-white">${calculation.breakdown.materials.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Certified Installation Labor</span>
                    <span className="font-semibold text-white">${calculation.breakdown.certifiedLabor.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Tear-off & Environmental Disposal</span>
                    <span className="font-semibold text-white">
                      {calculation.breakdown.tearOffAndDisposal > 0
                        ? `$${calculation.breakdown.tearOffAndDisposal.toLocaleString()}`
                        : 'None Selected'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Ventilation, Flashing & Permits</span>
                    <span className="font-semibold text-white">${calculation.breakdown.ventilationFlashingPermits.toLocaleString()}</span>
                  </div>
                </div>

                {/* Official Quote Button */}
                <button
                  onClick={() => onOpenBookingWithEstimate(calculation)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider transition shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <span>Lock in Official Written Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-400">
                Updating calculations...
              </div>
            )}

            {/* Mandatory Non-binding Disclaimer */}
            <div className="mt-5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[10px] text-slate-400 leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Calculation Disclaimer: This indicative calculation is for planning purposes only and is not a binding legal quotation. Exact costs require in-person validation of structural decking, valley complexity, penetrations, and localized municipal code compliance.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
