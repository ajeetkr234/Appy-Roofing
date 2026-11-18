import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/roofingData';
import { ServiceItem } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';
import { ArrowRight, Search, Sparkles, Shield, Wrench, AlertTriangle, Layers } from 'lucide-react';

export const ServicesSection: React.FC<{
  onOpenBookingWithService: (serviceTitle: string) => void;
  hideHeader?: boolean;
}> = ({ onOpenBookingWithService, hideHeader = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Residential' | 'Storm and Emergency' | 'Additional'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalService, setModalService] = useState<ServiceItem | null>(null);

  const categories = ['All', 'Residential', 'Storm and Emergency', 'Additional'] as const;

  const filteredServices = SERVICES_DATA.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className={`${hideHeader ? 'pt-4 pb-10 sm:pt-6 sm:pb-12' : 'pt-6 pb-12 sm:pt-8 sm:pb-14'} bg-[#091321] text-white relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (shown only when not embedded on dedicated services page) */}
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
              <Wrench className="w-3.5 h-3.5" />
              Roofing Services & Solutions
            </div>
            <h2 className="type-h2 text-white">
              Craftsmanship That Protects{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                Every Square Foot
              </span>
            </h2>
            <p className="mt-3 type-body-lead text-slate-300">
              From single shingle replacements and emergency hail response to full standing seam metal installations and commercial TPO membranes.
            </p>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => {
              const count = cat === 'All' ? SERVICES_DATA.length : SERVICES_DATA.filter(s => s.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/60'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    selectedCategory === cat ? 'bg-slate-950 text-amber-400 font-bold' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 23 services..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>

        {/* 23 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#101D30] rounded-2xl overflow-hidden border border-slate-700/70 hover:border-amber-500/50 shadow-xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Image & Badge */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101D30] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-amber-400 border border-slate-700/60 text-[11px] font-bold uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="type-h3 text-white group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 type-body text-slate-300 leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1.5">
                    {service.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setModalService(service)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition text-center"
                >
                  Learn More
                </button>
                <button
                  onClick={() => onOpenBookingWithService(service.title)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition shadow-md shadow-amber-500/10 flex items-center justify-center gap-1.5"
                >
                  <span>Inspection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
            <p className="text-slate-400 text-sm">No services found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-3 text-xs text-amber-400 underline font-semibold"
            >
              Reset search filters
            </button>
          </div>
        )}
      </div>

        {/* Modal View */}
      <ServiceDetailModal
        service={modalService}
        onClose={() => setModalService(null)}
        onRequestInspection={onOpenBookingWithService}
      />
    </section>
  );
};
