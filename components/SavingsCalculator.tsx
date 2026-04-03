'use client';

import React from 'react';
import { SavingsData } from '@/types';
import Card from './Card';
import { Sparkles, TrendingDown } from 'lucide-react';

interface SavingsCalculatorProps {
  data: SavingsData;
}

export default function SavingsCalculator({ data }: SavingsCalculatorProps) {
  const totalSubscriptionCost = data.subscriptionCosts.reduce(
    (sum, sub) => sum + sub.monthlyCost,
    0
  );
  
  return (
    <Card variant="default">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-accent" />
        <h3 className="text-xl font-bold text-bunting font-newsreader">
          Savings Calculator
        </h3>
      </div>
      
      {/* Hero Savings Amount */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-700">You've saved</span>
        </div>
        <div className="text-5xl font-bold text-green-600 mb-2">
          ${data.totalSaved}
        </div>
        <p className="text-sm text-green-700">
          vs individual subscriptions
        </p>
      </div>
      
      {/* Subscription Breakdown */}
      <div className="space-y-3">
        <div className="text-sm font-semibold text-gray-700 mb-3">
          Subscription Cost Comparison:
        </div>
        
        {data.subscriptionCosts.map((sub) => (
          <div
            key={sub.publisher}
            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
          >
            <span className="text-sm text-gray-600">{sub.publisher}</span>
            <span className="text-sm font-semibold text-bunting">
              {sub.monthlyCost > 0 ? `$${sub.monthlyCost}/mo` : 'Free'}
            </span>
          </div>
        ))}
        
        <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
          <span className="text-sm font-bold text-bunting">Total Monthly Cost</span>
          <span className="text-lg font-bold text-accent">
            ${totalSubscriptionCost}
          </span>
        </div>
      </div>
      
      {/* Savings Explanation */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900">
          💡 <strong>Smart savings!</strong> With FactrAI's credit system, you only pay for what you read, 
          saving money compared to maintaining multiple subscriptions.
        </p>
      </div>
    </Card>
  );
}
