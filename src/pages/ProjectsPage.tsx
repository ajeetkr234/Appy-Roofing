import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ProjectGallery } from '../components/ProjectGallery';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { StatsSection } from '../components/StatsSection';

interface ProjectsPageProps {
  onOpenBooking: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenBooking }) => {
  return (
    <div>
      <PageHeader
        badge="PROVEN PORTFOLIO"
        title="Recent Completed Roofing Projects &"
        highlightTitle="Transformations"
        description="Inspect our architectural craftsmanship across residential estates, commercial facilities, and historic properties throughout Texas and nationwide service corridors."
        breadcrumbs={[{ label: 'Our Projects' }]}
        onOpenBooking={onOpenBooking}
      />

      {/* Full Project Portfolio Gallery */}
      <ProjectGallery hideHeader={true} />

      {/* Interactive Before & After Comparison Slider */}
      <BeforeAfterSlider onOpenBooking={onOpenBooking} />

      {/* Historical Craftsmanship Metrics */}
      <StatsSection />
    </div>
  );
};
