import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Button from "@/components/Button";

export default function SignOut() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      {/* Auth Card */}
      <div className="w-full max-w-md">
        <div className="glass shadow-elevated p-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="FactrAI Logo"
                width={100}
                height={100}
                className="rounded-2xl"
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-bunting font-newsreader mb-4">
              You've been signed out
            </h1>
            <p className="text-sm text-gray-600">
              Your session has ended securely
            </p>
          </div>

          {/* Status List */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-bunting">Session ended</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-bunting">Data secured</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-bunting">Credits preserved</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/sign-in" className="block">
              <Button variant="primary" className="w-full">
                Sign In Again
              </Button>
            </Link>

            <Link href="/" className="block">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>

          {/* FedCM Badge */}
          <div className="mt-8 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Powered by FedCM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
