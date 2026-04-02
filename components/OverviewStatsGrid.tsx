'use client';

import React from 'react';
import { AnalyticsOverview } from '@/types';
import Card from './Card';
import { BookOpen, Coins, TrendingUp, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

interface OverviewStatsGridProps {
  data: AnalyticsOverview;
}

interface StatCardProps {
  label: string;
  current: number;
  percentChange: number;
  icon: React.ReactNode;
  format: 'number' | 'decimal';
  suffix?: string;
}

function StatCard({ label, current, percentChange, icon, format, suffix = '' }: StatCardProps) {
  const isPositive = percentChange > 0;
  const isNeutral = percentChange === 0;
  
  const formattedValue = format === 'decimal' ? current.toFixed(1) : current;
  
  return (
    <Card variant="default" className="hover-lift">
      <div className="flex items-start justify-between mb-4">
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-primary">{icon}</div>
      </div>
      
      <div className="text-3xl font-bold text-bunting mb-2">
        {formattedValue}{suffix}
      </div>
      
      <div className="flex items-center gap-1">
        {!isNeutral && (
          isPositive ? (
            <ArrowUp className="w-4 h-4 text-green-600" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-600" />
          )
        )}
        <span className={`text-sm font-medium ${
          isNeutral ? 'text-gray-500' : isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isNeutral ? 'No change' : `${Math.abs(percentChange).toFixed(1)}%`}
        </span>
        <span className="text-sm text-gray-500">vs previous</span>
      </div>
    </Card>
  );
}

export default function OverviewStatsGrid({ data }: OverviewStatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Articles Unlocked"
        current={data.articlesUnlocked.current}
        percentChange={data.articlesUnlocked.percentChange}
        icon={<BookOpen className="w-6 h-6" />}
        format="number"
      />
      
      <StatCard
        label="Credits Spent"
        current={data.creditsSpent.current}
        percentChange={data.creditsSpent.percentChange}
        icon={<Coins className="w-6 h-6" />}
        format="number"
      />
      
      <StatCard
        label="Avg Cost/Article"
        current={data.avgCostPerArticle.current}
        percentChange={data.avgCostPerArticle.percentChange}
        icon={<TrendingUp className="w-6 h-6" />}
        format="decimal"
        suffix=" credits"
      />
      
      <StatCard
        label="Reading Frequency"
        current={data.readingFrequency.current}
        percentChange={data.readingFrequency.percentChange}
        icon={<Calendar className="w-6 h-6" />}
        format="number"
        suffix=" per week"
      />
    </div>
  );
}
