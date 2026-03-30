import { expect, test } from '@playwright/test';
import { registerAndInjectToken } from './helpers';
import { CheckoutPage } from './pages';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await registerAndInjectToken(page);
    const res = await page.request.get(
      'https://ecom-api-956506160468.us-central1.run.app/products/?limit=100'
    );
    const data = (await res.json()) as { items?: Array<{ id: number; stock: number }> };
    const candidates = (data.items ?? []).filter(item => item.stock > 0).slice(0, 10);
    test.skip(candidates.length === 0, 'No in-stock product available in backend data');

    let added = false;
    for (const item of candidates) {
      await page.goto(`/#/pdp/${item.id}`);
      const addBtn = page.getByTestId('add-to-cart-btn');
      if (await addBtn.isVisible().catch(() => false)) {
        await addBtn.click();
        added = true;
        break;
      }
    }

    test.skip(!added, 'Could not find a PDP with visible add-to-cart button');
    await page.waitForTimeout(1500);
  });

  test('shows checkout stepper with address step active', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();
    await checkoutPage.shouldBeVisible();
  });

  test('proceeds from address to payment step', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();
    await checkoutPage.proceedThroughAddress();
    await expect(page.getByTestId('payment-step')).toBeVisible({ timeout: 8000 });
  });

  test('proceeds from payment to review step', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();
    await checkoutPage.proceedThroughAddress();
    await checkoutPage.proceedThroughPayment();
    await expect(page.getByTestId('review-step')).toBeVisible({ timeout: 8000 });
  });

  test('placing order shows confirmation modal', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();
    await checkoutPage.proceedThroughAddress();
    await checkoutPage.proceedThroughPayment();
    await checkoutPage.placeOrder();
    await checkoutPage.shouldShowConfirmation();
  });

  test('guest is redirected to sign-in from checkout', async ({ page }) => {
    await page.goto('/#/home');
    await page.evaluate(() => localStorage.removeItem('access_token'));
    await page.reload();
    await page.goto('/#/checkout');
    await expect(page).toHaveURL(/#\/sign-in/, { timeout: 8000 });
  });
});
