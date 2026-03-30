import arrowRightIcon from '@/assets/icons/arrow-right.svg';

interface SubCategoryGridProps {
  subcategories: Array<{ id: number; name: string; itemCount: number; imageUrl: string }>;
  categoryName: string;
  onSubcategoryClick: (subcategoryId: number) => void;
}

export function SubCategoryGrid({
  subcategories,
  categoryName,
  onSubcategoryClick,
}: SubCategoryGridProps) {
  return (
    <section className="space-y-3" data-testid="subcategory-grid">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
          Explore by sub category
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 border-0 bg-transparent p-0 text-sm font-semibold text-[var(--color-primary)]"
        >
          View All {categoryName}
          <img src={arrowRightIcon} alt="arrow" className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {subcategories.map(subcategory => (
          <button
            key={subcategory.id}
            type="button"
            data-testid="subcategory-tile"
            onClick={() => onSubcategoryClick(subcategory.id)}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] p-2 text-left transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <img
              src={subcategory.imageUrl}
              alt={subcategory.name}
              className="aspect-square w-full rounded-lg object-cover"
            />
            <p className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">
              {subcategory.name}
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">{subcategory.itemCount} items</p>
          </button>
        ))}
      </div>
    </section>
  );
}
