import React, { useState } from 'react';
import { DollarSign, Percent, Clock, AlertCircle, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const FinancingCalculator: React.FC<{
  onOpenBooking: () => void;
}> = ({ onOpenBooking }) => {
  const [projectCost, setProjectCost] = useState(14500);
  const [downPayment, setDownPayment] = useState(1500);
  const [termMonths, setTermMonths] = useState(60);
  const [apr, setApr] = useState(6.99);

  // Calculate monthly payment: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const principal = Math.max(projectCost - downPayment, 0);
  const monthlyRate = apr / 100 / 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0 && termMonths > 0) {
    monthlyPayment = Math.round(
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
        (Math.pow(1 + monthlyRate, termMonths) - 1)
    );
  } else if (termMonths > 0) {
    monthlyPayment = Math.round(principal / termMonths);
  }

  const totalRepayment = monthlyPayment * termMonths + downPayment;
  const totalInterest = Math.max(totalRepayment - projectCost, 0);

  const termOptions = [12, 36, 60, 84, 120];

  return (
    <section id="financing" className="py-8 sm:py-10 bg-[#101D30] text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
            <DollarSign className="w-3.5 h-3.5" />
            Roof Financing Solutions
          </div>
          <h2 className="type-h2 text-white">
            Protect Your Home Now.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              Pay Over Time.
            </span>
          </h2>
          <p className="mt-2.5 type-body-lead text-slate-300">
            Explore affordable monthly repayment options with low promotional APR tiers, zero prepayment penalties, and flexible terms from 12 to 120 months.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Inputs Column (7 Cols) */}
          <div className="lg:col-span-7 bg-[#091321] rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
            {/* Project Cost Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider font-bold text-slate-300">
                  Estimated Project Cost
                </label>
                <div className="text-sm font-bold text-amber-400 font-mono">
                  ${projectCost.toLocaleString()}
                </div>
              </div>
              <input
                type="range"
                min="5000"
                max="45000"
                step="500"
                value={projectCost}
                onChange={(e) => setProjectCost(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>$5,000 (Repair)</span>
                <span>$15,000 (Shingle Roof)</span>
                <span>$45,000 (Luxury Metal/Tile)</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider font-bold text-slate-300">
                  Initial Down Payment ($0 Down Available)
                </label>
                <div className="text-sm font-bold text-white font-mono">
                  ${downPayment.toLocaleString()}
                </div>
              </div>
              <input
                type="range"
                min="0"
                max={Math.min(projectCost * 0.5, 20000)}
                step="250"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Loan Duration Term Pills */}
            <div>
              <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-2">
                Loan Duration (Months)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {termOptions.map((term) => (
                  <button
                    key={term}
                    onClick={() => setTermMonths(term)}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                      termMonths === term
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-[#16253D] border-slate-700 text-slate-300 hover:bg-[#1E3250]'
                    }`}
                  >
                    {term} Mo
                  </button>
                ))}
              </div>
            </div>

            {/* APR Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider font-bold text-slate-300">
                  Illustrative APR Rate
                </label>
                <div className="text-sm font-bold text-amber-400 font-mono">
                  {apr.toFixed(2)}%
                </div>
              </div>
              <input
                type="range"
                min="3.99"
                max="14.99"
                step="0.5"
                value={apr}
                onChange={(e) => setApr(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* Monthly Payment Output Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#101D30] to-[#0A1424] rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl relative">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Estimated Payment Plan
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-heading text-white mt-2">
              ${monthlyPayment}
              <span className="text-base text-slate-400 font-medium"> / month</span>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Financed Loan Amount:</span>
                <span className="font-semibold text-white">${principal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Estimated Repayment:</span>
                <span className="font-semibold text-white">${totalRepayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Estimated Finance Charge:</span>
                <span className="font-semibold text-white">${totalInterest.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero pre-payment penalties</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Soft credit check pre-qualification available</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Options starting at $0 down</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-6 w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
            >
              Explore Financing with Free Estimate
            </button>

            {/* Disclaimer */}
            <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[10px] text-slate-400 leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Illustrative Disclaimer: All calculations are sample estimates for discussion purposes only. Loans subject to credit approval by third-party lending partners. Actual APR, fees, and monthly terms may vary.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
