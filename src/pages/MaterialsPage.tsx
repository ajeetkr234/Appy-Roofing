import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { MaterialsGuide } from '../components/MaterialsGuide';
import { House3DExperience } from '../components/House3DExperience';
import { AIVisualizer } from '../components/AIVisualizer';
import { ExplodedRoof3D } from '../components/ExplodedRoof3D';

interface MaterialsPageProps {
  onOpenBooking: (serviceTitle?: string) => void;
}

export const MaterialsPage: React.FC<MaterialsPageProps> = ({ onOpenBooking }) => {
  return (
    <div>
      <PageHeader
        badge="ENGINEERING SPECIFICATIONS"
        title="Architectural Roofing Materials &"
        highlightTitle="Performance Comparison"
        description="Select the optimal material for your home's slope, regional weather vulnerabilities, and aesthetic goals. Compare lifespan, wind ratings, energy efficiency, and investment values."
        breadcrumbs={[{ label: 'Roofing Materials' }]}
        onOpenBooking={() => onOpenBooking()}
      />

      {/* Complete Materials Guide & Comparison Matrix */}
      <MaterialsGuide
        hideHeader={true}
        onOpenBookingWithService={(mat) => onOpenBooking(`${mat} System Installation`)}
      />

      {/* Real-Time 3D House Material Customizer */}
      <House3DExperience
        onSelectEstimate={(mat) => onOpenBooking(`${mat} Replacement`)}
      />

      {/* AI Roof Visualizer Studio */}
      <AIVisualizer
        onOpenBooking={() => onOpenBooking('Custom AI Visualizer Design')}
      />

      {/* 7 Protective Layers Roof Anatomy */}
      <ExplodedRoof3D />
    </div>
  );
};
