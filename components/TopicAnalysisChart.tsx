'use client';

import React from 'react';
import { TopicAnalysis } from '@/types';
import Card from './Card';

interface TopicAnalysisChartProps {
  data: TopicAnalysis[];
}

// Color palette for topics
const topicColors: { [key: string]: string } = {
  'AI & Technology': '#06c0d7',
  'Finance & Markets': '#f77024',
  'Business Strategy': '#8b5cf6',
  'Health & Science': '#10b981',
  'Politics': '#ef4444',
};

export default function TopicAnalysisChart({ data }: TopicAnalysisChartProps) {
  return (
    <Card variant="default">
      <h3 className="text-xl font-bold text-bunting mb-6 font-newsreader">
        Topic Analysis
      </h3>
      
      <div className="space-y-3">
        {data.map((topic) => {
          const color = topicColors[topic.topic] || '#94a3b8';
          
          return (
            <div key={topic.topic} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm font-medium text-bunting">
                    {topic.topic}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    {topic.articleCount} articles
                  </span>
                  <span className="text-sm font-bold text-primary w-12 text-right">
                    {topic.percentage}%
                  </span>
                </div>
              </div>
              
              {/* Bar */}
              <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${topic.percentage}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No topic data available</p>
        </div>
      )}
    </Card>
  );
}
