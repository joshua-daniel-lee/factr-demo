'use client';

import AppShell from "@/components/AppShell";
import Card from "@/components/Card";
import { Sparkles, TrendingUp, Clock, DollarSign, BookOpen } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { getUnlockedArticles, getTotalCreditsSpent } from "@/lib/mockData";
import ArticleCard from "@/components/ArticleCard";

export default function Home() {
  const { user } = useApp();
  const unlockedArticles = getUnlockedArticles();
  const totalSpent = getTotalCreditsSpent();
  const recentArticles = unlockedArticles.slice(0, 3);

  // Calculate reading time (rough estimate: 8 min avg per article)
  const totalReadingTime = (unlockedArticles.length * 8) / 60;

  // Calculate savings (assuming $5 avg per article unlock)
  const savings = unlockedArticles.length * 5;

  return (
    <AppShell title="Dashboard">
      <div className="p-6 md:p-8 space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-primary via-blue-chill to-bunting rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Welcome back</span>
            </div>
            <h2 className="text-3xl font-bold mb-2 font-newsreader">{user.name}</h2>
            <p className="text-white/80">
              Your Universal Key is active. Continue exploring premium journalism.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="default" className="hover-lift">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Articles Unlocked</div>
                <div className="text-2xl font-bold text-bunting">{unlockedArticles.length}</div>
                <div className="text-xs text-gray-500 mt-1">All time</div>
              </div>
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card variant="default" className="hover-lift">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Credits Remaining</div>
                <div className="text-2xl font-bold text-bunting">{user.credits.remaining}</div>
                <div className="text-xs text-gray-500 mt-1">of {user.credits.total} total</div>
              </div>
              <DollarSign className="w-8 h-8 text-accent" />
            </div>
          </Card>

          <Card variant="default" className="hover-lift">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Reading Time</div>
                <div className="text-2xl font-bold text-bunting">{totalReadingTime.toFixed(1)}h</div>
                <div className="text-xs text-gray-500 mt-1">estimated</div>
              </div>
              <Clock className="w-8 h-8 text-blue-chill" />
            </div>
          </Card>

          <Card variant="default" className="hover-lift">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Saved</div>
                <div className="text-2xl font-bold text-bunting">${savings}</div>
                <div className="text-xs text-green-600 mt-1">vs subscriptions</div>
              </div>
              <Sparkles className="w-8 h-8 text-bunting" />
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-bunting font-newsreader">
              Recently Unlocked
            </h3>
            {unlockedArticles.length > 3 && (
              <a href="/library" className="text-sm font-medium text-primary hover:text-blue-chill">
                View all →
              </a>
            )}
          </div>
          
          {recentArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <Card variant="default">
              <div className="text-center py-12 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="mb-2">No articles unlocked yet</p>
                <p className="text-sm">Start exploring to see your reading history</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AppShell>
  );
}
