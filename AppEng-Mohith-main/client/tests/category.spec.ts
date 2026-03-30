import { expect, test } from '@playwright/test';
import { CategoryPage } from './pages';

test.describe('Category Page', () => {
  let categoryPage: CategoryPage;

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page);
    const categoriesRes = await page.request.get(
      'https://ecom-api-956506160468.us-central1.run.app/categories/'
    );
    const categories = (await categoriesRes.json()) as Array<{ id: number }>;
    await categoryPage.goto(categories[0]?.id ?? 1);
  });

  test('renders hero banner with category name', async () => {
    await categoryPage.shouldBeVisible();
  });

  test('shows subcategory grid', async () => {
    await categoryPage.shouldShowSubcategories();
  });

  test('shows featured products section', async () => {
    await categoryPage.shouldShowFeaturedProducts();
  });

  test('clicking subcategory navigates to PLP', async ({ page }) => {
    const link = page
      .getByTestId('subcategory-grid')
      .locator('a[href*="#/plp"], a[href*="/plp"]')
      .first();
    if ((await link.count()) > 0) {
      await link.click();
      await expect(page).toHaveURL(/#\/plp/);
      return;
    }

    const tiles = page.getByTestId('subcategory-grid').locator('[data-testid="subcategory-tile"]');
    test.skip((await tiles.count()) === 0, 'No clickable subcategory links available');
    await categoryPage.clickSubcategory(0);
    await expect(page).toHaveURL(/#\/plp/);
  });
});
