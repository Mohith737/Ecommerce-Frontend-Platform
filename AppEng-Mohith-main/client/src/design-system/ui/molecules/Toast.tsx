/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { Button } from '../atoms';

export interface ToastProps {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'error' | 'warning';
  action?: { label: string; onClick: () => void };
  duration?: number;
}

interface ToastContextType {
  showToast: (props: Omit<ToastProps, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

function accentByType(type: NonNullable<ToastProps['type']>): string {
  if (type === 'success') return 'var(--color-success)';
  if (type === 'error') return 'var(--color-error)';
  if (type === 'warning') return 'var(--color-warning)';
  return 'var(--color-primary)';
}

function ToastItem({ toast, onDismiss }: { toast: ToastProps; onDismiss: (id: string) => void }) {
  const type = toast.type ?? 'info';
  return (
    <div
      style={{
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-xl)',
        borderLeft: `4px solid ${accentByType(type)}`,
        padding: 'var(--space-4)',
        minWidth: '320px',
        animation: 'toastSlide var(--duration-base) var(--ease-default)',
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex items-center justify-center"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-gray-100)',
          }}
        >
          {type === 'success' ? '✓' : type === 'error' ? '!' : type === 'warning' ? '!' : 'i'}
        </div>
        <div className="flex-1">
          <p>{toast.message}</p>
          {toast.action ? (
            <button
              className="mt-2"
              style={{ color: 'var(--color-primary)', fontWeight: 'var(--font-semibold)' }}
              onClick={toast.action.onClick}
            >
              {toast.action.label}
            </button>
          ) : null}
        </div>
        <button onClick={() => onDismiss(toast.id)} aria-label="Dismiss toast">
          ✕
        </button>
      </div>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (props: Omit<ToastProps, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const next: ToastProps = { id, duration: 5000, type: 'info', ...props };
      setToasts(prev => [...prev, next]);
      if ((next.duration ?? 0) > 0) {
        window.setTimeout(() => dismissToast(id), next.duration);
      }
    },
    [dismissToast]
  );

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed flex flex-col"
        style={{
          top: 'calc(var(--navbar-height) + var(--space-4))',
          right: 'var(--space-6)',
          gap: 'var(--space-3)',
          zIndex: 9999,
        }}
      >
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function Toast() {
  return <Button className="hidden">Toast Placeholder</Button>;
}
