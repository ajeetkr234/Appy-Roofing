import React, { useState } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIChatbot } from './components/AIChatbot';
import { CustomerPortal } from './components/CustomerPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { EstimateBookingModal } from './components/EstimateBookingModal';

// Dedicated Multi-Page Views
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { MaterialsPage } from './pages/MaterialsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const PageRenderer: React.FC<{
  onOpenBooking: (service?: string, zip?: string) => void;
  onOpenBookingWithEstimate: (est: any) => void;
}> = ({ onOpenBooking, onOpenBookingWithEstimate }) => {
  const { currentPage } = useNavigation();

  switch (currentPage) {
    case 'services':
      return <ServicesPage onOpenBooking={onOpenBooking} />;
    case 'projects':
      return <ProjectsPage onOpenBooking={() => onOpenBooking()} />;
    case 'materials':
      return <MaterialsPage onOpenBooking={onOpenBooking} />;
    case 'reviews':
      return <ReviewsPage onOpenBooking={() => onOpenBooking()} />;
    case 'about':
      return <AboutPage onOpenBooking={() => onOpenBooking()} />;
    case 'contact':
      return (
        <ContactPage
          onOpenBooking={onOpenBooking}
          onOpenBookingWithEstimate={onOpenBookingWithEstimate}
        />
      );
    case 'home':
    default:
      return (
        <HomePage
          onOpenBooking={onOpenBooking}
          onSelectService={() => {}}
        />
      );
  }
};

export const App: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('Roof Replacement');
  const [selectedZipForBooking, setSelectedZipForBooking] = useState('75201');

  const handleOpenBooking = (service?: string, zip?: string) => {
    if (service) setSelectedServiceForBooking(service);
    if (zip) setSelectedZipForBooking(zip);
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingWithEstimate = (estimate: any) => {
    if (estimate && estimate.materialSelected) {
      setSelectedServiceForBooking(`${estimate.materialSelected} Installation`);
    }
    setIsBookingModalOpen(true);
  };

  return (
    <NavigationProvider>
      <div className="min-h-screen bg-[#091321] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
        {/* Sticky Top Navigation & Mobile Bar */}
        <Navbar
          onOpenBooking={() => handleOpenBooking()}
          onOpenPortal={() => setIsPortalOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Dynamic Multi-Page Router View */}
        <main className="flex-1">
          <PageRenderer
            onOpenBooking={handleOpenBooking}
            onOpenBookingWithEstimate={handleOpenBookingWithEstimate}
          />
        </main>

        {/* Global Footer with Page Links */}
        <Footer
          onOpenBooking={() => handleOpenBooking()}
          onOpenPortal={() => setIsPortalOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Global Floating AI Roofing Chatbot */}
        <AIChatbot onOpenBooking={() => handleOpenBooking()} />

        {/* Global Modals */}
        <CustomerPortal
          isOpen={isPortalOpen}
          onClose={() => setIsPortalOpen(false)}
        />

        <AdminDashboard
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />

        <EstimateBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          initialService={selectedServiceForBooking}
          initialZip={selectedZipForBooking}
        />
      </div>
    </NavigationProvider>
  );
};

export default App;
