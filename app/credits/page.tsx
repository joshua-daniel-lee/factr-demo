'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';
import PageContainer from '@/components/PageContainer';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { useApp } from '@/contexts/AppContext';
import { getTransactions, getArticleById, getCreditPackages } from '@/lib/mockData';
import { Coins, ArrowUpRight, ArrowDownRight, ShoppingCart } from 'lucide-react';
import PaymentMethodCard from '@/components/PaymentMethodCard';
import CreditPackageCard from '@/components/CreditPackageCard';

export default function CreditsPage() {
  const router = useRouter();
  const { 
    user, 
    setDefaultPaymentMethod,
    removePaymentMethod 
  } = useApp();
  const transactions = getTransactions();
  const creditPackages = getCreditPackages();

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AppShell title="Credits">
      <PageContainer>
        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card variant="gradient" className="md:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-white/80 text-sm mb-1">Available Balance</div>
                <div className="text-4xl font-bold text-white mb-2">
                  {user.credits.remaining} Credits
                </div>
                <div className="text-white/60 text-sm">
                  {user.credits.used} of {user.credits.total} used
                </div>
              </div>
              <Coins className="w-12 h-12 text-white/40" />
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${(user.credits.remaining / user.credits.total) * 100}%` }}
              />
            </div>
          </Card>

          <Card variant="default">
            <div className="text-center py-6">
              <ShoppingCart className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-bold text-bunting mb-2">Buy More Credits</h3>
              <p className="text-sm text-gray-600 mb-4">
                Choose from our credit packages below
              </p>
            </div>
          </Card>
        </div>

        {/* Credit Packages */}
        <Section title="Buy Credits" className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {creditPackages.map((pkg) => (
              <CreditPackageCard
                key={pkg.id}
                package={pkg}
                onSelect={() => router.push(`/buy-credits?package=${pkg.id}`)}
              />
            ))}
          </div>
        </Section>

        {/* Payment Methods */}
        {user.paymentMethods && user.paymentMethods.length > 0 && (
          <Section title="Payment Methods" className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.paymentMethods.map((pm) => (
                <PaymentMethodCard
                  key={pm.id}
                  paymentMethod={pm}
                  onSetDefault={() => setDefaultPaymentMethod(pm.id)}
                  onRemove={() => removePaymentMethod(pm.id)}
                />
              ))}
            </div>
          </Section>
        )}

        {/* Transaction History */}
        <Section title="Transaction History">
          <div className="space-y-3">
            {transactions.map((transaction) => {
              const article = transaction.articleId ? getArticleById(transaction.articleId) : null;
              const isCredit = transaction.credits > 0;

              return (
                <Card key={transaction.id} variant="default" className="hover-lift">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCredit ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {isCredit ? (
                          <ArrowUpRight className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5 text-red-600" />
                        )}
                      </div>

                      {/* Details */}
                      <div>
                        <div className="font-semibold text-bunting">
                          {transaction.type === 'purchase' && 'Credit Purchase'}
                          {transaction.type === 'unlock' && article && (
                            <span className="line-clamp-1">{article.title}</span>
                          )}
                          {transaction.type === 'refund' && 'Credit Refund'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(transaction.timestamp)}
                        </div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        isCredit ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isCredit ? '+' : ''}{transaction.credits}
                      </div>
                      <div className="text-xs text-gray-500">
                        Balance: {transaction.balanceAfter}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {transactions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Coins className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No transactions yet</p>
            </div>
          )}
        </Section>
      </PageContainer>
    </AppShell>
  );
}
