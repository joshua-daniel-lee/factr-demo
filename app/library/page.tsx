'use client';

import React from 'react';
import AppShell from '@/components/AppShell';
import PageContainer from '@/components/PageContainer';
import Section from '@/components/Section';
import ArticleList from '@/components/ArticleList';
import { getUnlockedArticles } from '@/lib/mockData';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/Button';

export default function LibraryPage() {
  const unlockedArticles = getUnlockedArticles();

  return (
    <AppShell title="Library">
      <PageContainer>
        <Section 
          title="Your Library"
          action={{
            label: 'Discover More',
            href: '/discover',
          }}
        >
          {unlockedArticles.length > 0 ? (
            <>
              <p className="text-gray-600 mb-6">
                You have unlocked {unlockedArticles.length} {unlockedArticles.length === 1 ? 'article' : 'articles'}. 
                Access them anytime.
              </p>
              <ArticleList articles={unlockedArticles} />
            </>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-bold text-bunting mb-2 font-newsreader">
                Your library is empty
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start discovering premium articles from top publishers. 
                Unlock content to build your personal reading library.
              </p>
              <Link href="/discover">
                <Button variant="primary">
                  Discover Articles
                </Button>
              </Link>
            </div>
          )}
        </Section>
      </PageContainer>
    </AppShell>
  );
}
