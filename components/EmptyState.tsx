import React from 'react';
import Link from 'next/link';
import Button from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-12 px-6 ${className}`}>
      {/* Icon */}
      <div className="mb-4 text-gray-400">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-bunting mb-2 font-newsreader">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 max-w-md mb-6">
        {description}
      </p>

      {/* Optional Action */}
      {action && (
        <>
          {action.href ? (
            <Link href={action.href}>
              <Button variant="primary">
                {action.label}
              </Button>
            </Link>
          ) : (
            <Button variant="primary" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </>
      )}
    </div>
  );
}
