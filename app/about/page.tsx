'use client';

import AppShell from '@/components/AppShell';
import PageContainer from '@/components/PageContainer';
import Section from '@/components/Section';
import Card from '@/components/Card';
import ASCIIPufferfish from '@/components/ASCIIPufferfish';
import { Code, Sparkles, Zap, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <AppShell title="About">
      <PageContainer>
        {/* Hero Section with ASCII Animation */}
        <div className="mb-12">
          <Card variant="default" className="bg-gradient-to-br from-bunting to-primary p-0 overflow-hidden">
            <ASCIIPufferfish />
          </Card>
          <div className="text-center mt-8">
            <h1 className="text-4xl md:text-5xl font-bold text-bunting mb-4 font-newsreader">
              About Factr Demo
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A playful demonstration of modern web development, featuring an animated ASCII pufferfish 🐡
            </p>
          </div>
        </div>

        {/* What is Factr */}
        <Section title="What is Factr?" className="mb-8">
          <Card variant="default">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                Factr is a demo application showcasing a modern approach to journalism access. 
                Instead of multiple expensive subscriptions, users purchase credits to unlock individual 
                articles from premium publishers.
              </p>
              <p className="text-gray-700 mb-4">
                This project demonstrates a complete user experience including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Article discovery and browsing</li>
                <li>Credit-based unlock system</li>
                <li>Personal library management</li>
                <li>Usage analytics and insights</li>
                <li>Payment processing simulation</li>
              </ul>
            </div>
          </Card>
        </Section>

        {/* Tech Stack */}
        <Section title="Tech Stack" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default" className="hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-bunting mb-2">Frontend Framework</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Built with <strong>Next.js 15</strong> (App Router) and <strong>React 19</strong>
                  </p>
                  <p className="text-gray-600 text-sm">
                    TypeScript for type safety, Tailwind CSS for styling
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="default" className="hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-bunting mb-2">UI/UX Design</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Custom component library with <strong>Tailwind CSS</strong>
                  </p>
                  <p className="text-gray-600 text-sm">
                    Responsive design, smooth animations, and accessibility
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="default" className="hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-chill/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-blue-chill" />
                </div>
                <div>
                  <h3 className="font-bold text-bunting mb-2">State Management</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    React Context API for global state
                  </p>
                  <p className="text-gray-600 text-sm">
                    Mock data layer simulating backend APIs
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="default" className="hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-bunting/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-bunting" />
                </div>
                <div>
                  <h3 className="font-bold text-bunting mb-2">Special Features</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Canvas-based ASCII animations (like our friend above!)
                  </p>
                  <p className="text-gray-600 text-sm">
                    Interactive data visualizations and charts
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* Features */}
        <Section title="Key Features" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="gradient">
              <h3 className="font-bold text-white mb-3 text-lg">Discover</h3>
              <p className="text-white/90 text-sm">
                Browse curated articles from premium publishers. Filter by topic, 
                publisher, and save favorites.
              </p>
            </Card>

            <Card variant="default" className="border-2 border-primary">
              <h3 className="font-bold text-bunting mb-3 text-lg">Library</h3>
              <p className="text-gray-700 text-sm">
                Access all unlocked articles in your personal library. 
                Organized and always available.
              </p>
            </Card>

            <Card variant="default" className="border-2 border-accent">
              <h3 className="font-bold text-bunting mb-3 text-lg">Analytics</h3>
              <p className="text-gray-700 text-sm">
                Track reading habits, spending patterns, and discover insights 
                about your journalism consumption.
              </p>
            </Card>
          </div>
        </Section>

        {/* Why Pufferfish? */}
        <Section title="Why a Pufferfish? 🐡">
          <Card variant="default" className="bg-blue-50">
            <p className="text-gray-700 text-center text-lg">
              Just like a pufferfish adapts to its environment by puffing up, 
              this demo showcases the flexibility and creativity possible with modern web technologies. 
              Plus, ASCII art animations are just plain fun! 
            </p>
            <p className="text-gray-600 text-center mt-4 text-sm italic">
              Inspired by the beautiful animations at{' '}
              <a href="https://cline.bot" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                cline.bot
              </a>
            </p>
          </Card>
        </Section>
      </PageContainer>
    </AppShell>
  );
}
