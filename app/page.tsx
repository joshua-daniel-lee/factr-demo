import AppShell from "@/components/AppShell";
import Card from "@/components/Card";
import { Sparkles, TrendingUp, Clock, DollarSign } from "lucide-react";

export default function Home() {
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
            <h2 className="text-3xl font-bold mb-2 font-newsreader">Sarah Chen</h2>
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
                <div className="text-2xl font-bold text-bunting">24</div>
                <div className="text-xs text-green-600 mt-1">+12% this month</div>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card variant="default" className="hover-lift">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Credits Spent</div>
                <div className="text-2xl font-bold text-bunting">33</div>
                <div className="text-xs text-gray-500 mt-1">of 100 total</div>
              </div>
              <DollarSign className="w-8 h-8 text-accent" />
            </div>
          </Card>

          <Card variant="default" className="hover-lift">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Reading Time</div>
                <div className="text-2xl font-bold text-bunting">3.2h</div>
                <div className="text-xs text-gray-500 mt-1">this week</div>
              </div>
              <Clock className="w-8 h-8 text-blue-chill" />
            </div>
          </Card>

          <Card variant="default" className="hover-lift">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Saved</div>
                <div className="text-2xl font-bold text-bunting">$127</div>
                <div className="text-xs text-green-600 mt-1">vs subscriptions</div>
              </div>
              <Sparkles className="w-8 h-8 text-bunting" />
            </div>
          </Card>
        </div>

        {/* Recent Activity Placeholder */}
        <Card variant="default">
          <h3 className="text-xl font-bold text-bunting mb-4 font-newsreader">
            Recent Activity
          </h3>
          <div className="text-center py-12 text-gray-500">
            <p className="mb-2">Your unlocked articles will appear here</p>
            <p className="text-sm">Start exploring to see your reading history</p>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
