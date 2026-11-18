import React, { useState } from 'react';
import { Hero3DCanvas } from './Hero3DScene';
import { Shield, Phone, Sparkles, CheckCircle, ChevronDown, Video, Box, ArrowRight, Award, Zap, MapPin, Wrench } from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/roofingData';
import { trackConversion } from '../utils/analytics';
import { useNavigation } from '../context/NavigationContext';

export const Hero: React.FC<{
  onOpenBooking: (service?: string, zip?: string) => void;
  onOpenCostEstimator: () => void;
}> = ({ onOpenBooking, onOpenCostEstimator }) => {
  const { navigate } = useNavigation();
  const [backgroundMode, setBackgroundMode] = useState<'video' | '3d'>('video');
  const [heroZip, setHeroZip] = useState('75201');
  const [heroService, setHeroService] = useState('Roof Replacement');

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackConversion('estimate_button_click', { location: 'hero_quick_bar', zip: heroZip, service: heroService });
    onOpenBooking(heroService, heroZip);
  };

  return (
    <section id="hero" className="relative min-h-[720px] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#091321] pt-24 pb-16 lg:py-0">
      {/* Background Mode 1: Cinematic Video */}
      {backgroundMode === 'video' && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-105 transition-transform duration-1000"
            poster="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-modern-suburban-houses-aerial-view-41484-large.mp4"
              type="video/mp4"
            />
          </video>
          {/* Cinematic Dark Navy Gradient Overlay for high text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#091321]/95 via-[#091321]/85 to-[#091321]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091321] via-transparent to-[#091321]/50" />
        </div>
      )}

      {/* Background Mode 2: Real-Time Interactive 3D Canvas */}
      {backgroundMode === '3d' && (
        <div className="absolute inset-0 z-0">
          <Hero3DCanvas interactive={true} materialType="metal" roofColor="#1e293b" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091321]/92 via-[#091321]/65 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091321] via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      {/* Mode Switcher Pill (Video vs 3D Orbit) */}
      <div className="absolute top-20 sm:top-24 right-4 sm:right-8 z-20">
        <div className="inline-flex p-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-700/80 shadow-xl">
          <button
            onClick={() => setBackgroundMode('video')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              backgroundMode === 'video'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cinematic</span> Video
          </button>
          <button
            onClick={() => setBackgroundMode('3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              backgroundMode === '3d'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Real-Time</span> 3D Orbit
          </button>
        </div>
      </div>

      {/* Main Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 lg:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (7 cols): High-Converting Copy & Direct CTAs */}
          <div className="lg:col-span-7 max-w-2xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 type-badge mb-4 backdrop-blur-md">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Certified US Roofing Specialists</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold font-heading text-white tracking-tight leading-[1.14]">
              Protect Your Home.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                Upgrade Your Roof.
              </span>{' '}
              Get It Done Right.
            </h1>

            {/* Supporting Text */}
            <p className="mt-5 text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
              From minor roof repairs and complete replacements to storm damage restoration, we deliver dependable roofing solutions designed to protect your home and investment.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <button
                onClick={() => {
                  trackConversion('estimate_button_click', { location: 'hero_primary_cta' });
                  onOpenBooking();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition shadow-lg shadow-amber-500/20 active:scale-95 group"
              >
                <span>Schedule Free Inspection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => navigate('services')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/70 font-medium text-sm transition backdrop-blur-md"
              >
                <span>Explore Services</span>
              </button>
            </div>

            {/* Trust Indicators Bar */}
            <div className="mt-7 pt-5 border-t border-slate-700/50 grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>Licensed & Insured*</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>Master Craftsmanship</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>Quality Materials</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>Workmanship Warranty</span>
              </div>
            </div>
            <div className="mt-1.5 text-[10px] text-slate-400">
              *Full general liability & workers' compensation protection on every job site.
            </div>
          </div>

          {/* Right Column (5 cols): High-Converting Instant Hero Estimate Box */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#101D30]/90 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-slate-700/80 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="type-badge text-amber-400">
                  Instant Availability Check
                </span>
              </div>
              <h3 className="type-h3 text-white">
                Check Service Schedule
              </h3>
              <p className="type-body text-slate-300 mt-1 mb-4 text-xs">
                Select your service and enter your ZIP to lock in your free on-site roof diagnostic.
              </p>

              <form onSubmit={handleHeroSubmit} className="space-y-3.5">
                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <Wrench className="w-3 h-3 text-amber-400" />
                    Service Required
                  </label>
                  <select
                    value={heroService}
                    onChange={(e) => setHeroService(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-amber-500 transition"
                  >
                    <option value="Roof Replacement">Roof Replacement</option>
                    <option value="Roof Repair">Roof Repair</option>
                    <option value="Storm Damage Restoration">Storm Damage Restoration</option>
                    <option value="Metal Roofing">Metal Roofing Installation</option>
                    <option value="Tile Roofing">Tile Roofing</option>
                    <option value="Commercial Roofing">Commercial Roofing</option>
                    <option value="Roof Inspection">Certified Drone Inspection</option>
                  </select>
                </div>

                {/* ZIP Code Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    Property ZIP Code
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    value={heroZip}
                    onChange={(e) => setHeroZip(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 5-digit ZIP (e.g. 75201)"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs tracking-wide uppercase transition shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>Verify ZIP & Proceed</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-slate-800">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    No obligation consultation
                  </span>
                  <button
                    type="button"
                    onClick={onOpenCostEstimator}
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    Use Calculator
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interactive Quick Bar at Bottom */}
      <div className="absolute bottom-4 left-0 right-0 z-10 hidden md:block">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-slate-900/85 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-2.5 shadow-2xl flex items-center justify-between text-xs text-slate-300">
            <button
              onClick={() => navigate('materials')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 transition text-slate-200 hover:text-amber-400 font-medium"
            >
              <Box className="w-4 h-4 text-amber-400" />
              3D House Visualizer
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => navigate('services')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 transition text-slate-200 hover:text-amber-400 font-medium"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Roofing Services
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => navigate('contact')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 transition text-slate-200 hover:text-amber-400 font-medium"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              Cost Estimator
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => navigate('about')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 transition text-slate-200 hover:text-amber-400 font-medium"
            >
              <Award className="w-4 h-4 text-amber-400" />
              Coverage & About
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <a
        href="#quick-estimate"
        className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10 text-slate-400 hover:text-amber-400 transition animate-bounce p-1 hidden sm:block"
        aria-label="Scroll to content"
      >
        <ChevronDown className="w-5 h-5" />
      </a>
    </section>
  );
};
