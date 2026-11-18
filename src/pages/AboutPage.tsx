import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { TeamSection } from '../components/TeamSection';
import { ZipChecker } from '../components/ZipChecker';
import { MaintenanceReminders } from '../components/MaintenanceReminders';
import { StatsSection } from '../components/StatsSection';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <div>
      <PageHeader
        badge="AMERICAN CRAFTSMANSHIP"
        title="About Appy Roofing Co. & Our"
        highlightTitle="Dedication to Excellence"
        description="Founded on the principles of engineering precision, transparent contractor pricing, and uncompromising jobsite safety, Appy delivers lasting protection for American homes."
        breadcrumbs={[{ label: 'About Us' }]}
        onOpenBooking={onOpenBooking}
      />

      {/* Why Choose Us & Value Pillars */}
      <WhyChooseUs hideHeader={true} onOpenBooking={onOpenBooking} />

      {/* Leadership & Master Craftsmanship Team */}
      <TeamSection />

      {/* Service Territory Coverage Verification */}
      <ZipChecker />

      {/* Automated Maintenance Reminders */}
      <MaintenanceReminders />

      {/* Statistics */}
      <StatsSection />
    </div>
  );
};
