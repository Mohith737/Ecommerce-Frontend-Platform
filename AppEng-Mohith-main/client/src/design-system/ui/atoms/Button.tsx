import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, CSSProperties> = {
  primary: { background: 'var(--color-primary)', color: 'var(--color-text-inverse)' },
  secondary: { background: 'var(--color-gray-800)', color: 'var(--color-text-inverse)' },
  outline: {
    background: 'transparent',
    color: 'var(--color-primary)',
    border: '1.5px solid var(--color-primary)',
  },
  ghost: { background: 'transparent', color: 'var(--color-gray-700)' },
  danger: { background: 'var(--color-error)', color: 'var(--color-text-inverse)' },
  error: { background: 'var(--color-error)', color: 'var(--color-text-inverse)' },
  success: { background: 'var(--color-success)', color: 'var(--color-text-inverse)' },
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, CSSProperties> = {
  sm: { minHeight: '36px', padding: '0 var(--space-3)' },
  md: { minHeight: '44px', padding: '0 var(--space-4)' },
  lg: { minHeight: '52px', padding: '0 var(--space-5)' },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...rest}
      disabled={isDisabled}
      style={{
        borderRadius: 'var(--radius-md)',
        border:
          variant === 'outline' ? '1.5px solid var(--color-primary)' : '1px solid transparent',
        fontWeight: 'var(--font-semibold)',
        transition: 'all var(--duration-base) var(--ease-default)',
        width: fullWidth ? '100%' : undefined,
        opacity: isDisabled ? 0.55 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      onMouseEnter={e => {
        if (isDisabled) return;
        if (variant === 'primary') e.currentTarget.style.background = 'var(--color-primary-hover)';
        if (variant === 'outline') e.currentTarget.style.background = 'var(--color-primary-light)';
        if (variant === 'ghost') e.currentTarget.style.background = 'var(--color-gray-100)';
      }}
      onMouseLeave={e => {
        if (variant === 'primary') e.currentTarget.style.background = 'var(--color-primary)';
        if (variant === 'outline') e.currentTarget.style.background = 'transparent';
        if (variant === 'ghost') e.currentTarget.style.background = 'transparent';
      }}
    >
      {loading ? (
        <Spinner size={16} color="var(--color-text-inverse)" />
      ) : (
        <>
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </>
      )}
    </button>
  );
}
