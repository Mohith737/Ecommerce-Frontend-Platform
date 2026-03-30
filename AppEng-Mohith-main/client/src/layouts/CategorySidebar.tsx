import { useEffect, useMemo, useState } from 'react';
import { getCategories, getSubcategories } from '@/api-sdk';

interface CategorySidebarProps {
  onCategorySelect: (categoryId: number, subcategoryId?: number) => void;
  activeCategoryId?: number;
  activeSubcategoryId?: number;
}

interface SidebarCategory {
  id: number;
  name: string;
  icon: string;
  subcategories: Array<{ id: number; name: string }>;
}

const CATEGORY_ICONS: Record<string, string> = {
  electronics: '⚡',
  furniture: '🛋️',
  'home essentials': '🏠',
  'travel essentials': '🎒',
  accessories: '🔧',
};

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{
        transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
        transition: 'transform 0.2s ease',
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function CategorySidebar({
  onCategorySelect,
  activeCategoryId,
  activeSubcategoryId,
}: CategorySidebarProps) {
  const [categories, setCategories] = useState<SidebarCategory[]>([]);
  const [expandedId, setExpandedId] = useState<number>(0);

  useEffect(() => {
    const run = async () => {
      try {
        const [apiCategories, apiSubcategories] = await Promise.all([
          getCategories(),
          getSubcategories(),
        ]);
        if (!apiCategories.length) {
          setCategories([]);
          return;
        }

        const subByCategory = new Map<number, Array<{ id: number; name: string }>>();
        apiSubcategories.forEach(sub => {
          const next = subByCategory.get(sub.category_id) ?? [];
          next.push({ id: sub.id, name: sub.name });
          subByCategory.set(sub.category_id, next);
        });

        const merged = apiCategories.map(category => ({
          id: category.id,
          name: category.name,
          icon: CATEGORY_ICONS[category.name.toLowerCase()] ?? '•',
          subcategories: subByCategory.get(category.id) ?? [],
        }));
        setCategories(merged);
        setExpandedId(prev => (prev === 0 ? (merged[0]?.id ?? 0) : prev));
      } catch {
        setCategories([]);
      }
    };

    void run();
  }, []);

  const content = useMemo(
    () =>
      categories.map(category => {
        const firstCategoryId = categories[0]?.id ?? 0;
        const isActive = category.id === (activeCategoryId ?? firstCategoryId);
        const isExpanded = expandedId === category.id;

        return (
          <div key={category.id}>
            <div
              onClick={() => {
                setExpandedId(prev => (prev === category.id ? 0 : category.id));
                onCategorySelect(category.id);
              }}
              className={`flex cursor-pointer items-center gap-3 px-4 py-2 transition-colors ${
                isActive
                  ? 'border-r-[3px] border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)]'
                  : 'border-r-[3px] border-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-primary-50)]'
              }`}
            >
              <span className="text-base">{category.icon}</span>
              <span className={`flex-1 text-sm ${isActive ? 'font-semibold' : 'font-normal'}`}>
                {category.name}
              </span>
              {category.subcategories.length > 0 ? <ChevronIcon expanded={isExpanded} /> : null}
            </div>

            {isExpanded && category.subcategories.length > 0
              ? category.subcategories.map(sub => {
                  const isActiveSub = sub.id === (activeSubcategoryId ?? -1);
                  return (
                    <div
                      key={`${category.id}-${sub}`}
                      onClick={() => onCategorySelect(category.id, sub.id)}
                      className={`cursor-pointer py-1 pl-11 text-sm ${
                        isActiveSub
                          ? 'bg-[var(--color-primary-50)] text-[var(--color-primary)]'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-50)]'
                      }`}
                    >
                      {sub.name}
                    </div>
                  );
                })
              : null}
          </div>
        );
      }),
    [categories, expandedId, activeCategoryId, activeSubcategoryId, onCategorySelect]
  );

  return (
    <aside className="min-h-full w-[240px] min-w-[240px] border-r border-[var(--color-border)] bg-white py-4">
      <div className="mb-3 px-4">
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          Categories
        </span>
      </div>
      {content}
    </aside>
  );
}
