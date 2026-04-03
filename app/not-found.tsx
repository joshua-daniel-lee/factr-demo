import Link from 'next/link';
import Image from 'next/image';
import AppShell from '@/components/AppShell';
import Button from '@/components/Button';
import { SearchX, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <AppShell title="Page Not Found">
      <div className="min-h-[calc(100vh-64px-72px)] md:min-h-[calc(100vh-64px)] flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8 animate-[float_3s_ease-in-out_infinite]">
            <Image
              src="/logo.png"
              alt="FactrAI Logo"
              width={80}
              height={80}
              className="rounded-2xl shadow-lg"
            />
          </div>

          {/* Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-blue-chill/10">
              <SearchX className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* Error Code with Gradient */}
          <div className="text-8xl md:text-9xl font-bold mb-4 text-transparent bg-gradient-to-r from-primary via-accent via-blue-chill to-bunting bg-clip-text">
            404
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-bunting mb-4 font-newsreader">
            Page Not Found
          </h1>

          {/* Message */}
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            Looks like this page took an unexpected detour. The content you're looking for might have been moved or doesn't exist.
          </p>

          {/* Action Button */}
          <Link href="/">
            <Button variant="primary" className="w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2 inline" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
