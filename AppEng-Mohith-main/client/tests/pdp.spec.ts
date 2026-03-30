import { expect, test } from '@playwright/test';
import { PDPPage } from './pages';

test.describe('Product Detail Page', () => {
  let pdpPage: PDPPage;

  test.describe('In Stock product', () => {
    test.beforeEach(async ({ page }) => {
      pdpPage = new PDPPage(page);
      const res = await page.request.get(
        'https://ecom-api-956506160468.us-central1.run.app/products/?limit=100'
      );
      const data = (await res.json()) as { items?: Array<{ id: number; stock: number }> };
      const inStock = data.items?.find(item => item.stock > 0);
      test.skip(!inStock, 'No in-stock product available in backend data');
      await pdpPage.goto(inStock?.id ?? 101);
    });

    test('shows add to cart button when in stock', async () => {
      await pdpPage.shouldShowInStock();
    });

    test('shows customer reviews section', async () => {
      await pdpPage.shouldShowReviewsSection();
    });

    test('add to compare shows compare bar', async () => {
      await pdpPage.addToCompare();
      await pdpPage.shouldShowCompareBar();
    });

    test('compare now navigates to compare page', async ({ page }) => {
      await pdpPage.addToCompare();
      await page.getByTestId('compare-now-btn').click();
      await expect(page).toHaveURL(/#\/compare/);
    });
  });

  test.describe('Out of Stock product', () => {
    test.beforeEach(async ({ page }) => {
      pdpPage = new PDPPage(page);
      const res = await page.request.get(
        'https://ecom-api-956506160468.us-central1.run.app/products/?limit=100'
      );
      const data = (await res.json()) as { items?: Array<{ id: number; stock: number }> };
      const oos = data.items?.find(item => item.stock === 0);
      test.skip(!oos, 'No out-of-stock product available in backend data');
      await pdpPage.goto(oos?.id ?? 108);
    });

    test('shows notify me button when out of stock', async () => {
      await pdpPage.shouldShowOutOfStock();
    });
  });
});
