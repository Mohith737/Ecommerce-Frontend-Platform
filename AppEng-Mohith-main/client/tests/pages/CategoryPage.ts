import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CategoryPage extends BasePage {
  private readonly heroBanner: Locator = this.page.getByTestId('category-hero-banner');
  private readonly subcategoryGrid: Locator = this.page.getByTestId('subcategory-grid');
  private readonly featuredProducts: Locator = this.page.getByTestId('featured-products-section');

  async goto(categoryId = 1) {
    await super.goto(`/#/category/${categoryId}`);
  }

  async shouldBeVisible() {
    try {
      await expect(this.heroBanner).toBeVisible({ timeout: 10000 });
    } catch {
      await this.page.reload();
      await expect(this.heroBanner).toBeVisible({ timeout: 10000 });
    }
  }

  async shouldShowSubcategories() {
    await expect(this.subcategoryGrid).toBeVisible();
  }

  async shouldShowFeaturedProducts() {
    await expect(this.featuredProducts).toBeVisible();
  }

  async clickSubcategory(index: number) {
    const tileByTestId = this.subcategoryGrid.locator('[data-testid="subcategory-tile"]');
    if ((await tileByTestId.count()) > index) {
      await tileByTestId.nth(index).click();
      return;
    }

    const genericTiles = this.subcategoryGrid.locator('a,button,[role="button"]');
    await genericTiles.nth(index).click();
  }
}
