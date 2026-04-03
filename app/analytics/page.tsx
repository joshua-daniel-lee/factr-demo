'use client';

import { useState } from 'react';
import AppShell from "@/components/AppShell";
import TimePeriodSelector from "@/components/TimePeriodSelector";
import OverviewStatsGrid from "@/components/OverviewStatsGrid";
import PublisherBreakdownChart from "@/components/PublisherBreakdownChart";
import TopicAnalysisChart from "@/components/TopicAnalysisChart";
import SavingsCalculator from "@/components/SavingsCalculator";
import { TimePeriod } from "@/types";
import { getAnalytics } from "@/lib/mockData";

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('thisMonth');
  const analyticsData = getAnalytics(selectedPeriod);

  return (
    <AppShell title="Analytics">
      <div className="p-6 md:p-8 space-y-8">
        {/* Time Period Selector */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-bunting font-newsreader">
            Analytics & Insights
          </h2>
          <TimePeriodSelector
            selected={selectedPeriod}
            onChange={setSelectedPeriod}
          />
        </div>

        {/* Overview Stats Grid */}
        <OverviewStatsGrid data={analyticsData.overview} />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PublisherBreakdownChart data={analyticsData.publisherBreakdown} />
          <TopicAnalysisChart data={analyticsData.topicAnalysis} />
        </div>

        {/* Savings Calculator */}
        <SavingsCalculator data={analyticsData.savings} />
      </div>
    </AppShell>
  );
}
