'use client';

import React, { useState } from 'react';
import Navigation from './Navigation';
import Header from './Header';

interface AppShellProps {
  children: React.ReactNode;
  title: string;
}

export default function AppShell({ children, title }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-20 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-[280px]' : 'md:ml-0'}`}>
        {/* Header */}
        <Header 
          title={title} 
          showLogo={true}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        {/* Page Content */}
        <main className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-64px)] pb-[72px] md:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
