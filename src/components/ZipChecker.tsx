import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, AlertCircle, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/roofingData';

export const ZipChecker: React.FC<{
  onOpenBookingWithZip?: (zip: string) => void;
}> = ({ onOpenBookingWithZip }) => {
  const [zipInput, setZipInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipInput || zipInput.length < 5) {
      setErrorMsg('Please enter a valid 5-digit US ZIP code.');
      return;
    }
    setErrorMsg('');
    setIsChecking(true);

    try {
      const res = await fetch(`/api/zip-check?zip=${encodeURIComponent(zipInput)}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Unable to verify ZIP code at this time. Please call our office directly.');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <section id="zip-checker" className="py-8 sm:py-10 bg-[#091321] text-white relative border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#101D30] to-[#0A1424] rounded-2xl p-5 sm:p-7 border border-slate-700/80 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
              <MapPin className="w-3.5 h-3.5" />
              Service Area Verification
            </div>
            <h2 className="type-h2 text-white">
              Check Immediate Service Availability
            </h2>
            <p className="mt-2 type-body-lead text-slate-300">
              Enter your property’s 5-digit ZIP code to confirm same-day inspection eligibility, mobile fleet response times, and regional warranty support.
            </p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleCheck} className="max-w-md mx-auto flex gap-2">
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                maxLength={5}
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 5-Digit ZIP (e.g. 75201)"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#16253D] border border-slate-700 text-white font-mono text-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={isChecking}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 disabled:opacity-50 flex items-center gap-1.5 flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>{isChecking ? 'Checking...' : 'Check ZIP'}</span>
            </button>
          </form>

          {errorMsg && (
            <div className="mt-4 text-center text-xs text-rose-400 flex items-center justify-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="mt-8 p-6 rounded-2xl bg-[#16253D] border border-slate-700/80 max-w-xl mx-auto animate-in zoom-in-95">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl flex-shrink-0 ${result.available ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'}`}>
                  {result.available ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-white">ZIP {result.zipCode}</span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${result.available ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                      {result.tier}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {result.message}
                  </p>
                  {result.estimatedResponseTime && (
                    <div className="text-xs text-amber-400 font-medium">
                      ⏱ Estimated Response: {result.estimatedResponseTime}
                    </div>
                  )}

                  {result.available ? (
                    <button
                      onClick={() => onOpenBookingWithZip && onOpenBookingWithZip(result.zipCode)}
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow"
                    >
                      <span>Book Free Inspection in {result.zipCode}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <a
                      href={`tel:${BUSINESS_INFO.phoneRaw}`}
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-amber-400 font-bold text-xs uppercase border border-slate-700 transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Request Custom Regional Dispatch</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Regional Hubs Footnote */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 text-center">
            <span>Primary Regional Hubs:</span>
            <span className="text-slate-200">Dallas-Fort Worth Metroplex</span>
            <span>•</span>
            <span className="text-slate-200">Austin & Central Texas</span>
            <span>•</span>
            <span className="text-slate-200">Greater Houston Corridor</span>
            <span>•</span>
            <span className="text-slate-200">San Antonio & Hill Country</span>
          </div>
        </div>
      </div>
    </section>
  );
};
