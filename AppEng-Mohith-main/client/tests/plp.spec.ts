import { test } from '@playwright/test';
import { PLPPage } from './pages';

test.describe('Product Listing Page', () => {
  let plpPage: PLPPage;

  test.beforeEach(async ({ page }) => {
    plpPage = new PLPPage(page);
    await plpPage.goto();
  });

  test('renders with filter sidebar and product grid', async ({ page }) => {
    await plpPage.shouldBeVisible();
    await plpPage.shouldShowFilters();
    await plpPage.shouldShowProducts();
    await page.screenshot({ path: 'test-results/screenshots/plp-default.png', fullPage: true });
  });

  test('sort by price high to low updates order', async ({ page }) => {
    await plpPage.sortByHighToLow();
    await page.screenshot({
      path: 'test-results/screenshots/plp-sorted-price-desc.png',
      fullPage: true,
    });
  });

  test('filter by brand shows relevant products', async ({ page }) => {
    await plpPage.filterByBrand('Dell');
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'test-results/screenshots/plp-filtered-dell.png',
      fullPage: true,
    });
  });
});
