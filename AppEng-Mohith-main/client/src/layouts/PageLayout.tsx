import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

/**
 * Reusable page layout component
 * Provides consistent page structure with background, padding, and max-width container
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = '',
  containerClassName = '',
}) => {
  return (
    <div className={`bg-background text-text-primary min-h-screen p-8 ${className}`}>
      <div className={`max-w-6xl mx-auto space-y-8 ${containerClassName}`}>{children}</div>
    </div>
  );
};
