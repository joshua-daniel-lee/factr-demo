import AppShell from "@/components/AppShell";
import Card from "@/components/Card";
import { Compass } from "lucide-react";

export default function DiscoverPage() {
  return (
    <AppShell title="Discover">
      <div className="p-6 md:p-8">
        <Card variant="default">
          <div className="text-center py-16">
            <Compass className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-bunting mb-2 font-newsreader">
              Article Discovery
            </h2>
            <p className="text-gray-600">
              Browse and discover premium journalism from top publishers
            </p>
            <p className="text-sm text-gray-500 mt-4">
              This page will be implemented in Phase 4
            </p>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
