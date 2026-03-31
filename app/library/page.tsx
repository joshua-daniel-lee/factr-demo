import AppShell from "@/components/AppShell";
import Card from "@/components/Card";
import { BookOpen } from "lucide-react";

export default function LibraryPage() {
  return (
    <AppShell title="Library">
      <div className="p-6 md:p-8">
        <Card variant="default">
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-bunting mb-2 font-newsreader">
              My Library
            </h2>
            <p className="text-gray-600">
              Access all your unlocked articles and reading history
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
