import { Button } from '@/design-system';
import type { ProductsListProps } from '../types';

/**
 * Presentational component for Products List
 * Displays products data as JSON
 */
export const ProductsList = ({ data, isLoading, error, onRefetch }: ProductsListProps) => {
  if (isLoading) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6">
        <p className="text-text-secondary">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-error">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6">
        <p className="text-text-secondary">No products data available</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Products Data</h2>
          <p className="text-sm text-text-tertiary">
            Total: {data.total} products | Showing: {data.items.length}
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={onRefetch} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Refetch'}
        </Button>
      </div>
      <pre className="bg-background border border-border rounded-lg p-4 overflow-x-auto text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};
