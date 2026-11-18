import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { FreeInspectionSection } from '../components/FreeInspectionSection';
import { CostEstimator } from '../components/CostEstimator';
import { StormDamageCenter } from '../components/StormDamageCenter';
import { FAQSection } from '../components/FAQSection';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/roofingData';

interface ContactPageProps {
  onOpenBooking: (serviceTitle?: string) => void;
  onOpenBookingWithEstimate?: (est: any) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking, onOpenBookingWithEstimate }) => {
  return (
    <div>
      <PageHeader
        badge="GET IN TOUCH"
        title="Schedule Your Free Inspection &"
        highlightTitle="Connect With Our Team"
        description="Book your 21-point on-site drone inspection, calculate preliminary project estimates, or contact our 24/7 emergency storm dispatch command center."
        breadcrumbs={[{ label: 'Contact & Free Estimate' }]}
        onOpenBooking={() => onOpenBooking()}
      />

      {/* Direct Contact & Dispatch Cards */}
      <section className="py-6 sm:py-8 bg-[#060D17] text-white relative border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-[#101D30] border border-slate-700/80 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Phone & Hotline</h3>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-base font-bold text-amber-400 mt-1 block hover:underline">
                {BUSINESS_INFO.phone}
              </a>
              <span className="text-[11px] text-slate-400 mt-0.5 block">24/7 Emergency Storm Dispatch</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#101D30] border border-slate-700/80 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Email Inquiry</h3>
              <a href={`mailto:${BUSINESS_INFO.email}`} className="text-sm font-semibold text-slate-200 mt-1 block hover:text-amber-400 transition truncate">
                {BUSINESS_INFO.email}
              </a>
              <span className="text-[11px] text-slate-400 mt-0.5 block">Response within 15 minutes</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#101D30] border border-slate-700/80 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Headquarters</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {BUSINESS_INFO.hqAddress}
              </p>
              <span className="text-[11px] text-emerald-400 mt-0.5 block font-medium">Serving 24+ Metro Hubs</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#101D30] border border-slate-700/80 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Operating Hours</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Mon – Fri: 7:00 AM – 7:00 PM<br />
                Sat: 8:00 AM – 4:00 PM
              </p>
              <span className="text-[11px] text-amber-400 mt-0.5 block font-semibold">24/7 Storm Response</span>
            </div>
          </div>
        </div>
      </section>

      {/* Free Inspection 8-Step System */}
      <FreeInspectionSection onSuccess={() => {}} />

      {/* Instant Interactive Cost Estimator */}
      <CostEstimator onOpenBookingWithEstimate={onOpenBookingWithEstimate || (() => onOpenBooking())} />

      {/* 24/7 Storm & Hail Damage Triage */}
      <StormDamageCenter onOpenBooking={() => onOpenBooking('Emergency Storm Recovery')} />

      {/* Frequently Asked Questions */}
      <FAQSection onOpenBooking={() => onOpenBooking()} />
    </div>
  );
};
