import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/roofingData';
import { trackConversion } from '../utils/analytics';
import { useNavigation } from '../context/NavigationContext';

export const Footer: React.FC<{
  onOpenBooking: () => void;
  onOpenPortal: () => void;
  onOpenAdmin: () => void;
}> = ({ onOpenBooking, onOpenPortal, onOpenAdmin }) => {
  const { navigate } = useNavigation();

  return (
    <footer id="contact-estimate" className="bg-[#060D17] text-slate-300 relative border-t border-slate-800">
      {/* Final Conversion Section */}
      <div className="border-b border-slate-800 py-10 sm:py-12 bg-gradient-to-b from-[#101D30] via-[#0A1424] to-[#060D17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            SCHEDULE YOUR ON-SITE INSPECTION
          </div>
          <h2 className="type-h2 text-white">
            Ready to Protect Your Home?
          </h2>
          <p className="mt-3 type-body text-slate-300 leading-relaxed">
            Get started with a professional roofing inspection and a clear estimate for your project.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3.5">
            <button
              onClick={() => {
                trackConversion('estimate_button_click', { location: 'final_cta' });
                onOpenBooking();
              }}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Schedule Free Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              onClick={() => trackConversion('call_button_click', { location: 'final_cta' })}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-medium text-sm border border-slate-700 flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Dispatch: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info (2 Cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('home')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-extrabold shadow-md">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 2L1 11H4V21H20V11H23L12 2ZM12 5.5L18 10.5V19H6V10.5L12 5.5Z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-extrabold font-heading text-white">APPY ROOFING CO.</span>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{BUSINESS_INFO.tagline}</div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              America's standard for precision residential and commercial roofing craftsmanship. Certified master installers of standing seam metal, architectural shingles, and historic clay tile systems.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.hqAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-amber-400 transition">{BUSINESS_INFO.phone} (24/7 Dispatch)</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{BUSINESS_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{BUSINESS_INFO.hours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Core Services */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
              Roofing Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {SERVICES_DATA.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => navigate('services')}
                    className="hover:text-amber-400 transition text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate('services')}
                  className="text-amber-400 font-semibold hover:underline text-left mt-1"
                >
                  View All 23 Services &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Materials & Tools */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
              Materials & Projects
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => navigate('materials')} className="hover:text-amber-400 transition text-left">Architectural Materials</button></li>
              <li><button onClick={() => navigate('materials')} className="hover:text-amber-400 transition text-left">3D House Visualizer</button></li>
              <li><button onClick={() => navigate('materials')} className="hover:text-amber-400 transition text-left">Exploded 3D Anatomy</button></li>
              <li><button onClick={() => navigate('projects')} className="hover:text-amber-400 transition text-left">Recent Projects Portfolio</button></li>
              <li><button onClick={() => navigate('projects')} className="hover:text-amber-400 transition text-left">Before & After Slider</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-amber-400 transition text-left">Roof Cost Estimator</button></li>
            </ul>
          </div>

          {/* Col 4: Portals & Company */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
              Company & Contact
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => navigate('about')} className="hover:text-amber-400 transition text-left">About Appy Roofing</button></li>
              <li><button onClick={() => navigate('reviews')} className="hover:text-amber-400 transition text-left">Google Reviews (4.9★)</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-amber-400 transition text-left">Schedule Free Inspection</button></li>
              <li>
                <button onClick={onOpenPortal} className="hover:text-amber-400 transition text-left">
                  Customer Project Portal
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-amber-400 transition text-left">
                  Contractor CRM Admin
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Demo Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 space-y-3 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between">
          <div>
            © {new Date().getFullYear()} APPY ROOFING CO. Professional American roofing contractor.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Licensing: TX #ROOF-84920</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
