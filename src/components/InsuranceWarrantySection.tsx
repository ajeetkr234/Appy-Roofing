import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertOctagon, HelpCircle, Award, Scale } from 'lucide-react';

export const InsuranceWarrantySection: React.FC = () => {
  const claimSteps = [
    {
      step: '1',
      title: 'Forensic Property Documentation',
      desc: 'Our HAAG-certified inspectors document hail impact divots, vent dents, and wind-creased shingles using 4K drone photography.'
    },
    {
      step: '2',
      title: 'Xactimate Scope Preparation',
      desc: 'We draft a line-item estimate using the identical pricing software utilized by nationwide insurance carriers, ensuring proper code upgrade inclusions.'
    },
    {
      step: '3',
      title: 'On-Site Adjuster Walkthrough',
      desc: 'We meet your insurance adjuster on the roof to walk through the test squares and ensure all collateral damage is fully documented.'
    },
    {
      step: '4',
      title: 'Restoration & Depreciation Recovery',
      desc: 'After claim approval, our master crews install your new roof and submit final completion certificates to release withheld insurance depreciation funds.'
    }
  ];

  const warrantyTiers = [
    {
      name: 'Standard System Warranty',
      duration: '25 - 30 Years',
      labor: '5-Year Workmanship',
      manufacturer: 'CertainTeed / GAF Base Warranty',
      features: ['Shingle material defect protection', 'Algae resistance warranty', '110 MPH wind coverage']
    },
    {
      name: 'Appy Lifetime Elite System',
      duration: '50-Year Non-Prorated',
      labor: 'Lifetime Workmanship Guarantee',
      manufacturer: 'GAF Master Elite Golden Pledge / CertainTeed 5-Star',
      badge: 'Most Popular',
      features: ['100% material & labor replacement coverage', 'Tear-off & disposal costs covered', '130+ MPH high-wind certification', 'Transferable to next homebuyer']
    },
    {
      name: 'Commercial Standing Seam Metal',
      duration: '50 - 70+ Years',
      labor: '20-Year Watertight Guarantee',
      manufacturer: 'Kynar 500 Finish Manufacturer Warranty',
      features: ['Non-combustible Class A fire rating', 'Concealed fastener seam protection', 'Zero fade / chalk guarantee', 'Hail impact resistance discount eligible']
    }
  ];

  return (
    <section id="warranty-insurance" className="py-8 sm:py-10 bg-[#091321] text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Insurance & Lifetime Warranty Guidance
          </div>
          <h2 className="type-h2 text-white">
            Guaranteed Craftsmanship.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              Insurance Advocacy.
            </span>
          </h2>
          <p className="mt-2.5 type-body text-slate-300">
            Understand how our certified adjusters assist your storm insurance claim and how our dual-layer warranties protect your home for decades.
          </p>
        </div>

        {/* Claim Walkthrough 4 Steps */}
        <div className="bg-[#101D30] rounded-2xl p-5 sm:p-7 border border-slate-700/80 shadow-xl mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
            The 4-Stage Insurance Claim Navigation Process
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-5">
            How Appy works alongside you and your insurance provider to streamline storm recovery.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {claimSteps.map((s) => (
              <div key={s.step} className="p-4 rounded-2xl bg-[#16253D] border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center mb-3">
                    0{s.step}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-1.5">{s.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Legal Insurance Disclaimer */}
          <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
            <Scale className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              Disclaimer: Appy Roofing Co. acts strictly as your contractor and forensic documentation partner. Final claim approval, coverage determinations, and payout amounts are the sole responsibility of your insurance company according to the specific terms of your policy. We do not act as public insurance adjusters where prohibited by state law.
            </span>
          </div>
        </div>

        {/* Warranty Comparison Cards */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-white text-center mb-8">
            Dual-Layer Warranty Protection Options
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {warrantyTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl p-6 sm:p-8 border shadow-xl flex flex-col justify-between relative ${
                  tier.badge
                    ? 'bg-gradient-to-b from-[#16253D] to-[#101D30] border-amber-400 ring-1 ring-amber-400'
                    : 'bg-[#101D30] border-slate-700/80'
                }`}
              >
                {tier.badge && (
                  <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow">
                    {tier.badge}
                  </span>
                )}
                <div>
                  <h4 className="text-lg font-bold font-heading text-white mb-1">{tier.name}</h4>
                  <div className="text-2xl font-extrabold text-amber-400 font-heading mb-4">
                    {tier.duration}
                  </div>
                  <div className="text-xs text-slate-300 font-medium mb-1">
                    Labor: <strong className="text-white">{tier.labor}</strong>
                  </div>
                  <div className="text-xs text-slate-400 mb-6">
                    Underwritten: {tier.manufacturer}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-800">
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
