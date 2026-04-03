import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export default function PageContainer({
  children,
  maxWidth = 'xl',
  className = '',
}: PageContainerProps) {
  // Max width classes
  const maxWidthClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={`
        mx-auto w-full px-6 md:px-8 py-6 md:py-8
        ${maxWidthClasses[maxWidth]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
