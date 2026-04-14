'use client';

import React from 'react';
import { X, Lock } from 'lucide-react';
import Button from './Button';

interface ArticlePaywallProps {
  creditCost: number;
  onUnlock: () => void;
  isUnlocking?: boolean;
}

export default function ArticlePaywall({ creditCost, onUnlock, isUnlocking = false }: ArticlePaywallProps) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative animate-scale-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-bunting font-newsreader mb-2">
            Premium Content
          </h2>
          <p className="text-gray-600">
            This article requires credits to unlock
          </p>
        </div>

        {/* Credit Cost */}
        <div className="bg-gradient-to-r from-primary/5 to-blue-chill/5 rounded-lg p-6 mb-6 text-center">
          <div className="text-sm text-gray-600 mb-1">Unlock Cost</div>
          <div className="text-4xl font-bold text-primary mb-1">{creditCost}</div>
          <div className="text-sm text-gray-500">credits</div>
        </div>

        {/* Benefits */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-gray-700">
              <strong>Instant access</strong> to full article content
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-gray-700">
              <strong>No subscription</strong> required
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-gray-700">
              <strong>Permanent access</strong> in your library
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="dark"
          onClick={onUnlock}
          disabled={isUnlocking}
          className="w-full"
        >
          {isUnlocking ? 'Unlocking...' : `Unlock with ${creditCost} Credits`}
        </Button>

        {/* Footer Note */}
        <p className="text-xs text-center text-gray-500 mt-4">
          Pay only for what you read with FactrAI
        </p>
      </div>
    </div>
  );
}
