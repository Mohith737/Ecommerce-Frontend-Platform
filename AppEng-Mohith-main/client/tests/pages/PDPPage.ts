import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PDPPage extends BasePage {
  private readonly pdpPage: Locator = this.page.getByTestId('pdp-page');
  private readonly stockStatusBar: Locator = this.page.getByTestId('stock-status-bar');
  private readonly addToCartBtn: Locator = this.page.getByTestId('add-to-cart-btn');
  private readonly addToCompareBtn: Locator = this.page.getByTestId('add-to-compare-btn');
  private readonly compareBar: Locator = this.page.getByTestId('compare-bar');
  private readonly reviewsSection: Locator = this.page.getByTestId('reviews-section');
  private readonly notifyMeBtn: Locator = this.page.getByTestId('notify-me-btn');

  async goto(productId = 101) {
    await super.goto(`/#/pdp/${productId}`);
  }

  async gotoOutOfStock() {
    await super.goto('/#/pdp/108');
  }

  async shouldShowInStock() {
    await expect(this.pdpPage).toBeVisible({ timeout: 12000 });
    await expect(this.stockStatusBar).toBeVisible({ timeout: 12000 });
    await expect(this.addToCartBtn).toBeVisible({ timeout: 12000 });
    await expect(this.addToCartBtn).toBeEnabled({ timeout: 12000 });
  }

  async shouldShowOutOfStock() {
    await expect(this.notifyMeBtn).toBeVisible();
    await expect(this.addToCartBtn).not.toBeVisible();
  }

  async shouldShowReviewsSection() {
    await expect(this.pdpPage).toBeVisible({ timeout: 12000 });
    await expect(this.reviewsSection).toBeVisible({ timeout: 12000 });
  }

  async addToCompare() {
    await this.addToCompareBtn.click();
  }

  async shouldShowCompareBar() {
    await expect(this.compareBar).toBeVisible();
  }
}
