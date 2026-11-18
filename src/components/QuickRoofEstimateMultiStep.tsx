import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft, Shield, Wrench, Home, Building2, User, Phone, Mail, FileText, Sparkles, AlertCircle } from 'lucide-react';
import { trackConversion } from '../utils/analytics';

export const QuickRoofEstimateMultiStep: React.FC<{
  onBookingComplete?: () => void;
}> = ({ onBookingComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Service
  const [selectedService, setSelectedService] = useState('Roof Replacement');

  // Step 2: Property Info
  const [propertyCategory, setPropertyCategory] = useState<'Residential' | 'Commercial'>('Residential');
  const [zipCode, setZipCode] = useState('75201');
  const [propertyType, setPropertyType] = useState('Single Family Home');
  const [roofCondition, setRoofCondition] = useState('Aging / Normal Wear (15+ Yrs)');

  // Step 3: Contact Info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [leadCode, setLeadCode] = useState('');

  const servicesList = [
    { title: 'Roof Replacement', desc: 'Complete tear-off & modern architectural system' },
    { title: 'Roof Repair', desc: 'Fix active leaks, missing shingles & chimney flashing' },
    { title: 'New Roof Installation', desc: 'Custom construction & home addition builds' },
    { title: 'Storm Damage', desc: 'Hail impact & wind uplift forensic inspection' },
    { title: 'Commercial Roofing', desc: 'TPO, PVC, EPDM & metal flat roofs' },
    { title: 'Roof Inspection', desc: 'Certified 21-point physical & drone assessment' }
  ];

  const propertyTypes = propertyCategory === 'Residential'
    ? ['Single Family Home', 'Townhome / Condo', 'Multi-Family Duplex', 'Rural Estate']
    : ['Retail Plaza / Storefront', 'Office Building', 'Warehouse / Industrial', 'Multi-Unit Complex'];

  const roofConditions = [
    'Recent Storm / Active Leaks (Urgent)',
    'Missing or Lifted Shingle Tabs',
    'Aging / Normal Wear (15+ Yrs)',
    'Under 10 Yrs / Routine Evaluation'
  ];

  const handleNextFromStep1 = () => {
    trackConversion('form_submission', { step: 1, service: selectedService });
    setCurrentStep(2);
  };

  const handleNextFromStep2 = () => {
    if (!zipCode || zipCode.length < 5) {
      setErrorMessage('Please enter a valid 5-digit ZIP code.');
      return;
    }
    setErrorMessage('');
    trackConversion('form_submission', { step: 2, zipCode, propertyCategory });
    setCurrentStep(3);
  };

  const handleSubmitStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      setErrorMessage('Please provide your full name and phone number.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          zipCode,
          serviceRequired: `${selectedService} (${propertyCategory})`,
          problemDescription: `Property: ${propertyType}. Condition: ${roofCondition}. Notes: ${additionalDetails || 'None provided'}`,
          source: '3-Step Quick Estimate Form'
        })
      });
      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        setLeadCode(data.lead?.id || `APX-${Math.floor(100000 + Math.random() * 900000)}`);
        trackConversion('form_submission', { step: 3, success: true, service: selectedService });
        if (onBookingComplete) onBookingComplete();
      } else {
        setErrorMessage(data.error || 'Failed to submit estimate request.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error submitting estimate. Please call our team directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quick-estimate" className="py-8 sm:py-10 bg-[#091321] text-white relative border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Project Cost Planner
          </div>
          <h2 className="type-h2 text-white">
            Plan Your Roofing Project in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              3 Simple Steps
            </span>
          </h2>
          <p className="mt-2 type-body text-slate-300">
            Tell us about your project requirements and receive an itemized quote with drone inspection availability.
          </p>
        </div>

        {/* Multi-Step Card */}
        <div className="bg-[#101D30] rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl relative overflow-hidden">
          {/* Progress Indicator */}
          {!isSuccess && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
                <span className={currentStep >= 1 ? 'text-amber-400' : ''}>1. Service Selection</span>
                <span className={currentStep >= 2 ? 'text-amber-400' : ''}>2. Property Details</span>
                <span className={currentStep >= 3 ? 'text-amber-400' : ''}>3. Contact & Quote</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Service Selection */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="type-h3 text-white mb-2">
                Step 1: What service do you need?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicesList.map((srv) => {
                  const isSelected = selectedService === srv.title;
                  return (
                    <button
                      key={srv.title}
                      type="button"
                      onClick={() => setSelectedService(srv.title)}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 ring-1 ring-amber-400 shadow-md'
                          : 'bg-[#16253D] border-slate-700/70 hover:bg-[#1E3250] text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[15px] font-bold ${isSelected ? 'text-amber-400' : 'text-white'}`}>
                          {srv.title}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </div>
                      <span className="text-xs text-slate-400 mt-1">{srv.desc}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextFromStep1}
                  className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 type-btn transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
                >
                  <span>Continue to Property Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Property Information */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="type-h3 text-white mb-2">
                Step 2: Tell us about your property
              </h3>

              {/* Residential vs Commercial */}
              <div>
                <label className="block text-[13px] sm:text-[14px] font-semibold text-slate-200 mb-2">Property Category</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => { setPropertyCategory('Residential'); setPropertyType('Single Family Home'); }}
                    className={`py-3 px-4 rounded-xl border text-[15px] font-semibold transition flex items-center justify-center gap-2 ${
                      propertyCategory === 'Residential'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-[#16253D] border-slate-700 text-slate-200 hover:bg-[#1E3250]'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    Residential Property
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPropertyCategory('Commercial'); setPropertyType('Retail Plaza / Storefront'); }}
                    className={`py-3 px-4 rounded-xl border text-[15px] font-semibold transition flex items-center justify-center gap-2 ${
                      propertyCategory === 'Commercial'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-[#16253D] border-slate-700 text-slate-200 hover:bg-[#1E3250]'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    Commercial Building
                  </button>
                </div>
              </div>

              {/* ZIP Code & Property Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] sm:text-[14px] font-semibold text-slate-200 mb-1.5">Property ZIP Code *</label>
                  <input
                    type="text"
                    maxLength={5}
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 75201"
                    className="w-full px-3.5 py-3 rounded-xl bg-[#16253D] border border-slate-700 text-white font-mono text-[15px] focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[13px] sm:text-[14px] font-semibold text-slate-200 mb-1.5">Building Structure Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-[#16253D] border border-slate-700 text-white text-[15px] font-medium focus:outline-none focus:border-amber-500"
                  >
                    {propertyTypes.map((pt) => (
                      <option key={pt} value={pt}>{pt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Current Roof Condition */}
              <div>
                <label className="block text-[13px] sm:text-[14px] font-semibold text-slate-200 mb-1.5">Estimated Current Roof Condition</label>
                <select
                  value={roofCondition}
                  onChange={(e) => setRoofCondition(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#16253D] border border-slate-700 text-white text-[15px] font-medium focus:outline-none focus:border-amber-500"
                >
                  {roofConditions.map((rc) => (
                    <option key={rc} value={rc}>{rc}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white type-btn flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextFromStep2}
                  className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 type-btn transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
                >
                  <span>Continue to Contact Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Contact Information */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmitStep3} className="space-y-4 animate-in fade-in">
              <h3 className="type-h3 text-white mb-2">
                Step 3: Where should we send your estimate?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] sm:text-[14px] font-semibold text-slate-200 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. David Sterling"
                    className="w-full px-3.5 py-3 rounded-xl bg-[#16253D] border border-slate-700 text-white text-[15px] focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[13px] sm:text-[14px] font-semibold text-slate-200 mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. (214) 555-0182"
                    className="w-full px-3.5 py-3 rounded-xl bg-[#16253D] border border-slate-700 text-white text-[15px] focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] sm:text-[14px] font-semibold text-slate-200 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@example.com"
                  className="w-full px-3.5 py-3 rounded-xl bg-[#16253D] border border-slate-700 text-white text-[15px] focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[13px] sm:text-[14px] font-semibold text-slate-200 mb-1.5">Additional Project Details / Inquiries</label>
                <textarea
                  rows={2}
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  placeholder="e.g. Hail storm last week, interested in upgrading to standing seam metal or Owens Corning shingles..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white type-btn flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 type-btn transition shadow-lg shadow-amber-500/20 flex items-center gap-2 disabled:opacity-50"
                >
                  <Shield className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting to CRM...' : 'Request Free Written Estimate'}</span>
                </button>
              </div>
            </form>
          )}

          {/* Success State */}
          {isSuccess && (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">
                Estimate Request Received!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <strong>{fullName}</strong>. Your inquiry for <strong>{selectedService}</strong> in ZIP {zipCode} has been routed to our regional project team.
              </p>

              <div className="p-4 rounded-2xl bg-[#16253D] border border-slate-700 max-w-xs mx-auto text-xs text-slate-300 text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">CRM Reference:</span>
                  <span className="font-mono text-amber-400 font-bold">{leadCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Response Time:</span>
                  <span className="text-white">Under 15 Minutes</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => { setIsSuccess(false); setCurrentStep(1); }}
                className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 hover:bg-slate-750"
              >
                Submit Another Request
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
