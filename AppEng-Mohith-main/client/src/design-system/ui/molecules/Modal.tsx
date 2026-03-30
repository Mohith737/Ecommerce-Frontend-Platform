import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  'data-testid'?: string;
}

const widthBySize = { sm: '400px', md: '560px', lg: '720px' } as const;

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  'data-testid': testId,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, a, input, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>('button, a, input');
    firstFocusable?.focus();
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        data-testid={testId}
        className="w-full"
        style={{
          maxWidth: widthBySize[size],
          background: 'var(--color-white)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          animation: 'scaleIn var(--duration-base) var(--ease-default)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {title ? (
          <header
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid var(--color-border)' }}
          >
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)' }}>
              {title}
            </h3>
            <button onClick={onClose} aria-label="Close modal">
              ✕
            </button>
          </header>
        ) : null}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
