'use client';

import React from 'react';
import Image from 'next/image';
import { Coins, Menu, X } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import UserMenu from './UserMenu';

interface HeaderProps {
  title: string;
  showLogo?: boolean;
  onMenuClick?: () => void;
  sidebarOpen?: boolean;
}

export default function Header({ title, showLogo = false, onMenuClick, sidebarOpen = false }: HeaderProps) {
  const { user } = useApp();
  return (
    <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="h-full px-6 flex items-center justify-between relative">
        {/* Left: Menu Button + Logo (mobile) */}
        <div className="flex items-center gap-4">
          {/* Menu Toggle Button */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          )}
          
          {showLogo && (
            <div className="md:hidden">
              <Image
                src="/logo.png"
                alt="FactrAI Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Center: Title */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-xl md:text-2xl font-bold text-bunting font-newsreader whitespace-nowrap">
            {title}
          </h1>
        </div>

        {/* Right: Credit Badge + User Menu */}
        <div className="flex items-center gap-4">
          {/* Credit Balance Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-blue-chill/10 rounded-full">
            <Coins className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-bunting">
              {user.credits.remaining}
            </span>
          </div>

          {/* User Menu */}
          <UserMenu user={{
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            credits: user.credits.remaining
          }} />
        </div>
      </div>
    </header>
  );
}
