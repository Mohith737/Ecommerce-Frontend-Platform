import type { CSSProperties } from 'react';

interface SpinnerProps {
  size?: number;
  color?: string;
}

export function Spinner({ size = 24, color = 'var(--color-primary)' }: SpinnerProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    border: '3px solid var(--color-gray-200)',
    borderTopColor: color,
    borderRadius: 'var(--radius-full)',
    animation: 'spin 0.8s linear infinite',
  };

  return <div style={style} aria-label="loading" />;
}
