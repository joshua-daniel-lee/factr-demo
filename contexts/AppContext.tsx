'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from '@/types';
import { getUser } from '@/lib/mockData';
import { useToast } from '@/components/Toast';

interface AppContextType {
  user: User;
  isLoading: boolean;
  updateCredits: (amount: number) => void;
  unlockArticle: (articleId: string, creditCost: number) => boolean;
  refreshUser: () => void;
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
      
      // Show success toast
      showToast(`Article unlocked! ${creditCost} credits used`, 'success');
      
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

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        updateCredits,
        unlockArticle,
        refreshUser,
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
