import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
}

export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightElement,
  style,
  ...rest
}: InputProps) {
  const { onBlur, onFocus, ...inputRest } = rest;
  const wrapperStyle: CSSProperties = {
    border: `1.5px solid ${error ? 'var(--color-error)' : 'var(--color-border)'}`,
    borderRadius: 'var(--radius-md)',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: leftIcon ? 'var(--space-3)' : 'var(--space-4)',
    paddingRight: 'var(--space-3)',
    gap: 'var(--space-2)',
    background: 'var(--color-surface)',
  };

  return (
    <div className="w-full">
      {label ? (
        <label
          className="block mb-1"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}
        >
          {label}
        </label>
      ) : null}
      <div style={wrapperStyle}>
        {leftIcon}
        <input
          {...inputRest}
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            background: 'transparent',
            ...style,
          }}
          onFocus={e => {
            onFocus?.(e);
            if (error) return;
            e.currentTarget.parentElement?.setAttribute(
              'style',
              `${e.currentTarget.parentElement.getAttribute('style')}; border: 1.5px solid var(--color-border-focus); box-shadow: 0 0 0 3px rgba(108,79,240,0.12);`
            );
          }}
          onBlur={e => {
            onBlur?.(e);
            if (error) return;
            e.currentTarget.parentElement?.setAttribute(
              'style',
              `${e.currentTarget.parentElement.getAttribute('style')}; border: 1.5px solid var(--color-border); box-shadow: none;`
            );
          }}
        />
        {rightElement}
      </div>
      {error ? (
        <p className="mt-1" style={{ color: 'var(--color-error)', fontSize: 'var(--text-xs)' }}>
          ⚠ {error}
        </p>
      ) : helperText ? (
        <p
          className="mt-1"
          style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
