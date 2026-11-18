import React from 'react';
import { Hero } from '../components/Hero';
import { QuickRoofEstimateMultiStep } from '../components/QuickRoofEstimateMultiStep';
import { StatsSection } from '../components/StatsSection';
import { House3DExperience } from '../components/House3DExperience';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { ReputationSection } from '../components/ReputationSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ArrowRight, Wrench, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

interface HomePageProps {
  onOpenBooking: (serviceTitle?: string) => void;
  onSelectService: (service: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking, onSelectService }) => {
  const { navigate } = useNavigation();

  return (
    <div>
      {/* Cinematic Hero */}
      <Hero
        onOpenBooking={() => onOpenBooking()}
        onOpenCostEstimator={() => navigate('contact')}
      />

      {/* Quick 3-Step Estimate Form */}
      <QuickRoofEstimateMultiStep onBookingComplete={() => {}} />

      {/* 5 Statistics Counters */}
      <StatsSection />

      {/* Featured Services Teaser */}
      <section className="py-10 sm:py-14 bg-[#091321] text-white relative border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2.5">
                <Wrench className="w-3.5 h-3.5" />
                Comprehensive Roofing Capabilities
              </div>
              <h2 className="type-h2 text-white">
                Engineered Solutions for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  Every Roof Type
                </span>
              </h2>
            </div>
            <button
              onClick={() => navigate('services')}
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm group"
            >
              <span>Explore All 23 Specialized Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div
              onClick={() => navigate('services')}
              className="p-6 rounded-2xl bg-[#101D30] border border-slate-700/80 hover:border-amber-500/40 transition-all cursor-pointer group shadow-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="type-h3 text-white group-hover:text-amber-400 transition-colors">
                Residential Roofing
              </h3>
              <p className="mt-2 type-body text-slate-300 text-xs sm:text-sm leading-relaxed">
                Complete architectural shingle tear-offs, precision standing seam metal systems, and historic tile restoration with lifetime warranties.
              </p>
              <div className="mt-4 flex items-center text-xs font-semibold text-amber-400 gap-1.5">
                <span>View Residential Options</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => navigate('services')}
              className="p-6 rounded-2xl bg-[#101D30] border border-slate-700/80 hover:border-amber-500/40 transition-all cursor-pointer group shadow-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="type-h3 text-white group-hover:text-amber-400 transition-colors">
                Storm Damage & Insurance
              </h3>
              <p className="mt-2 type-body text-slate-300 text-xs sm:text-sm leading-relaxed">
                24/7 emergency tarping, forensic 4K drone hail diagnostics, and licensed Xactimate adjuster negotiation to ensure full coverage.
              </p>
              <div className="mt-4 flex items-center text-xs font-semibold text-amber-400 gap-1.5">
                <span>Storm Recovery Process</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => navigate('services')}
              className="p-6 rounded-2xl bg-[#101D30] border border-slate-700/80 hover:border-amber-500/40 transition-all cursor-pointer group shadow-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="type-h3 text-white group-hover:text-amber-400 transition-colors">
                Commercial Flat Roofing
              </h3>
              <p className="mt-2 type-body text-slate-300 text-xs sm:text-sm leading-relaxed">
                Energy Star certified white TPO, EPDM, and modified bitumen membranes engineered for industrial, retail, and multi-family structures.
              </p>
              <div className="mt-4 flex items-center text-xs font-semibold text-amber-400 gap-1.5">
                <span>Commercial Solutions</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time 3D House Visualizer Teaser */}
      <House3DExperience
        onSelectEstimate={(mat) => onOpenBooking(`${mat} Replacement`)}
      />

      {/* Before & After Transformations */}
      <BeforeAfterSlider onOpenBooking={() => onOpenBooking()} />

      {/* Verified Google Reviews */}
      <ReputationSection />

      {/* Why Choose Us Pillars */}
      <WhyChooseUs onOpenBooking={() => onOpenBooking()} />
    </div>
  );
};
