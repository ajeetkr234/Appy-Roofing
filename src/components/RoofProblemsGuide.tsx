import React, { useState } from 'react';
import { ROOFING_PROBLEMS } from '../data/roofingData';
import { RoofingProblem } from '../types';
import { AlertTriangle, ChevronRight, CheckCircle2, ArrowRight, ShieldAlert, AlertOctagon, HelpCircle } from 'lucide-react';

export const RoofProblemsGuide: React.FC<{
  onOpenBooking: () => void;
}> = ({ onOpenBooking }) => {
  const [selectedProblem, setSelectedProblem] = useState<RoofingProblem>(ROOFING_PROBLEMS[0]);

  return (
    <section id="problems-guide" className="py-8 sm:py-10 bg-[#091321] text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 type-badge mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            Early Warning Signs
          </div>
          <h2 className="type-h2 text-white">
            Small Roofing Problems Today Can Become{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-amber-500">
              Expensive Repairs Tomorrow
            </span>
          </h2>
          <p className="mt-2.5 type-body-lead text-slate-300">
            Water follows gravity and horizontal rafters, creating hidden rotting conditions long before a ceiling bubble appears. Select any common roof issue below to inspect warning signs, causes, and recommended remedies.
          </p>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Problem List Menu (5 Cols) */}
          <div className="lg:col-span-5 space-y-2 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
            {ROOFING_PROBLEMS.map((prob, idx) => {
              const isSelected = selectedProblem.id === prob.id;
              return (
                <button
                  key={prob.id}
                  onClick={() => setSelectedProblem(prob)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/10'
                      : 'bg-[#101D30] border-slate-700/60 hover:bg-[#16253D] hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      #{idx + 1}
                    </span>
                    <span className={`text-sm font-bold ${isSelected ? 'text-amber-400' : 'text-slate-200'}`}>
                      {prob.title}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${
                    isSelected ? 'text-amber-400 translate-x-1' : 'text-slate-500'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Selected Problem Forensic Deep Dive (7 Cols) */}
          <div className="lg:col-span-7 bg-[#101D30] rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl relative overflow-hidden">
            {/* Header with image preview */}
            <div className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-slate-800">
              <div className="w-full sm:w-44 h-36 rounded-2xl overflow-hidden flex-shrink-0 relative border border-slate-700">
                <img
                  src={selectedProblem.image}
                  alt={selectedProblem.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] text-amber-400 font-bold uppercase">
                  Field Photo
                </span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Forensic Failure Analysis
                </span>
                <h3 className="type-h3 text-white">
                  {selectedProblem.title}
                </h3>
                <p className="mt-2.5 type-body text-slate-300 leading-relaxed">
                  <strong className="text-slate-100 font-semibold">Why It Happens: </strong>
                  {selectedProblem.whyItHappens}
                </p>
              </div>
            </div>

            {/* Warning Signs & Consequences Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {/* Warning Signs */}
              <div className="p-4 rounded-2xl bg-[#16253D] border border-slate-700/60">
                <h4 className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5 mb-2.5">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  Key Warning Signs
                </h4>
                <div className="space-y-2">
                  {selectedProblem.warningSigns.map((sign, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consequences */}
              <div className="p-4 rounded-2xl bg-[#16253D] border border-slate-700/60">
                <h4 className="text-xs uppercase tracking-wider font-bold text-rose-400 flex items-center gap-1.5 mb-2.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Potential Consequences
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedProblem.consequences}
                </p>
              </div>
            </div>

            {/* When Inspection is Advisable */}
            <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25">
              <h4 className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5 mb-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                When Professional Inspection is Advisable
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedProblem.inspectionAdvice}
              </p>
            </div>

            {/* Recommended Next Steps */}
            <div className="mt-6">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
                Recommended Professional Next Steps
              </h4>
              <div className="space-y-1.5">
                {selectedProblem.recommendedNextSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-slate-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-300 font-medium text-center sm:text-left">
                Don't Wait Until a Small Leak Becomes a Major Repair.
              </div>
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
              >
                <span>Schedule Problem Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
