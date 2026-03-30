import { expect, test } from '@playwright/test';
import { registerAndInjectToken } from './helpers';
import { CartPage } from './pages';

test.describe('Cart Page', () => {
  test.describe('Empty cart (authenticated)', () => {
    test.beforeEach(async ({ page }) => {
      await registerAndInjectToken(page);
      const cartPage = new CartPage(page);
      await cartPage.goto();
      const removeButtons = page.locator('[data-testid^="remove-item-"]');
      const removeCount = await removeButtons.count();
      for (let index = 0; index < removeCount; index += 1) {
        await removeButtons.first().click();
      }
      await page.reload();
    });

    test('shows empty cart for a new user', async ({ page }) => {
      const cartPage = new CartPage(page);
      await cartPage.goto();
      await cartPage.shouldShowEmptyCart();
    });

    test('continue shopping navigates to PLP', async ({ page }) => {
      const cartPage = new CartPage(page);
      await cartPage.goto();
      await cartPage.clickContinueShopping();
      await expect(page).toHaveURL(/#\/plp/);
    });
  });

  test.describe('Cart with items', () => {
    test.beforeEach(async ({ page }) => {
      await registerAndInjectToken(page);
      const res = await page.request.get(
        'https://ecom-api-956506160468.us-central1.run.app/products/?limit=100'
      );
      const data = (await res.json()) as { items?: Array<{ id: number; stock: number }> };
      const inStock = (data.items ?? []).filter(item => item.stock > 0).slice(0, 10);
      test.skip(inStock.length === 0, 'No in-stock product available in backend data');

      let added = false;
      for (const item of inStock) {
        await page.goto(`/#/pdp/${item.id}`);
        const addToCartBtn = page.getByTestId('add-to-cart-btn').first();
        if (await addToCartBtn.isVisible().catch(() => false)) {
          await addToCartBtn.click();
          added = true;
          break;
        }
      }

      test.skip(!added, 'Could not find a PDP with visible add-to-cart button');
      await page.waitForTimeout(1000);
    });

    test('shows cart items after adding product', async ({ page }) => {
      const cartPage = new CartPage(page);
      await cartPage.goto();
      await cartPage.shouldShowCartItems();
    });

    test('applying valid coupon WCM10 shows success (first order)', async ({ page }) => {
      const cartPage = new CartPage(page);
      await cartPage.goto();
      await cartPage.shouldShowCartItems();
      await cartPage.applyCoupon('WCM10');
      await cartPage.shouldShowCouponSuccess();
    });

    test('applying invalid coupon shows error', async ({ page }) => {
      const cartPage = new CartPage(page);
      await cartPage.goto();
      await cartPage.shouldShowCartItems();
      await cartPage.applyCoupon('FAKECODE999');
      await cartPage.shouldShowCouponError();
    });
  });

  test.describe('Guest cart', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/#/home');
      await page.evaluate(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('shophub_guest');
      });
      await page.reload();
    });

    test('guest can view cart page (not redirected)', async ({ page }) => {
      await page.goto('/#/cart');
      await expect(page).not.toHaveURL(/#\/sign-in/);
      await expect(page.getByTestId('cart-page')).toBeVisible({ timeout: 8000 });
    });

    test('guest proceed to checkout redirects to sign-in when summary is available', async ({
      page,
    }) => {
      await page.goto('/#/cart');
      const proceedBtn = page.getByTestId('proceed-to-checkout-btn');
      if (await proceedBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await proceedBtn.click();
        await expect(page).toHaveURL(/#\/sign-in/, { timeout: 8000 });
      } else {
        await expect(page.getByTestId('empty-cart')).toBeVisible({ timeout: 8000 });
      }
    });
  });
});
