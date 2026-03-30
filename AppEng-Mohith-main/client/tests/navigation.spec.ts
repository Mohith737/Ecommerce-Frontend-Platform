import { test, expect } from '@playwright/test';
import { HomePage, DemoPage } from './pages';

test.describe('Home → PLP navigation', () => {
  let home: HomePage;
  let demo: DemoPage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    demo = new DemoPage(page);
    await home.goto();
  });

  test('home page displays primary navigation CTA', async () => {
    await home.shouldBeVisible();
    await home.shouldHaveButtonsEnabled();
  });

  test('clicking "View All" navigates to the PLP page', async ({ page }) => {
    await home.navigateToDemo();

    await expect(page).toHaveURL(/#\/plp/);
    await demo.shouldBeVisible();
  });

  test('PLP page shows the products section after loading', async ({ page }) => {
    await home.navigateToDemo();
    await expect(page).toHaveURL(/#\/plp/);

    await demo.shouldShowProducts();
  });

  test('browser back button returns to the home page', async ({ page }) => {
    await home.navigateToDemo();
    await expect(page).toHaveURL(/#\/plp/);

    await page.goBack();

    await expect(page).toHaveURL(/#\/home/);
    await home.shouldBeVisible();
  });

  test('browser forward button returns to the PLP page', async ({ page }) => {
    await home.navigateToDemo();
    await expect(page).toHaveURL(/#\/plp/);

    await page.goBack();
    await home.shouldBeVisible();

    await page.goForward();

    await expect(page).toHaveURL(/#\/plp/);
    await demo.shouldBeVisible();
  });
});
