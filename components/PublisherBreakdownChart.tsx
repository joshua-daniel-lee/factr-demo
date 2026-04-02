'use client';

import React from 'react';
import { PublisherBreakdown } from '@/types';
import Card from './Card';
import Badge from './Badge';

interface PublisherBreakdownChartProps {
  data: PublisherBreakdown[];
}

export default function PublisherBreakdownChart({ data }: PublisherBreakdownChartProps) {
  // Find max value for scaling bars
  const maxCredits = Math.max(...data.map(p => p.creditsSpent));
  
  return (
    <Card variant="default">
      <h3 className="text-xl font-bold text-bunting mb-6 font-newsreader">
        Publisher Breakdown
      </h3>
      
      <div className="space-y-4">
        {data.map((publisher, index) => {
          const barWidth = (publisher.creditsSpent / maxCredits) * 100;
          
          return (
            <div key={publisher.publisherId}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-bunting">
                    {publisher.publisherName}
                  </span>
                  <Badge variant="default" size="sm">
                    {publisher.articleCount} articles
                  </Badge>
                </div>
                <span className="text-sm font-bold text-primary">
                  {publisher.creditsSpent} credits
                </span>
              </div>
              
              {/* Bar */}
              <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-blue-chill rounded-full transition-all duration-500"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No publisher data available</p>
        </div>
      )}
    </Card>
  );
}
