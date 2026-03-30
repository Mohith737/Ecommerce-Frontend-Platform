# PROMPT OF2 — PDP All States + Compare

## Build
- Update PDP to support states: `in-stock`, `low-stock`, `out-of-stock`
- Add compare flow with Zustand store and sticky compare bar
- Add compare page with side-by-side spec table

## Required additions
- Store: `src/stores/compareStore.ts`
- Hooks: `src/features/pdp/hooks/useProductQuery.ts`, `useProductReviewsQuery.ts`
- Utils: `src/features/pdp/utils/stockStatus.ts`
- Components:
  - `StockStatusBar`
  - `ProductImageGallery`
  - `ProductActions`
  - `CompareBar`
- Compare page:
  - `src/features/compare/components/CompareTable.tsx`
  - `src/pages/Compare.tsx`
- Route: `/#/compare`

## PDP data-testids
- `pdp-page`, `stock-status-bar`, `product-image-gallery`, `product-actions`
- `add-to-cart-btn`, `buy-now-btn`, `add-to-compare-btn`, `notify-me-btn`
- `compare-bar`, `compare-now-btn`, `reviews-section`, `recently-viewed`
- Compare page: `compare-page`, `compare-table`

## Tests
- `tests/pages/PDPPage.ts`
- `tests/pdp.spec.ts`
