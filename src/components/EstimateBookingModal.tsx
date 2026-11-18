import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, AlertCircle, ShieldCheck, Phone, ArrowRight } from 'lucide-react';
import { SERVICES_DATA, BUSINESS_INFO } from '../data/roofingData';

export const EstimateBookingModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialZip?: string;
}> = ({ isOpen, onClose, initialService, initialZip }) => {
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

  // Sync initial props when opened
  useEffect(() => {
    if (initialService) setServiceRequired(initialService);
    if (initialZip) setZipCode(initialZip);
  }, [initialService, initialZip, isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const timeSlots = [
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '01:00 PM - 03:00 PM',
    '03:00 PM - 05:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      setErrorMessage('Full name and phone number are required.');
      return;
    }
    if (!consentAgreed) {
      setErrorMessage('Please consent to contact for appointment scheduling.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // 1. Submit lead to CRM
      await fetch('/api/leads', {
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
          source: 'Quick Booking Modal'
        })
      });

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
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error submitting request. Please call our dispatch directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="bg-[#101D30] border border-slate-700/80 rounded-2xl max-w-2xl w-full shadow-2xl relative my-4 overflow-hidden flex flex-col">
        {/* Sticky Header */}
        <div className="p-4 sm:p-5 pb-3 bg-[#091321] border-b border-slate-800 flex items-start justify-between relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-1.5">
              <Calendar className="w-3.5 h-3.5" />
              100% Free • No Obligation
            </div>
            <h3 className="type-h3 text-white">
              Schedule Your Free Roof Inspection
            </h3>
            <p className="type-body text-slate-300 mt-0.5">
              Drone aerial diagnostics, attic thermal moisture scan & itemized written estimate.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700 transition flex-shrink-0 ml-4"
            aria-label="Close booking modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto max-h-[75vh]">
          {submissionSuccess ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold font-heading text-white">
                Inspection Appointment Confirmed!
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Your free 21-point on-site inspection has been reserved in our system. A project manager will contact you prior to arrival.
              </p>

              <div className="p-4 rounded-2xl bg-[#16253D] border border-slate-700 max-w-sm mx-auto text-xs text-slate-300 space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-400">Confirmation Code:</span>
                  <strong className="text-amber-400 font-mono">{submissionSuccess.confirmationCode}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date:</span>
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

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
                >
                  Done
                </button>
              </div>
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-amber-500 transition"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              {/* Service Required */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Service Required
                </label>
                <select
                  value={serviceRequired}
                  onChange={(e) => setServiceRequired(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title} ({s.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Inspection Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition"
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
                  Roof Problem Description / Specific Notes
                </label>
                <textarea
                  rows={2}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="e.g. Missing shingles on south ridge after recent storm, or interested in metal roof quote..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              {/* Consent Checkbox */}
              <label className="flex items-start gap-2.5 pt-1 text-[11px] text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentAgreed}
                  onChange={(e) => setConsentAgreed(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-600 mt-0.5 flex-shrink-0"
                />
                <span>
                  I consent to receive appointment confirmations and phone/SMS updates from Appy Roofing Co. Free inspection subject to verified service areas.
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Calendar className="w-4 h-4" />
                <span>{isSubmitting ? 'Confirming Availability...' : 'Confirm Free Inspection Appointment'}</span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Licensed & Insured
                </span>
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-amber-400 hover:underline font-semibold">
                  Or Call: {BUSINESS_INFO.phone}
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
