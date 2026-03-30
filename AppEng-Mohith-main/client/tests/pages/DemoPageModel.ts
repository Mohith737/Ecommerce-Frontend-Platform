import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePageModel';

/**
 * Demo Page Object
 *
 * Maps the Demo feature page: header, product list, loading/error states.
 */
export class DemoPage extends BasePage {
  private readonly plpPage: Locator = this.page.getByTestId('plp-page');
  private readonly productGrid: Locator = this.page.getByTestId('product-grid');

  // ── Actions ──────────────────────────────────────────────

  async goto() {
    await super.goto('/#/plp');
  }

  async refetch() {
    await this.page.reload();
  }

  // ── Assertions ───────────────────────────────────────────

  async shouldBeVisible() {
    await expect(this.plpPage).toBeVisible();
  }

  async shouldShowProducts() {
    await expect(this.productGrid).toBeVisible();
    await expect(this.page.locator('[data-testid^="product-card-"]').first()).toBeVisible();
  }

  async shouldShowLoading() {
    await expect(this.page.getByTestId('page-skeleton')).toBeVisible();
  }

  async shouldShowError() {
    await expect(this.page.getByTestId('error-state')).toBeVisible();
  }
}
