/* eslint-disable react-refresh/only-export-components */
import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  variant?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
  size?: 'sm' | 'md';
}

const colors = {
  blue: { bg: '#dbeafe', fg: '#1d4ed8' },
  green: { bg: '#dcfce7', fg: '#16a34a' },
  yellow: { bg: '#fef3c7', fg: '#d97706' },
  red: { bg: '#fee2e2', fg: '#dc2626' },
  purple: { bg: '#f5f3ff', fg: '#7c3aed' },
  gray: { bg: 'var(--color-gray-100)', fg: 'var(--color-gray-600)' },
} as const;

export function badgeVariantFromLabel(label: string): NonNullable<BadgeProps['variant']> {
  if (label === 'Best Seller') return 'blue';
  if (label === 'New') return 'green';
  if (label === 'Top Rated') return 'yellow';
  if (label === 'Limited' || label === 'Sale') return 'red';
  return 'gray';
}

export function Badge({ label, variant = 'gray', size = 'sm', ...rest }: BadgeProps) {
  const tone = colors[variant];
  return (
    <span
      {...rest}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 'var(--radius-full)',
        padding: size === 'sm' ? '2px var(--space-2)' : '4px var(--space-3)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--font-bold)',
        background: tone.bg,
        color: tone.fg,
      }}
    >
      {label}
    </span>
  );
}
