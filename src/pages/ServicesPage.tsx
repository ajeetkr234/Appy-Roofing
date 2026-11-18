import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ServicesSection } from '../components/ServicesSection';
import { RoofProblemsGuide } from '../components/RoofProblemsGuide';
import { ExplodedRoof3D } from '../components/ExplodedRoof3D';
import { InsuranceWarrantySection } from '../components/InsuranceWarrantySection';
import { FinancingCalculator } from '../components/FinancingCalculator';

interface ServicesPageProps {
  onOpenBooking: (serviceTitle?: string) => void;
  onSelectService?: (service: any) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking, onSelectService }) => {
  return (
    <div>
      <PageHeader
        badge="CERTIFIED AMERICAN ROOFING"
        title="Comprehensive Roofing Services &"
        highlightTitle="Specialized Solutions"
        description="From routine inspections and minor leak repairs to complete structural roof replacements and emergency hurricane response across residential and commercial properties."
        breadcrumbs={[{ label: 'Services' }]}
        onOpenBooking={() => onOpenBooking()}
      />

      {/* Complete 23 Roofing Services Catalog */}
      <ServicesSection
        hideHeader={true}
        onOpenBookingWithService={(title) => onOpenBooking(title)}
      />

      {/* 10 Early Warning Roof Problems */}
      <RoofProblemsGuide onOpenBooking={() => onOpenBooking('Roof Inspection & Leak Repair')} />

      {/* 7-Layer Exploded 3D Roof Anatomy */}
      <ExplodedRoof3D />

      {/* Insurance Claims & Lifetime Warranty Protocol */}
      <InsuranceWarrantySection />

      {/* Flexible Financing Calculator */}
      <FinancingCalculator onOpenBooking={() => onOpenBooking('Financed Roof Replacement')} />
    </div>
  );
};
