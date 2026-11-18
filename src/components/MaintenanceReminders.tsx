import React, { useState } from 'react';
import { BellRing, CheckCircle2, Mail, ShieldCheck, AlertCircle } from 'lucide-react';

export const MaintenanceReminders: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [preferences, setPreferences] = useState<string[]>([
    'Annual 21-Point Inspection',
    'Post-Storm Hail & Wind Alerts',
    'Seasonal Gutter Cleanout Reminders'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const reminderOptions = [
    'Annual 21-Point Inspection',
    'Post-Storm Hail & Wind Alerts',
    'Seasonal Gutter Cleanout Reminders',
    'Winter Freeze & Ice Dam Preventions'
  ];

  const togglePref = (opt: string) => {
    if (preferences.includes(opt)) {
      setPreferences(preferences.filter(p => p !== opt));
    } else {
      setPreferences([...preferences, opt]);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/maintenance-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, zipCode, preferences })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(data.message);
        setEmail('');
        setName('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-8 sm:py-10 bg-[#101D30] text-white relative border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#16253D] to-[#0A1424] rounded-2xl p-5 sm:p-7 border border-slate-700/80 shadow-xl relative">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
              <BellRing className="w-3.5 h-3.5" />
              Preventative Maintenance Care
            </div>
            <h2 className="type-h2 text-white">
              Automated Roofing Maintenance Reminders
            </h2>
            <p className="mt-2.5 type-body text-slate-300">
              Extend your roof's working lifespan by 7-10 years. Receive timely seasonal inspection notifications and localized post-storm hail warnings for your ZIP code.
            </p>
          </div>

          {successMsg ? (
            <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-center animate-in zoom-in-95">
              <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
              <div className="text-base font-bold text-white">{successMsg}</div>
              <p className="text-xs text-slate-300 mt-1">You can modify preferences or unsubscribe at any time.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-6">
              {/* Reminder Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {reminderOptions.map((opt) => {
                  const isChecked = preferences.includes(opt);
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => togglePref(opt)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition text-left flex items-center justify-between ${
                        isChecked
                          ? 'bg-amber-500/15 border-amber-400 text-amber-300'
                          : 'bg-[#101D30] border-slate-700 text-slate-300 hover:bg-[#16253D]'
                      }`}
                    >
                      <span>{opt}</span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-600 pointer-events-none"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Homeowner Name"
                  className="px-4 py-3 rounded-xl bg-[#101D30] border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address *"
                  className="px-4 py-3 rounded-xl bg-[#101D30] border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  maxLength={5}
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="5-Digit ZIP"
                  className="px-4 py-3 rounded-xl bg-[#101D30] border border-slate-700 text-white font-mono text-xs placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
              >
                {isSubmitting ? 'Registering...' : 'Subscribe to Free Maintenance Alerts'}
              </button>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero spam guarantee. One-click unsubscribe link provided in every automated notification.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
