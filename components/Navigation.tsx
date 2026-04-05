'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Home, Compass, BookOpen, BarChart3, Wallet, Zap } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Discover', href: '/discover', icon: Compass },
  { label: 'Library', href: '/library', icon: BookOpen },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Credits', href: '/credits', icon: Wallet },
  { label: 'How It Works', href: '/how-it-works', icon: Zap },
];

export default function Navigation({ isOpen = false, onClose }: NavigationProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Sidebar (Mobile & Desktop) */}
      <nav className={`
        flex fixed left-0 top-0 h-full w-[280px] bg-white border-r border-gray-200 flex-col z-30
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="FactrAI Logo"
              width={48}
              height={48}
              className="rounded-xl group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="text-xl font-bold text-bunting font-newsreader">
                FactrAI
              </div>
              <div className="text-xs text-gray-500">Your Universal Key</div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-200
                  ${
                    active
                      ? 'bg-gradient-to-r from-primary to-blue-chill text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            © 2026 FactrAI
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-white/95 backdrop-blur-xl border-t border-gray-200 z-40">
        <div className="h-full px-2 flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl
                  transition-all duration-200 min-w-[60px]
                  ${active ? 'text-primary' : 'text-gray-500'}
                `}
              >
                <div
                  className={`
                    p-2 rounded-xl transition-all
                    ${active ? 'bg-primary/10' : ''}
                  `}
                >
                  <Icon className={`w-5 h-5 ${active ? 'scale-110' : ''}`} />
                </div>
                <span
                  className={`
                    text-xs font-medium
                    ${active ? 'opacity-100' : 'opacity-0'}
                    transition-opacity
                  `}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
