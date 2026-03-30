import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly stepper: Locator = this.page.getByTestId('checkout-stepper');
  readonly continueBtn: Locator = this.page.getByRole('button', { name: /continue/i });
  readonly placeOrderBtn: Locator = this.page.getByTestId('place-order-btn');
  readonly confirmationModal: Locator = this.page.getByTestId('order-confirmation-modal');

  async goto() {
    await super.goto('/#/checkout');
  }

  async proceedThroughAddress() {
    await this.continueBtn.click();
  }

  async fillValidCardDetails() {
    await this.page.getByTestId('card-number-input').fill('1234567890123456');
    await this.page.getByTestId('cardholder-name-input').fill('John Doe');
    await this.page.getByTestId('expiry-input').fill('12/27');
    await this.page.getByTestId('cvv-input').fill('123');
  }

  async proceedThroughPayment() {
    await this.fillValidCardDetails();
    await this.continueBtn.click();
  }

  async placeOrder() {
    await this.placeOrderBtn.click();
  }

  async shouldShowConfirmation() {
    await expect(this.confirmationModal).toBeVisible({ timeout: 5000 });
  }

  async shouldBeVisible() {
    await expect(this.stepper).toBeVisible();
  }
}
