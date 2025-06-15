import React from 'react';
import { cn } from '@/lib/utils';
import FunnelCount from './FunnelCount';
import SourcesOverview from './SourcesOverview';
import LeadsTracking from './LeadsTracking';

interface StatsGridProps {
  className?: string;
}

const StatsGrid: React.FC<StatsGridProps> = ({ className }) => {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 md:gap-8", className)}>
      {/* Left column for FunnelCount and LeadsTracking */}
      <div className="flex flex-col gap-6 md:gap-8">
        <FunnelCount />
        <LeadsTracking />
      </div>
      {/* Right column for SourcesOverview */}
      <div className="flex flex-col gap-6 md:gap-8">
        <SourcesOverview />
      </div>
    </div>
  );
};

export default StatsGrid;
