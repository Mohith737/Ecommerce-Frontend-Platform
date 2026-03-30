import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class GuestFlowPage extends BasePage {
  private readonly homePage: Locator = this.page.getByTestId('home-page');
  private readonly plpPage: Locator = this.page.getByTestId('plp-page');

  async gotoHome() {
    await super.goto('/#/home');
  }

  async gotoPLP() {
    await super.goto('/#/plp');
  }

  async gotoCheckout() {
    await super.goto('/#/checkout');
  }

  async gotoProfile() {
    await super.goto('/#/profile');
  }

  async clickFirstProductCard() {
    const card = this.page.locator('[data-testid^="product-card"]').first();
    await card.waitFor({ timeout: 12000 });
    await card.click();
  }

  async clickAddToCartOnPDP() {
    await this.page.getByTestId('add-to-cart-btn').click();
  }

  async shouldShowHome() {
    await expect(this.homePage).toBeVisible();
  }

  async shouldShowPLP() {
    await expect(this.plpPage).toBeVisible();
  }

  async shouldShowSignInPrompt() {
    await expect(
      this.page.getByText(/Please sign in to add items to your cart/i).first()
    ).toBeVisible({ timeout: 3000 });
  }

  async shouldBeRedirectedToSignIn() {
    await expect(this.page).toHaveURL(/#\/sign-in/);
  }
}
