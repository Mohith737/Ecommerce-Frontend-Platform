import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PLPPage extends BasePage {
  private readonly plpPage: Locator = this.page.getByTestId('plp-page');
  private readonly filterSidebar: Locator = this.page
    .locator('[data-testid="filter-sidebar"]')
    .first();
  private readonly productGrid: Locator = this.page.getByTestId('product-grid');
  private readonly sortBar: Locator = this.page.getByTestId('sort-bar');

  async goto(queryString = '') {
    await super.goto(`/#/plp${queryString}`);
  }

  async sortByHighToLow() {
    await this.sortBar.getByText('Price: High to Low').click();
  }

  async filterByBrand(brand: string) {
    await this.filterSidebar.getByLabel(brand).check();
  }

  async shouldBeVisible() {
    await expect(this.plpPage).toBeVisible();
  }

  async shouldShowFilters() {
    await expect(this.filterSidebar).toBeVisible();
  }

  async shouldShowProducts() {
    await expect(this.productGrid).toBeVisible();
  }
}
