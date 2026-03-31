import React from 'react';
import Link from 'next/link';

interface SectionProps {
  title?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  children: React.ReactNode;
  variant?: 'card' | 'flat';
  className?: string;
}

export default function Section({
  title,
  action,
  children,
  variant = 'flat',
  className = '',
}: SectionProps) {
  return (
    <section className={`${className}`}>
      {/* Section Header */}
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h2 className="text-xl md:text-2xl font-bold text-bunting font-newsreader">
              {title}
            </h2>
          )}
          {action && (
            <>
              {action.href ? (
                <Link
                  href={action.href}
                  className="text-sm font-medium text-primary hover:text-blue-chill transition-colors"
                >
                  {action.label}
                </Link>
              ) : (
                <button
                  onClick={action.onClick}
                  className="text-sm font-medium text-primary hover:text-blue-chill transition-colors"
                >
                  {action.label}
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* Section Content */}
      <div
        className={
          variant === 'card'
            ? 'bg-white rounded-2xl shadow-sm border border-gray-100 p-6'
            : ''
        }
      >
        {children}
      </div>
    </section>
  );
}
