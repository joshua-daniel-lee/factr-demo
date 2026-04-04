'use client';

import React, { useState } from 'react';
import { Check, CreditCard, ShoppingCart, ArrowLeft, Loader2 } from 'lucide-react';
import { CreditPackage, PaymentMethod } from '@/types';
import Modal from './Modal';
import Button from './Button';
import Card from './Card';
import CreditPackageCard from './CreditPackageCard';
import PaymentMethodCard from './PaymentMethodCard';
import AddPaymentMethodModal from './AddPaymentMethodModal';
import Badge from './Badge';

interface PurchaseCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  creditPackages: CreditPackage[];
  paymentMethods: PaymentMethod[];
  onPurchase: (packageId: string, paymentMethodId: string) => Promise<void>;
  onAddPaymentMethod: (method: any) => void;
  onSetDefaultPaymentMethod: (id: string) => void;
  onRemovePaymentMethod: (id: string) => void;
}

type Step = 'package' | 'payment' | 'confirm';

export default function PurchaseCreditsModal({
  isOpen,
  onClose,
  creditPackages,
  paymentMethods,
  onPurchase,
  onAddPaymentMethod,
  onSetDefaultPaymentMethod,
  onRemovePaymentMethod,
}: PurchaseCreditsModalProps) {
  const [step, setStep] = useState<Step>('package');
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string | null>(
    paymentMethods.find((pm) => pm.isDefault)?.id || null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

  const selectedPackage = creditPackages.find((p) => p.id === selectedPackageId);
  const selectedPaymentMethod = paymentMethods.find((pm) => pm.id === selectedPaymentMethodId);

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackageId(packageId);
  };

  const handleNextFromPackage = () => {
    if (selectedPackageId) {
      setStep('payment');
    }
  };

  const handleNextFromPayment = () => {
    if (selectedPaymentMethodId) {
      setStep('confirm');
    }
  };

  const handleBack = () => {
    if (step === 'payment') {
      setStep('package');
    } else if (step === 'confirm') {
      setStep('payment');
    }
  };

  const handlePurchase = async () => {
    if (!selectedPackageId || !selectedPaymentMethodId) return;

    setIsProcessing(true);
    try {
      await onPurchase(selectedPackageId, selectedPaymentMethodId);
      
      // Reset and close
      setStep('package');
      setSelectedPackageId(null);
      onClose();
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      setStep('package');
      setSelectedPackageId(null);
      onClose();
    }
  };

  const handleAddPaymentMethod = (method: any) => {
    onAddPaymentMethod(method);
    setShowAddPaymentModal(false);
    // Select the newly added payment method
    const newId = 'pm_' + Date.now();
    setSelectedPaymentMethodId(newId);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={
          step === 'package'
            ? 'Buy Credits'
            : step === 'payment'
            ? 'Select Payment Method'
            : 'Confirm Purchase'
        }
        size="lg"
      >
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`flex items-center gap-2 ${step === 'package' ? 'text-primary' : 'text-green-600'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              step === 'package' ? 'bg-primary text-white' : 'bg-green-600 text-white'
            }`}>
              {step === 'package' ? '1' : <Check className="w-5 h-5" />}
            </div>
            <span className="text-sm font-semibold hidden sm:inline">Package</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300"></div>
          <div className={`flex items-center gap-2 ${
            step === 'payment' ? 'text-primary' : step === 'confirm' ? 'text-green-600' : 'text-gray-400'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              step === 'payment' ? 'bg-primary text-white' : step === 'confirm' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {step === 'confirm' ? <Check className="w-5 h-5" /> : '2'}
            </div>
            <span className="text-sm font-semibold hidden sm:inline">Payment</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300"></div>
          <div className={`flex items-center gap-2 ${
            step === 'confirm' ? 'text-primary' : 'text-gray-400'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              step === 'confirm' ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              3
            </div>
            <span className="text-sm font-semibold hidden sm:inline">Confirm</span>
          </div>
        </div>

        {/* Step 1: Select Package */}
        {step === 'package' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {creditPackages.map((pkg) => (
                <CreditPackageCard
                  key={pkg.id}
                  package={pkg}
                  selected={selectedPackageId === pkg.id}
                  onSelect={() => handlePackageSelect(pkg.id)}
                />
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleNextFromPackage}
                disabled={!selectedPackageId}
                className="flex-1"
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Select Payment Method */}
        {step === 'payment' && (
          <div className="space-y-6">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {paymentMethods.map((pm) => (
                <div
                  key={pm.id}
                  onClick={() => setSelectedPaymentMethodId(pm.id)}
                  className={`cursor-pointer rounded-lg transition-all ${
                    selectedPaymentMethodId === pm.id ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                >
                  <PaymentMethodCard
                    paymentMethod={pm}
                    onSetDefault={() => onSetDefaultPaymentMethod(pm.id)}
                    onRemove={() => onRemovePaymentMethod(pm.id)}
                  />
                </div>
              ))}

              {/* Add New Payment Method Button */}
              <div onClick={() => setShowAddPaymentModal(true)} className="cursor-pointer">
                <Card variant="default" className="border-dashed border-2 border-gray-300 hover:border-primary transition-colors">
                  <div className="text-center py-8">
                    <CreditCard className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                    <p className="font-semibold text-bunting">Add New Payment Method</p>
                    <p className="text-sm text-gray-500 mt-1">Credit or debit card</p>
                  </div>
                </Card>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleNextFromPayment}
                disabled={!selectedPaymentMethodId}
                className="flex-1"
              >
                Continue to Confirm
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm Purchase */}
        {step === 'confirm' && selectedPackage && selectedPaymentMethod && (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card variant="default" className="bg-gray-50">
              <h3 className="font-bold text-bunting mb-4">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Package</span>
                  <span className="font-semibold text-bunting">{selectedPackage.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Credits</span>
                  <span className="font-semibold text-primary">{selectedPackage.credits}</span>
                </div>
                {selectedPackage.savings && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Savings</span>
                    <Badge variant="success" size="sm">
                      {selectedPackage.savings}% off
                    </Badge>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-bunting">Total</span>
                    <span className="text-2xl font-bold text-bunting">${selectedPackage.price}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Method Summary */}
            <div>
              <h3 className="font-bold text-bunting mb-3">Payment Method</h3>
              <Card variant="default" className="bg-gray-50">
                <div className="flex items-center gap-4">
                  <CreditCard className="w-8 h-8 text-gray-600" />
                  <div>
                    <div className="font-semibold text-bunting">
                      {selectedPaymentMethod.cardBrand?.toUpperCase()} •••• {selectedPaymentMethod.last4}
                    </div>
                    <div className="text-sm text-gray-600">
                      Expires {selectedPaymentMethod.expiryMonth}/{selectedPaymentMethod.expiryYear?.slice(-2)}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleBack} disabled={isProcessing} className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handlePurchase}
                disabled={isProcessing}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Complete Purchase
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Payment Method Modal */}
      <AddPaymentMethodModal
        isOpen={showAddPaymentModal}
        onClose={() => setShowAddPaymentModal(false)}
        onAdd={handleAddPaymentMethod}
      />
    </>
  );
}
