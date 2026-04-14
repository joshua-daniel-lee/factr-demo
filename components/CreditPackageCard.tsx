'use client';

import React from 'react';
import { Coins, TrendingUp } from 'lucide-react';
import { CreditPackage } from '@/types';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';

interface CreditPackageCardProps {
  package: CreditPackage;
  selected?: boolean;
  onSelect?: () => void;
}

export default function CreditPackageCard({ 
  package: pkg, 
  selected = false, 
  onSelect 
}: CreditPackageCardProps) {
  const pricePerCredit = (pkg.price / pkg.credits).toFixed(2);

  return (
    <div onClick={onSelect} className="cursor-pointer">
      <Card 
        variant={selected ? 'gradient' : 'default'}
        className={`relative transition-all hover-lift ${
          selected ? 'ring-2 ring-primary ring-offset-2' : ''
        }`}
      >
        {/* Popular Badge */}
        {pkg.popular && (
          <div className="absolute top-3 left-3">
            <Badge variant="primary" size="sm" className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Most Popular
            </Badge>
          </div>
        )}

        {/* Savings Badge */}
        {pkg.savings && (
          <div className="absolute top-3 right-3">
            <Badge variant="success" size="sm">
              Save {pkg.savings}%
            </Badge>
          </div>
        )}

        <div className={`text-center py-6 ${selected ? 'text-white' : ''}`}>
          {/* Icon */}
          <Coins className={`w-12 h-12 mx-auto mb-4 ${
            selected ? 'text-white/80' : 'text-primary'
          }`} />
          
          {/* Package Name */}
          <h3 className={`text-lg font-bold mb-2 ${
            selected ? 'text-white' : 'text-bunting'
          }`}>
            {pkg.name}
          </h3>
          
          {/* Credits */}
          <div className={`text-3xl font-bold mb-1 ${
            selected ? 'text-white' : 'text-primary'
          }`}>
            {pkg.credits}
          </div>
          <div className={`text-sm mb-4 ${
            selected ? 'text-white/80' : 'text-gray-600'
          }`}>
            Credits
          </div>
          
          {/* Price */}
          <div className={`text-2xl font-bold mb-1 ${
            selected ? 'text-white' : 'text-bunting'
          }`}>
            ${pkg.price}
          </div>
          <div className={`text-xs ${
            selected ? 'text-white/70' : 'text-gray-500'
          }`}>
            ${pricePerCredit} per credit
          </div>

          {/* Select Button */}
          {onSelect && (
            <Button 
              variant={selected ? 'outline' : 'primary'}
              className={`mt-6 px-6 py-2 whitespace-nowrap ${
                selected ? 'bg-white text-primary hover:bg-white/90' : ''
              }`}
            >
              {selected ? 'Selected' : 'Select'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
