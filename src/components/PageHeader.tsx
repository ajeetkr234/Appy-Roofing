import React from 'react';
import { ChevronRight, Home, Phone, Calendar } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { BUSINESS_INFO } from '../data/roofingData';

interface PageHeaderProps {
  badge: string;
  title: string;
  highlightTitle?: string;
  description: string;
  breadcrumbs: { label: string; page?: 'home' | 'services' | 'projects' | 'materials' | 'reviews' | 'about' | 'contact' }[];
  onOpenBooking?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  highlightTitle,
  description,
  breadcrumbs,
  onOpenBooking,
}) => {
  const { navigate } = useNavigation();

  return (
    <div className="relative pt-24 pb-6 sm:pt-28 sm:pb-8 bg-[#091321] text-white border-b border-slate-800 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-1 hover:text-amber-400 transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
              {crumb.page ? (
                <button
                  onClick={() => navigate(crumb.page!)}
                  className="hover:text-amber-400 transition"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-amber-400 font-semibold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Header Content */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              {badge}
            </div>
            <h1 className="type-h1 text-white">
              {title}{' '}
              {highlightTitle && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  {highlightTitle}
                </span>
              )}
            </h1>
            <p className="mt-2 type-body text-slate-300 max-w-2xl leading-relaxed text-sm sm:text-base">
              {description}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Free Inspection</span>
              </button>
            )}
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 transition flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
