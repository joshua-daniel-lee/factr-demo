'use client';

import React, { useState } from 'react';
import { CreditCard, X } from 'lucide-react';
import { CardBrand } from '@/types';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import Card from './Card';

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (paymentMethod: {
    cardBrand: CardBrand;
    last4: string;
    expiryMonth: string;
    expiryYear: string;
    holderName: string;
  }) => void;
}

export default function AddPaymentMethodModal({
  isOpen,
  onClose,
  onAdd,
}: AddPaymentMethodModalProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Detect card brand from number
  const detectCardBrand = (number: string): CardBrand => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'visa';
    if (cleaned.startsWith('5')) return 'mastercard';
    if (cleaned.startsWith('3')) return 'amex';
    if (cleaned.startsWith('6')) return 'discover';
    return 'visa';
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substring(0, 19); // Max 16 digits + 3 spaces
  };

  // Format expiry date MM/YY
  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    setCardNumber(formatted);
    if (errors.cardNumber) {
      setErrors({ ...errors, cardNumber: '' });
    }
  };

  const handleExpiryDateChange = (value: string) => {
    const formatted = formatExpiryDate(value);
    setExpiryDate(formatted);
    if (errors.expiryDate) {
      setErrors({ ...errors, expiryDate: '' });
    }
  };

  const handleCvvChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').substring(0, 4);
    setCvv(cleaned);
    if (errors.cvv) {
      setErrors({ ...errors, cvv: '' });
    }
  };

  const handleHolderNameChange = (value: string) => {
    setHolderName(value);
    if (errors.holderName) {
      setErrors({ ...errors, holderName: '' });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Card number validation (simple)
    const cleanedNumber = cardNumber.replace(/\s/g, '');
    if (!cleanedNumber || cleanedNumber.length < 15) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    // Holder name validation
    if (!holderName.trim()) {
      newErrors.holderName = 'Please enter the cardholder name';
    }

    // Expiry date validation
    if (!expiryDate || expiryDate.length < 5) {
      newErrors.expiryDate = 'Please enter expiry date (MM/YY)';
    } else {
      const [month, year] = expiryDate.split('/');
      const monthNum = parseInt(month, 10);
      if (monthNum < 1 || monthNum > 12) {
        newErrors.expiryDate = 'Invalid month';
      }
    }

    // CVV validation
    if (!cvv || cvv.length < 3) {
      newErrors.cvv = 'Please enter CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const cleanedNumber = cardNumber.replace(/\s/g, '');
    const [month, year] = expiryDate.split('/');

    onAdd({
      cardBrand: detectCardBrand(cardNumber),
      last4: cleanedNumber.slice(-4),
      expiryMonth: month,
      expiryYear: '20' + year,
      holderName: holderName.trim(),
    });

    // Reset form
    setCardNumber('');
    setHolderName('');
    setExpiryDate('');
    setCvv('');
    setErrors({});
  };

  const handleClose = () => {
    setCardNumber('');
    setHolderName('');
    setExpiryDate('');
    setCvv('');
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Payment Method">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-semibold text-bunting mb-2">
            Card Number
          </label>
          <div className="relative">
            <Input
              type="text"
              value={cardNumber}
              onChange={(e) => handleCardNumberChange(e.target.value)}
              placeholder="1234 5678 9012 3456"
              className={errors.cardNumber ? 'border-red-500' : ''}
            />
            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          {errors.cardNumber && (
            <p className="text-xs text-red-600 mt-1">{errors.cardNumber}</p>
          )}
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-semibold text-bunting mb-2">
            Cardholder Name
          </label>
          <Input
            type="text"
            value={holderName}
            onChange={(e) => handleHolderNameChange(e.target.value)}
            placeholder="John Doe"
            className={errors.holderName ? 'border-red-500' : ''}
          />
          {errors.holderName && (
            <p className="text-xs text-red-600 mt-1">{errors.holderName}</p>
          )}
        </div>

        {/* Expiry & CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-bunting mb-2">
              Expiry Date
            </label>
            <Input
              type="text"
              value={expiryDate}
              onChange={(e) => handleExpiryDateChange(e.target.value)}
              placeholder="MM/YY"
              className={errors.expiryDate ? 'border-red-500' : ''}
            />
            {errors.expiryDate && (
              <p className="text-xs text-red-600 mt-1">{errors.expiryDate}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-bunting mb-2">
              CVV
            </label>
            <Input
              type="text"
              value={cvv}
              onChange={(e) => handleCvvChange(e.target.value)}
              placeholder="123"
              className={errors.cvv ? 'border-red-500' : ''}
            />
            {errors.cvv && (
              <p className="text-xs text-red-600 mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Info Card */}
        <Card variant="default" className="bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <div className="text-blue-600 mt-0.5">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">Your payment info is secure</p>
              <p className="text-xs text-blue-700">
                This is a demo. No actual payment will be processed.
              </p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            Add Card
          </Button>
        </div>
      </form>
    </Modal>
  );
}
