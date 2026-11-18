import React from 'react';
import { TEAM_MEMBERS } from '../data/roofingData';
import { Shield, HardHat, CheckCircle2, Award, AlertCircle } from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-8 sm:py-10 bg-[#091321] text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
            <HardHat className="w-3.5 h-3.5" />
            Safety Standards & Certified Craftsmanship
          </div>
          <h2 className="type-h2 text-white">
            Skilled Professionals.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              Quality Workmanship.
            </span>
          </h2>
          <p className="mt-2.5 type-body-lead text-slate-300">
            Every Appy field technician operates under 100% OSHA fall-protection standards: ANSI-compliant safety harnesses, hard hats, high-visibility vests, and ongoing manufacturer installation mastery.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="bg-[#101D30] rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col justify-between hover:border-amber-500/50 transition-all group"
            >
              <div>
                {/* Photo with PPE Overlay badge */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101D30] via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md text-amber-400 border border-slate-700 text-[10px] font-bold uppercase">
                    <HardHat className="w-3 h-3" />
                    OSHA Safety Certified
                  </span>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="text-lg font-bold font-heading text-white group-hover:text-amber-400 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs text-amber-400 font-semibold mt-0.5">
                    {member.role}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {member.experience}
                  </div>

                  <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Certifications List */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1">
                    {member.certifications.map((cert, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Standards Culture Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-[#16253D] border border-slate-700/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-amber-400">100%</div>
            <div className="text-xs text-slate-300 mt-0.5">Tie-Off Harness Protocol</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-amber-400">Daily</div>
            <div className="text-xs text-slate-300 mt-0.5">Continuous Magnetic Nail Sweep</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-amber-400">$2,000,000</div>
            <div className="text-xs text-slate-300 mt-0.5">General Liability Insurance</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-amber-400">Zero-Sub</div>
            <div className="text-xs text-slate-300 mt-0.5">Trained Appy Master Crews</div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>
            Demonstration Notice: Profiles and team achievements represent demonstrative examples. All physical work complies with OSHA 1926 Subpart M fall-protection requirements.
          </span>
        </div>
      </div>
    </section>
  );
};
