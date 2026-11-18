import React from 'react';
import { ServiceItem } from '../types';
import { X, CheckCircle2, Clock, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/roofingData';

export const ServiceDetailModal: React.FC<{
  service: ServiceItem | null;
  onClose: () => void;
  onRequestInspection: (serviceTitle: string) => void;
}> = ({ service, onClose, onRequestInspection }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-[#101D30] border border-slate-700/80 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-30 p-2 text-white hover:text-amber-400 rounded-full bg-slate-950/80 border border-slate-700/80 backdrop-blur-md hover:bg-slate-900 transition shadow-lg"
          aria-label="Close service details"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Image */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden flex-shrink-0 bg-slate-900">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101D30] via-[#101D30]/60 to-transparent" />
          <div className="absolute bottom-3 left-5 right-5">
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 type-badge mb-1.5 font-bold uppercase tracking-wider text-[11px]">
              {service.category}
            </span>
            <h3 className="type-h3 text-white">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          <p className="type-body text-slate-200 leading-relaxed">
            {service.fullDesc}
          </p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-xl bg-[#16253D] border border-slate-700/60 flex items-start gap-3">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Estimated Turnaround</div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">{service.turnaround}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#16253D] border border-slate-700/60 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Warranty Coverage</div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">{service.warranty}</div>
              </div>
            </div>
          </div>

          {/* Key Engineering Features */}
          <div>
            <h4 className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2.5">
              What's Included in This Service
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ideal For */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-200">
            <strong className="text-amber-400 block mb-0.5">Recommended When:</strong>
            {service.idealFor}
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onRequestInspection(service.title);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
            >
              <span>Schedule Free Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs border border-slate-700 text-center flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Team</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
