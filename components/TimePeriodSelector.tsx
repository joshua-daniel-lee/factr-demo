'use client';

import React from 'react';
import { TimePeriod } from '@/types';

interface TimePeriodSelectorProps {
  selected: TimePeriod;
  onChange: (period: TimePeriod) => void;
}

const periods: { value: TimePeriod; label: string }[] = [
  { value: 'thisWeek', label: 'This Week' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'last3Months', label: 'Last 3 Months' },
  { value: 'allTime', label: 'All Time' },
];

export default function TimePeriodSelector({ selected, onChange }: TimePeriodSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${
              selected === period.value
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-bunting'
            }
          `}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
