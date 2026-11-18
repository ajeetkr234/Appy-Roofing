import React, { useState } from 'react';
import { ROOFING_MATERIALS } from '../data/roofingData';
import { RoofingMaterial } from '../types';
import { Layers, CheckCircle2, XCircle, Clock, ShieldCheck, Box, ChevronRight, HelpCircle } from 'lucide-react';

export const MaterialsGuide: React.FC<{
  onOpenBookingWithService: (serviceName: string) => void;
  hideHeader?: boolean;
}> = ({ onOpenBookingWithService, hideHeader = false }) => {
  const [selectedMaterial, setSelectedMaterial] = useState<RoofingMaterial>(ROOFING_MATERIALS[0]);
  const [activeTab, setActiveTab] = useState<'cards' | 'table'>('cards');

  return (
    <section id="materials" className={`${hideHeader ? 'pt-4 pb-10 sm:pt-6 sm:pb-12' : 'py-8 sm:py-12 border-t border-slate-800'} bg-[#101D30] text-white relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {hideHeader ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">View:</span>
              <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-700">
                <button
                  onClick={() => setActiveTab('cards')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === 'cards'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Interactive Detail Explorer
                </button>
                <button
                  onClick={() => setActiveTab('table')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === 'table'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Side-by-Side Comparison Matrix
                </button>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              Comparing <span className="font-semibold text-amber-400">{ROOFING_MATERIALS.length}</span> Premium Architectural Roofing Systems
            </div>
          </div>
        ) : (
          /* Section Header */
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
              <Layers className="w-3.5 h-3.5" />
              Architectural Materials Guide
            </div>
            <h2 className="type-h2 text-white">
              Compare Premium Roofing Materials for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                Longevity & Aesthetics
              </span>
            </h2>
            <p className="mt-3 type-body-lead text-slate-300">
              Every roofing material offers distinct structural, thermal, and architectural advantages. Explore our comprehensive engineering guide to select the right system for your climate and budget.
            </p>

            {/* View Mode Toggle */}
            <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-900 border border-slate-700">
              <button
                onClick={() => setActiveTab('cards')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                  activeTab === 'cards'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Interactive Detail Explorer
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                  activeTab === 'table'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Side-by-Side Comparison Matrix
              </button>
            </div>
          </div>
        )}

        {/* View Mode 1: Interactive Detail Explorer */}
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Material Selector Pills (4 Cols) */}
            <div className="lg:col-span-4 space-y-2">
              {ROOFING_MATERIALS.map((mat) => {
                const isSelected = selectedMaterial.id === mat.id;
                return (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 shadow-md shadow-amber-500/10'
                        : 'bg-[#16253D] border-slate-700/60 hover:bg-[#1E3250] hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className={`text-sm font-bold ${isSelected ? 'text-amber-400' : 'text-white'}`}>
                        {mat.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Investment Level: <span className="text-amber-400 font-mono">{mat.priceLevel}</span> • {mat.typicalDurability.split(' ')[0]} Yrs
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-amber-400 translate-x-1' : 'text-slate-500'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Material Detail Dossier (8 Cols) */}
            <div className="lg:col-span-8 bg-[#091321] rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl">
              {/* Top Banner with Image */}
              <div className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-slate-800">
                <div className="w-full sm:w-56 h-40 rounded-2xl overflow-hidden flex-shrink-0 relative border border-slate-700">
                  <img
                    src={selectedMaterial.image}
                    alt={selectedMaterial.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded bg-slate-950/80 text-[10px] text-amber-400 font-bold uppercase">
                    Installed Material
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                      Material Specification
                    </span>
                    <span className="text-xs text-slate-400 font-mono">• {selectedMaterial.priceLevel} Level</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                    {selectedMaterial.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedMaterial.shortDesc}
                  </p>
                </div>
              </div>

              {/* Advantages vs Disadvantages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                {/* Pros */}
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/25">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-1.5 mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                    Key Advantages
                  </h4>
                  <div className="space-y-2">
                    {selectedMaterial.advantages.map((adv, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                        <span>{adv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cons */}
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/25">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-rose-400 flex items-center gap-1.5 mb-3">
                    <XCircle className="w-4 h-4" />
                    Considerations & Trade-offs
                  </h4>
                  <div className="space-y-2">
                    {selectedMaterial.disadvantages.map((dis, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                        <span>{dis}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Engineering Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="p-3.5 rounded-xl bg-[#101D30] border border-slate-700/60">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Typical Durability</div>
                  <div className="text-xs font-bold text-amber-400 mt-0.5">{selectedMaterial.typicalDurability}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#101D30] border border-slate-700/60">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Maintenance Need</div>
                  <div className="text-xs text-slate-200 mt-0.5">{selectedMaterial.maintenanceRequirements}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#101D30] border border-slate-700/60">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Available Styles</div>
                  <div className="text-xs text-slate-200 mt-0.5">{selectedMaterial.availableStyles.join(', ')}</div>
                </div>
              </div>

              {/* Suitable Applications */}
              <div className="mt-6 p-4 rounded-xl bg-[#16253D] border border-slate-700 text-xs text-slate-300">
                <strong className="text-amber-400 block mb-1">Suitable Applications:</strong>
                {selectedMaterial.suitableApplications}
              </div>

              {/* Actions Footer */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <a
                  href="#interactive-3d"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
                >
                  <Box className="w-4 h-4" />
                  <span>Test this material in the 3D House Visualizer</span>
                </a>
                <button
                  onClick={() => onOpenBookingWithService(selectedMaterial.name)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-md"
                >
                  Request Material Samples & Quote
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Mode 2: Comparison Matrix Table */}
        {activeTab === 'table' && (
          <div className="bg-[#091321] rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#16253D] border-b border-slate-700 text-slate-300 text-[11px] uppercase tracking-wider">
                  <th className="p-4 font-bold text-white">Material</th>
                  <th className="p-4 font-bold">Lifespan</th>
                  <th className="p-4 font-bold">Cost Tier</th>
                  <th className="p-4 font-bold">Maintenance</th>
                  <th className="p-4 font-bold">Best Architectural Fit</th>
                  <th className="p-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {ROOFING_MATERIALS.map((mat) => (
                  <tr key={mat.id} className="hover:bg-slate-850/50 transition">
                    <td className="p-4 font-bold text-white flex items-center gap-2.5">
                      <img src={mat.image} alt={mat.name} className="w-9 h-9 rounded-lg object-cover" />
                      <span>{mat.name}</span>
                    </td>
                    <td className="p-4 text-amber-400 font-semibold">{mat.typicalDurability}</td>
                    <td className="p-4 font-mono font-bold text-slate-200">{mat.priceLevel}</td>
                    <td className="p-4 text-slate-300 max-w-xs">{mat.maintenanceRequirements}</td>
                    <td className="p-4 text-slate-300 max-w-xs">{mat.suitableApplications}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onOpenBookingWithService(mat.name)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold text-[11px] transition"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400 max-w-4xl mx-auto flex items-center justify-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            Durability and cost ranges depend on localized climate factors, continuous ventilation, pitch geometry, installation standards, and manufacturer specifications.
          </span>
        </div>
      </div>
    </section>
  );
};
