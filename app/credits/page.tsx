import AppShell from "@/components/AppShell";
import Card from "@/components/Card";
import { Wallet } from "lucide-react";

export default function CreditsPage() {
  return (
    <AppShell title="Credits">
      <div className="p-6 md:p-8">
        <Card variant="default">
          <div className="text-center py-16">
            <Wallet className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-bunting mb-2 font-newsreader">
              Credit Management
            </h2>
            <p className="text-gray-600">
              View balance, transaction history, and purchase credits
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
