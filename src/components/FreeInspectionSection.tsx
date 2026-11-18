import React, { useState } from 'react';
import { ShieldCheck, Calendar, Clock, MapPin, Upload, ArrowRight, CheckCircle2, AlertCircle, Phone, FileText } from 'lucide-react';
import { SERVICES_DATA, BUSINESS_INFO } from '../data/roofingData';

export const FreeInspectionSection: React.FC<{
  initialService?: string;
  initialZip?: string;
  onSuccess?: () => void;
}> = ({ initialService, initialZip, onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [zipCode, setZipCode] = useState(initialZip || '75201');
  const [serviceRequired, setServiceRequired] = useState(initialService || 'Roof Replacement');
  const [problemDescription, setProblemDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-11-23');
  const [preferredTime, setPreferredTime] = useState('10:00 AM - 12:00 PM');
  const [consentAgreed, setConsentAgreed] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const timeSlots = [
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '01:00 PM - 03:00 PM',
    '03:00 PM - 05:00 PM'
  ];

  const workflowSteps = [
    { num: 1, title: 'Inquiry Submitted', desc: 'You submit project details and preferred inspection schedule.' },
    { num: 2, title: 'Availability Confirmed', desc: 'Our team confirms your appointment via phone/email.' },
    { num: 3, title: 'Scheduled on Calendar', desc: 'A certified roofing specialist is assigned to your property.' },
    { num: 4, title: 'Property Visit', desc: 'Physical and 4K aerial drone assessment of shingles, valleys & attic.' },
    { num: 5, title: 'Forensic Condition Report', desc: 'Photographic deck saturation and storm damage analysis.' },
    { num: 6, title: 'Written Quotation', desc: 'Itemized breakdown of materials, labor, permits, and warranties.' },
    { num: 7, title: 'Customer Approval', desc: 'Review options at your pace with zero high-pressure tactics.' },
    { num: 8, title: 'Work Begins', desc: 'Professional installation, daily magnetic sweep, and lifetime warranty.' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      setErrorMessage('Full name and phone number are required.');
      return;
    }
    if (!consentAgreed) {
      setErrorMessage('Please consent to contact for scheduling.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // 1. Submit lead to CRM
      const leadRes = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          propertyAddress,
          zipCode,
          serviceRequired,
          problemDescription,
          preferredDate,
          preferredTime,
          source: 'Free Inspection Form'
        })
      });
      const leadData = await leadRes.json();

      // 2. Schedule booking
      const bookRes = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: fullName,
          phone,
          email,
          address: propertyAddress,
          zipCode,
          service: serviceRequired,
          date: preferredDate,
          timeSlot: preferredTime,
          notes: problemDescription
        })
      });
      const bookData = await bookRes.json();

      setSubmissionSuccess({
        confirmationCode: bookData.confirmationCode || `APX-BK-${Math.floor(100000 + Math.random() * 900000)}`,
        date: preferredDate,
        time: preferredTime,
        service: serviceRequired
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error submitting request. Please try calling directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="estimate-booking" className="py-8 sm:py-10 bg-[#091321] text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
            <Calendar className="w-3.5 h-3.5" />
            Schedule an Inspection
          </div>
          <h2 className="type-h2 text-white">
            Get Your Free Roof Inspection &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              Detailed Written Estimate
            </span>
          </h2>
          <p className="mt-2.5 type-body text-slate-300">
            No obligation. Zero aggressive sales pitches. Our certified inspectors provide high-resolution drone photos, attic thermal moisture scans, and line-item clarity.
          </p>
        </div>

        {/* 8-Step Transparent Workflow Carousel / Grid */}
        <div className="mb-8 sm:mb-10">
          <div className="text-xs uppercase tracking-wider font-bold text-amber-400 mb-6 text-center sm:text-left">
            Our 8-Step Transparent Inspection & Installation Workflow
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((step) => (
              <div
                key={step.num}
                className="bg-[#101D30] rounded-2xl p-4 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 font-extrabold text-xs flex items-center justify-center border border-amber-500/30">
                      0{step.num}
                    </span>
                    <div className="text-sm font-bold text-white leading-tight">
                      {step.title}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Form & Trust Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Lead Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#101D30] rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl relative">
            {submissionSuccess ? (
              <div className="py-12 text-center animate-in zoom-in-95 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Inspection Appointment Confirmed!
                </h3>
                <div className="p-4 rounded-2xl bg-[#16253D] border border-slate-700 max-w-md mx-auto text-xs text-slate-300 space-y-1.5 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Confirmation Code:</span>
                    <strong className="text-amber-400 font-mono">{submissionSuccess.confirmationCode}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Scheduled Date:</span>
                    <strong className="text-white">{submissionSuccess.date}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time Window:</span>
                    <strong className="text-white">{submissionSuccess.time}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Service:</span>
                    <strong className="text-white">{submissionSuccess.service}</strong>
                  </div>
                </div>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  An automated confirmation has been dispatched. Our local field inspector will arrive with photo ID and ladder safety equipment.
                </p>
                <button
                  onClick={() => setSubmissionSuccess(null)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700"
                >
                  Book Another Service
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-4 py-3 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (214) 555-0199"
                      className="w-full px-4 py-3 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                </div>

                {/* Email & ZIP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Property ZIP Code *
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="e.g. 75201"
                      className="w-full px-4 py-3 rounded-xl bg-[#16253D] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                </div>

                {/* Property Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                    placeholder="e.g. 742 Evergreen Terrace, Dallas, TX"
                    className="w-full px-4 py-3 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Primary Service Required
                  </label>
                  <select
                    value={serviceRequired}
                    onChange={(e) => setServiceRequired(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title} ({s.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date & Time Slot Picker */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Preferred Inspection Date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                    >
                      {timeSlots.map((ts) => (
                        <option key={ts} value={ts}>{ts}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Problem Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Roof Problem Description & Specific Concerns
                  </label>
                  <textarea
                    rows={3}
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                    placeholder="e.g. Noticed granules in gutters after severe hail storm, interested in metal roof upgrade or shingle repair..."
                    className="w-full px-4 py-3 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                {/* Consent Checkbox */}
                <label className="flex items-start gap-2.5 pt-1 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentAgreed}
                    onChange={(e) => setConsentAgreed(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-600 mt-0.5"
                  />
                  <span>
                    I consent to receive inspection scheduling confirmations and phone/SMS updates from Appy Roofing Co. Free inspection applies within verified regional service zones.
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider transition shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isSubmitting ? 'Confirming Availability...' : 'Book Free 21-Point Inspection'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Trust Indicators & Scope Breakdown (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Written Quotation Guarantee Box */}
            <div className="bg-[#101D30] rounded-3xl p-6 border border-slate-700/80 shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold font-heading text-white">
                  What Your Free Inspection Includes
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>4K Drone Aerial Scan:</strong> High-res imagery of hard-to-reach valleys, dormers, and chimney flashings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Attic Moisture & Rafter Audit:</strong> Infrared detection of hidden leaks and mold propagation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Decking Integrity Test:</strong> Soft-spot check for dry rot or wood sheathing delamination.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Line-Item Written Estimate:</strong> Explicit costs for materials, certified labor, tear-off disposal, and warranties.</span>
                </li>
              </ul>
            </div>

            {/* Direct Phone Assistance */}
            <div className="bg-gradient-to-br from-amber-500/15 via-[#101D30] to-[#101D30] rounded-3xl p-6 border border-amber-500/30 shadow-xl">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400 block mb-1">
                Prefer to Speak With an Advisor?
              </span>
              <h4 className="text-xl font-bold text-white mb-2">
                Call Our Project Coordinators
              </h4>
              <p className="text-xs text-slate-300 mb-4">
                Our team can answer immediate technical questions regarding insurance deductibles, metal roofing gauges, or emergency tarp dispatch.
              </p>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 text-sm font-extrabold text-amber-400 hover:text-amber-300 transition"
              >
                <Phone className="w-4 h-4" />
                <span>{BUSINESS_INFO.phone} (Toll-Free)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
