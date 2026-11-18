import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ReputationSection } from '../components/ReputationSection';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { StatsSection } from '../components/StatsSection';

interface ReviewsPageProps {
  onOpenBooking: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onOpenBooking }) => {
  return (
    <div>
      <PageHeader
        badge="CUSTOMER REPUTATION"
        title="Verified Homeowner Reviews &"
        highlightTitle="Customer Experiences"
        description="Read authentic experiences from residential and commercial clients who trusted Appy Roofing Co. with their properties. Certified 4.9 stars across Google Reviews."
        breadcrumbs={[{ label: 'Customer Reviews' }]}
        onOpenBooking={onOpenBooking}
      />

      {/* Google Reviews Showcase with Write Review Modal */}
      <ReputationSection hideHeader={true} />

      {/* Real-World Before & After Proof */}
      <BeforeAfterSlider onOpenBooking={onOpenBooking} />

      {/* Audited Satisfaction Statistics */}
      <StatsSection />
    </div>
  );
};
