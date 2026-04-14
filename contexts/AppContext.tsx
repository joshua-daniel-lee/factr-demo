'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, PaymentMethod, CardBrand } from '@/types';
import { getUser, getCreditPackageById } from '@/lib/mockData';
import { useToast } from '@/components/Toast';

interface AppContextType {
  user: User;
  isLoading: boolean;
  updateCredits: (amount: number) => void;
  unlockArticle: (articleId: string, creditCost: number) => boolean;
  refreshUser: () => void;
  addPaymentMethod: (method: {
    cardBrand: CardBrand;
    last4: string;
    expiryMonth: string;
    expiryYear: string;
    holderName: string;
  }) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
  purchaseCredits: (packageId: string, paymentMethodId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(getUser());
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  // Update user credits
  const updateCredits = useCallback((amount: number) => {
    setUser((prev) => ({
      ...prev,
      credits: {
        ...prev.credits,
        remaining: prev.credits.remaining + amount,
        used: amount < 0 ? prev.credits.used + Math.abs(amount) : prev.credits.used,
      },
    }));
  }, []);

  // Unlock article
  const unlockArticle = useCallback(
    (articleId: string, creditCost: number): boolean => {
      // Check if user has enough credits
      if (user.credits.remaining < creditCost) {
        showToast('Insufficient credits to unlock this article', 'error');
        return false;
      }

      // Deduct credits
      updateCredits(-creditCost);
      
      // Success feedback handled by calling component
      return true;
    },
    [user.credits.remaining, updateCredits, showToast]
  );

  // Refresh user data (for future backend integration)
  const refreshUser = useCallback(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser(getUser());
      setIsLoading(false);
    }, 500);
  }, []);

  // Add payment method
  const addPaymentMethod = useCallback((method: {
    cardBrand: CardBrand;
    last4: string;
    expiryMonth: string;
    expiryYear: string;
    holderName: string;
  }) => {
    const newPaymentMethod: PaymentMethod = {
      id: 'pm_' + Date.now(),
      type: 'card',
      isDefault: (user.paymentMethods?.length || 0) === 0, // First card is default
      ...method,
    };

    setUser((prev) => ({
      ...prev,
      paymentMethods: [...(prev.paymentMethods || []), newPaymentMethod],
    }));

    showToast('Payment method added successfully', 'success');
  }, [user.paymentMethods, showToast]);

  // Remove payment method
  const removePaymentMethod = useCallback((id: string) => {
    setUser((prev) => ({
      ...prev,
      paymentMethods: (prev.paymentMethods || []).filter((pm) => pm.id !== id),
    }));

    showToast('Payment method removed', 'success');
  }, [showToast]);

  // Set default payment method
  const setDefaultPaymentMethod = useCallback((id: string) => {
    setUser((prev) => ({
      ...prev,
      paymentMethods: (prev.paymentMethods || []).map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      })),
    }));

    showToast('Default payment method updated', 'success');
  }, [showToast]);

  // Purchase credits
  const purchaseCredits = useCallback(async (packageId: string, paymentMethodId: string) => {
    const pkg = getCreditPackageById(packageId);
    
    if (!pkg) {
      showToast('Invalid package selected', 'error');
      throw new Error('Invalid package');
    }

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Add credits
    setUser((prev) => ({
      ...prev,
      credits: {
        ...prev.credits,
        remaining: prev.credits.remaining + pkg.credits,
        total: prev.credits.total + pkg.credits,
      },
    }));

    showToast(`Successfully purchased ${pkg.credits} credits!`, 'success');
  }, [showToast]);

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        updateCredits,
        unlockArticle,
        refreshUser,
        addPaymentMethod,
        removePaymentMethod,
        setDefaultPaymentMethod,
        purchaseCredits,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use AppContext
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
