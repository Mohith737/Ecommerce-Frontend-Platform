import { Button } from '@/design-system/ui/atoms';

export function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--color-gray-50)' }}
    >
      <div className="text-center">
        <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)' }}>
          404 — Page Not Found
        </h1>
        <Button className="mt-4" onClick={() => (window.location.hash = '#/home')}>
          Go Home
        </Button>
      </div>
    </div>
  );
}
