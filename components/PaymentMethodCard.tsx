'use client';

import React from 'react';
import { CreditCard, Check, Trash2 } from 'lucide-react';
import { PaymentMethod, CardBrand } from '@/types';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  onSetDefault?: () => void;
  onRemove?: () => void;
}

// Card brand colors and names
const cardBrandInfo: Record<CardBrand, { color: string; name: string }> = {
  visa: { color: 'from-blue-600 to-blue-800', name: 'Visa' },
  mastercard: { color: 'from-red-600 to-orange-600', name: 'Mastercard' },
  amex: { color: 'from-blue-500 to-indigo-600', name: 'American Express' },
  discover: { color: 'from-orange-500 to-orange-700', name: 'Discover' },
};

export default function PaymentMethodCard({
  paymentMethod,
  onSetDefault,
  onRemove,
}: PaymentMethodCardProps) {
  const brandInfo = paymentMethod.cardBrand
    ? cardBrandInfo[paymentMethod.cardBrand]
    : { color: 'from-gray-600 to-gray-800', name: 'Card' };

  return (
    <Card variant="default" className="overflow-hidden">
      {/* Card Visual */}
      <div className={`bg-gradient-to-br ${brandInfo.color} p-6 text-white rounded-t-xl relative`}>
        {/* Chip Icon */}
        <div className="absolute top-4 left-4 w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded opacity-90"></div>
        
        {/* Card Brand */}
        <div className="absolute top-4 right-4">
          <div className="text-xs font-bold opacity-90">{brandInfo.name}</div>
        </div>

        {/* Card Number */}
        <div className="mt-12 mb-6">
          <div className="flex items-center gap-3 text-2xl font-mono tracking-wider">
            <span>••••</span>
            <span>••••</span>
            <span>••••</span>
            <span className="font-semibold">{paymentMethod.last4}</span>
          </div>
        </div>

        {/* Card Holder & Expiry */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs opacity-70 mb-1">Card Holder</div>
            <div className="font-semibold text-sm">{paymentMethod.holderName}</div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-70 mb-1">Expires</div>
            <div className="font-semibold text-sm font-mono">
              {paymentMethod.expiryMonth}/{paymentMethod.expiryYear?.slice(-2)}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {paymentMethod.isDefault ? (
            <Badge variant="success" size="sm" className="flex items-center gap-1">
              <Check className="w-3 h-3" />
              Default
            </Badge>
          ) : (
            onSetDefault && (
              <Button
                variant="outline"
                onClick={onSetDefault}
                className="text-xs px-3 py-1.5 whitespace-nowrap w-32 bg-blue-700 text-white hover:bg-blue-800 border-blue-700"
              >
                Set as Default
              </Button>
            )
          )}
        </div>

        {!paymentMethod.isDefault && onRemove && (
          <Button
            variant="outline"
            onClick={onRemove}
            className="text-xs px-3 py-1.5 w-32 bg-blue-200 text-blue-700 hover:bg-blue-300 border-blue-200"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}
