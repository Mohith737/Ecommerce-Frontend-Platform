import { Button } from '@/design-system/ui/atoms';
import { useCompareStore } from '@/stores/compareStore';
import { navigate } from '@/utils/navigate';

export function CompareBar() {
  const { items, removeFromCompare } = useCompareStore();
  if (items.length === 0) return null;

  return (
    <div
      data-testid="compare-bar"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-border)] bg-[var(--color-white)] shadow-xl"
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-4 px-4 py-3">
        <div>
          <p className="text-sm font-bold text-[var(--color-text-primary)]">
            Compare Laptops ({items.length}/3)
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">Side-by-side comparison</p>
        </div>

        <div className="flex flex-1 items-center gap-2">
          {items.map(item => (
            <div key={item.id} className="relative">
              <img
                src={item.image_url}
                alt={item.name}
                className="h-12 w-12 rounded-md object-cover"
              />
              <button
                type="button"
                onClick={() => removeFromCompare(item.id)}
                className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[var(--color-gray-900)] text-[10px] text-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <Button data-testid="compare-now-btn" type="button" onClick={() => navigate('/compare')}>
          Compare Now
        </Button>
      </div>
    </div>
  );
}
