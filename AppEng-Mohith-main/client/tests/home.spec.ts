import { expect, test } from '@playwright/test';
import { HomePageModel } from './page-models/HomePage';

test.describe('Home Page', () => {
  test('01 - Home page renders all sections', async ({ page }) => {
    const home = new HomePageModel(page);
    await home.goto();
    await expect(home.homePage).toBeVisible();
    await expect(home.heroBanner).toBeVisible();
    await expect(home.featuredProducts).toBeVisible();
    await expect(home.shopByCategory).toBeVisible();
    await expect(home.trendingNow).toBeVisible();
    await page.screenshot({ path: 'test-results/screenshots/home-page.png', fullPage: true });
  });

  test('02 - Featured products load from API', async ({ page }) => {
    const home = new HomePageModel(page);
    await home.goto();
    await expect(home.featuredProducts).toBeVisible();
    const cards = page.locator('[data-testid^="product-card"]');
    await expect(cards.first()).toBeVisible({ timeout: 8000 });
    await page.screenshot({
      path: 'test-results/screenshots/home-featured-products.png',
      fullPage: true,
    });
  });

  test('03 - Guest user does NOT see Quick Access section', async ({ page }) => {
    await page.goto('/#/home');
    await expect(page.getByTestId('quick-access')).not.toBeVisible();
    await page.screenshot({
      path: 'test-results/screenshots/home-guest-no-quick-access.png',
      fullPage: true,
    });
  });

  test('04 - Clicking a product navigates to PDP', async ({ page }) => {
    const home = new HomePageModel(page);
    await home.goto();
    const firstCard = page.locator('[data-testid^="product-card"]').first();
    await firstCard.waitFor({ timeout: 8000 });
    await firstCard.click();
    await expect(page).toHaveURL(/#\/pdp\/\d+/);
    await page.screenshot({ path: 'test-results/screenshots/home-to-pdp.png', fullPage: true });
  });
});
