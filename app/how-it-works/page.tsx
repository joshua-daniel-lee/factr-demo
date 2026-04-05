'use client';

import AppShell from '@/components/AppShell';
import PageContainer from '@/components/PageContainer';
import FlywheelDiagram from '@/components/FlywheelDiagram';

export default function HowItWorksPage() {
  return (
    <AppShell title="How It Works">
      <PageContainer>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-bunting mb-4 font-newsreader">
            The FactrAI Flywheel
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A virtuous cycle that creates value for publishers, users, and advertisers
          </p>
        </div>

        {/* Flywheel Diagram */}
        <FlywheelDiagram />
      </PageContainer>
    </AppShell>
  );
}
