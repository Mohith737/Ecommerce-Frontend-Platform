import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly emptyCart: Locator = this.page.getByTestId('empty-cart');
  private readonly couponInput: Locator = this.page.getByTestId('coupon-input');
  private readonly applyBtn: Locator = this.page.getByTestId('apply-coupon-btn');
  private readonly couponSuccess: Locator = this.page.getByTestId('coupon-success');
  private readonly couponError: Locator = this.page.getByTestId('coupon-error');
  private readonly proceedBtn: Locator = this.page.getByTestId('proceed-to-checkout-btn');
  private readonly continueShoppingBtn: Locator = this.page.getByTestId('continue-shopping-btn');

  async goto() {
    await super.goto('/#/cart');
  }

  async shouldShowEmptyCart() {
    await expect(this.emptyCart).toBeVisible({ timeout: 12000 });
  }

  async shouldShowCartItems() {
    await expect(this.page.locator('[data-testid^="cart-item-"]')).toHaveCount(1);
  }

  async applyCoupon(code: string) {
    await expect(this.couponInput).toBeVisible();
    await this.couponInput.fill(code);
    await expect(this.applyBtn).toBeVisible();
    await this.applyBtn.click({ force: true });
  }

  async shouldShowCouponSuccess() {
    await expect(this.couponSuccess).toBeVisible();
  }

  async shouldShowCouponError() {
    await expect(this.couponError).toBeVisible();
  }

  async proceedToCheckout() {
    await this.proceedBtn.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingBtn.click();
  }
}
