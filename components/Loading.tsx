import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'white' | 'dark';
  className?: string;
}

export default function Loading({
  size = 'md',
  variant = 'primary',
  className = '',
}: LoadingProps) {
  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  // Variant classes
  const variantClasses = {
    primary: 'border-primary/30 border-t-primary',
    white: 'border-white/30 border-t-white',
    dark: 'border-bunting/30 border-t-bunting',
  };

  return (
    <div
      className={`
        inline-block rounded-full animate-spin
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
