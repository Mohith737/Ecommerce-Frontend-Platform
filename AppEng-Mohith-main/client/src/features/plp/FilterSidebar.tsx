import { useState } from 'react';

export interface ActiveFilters {
  brands: string[];
  ram: string[];
  storage: string[];
  processors: string[];
  priceRange: [number, number];
}

interface FilterSidebarProps {
  filters: ActiveFilters;
  onFilterChange: (filters: ActiveFilters) => void;
  priceRange?: [number, number];
  maxPrice: number;
}

const BRANDS = [
  { name: 'Dell', count: 124 },
  { name: 'HP', count: 102 },
  { name: 'Lenovo', count: 106 },
  { name: 'Apple', count: 105 },
  { name: 'ASUS', count: 104 },
];
const RAM = ['8GB', '16GB', '32GB', '64GB'];
const STORAGE = ['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD'];
const PROCESSORS = [
  'Intel Core i5',
  'Intel Core i7',
  'Intel Core i9',
  'AMD Ryzen 5',
  'AMD Ryzen 7',
];
const CATEGORY_BLOCK = [
  { name: 'Electronics', children: ['Laptop', 'Tab', 'Phone'] },
  { name: 'Furniture', children: [] },
  { name: 'Home Essentials', children: [] },
  { name: 'Travel Essentials', children: [] },
  { name: 'Accessories', children: [] },
];

function toggle(list: string[], item: string) {
  return list.includes(item) ? list.filter(entry => entry !== item) : [...list, item];
}

function SectionHeader({
  title,
  expanded,
  onClick,
}: {
  title: string;
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 'var(--space-2) 0',
        background: 'none',
        border: 'none',
        borderBottom: '1px solid var(--color-border)',
        cursor: 'pointer',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--font-semibold)',
        color: 'var(--color-text-primary)',
        marginBottom: 'var(--space-3)',
      }}
    >
      {title}
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
    </button>
  );
}

export function FilterSidebar({ filters, onFilterChange, maxPrice }: FilterSidebarProps) {
  const [expanded, setExpanded] = useState({
    categories: true,
    brand: true,
    ram: true,
    storage: true,
    processor: true,
    price: true,
  });

  const clearAll = () => {
    onFilterChange({ brands: [], ram: [], storage: [], processors: [], priceRange: [0, maxPrice] });
  };

  return (
    <div data-testid="filter-sidebar">
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <p
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-2)',
          }}
        >
          Categories
        </p>
        {CATEGORY_BLOCK.map((category, index) => {
          const isElectronics = index === 0;
          const rowOpen = isElectronics ? expanded.categories : false;
          return (
            <div key={category.name}>
              <button
                type="button"
                onClick={() => {
                  if (isElectronics) {
                    setExpanded(prev => ({ ...prev, categories: !prev.categories }));
                  }
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--space-2) var(--space-2)',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: isElectronics ? 'var(--color-primary-light)' : 'transparent',
                  color: isElectronics ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: isElectronics ? 'var(--font-semibold)' : 'var(--font-normal)',
                  cursor: isElectronics ? 'pointer' : 'default',
                  textAlign: 'left',
                }}
              >
                <span>{category.name}</span>
                {category.children.length ? <span>{rowOpen ? '▾' : '▸'}</span> : null}
              </button>
              {rowOpen && category.children.length ? (
                <div style={{ paddingLeft: 'var(--space-3)', paddingBottom: 'var(--space-1)' }}>
                  {category.children.map(child => (
                    <p
                      key={child}
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-secondary)',
                        padding: 'var(--space-1) var(--space-2)',
                      }}
                    >
                      {child}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-4)',
        }}
      >
        <h3
          style={{
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          FILTERS
        </h3>
        <button
          onClick={clearAll}
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-primary)',
            fontWeight: 'var(--font-semibold)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Clear All
        </button>
      </div>

      <SectionHeader
        title="Brand"
        expanded={expanded.brand}
        onClick={() => setExpanded(prev => ({ ...prev, brand: !prev.brand }))}
      />
      {expanded.brand &&
        BRANDS.map(brand => (
          <label
            key={brand.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--space-1) 0',
              cursor: 'pointer',
              fontSize: 'var(--text-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <input
                type="checkbox"
                checked={filters.brands.includes(brand.name)}
                onChange={() =>
                  onFilterChange({
                    ...filters,
                    brands: toggle(filters.brands, brand.name),
                  })
                }
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: 'var(--color-primary)',
                  cursor: 'pointer',
                }}
              />
              {brand.name}
            </div>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              {brand.count}
            </span>
          </label>
        ))}

      <SectionHeader
        title="RAM"
        expanded={expanded.ram}
        onClick={() => setExpanded(prev => ({ ...prev, ram: !prev.ram }))}
      />
      {expanded.ram &&
        RAM.map(item => (
          <label
            key={item}
            style={{ display: 'block', padding: 'var(--space-1) 0', cursor: 'pointer' }}
          >
            <input
              type="checkbox"
              checked={filters.ram.includes(item)}
              onChange={() => onFilterChange({ ...filters, ram: toggle(filters.ram, item) })}
              style={{ marginRight: 'var(--space-2)', accentColor: 'var(--color-primary)' }}
            />
            {item}
          </label>
        ))}

      <SectionHeader
        title="Storage"
        expanded={expanded.storage}
        onClick={() => setExpanded(prev => ({ ...prev, storage: !prev.storage }))}
      />
      {expanded.storage &&
        STORAGE.map(item => (
          <label
            key={item}
            style={{ display: 'block', padding: 'var(--space-1) 0', cursor: 'pointer' }}
          >
            <input
              type="checkbox"
              checked={filters.storage.includes(item)}
              onChange={() =>
                onFilterChange({ ...filters, storage: toggle(filters.storage, item) })
              }
              style={{ marginRight: 'var(--space-2)', accentColor: 'var(--color-primary)' }}
            />
            {item}
          </label>
        ))}

      <SectionHeader
        title="Processor"
        expanded={expanded.processor}
        onClick={() => setExpanded(prev => ({ ...prev, processor: !prev.processor }))}
      />
      {expanded.processor &&
        PROCESSORS.map(item => (
          <label
            key={item}
            style={{ display: 'block', padding: 'var(--space-1) 0', cursor: 'pointer' }}
          >
            <input
              type="checkbox"
              checked={filters.processors.includes(item)}
              onChange={() =>
                onFilterChange({
                  ...filters,
                  processors: toggle(filters.processors, item),
                })
              }
              style={{ marginRight: 'var(--space-2)', accentColor: 'var(--color-primary)' }}
            />
            {item}
          </label>
        ))}

      <SectionHeader
        title="Price Range"
        expanded={expanded.price}
        onClick={() => setExpanded(prev => ({ ...prev, price: !prev.price }))}
      />
      {expanded.price ? (
        <div>
          <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
            ${filters.priceRange[0]} — ${filters.priceRange[1]}
          </p>
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={filters.priceRange[0]}
            onChange={e =>
              onFilterChange({
                ...filters,
                priceRange: [Number(e.target.value), filters.priceRange[1]],
              })
            }
            style={{ width: '100%' }}
          />
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={filters.priceRange[1]}
            onChange={e =>
              onFilterChange({
                ...filters,
                priceRange: [filters.priceRange[0], Number(e.target.value)],
              })
            }
            style={{ width: '100%' }}
          />
        </div>
      ) : null}
    </div>
  );
}
