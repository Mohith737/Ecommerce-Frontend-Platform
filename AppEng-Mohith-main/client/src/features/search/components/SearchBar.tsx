import type { CSSProperties, FormEvent } from 'react';
import closeIcon from '@/assets/icons/close.svg';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  inputTestId?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  onFocus,
  onBlur,
  placeholder = 'Search products...',
  autoFocus,
  className,
  inputTestId = 'search-bar-input',
}: SearchBarProps) {
  const pillStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    height: '40px',
    borderRadius: '9999px',
    border: '1px solid var(--color-border)',
    background: 'var(--color-white)',
    padding: '0 12px',
  };

  const inputStyle: CSSProperties = {
    height: '100%',
    minWidth: 0,
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '14px',
    color: 'var(--color-text-primary)',
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={submit} className={className} style={{ width: '100%' }}>
      <div style={pillStyle}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0 text-[var(--color-text-muted)] opacity-70"
          aria-hidden="true"
          style={{ flexShrink: 0, color: 'var(--color-text-muted)', opacity: 0.75 }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          data-testid={inputTestId}
          value={value}
          onChange={event => onChange(event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          autoFocus={autoFocus}
          style={inputStyle}
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            style={{
              border: 'none',
              background: 'transparent',
              color: 'var(--color-text-muted)',
              display: 'inline-flex',
              borderRadius: '9999px',
              padding: '4px',
            }}
          >
            <img src={closeIcon} alt="clear" className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </form>
  );
}
