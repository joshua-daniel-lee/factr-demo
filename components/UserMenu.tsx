'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Settings, HelpCircle, LogOut, Wallet } from 'lucide-react';
import Avatar from './Avatar';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    credits: number;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar name={user.name} alt={user.name} src={user.avatar} size="md" />
        
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-bunting">{user.name}</div>
          <div className="text-xs text-gray-500">{user.credits} credits</div>
        </div>
        
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-elevated border border-gray-100 py-2 z-50"
          role="menu"
        >
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Avatar name={user.name} alt={user.name} src={user.avatar} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-bunting truncate">
                  {user.name}
                </div>
                <div className="text-xs text-gray-500 truncate">{user.email}</div>
              </div>
            </div>
          </div>

          {/* Credit Balance */}
          <div className="px-4 py-3 bg-gradient-to-br from-primary/10 to-blue-chill/10 mx-2 my-2 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-1">Credit Balance</div>
                <div className="text-2xl font-bold text-bunting">{user.credits}</div>
              </div>
              <Wallet className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href="/credits"
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <Wallet className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-bunting">Credit History</span>
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-bunting">Settings</span>
            </Link>

            <Link
              href="/help"
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <HelpCircle className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-bunting">Help & Support</span>
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 mt-1 pt-1">
            <Link
              href="/sign-out"
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-red-600"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
