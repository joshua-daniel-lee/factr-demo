import React from 'react';

interface SkeletonProps {
  type?: 'text' | 'heading' | 'card' | 'avatar' | 'rectangle';
  width?: string;
  height?: string;
  className?: string;
}

export default function Skeleton({
  type = 'rectangle',
  width,
  height,
  className = '',
}: SkeletonProps) {
  // Base animation class
  const baseClass = 'animate-pulse bg-gray-200';

  // Type-specific classes
  const typeClasses = {
    text: 'h-4 w-full rounded',
    heading: 'h-8 w-3/4 rounded',
    card: 'h-48 w-full rounded-xl',
    avatar: 'w-10 h-10 rounded-full',
    rectangle: 'w-full h-full rounded-lg',
  };

  // Custom dimensions override type defaults
  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={`${baseClass} ${typeClasses[type]} ${className}`}
      style={style}
      aria-label="Loading placeholder"
    />
  );
}

// Convenience components for common patterns
export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          type="text"
          width={i === lines - 1 ? '75%' : '100%'}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`border border-gray-100 rounded-xl p-6 ${className}`}>
      <Skeleton type="avatar" className="mb-4" />
      <Skeleton type="heading" className="mb-2" />
      <SkeletonText lines={2} />
    </div>
  );
}
