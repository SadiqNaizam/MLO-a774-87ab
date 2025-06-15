import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import StatsGrid from '../components/Dashboard/StatsGrid';
import LeadReasonsGrid from '../components/Dashboard/LeadReasonsGrid';

/**
 * DashboardPage serves as the main overview for the Leads Dashboard.
 * It utilizes MainAppLayout to provide the overall page structure including
 * sidebar and header, and then populates the main content area with 
 * StatsGrid and LeadReasonsGrid components.
 */
const DashboardPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* 
        Container for the main content sections of the dashboard.
        Uses flexbox to stack components vertically with a consistent gap.
        The padding for this content area is handled by MainAppLayout's <main> element (p-6).
      */}
      <div className="flex flex-col gap-6 md:gap-8">
        <StatsGrid />
        <LeadReasonsGrid />
      </div>
    </MainAppLayout>
  );
};

export default DashboardPage;
