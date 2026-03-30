import type { StockStatus } from '../utils/stockStatus';

interface StockStatusBarProps {
  stockStatus: StockStatus;
}

export function StockStatusBar({ stockStatus }: StockStatusBarProps) {
  return (
    <div
      data-testid="stock-status-bar"
      style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}
    >
      <button
        type="button"
        style={{
          borderRadius: 9999,
          padding: '6px 16px',
          fontSize: 14,
          fontWeight: 700,
          border: stockStatus === 'in-stock' ? 'none' : '1px solid var(--color-border)',
          background: stockStatus === 'in-stock' ? '#22c55e' : 'var(--color-gray-100)',
          color: stockStatus === 'in-stock' ? '#fff' : 'var(--color-text-muted)',
        }}
      >
        In stock
      </button>
      <button
        type="button"
        style={{
          borderRadius: 9999,
          padding: '6px 16px',
          fontSize: 14,
          fontWeight: 700,
          border: stockStatus === 'out-of-stock' ? 'none' : '1px solid var(--color-border)',
          background: stockStatus === 'out-of-stock' ? '#ef4444' : 'var(--color-gray-100)',
          color: stockStatus === 'out-of-stock' ? '#fff' : 'var(--color-text-muted)',
        }}
      >
        Out of stock
      </button>
      <button
        type="button"
        style={{
          borderRadius: 9999,
          padding: '6px 16px',
          fontSize: 14,
          fontWeight: 700,
          background: 'var(--color-primary)',
          color: '#fff',
        }}
      >
        Live Stock
      </button>
    </div>
  );
}
