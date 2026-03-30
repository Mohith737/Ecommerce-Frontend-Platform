# ORDER FULFILLMENT FLOW — Master Index

## Flow
Browse → Category → PLP → PDP (Default/OOS/LowStock) → Compare → Cart (Default/Empty/Coupon) → Checkout → Order Success

## Prompt Run Order
1. `F5-full-offline-mock.md`
2. `F1-home-layout-fix.md`
3. `F2-auth-pages-fix.md`
4. `F3-plp-products-fix.md`
5. `F4-product-card-fix.md`
6. `SEARCH-FEATURE.md`
7. `OF1-category-page.md`
8. `OF2-pdp-all-states.md`
9. `OF3-cart-all-states.md`

## Verify URLs
1. `http://localhost:5173/#/home`
2. `http://localhost:5173/#/sign-up`
3. `http://localhost:5173/#/sign-in`
4. `http://localhost:5173/#/category/1`
5. `http://localhost:5173/#/plp`
6. `http://localhost:5173/#/plp?subcategory_id=3`
7. `http://localhost:5173/#/pdp/101`
8. `http://localhost:5173/#/pdp/108`
9. `http://localhost:5173/#/compare`
10. `http://localhost:5173/#/cart`
11. `http://localhost:5173/#/search`
12. `http://localhost:5173/#/search?q=laptop`
13. `http://localhost:5173/#/search?q=xyz12345`

## Final commands
```bash
pnpm -C client build
pnpm -C client dev
```
