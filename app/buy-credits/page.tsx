'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, CreditCard, ShoppingCart, Loader2, CheckCircle } from 'lucide-react';
import AppShell from '@/components/AppShell';
import PageContainer from '@/components/PageContainer';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import PaymentMethodCard from '@/components/PaymentMethodCard';
import AddPaymentMethodModal from '@/components/AddPaymentMethodModal';
import { useApp } from '@/contexts/AppContext';
import { getCreditPackageById } from '@/lib/mockData';

function BuyCreditsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get('package');

  const { 
    user, 
    purchaseCredits,
    addPaymentMethod,
    setDefaultPaymentMethod,
    removePaymentMethod 
  } = useApp();

  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string | null>(
    user.paymentMethods?.find((pm) => pm.isDefault)?.id || null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

  const selectedPackage = packageId ? getCreditPackageById(packageId) : null;
  const selectedPaymentMethod = user.paymentMethods?.find(
    (pm) => pm.id === selectedPaymentMethodId
  );

  // Redirect if no package selected
  useEffect(() => {
    if (!packageId || !selectedPackage) {
      router.push('/credits');
    }
  }, [packageId, selectedPackage, router]);

  if (!selectedPackage) {
    return null;
  }

  const handlePurchase = async () => {
    if (!selectedPaymentMethodId) return;

    setIsProcessing(true);
    try {
      await purchaseCredits(selectedPackage.id, selectedPaymentMethodId);
      
      // Redirect back to credits page
      router.push('/credits');
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddPaymentMethod = (method: any) => {
    addPaymentMethod(method);
    setShowAddPaymentModal(false);
  };

  return (
    <AppShell title="Checkout">
      <PageContainer>
        {/* Back Button */}
        <button
          onClick={() => router.push('/credits')}
          className="flex items-center gap-2 text-gray-600 hover:text-bunting mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Back to Credits</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-bunting mb-2">Complete Purchase</h2>
              <p className="text-gray-600">Select a payment method to continue</p>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-lg font-bold text-bunting mb-4">Payment Method</h3>
              
              {user.paymentMethods && user.paymentMethods.length > 0 ? (
                <div className="space-y-4">
                  {user.paymentMethods.map((pm) => (
                    <div
                      key={pm.id}
                      onClick={() => setSelectedPaymentMethodId(pm.id)}
                      className={`cursor-pointer rounded-lg transition-all ${
                        selectedPaymentMethodId === pm.id ? 'ring-2 ring-primary ring-offset-2' : ''
                      }`}
                    >
                      <PaymentMethodCard
                        paymentMethod={pm}
                        onSetDefault={() => setDefaultPaymentMethod(pm.id)}
                        onRemove={() => removePaymentMethod(pm.id)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Card variant="default" className="bg-gray-50 text-center py-8">
                  <CreditCard className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-600 mb-4">No payment methods added yet</p>
                </Card>
              )}

              {/* Add New Payment Method */}
              <div onClick={() => setShowAddPaymentModal(true)} className="cursor-pointer mt-4">
                <Card variant="default" className="border-dashed border-2 border-gray-300 hover:border-primary transition-colors">
                  <div className="text-center py-6">
                    <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="font-semibold text-bunting text-sm">Add New Payment Method</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card variant="default" className="bg-gray-50">
                <h3 className="text-lg font-bold text-bunting mb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  {/* Package Info */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-bunting">{selectedPackage.name} Package</div>
                      <div className="text-sm text-gray-600">{selectedPackage.credits} Credits</div>
                    </div>
                    {selectedPackage.popular && (
                      <Badge variant="primary" size="sm">Most Popular</Badge>
                    )}
                  </div>

                  {/* Savings */}
                  {selectedPackage.savings && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Savings</span>
                      <Badge variant="success" size="sm">
                        {selectedPackage.savings}% off
                      </Badge>
                    </div>
                  )}

                  {/* Price per credit */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Price per credit</span>
                    <span className="font-semibold text-bunting">
                      ${(selectedPackage.price / selectedPackage.credits).toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-bunting">Total</span>
                      <span className="text-3xl font-bold text-bunting">
                        ${selectedPackage.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Purchase Button */}
                <Button
                  variant="primary"
                  onClick={handlePurchase}
                  disabled={!selectedPaymentMethodId || isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Complete Purchase
                    </>
                  )}
                </Button>

                {/* Security Note */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-900">
                      <span className="font-semibold">Secure checkout</span> - This is a demo. No actual payment will be processed.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Add Payment Method Modal */}
        <AddPaymentMethodModal
          isOpen={showAddPaymentModal}
          onClose={() => setShowAddPaymentModal(false)}
          onAdd={handleAddPaymentMethod}
        />
      </PageContainer>
    </AppShell>
  );
}

export default function BuyCreditsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuyCreditsContent />
    </Suspense>
  );
}
