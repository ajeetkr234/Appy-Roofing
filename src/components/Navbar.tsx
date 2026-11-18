import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronRight, User, ShieldAlert } from 'lucide-react';
import { BUSINESS_INFO } from '../data/roofingData';
import { trackConversion } from '../utils/analytics';
import { useNavigation, PageType } from '../context/NavigationContext';

export const Navbar: React.FC<{
  onOpenBooking: () => void;
  onOpenPortal: () => void;
  onOpenAdmin: () => void;
}> = ({ onOpenBooking, onOpenPortal, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPage, navigate } = useNavigation();

  const navLinks: { label: string; page: PageType; href: string }[] = [
    { label: 'Home', page: 'home', href: '/' },
    { label: 'Services', page: 'services', href: '/services' },
    { label: 'Projects', page: 'projects', href: '/projects' },
    { label: 'Materials', page: 'materials', href: '/materials' },
    { label: 'Reviews', page: 'reviews', href: '/reviews' },
    { label: 'About', page: 'about', href: '/about' },
    { label: 'Contact', page: 'contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: PageType) => {
    e.preventDefault();
    navigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Banner (Demo mode & 24/7 storm hotline) */}
      <div className="bg-[#060D17] text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800/80 hidden sm:block relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400 text-[11px] font-normal">
              Serving Greater Texas & Nationwide Markets • 24/7 Storm Response
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={onOpenPortal}
              className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition"
            >
              <User className="w-3 h-3 text-amber-400" />
              Customer Portal
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition"
            >
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              Admin CRM
            </button>
            <span className="text-slate-700">|</span>
            <span className="text-amber-400 font-bold">24/7 Storm Dispatch: (800) 555-2739</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`fixed top-0 sm:top-[33px] left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#091321]/95 backdrop-blur-md shadow-2xl border-b border-slate-800 py-3.5'
            : 'bg-gradient-to-b from-[#091321]/90 via-[#091321]/60 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Architectural Concept */}
            <a
              href="/"
              onClick={(e) => handleNavClick(e, 'home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-slate-950 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L1 11H4V21H20V11H23L12 2ZM12 5.5L18 10.5V19H6V10.5L12 5.5Z" />
                  <path d="M12 8L15 11.5H9L12 8Z" />
                </svg>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-extrabold tracking-tight font-heading text-white flex items-center gap-1">
                  APPY <span className="text-amber-400">ROOFING</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                  Co. • Established US Quality
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links with Active Highlighting */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.page)}
                    className={`type-nav transition-all duration-200 relative py-1 px-1 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'text-amber-400 font-bold'
                        : 'text-slate-300 hover:text-amber-300 font-medium'
                    }`}
                  >
                    <span>{link.label}</span>
                    {/* Active Underline Bar */}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-amber-400 transition-all duration-300 rounded-full ${
                        isActive
                          ? 'w-full shadow-[0_0_8px_rgba(245,158,11,0.7)]'
                          : 'w-0 hover:w-full opacity-60'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Right Side Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                onClick={() => trackConversion('call_button_click', { location: 'navbar' })}
                className="flex items-center gap-2 type-nav text-slate-200 hover:text-amber-400 transition px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700/60 whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>

              <button
                onClick={() => {
                  trackConversion('estimate_button_click', { location: 'navbar' });
                  onOpenBooking();
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs sm:text-sm transition shadow-sm active:scale-95 whitespace-nowrap"
              >
                Request Estimate
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={onOpenBooking}
                className="hidden sm:inline-flex px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs uppercase"
              >
                Estimate
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-800/80 text-slate-200 border border-slate-700 hover:text-amber-400 transition"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Flyout Menu with Active Highlighting */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#091321] border-b border-slate-800 px-4 pt-4 pb-8 space-y-3 mt-3 shadow-2xl animate-in slide-in-from-top-5">
            <div className="grid grid-cols-2 gap-2 text-[15px] font-semibold">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.page)}
                    className={`p-2.5 rounded-lg transition-all flex items-center justify-between border cursor-pointer ${
                      isActive
                        ? 'bg-amber-500/15 border-amber-500/50 text-amber-400 font-bold shadow-sm'
                        : 'bg-slate-800/50 border-slate-700/40 hover:bg-slate-800 text-slate-200 hover:text-amber-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      )}
                      {link.label}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 ${
                        isActive ? 'text-amber-400' : 'text-slate-500'
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onOpenPortal();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 text-xs rounded-lg bg-slate-800 text-slate-200 font-semibold text-center border border-slate-700"
                >
                  Customer Portal
                </button>
                <button
                  onClick={() => {
                    onOpenAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 text-xs rounded-lg bg-slate-800 text-slate-200 font-semibold text-center border border-slate-700"
                >
                  Admin CRM
                </button>
              </div>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-amber-400 type-btn border border-slate-700"
              >
                <Phone className="w-4 h-4" />
                Call {BUSINESS_INFO.phone}
              </a>
              <button
                onClick={() => {
                  onOpenBooking();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 type-btn shadow-lg shadow-amber-500/25"
              >
                Get Your Free Roof Estimate
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Fixed Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#091321]/95 backdrop-blur-xl border-t border-slate-800 p-2 sm:hidden flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-slate-800 text-white type-btn border border-slate-700"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          Call Now
        </a>
        <button
          onClick={onOpenBooking}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 type-btn shadow-lg shadow-amber-500/30"
        >
          Free Estimate
        </button>
      </div>
    </>
  );
};
