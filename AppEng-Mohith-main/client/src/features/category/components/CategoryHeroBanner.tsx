import laptopIcon from '@/assets/icons/laptop.svg';
import shieldCheckIcon from '@/assets/icons/shield-check.svg';
import truckIcon from '@/assets/icons/truck.svg';
import supportIcon from '@/assets/icons/contact-support.svg';

interface CategoryHeroBannerProps {
  categoryName: string;
  subcategoryName?: string;
  productCount?: number;
}

export function CategoryHeroBanner({
  categoryName,
  subcategoryName,
  productCount,
}: CategoryHeroBannerProps) {
  return (
    <section
      data-testid="category-hero-banner"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[#8b5cf6] p-6 text-[var(--color-white)] lg:p-8"
    >
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_200px]">
        <div className="space-y-3">
          <p className="text-xs text-[var(--color-gray-100)]">
            Home &gt; {categoryName}
            {subcategoryName ? ` > ${subcategoryName}` : ''}
          </p>
          <h1 className="text-3xl font-bold">Explore {categoryName}</h1>
          <p className="max-w-2xl text-sm text-[var(--color-gray-100)] lg:text-base">
            Discover the latest tech gadgets, from cutting-edge laptops to smart wearables. Find
            everything you need to stay connected.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-[var(--color-gray-100)] lg:text-sm">
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <img src={shieldCheckIcon} alt="products" className="h-4 w-4 shrink-0" />
              1.7M+ Products
            </span>
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <img src={truckIcon} alt="shipping" className="h-4 w-4 shrink-0" />
              Free Shipping
            </span>
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <img src={supportIcon} alt="support" className="h-4 w-4 shrink-0" />
              24/7 Support
            </span>
            {productCount !== undefined ? <span>{productCount} items</span> : null}
          </div>
        </div>

        <div className="pointer-events-none relative flex items-center justify-center">
          <div className="absolute h-40 w-40 rounded-full border border-[var(--color-gray-100)]/30" />
          <img src={laptopIcon} alt="laptop" className="h-24 w-24 opacity-90" />
        </div>
      </div>
    </section>
  );
}
