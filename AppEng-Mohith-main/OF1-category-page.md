# PROMPT OF1 — Category Page (Browse → Category → Default)

## Build
- Route: `/#/category/:categoryId`
- Feature folder: `src/features/category/`
- Use TanStack Query hooks for category + category products
- Use SVG assets in `src/assets/icons/` (no inline SVG)
- Tailwind classes only (no inline styles)

## Required sections
1. Hero banner (`category-hero-banner`) with purple gradient and trust badges
2. Subcategory grid (`subcategory-grid`, tiles: `subcategory-tile`) with 5 tiles
3. Featured products section (`featured-products-section`) with 4 cards
4. Contact support banner (`contact-support-banner`) as dummy actions

## Required files
- `src/features/category/types.ts`
- `src/features/category/hooks/useCategoryQuery.ts`
- `src/features/category/hooks/useCategoryProductsQuery.ts`
- `src/features/category/components/*`
- `src/features/category/containers/CategoryContainer.tsx`
- `src/features/category/index.ts`
- `src/pages/Category.tsx`
- route addition in `src/routes/index.tsx`

## Tests
- `tests/pages/CategoryPage.ts`
- `tests/category.spec.ts`
