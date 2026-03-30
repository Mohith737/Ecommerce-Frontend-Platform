import alertCircleIconUrl from '@/assets/icons/alert-circle.svg';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullPage?: boolean;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'Something went wrong. Please try again.',
  onRetry,
  fullPage = false,
}: ErrorStateProps) {
  const content = (
    <div
      data-testid="error-state"
      className="max-w-sm rounded-2xl border border-[var(--color-border)] bg-white p-10 text-center shadow-sm"
    >
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <img src={alertCircleIconUrl} alt="Error" className="h-8 w-8 text-red-600" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">{title}</h3>
      <p className="mb-6 text-sm text-[var(--color-text-muted)]">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-white"
        >
          Try Again
        </button>
      ) : null}
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-gray-50)]">
        {content}
      </div>
    );
  }

  return content;
}
