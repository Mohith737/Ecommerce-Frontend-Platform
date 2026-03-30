import { expect, test } from '@playwright/test';
import { GuestFlowPage } from './pages';

test.describe('Guest User Flow', () => {
  let guestFlow: GuestFlowPage;

  test.beforeEach(async ({ page }) => {
    guestFlow = new GuestFlowPage(page);
    await page.goto('/#/home', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.evaluate(() => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('shophub_guest');
    });
  });

  test('guest can browse home page', async ({ page }) => {
    await guestFlow.gotoHome();
    await guestFlow.shouldShowHome();
    await page.screenshot({ path: 'test-results/screenshots/guest-home.png', fullPage: true });
  });

  test('guest can browse PLP', async ({ page }) => {
    await guestFlow.gotoPLP();
    await guestFlow.shouldShowPLP();
    await page.screenshot({ path: 'test-results/screenshots/guest-plp.png', fullPage: true });
  });

  test('guest gets sign-in prompt on add to cart from PDP', async ({ page }) => {
    await guestFlow.gotoPLP();
    await guestFlow.clickFirstProductCard();
    await expect(page).toHaveURL(/#\/pdp\/\d+/);
    await guestFlow.clickAddToCartOnPDP();
    await guestFlow.shouldShowSignInPrompt();
    await page.screenshot({
      path: 'test-results/screenshots/guest-pdp-add-to-cart-toast.png',
      fullPage: true,
    });
  });

  test('guest is redirected from checkout to sign-in', async ({ page }) => {
    await guestFlow.gotoCheckout();
    await guestFlow.shouldBeRedirectedToSignIn();
    await page.screenshot({
      path: 'test-results/screenshots/guest-checkout-redirect.png',
      fullPage: true,
    });
  });

  test('guest is redirected from profile to sign-in', async ({ page }) => {
    await guestFlow.gotoProfile();
    await guestFlow.shouldBeRedirectedToSignIn();
    await page.screenshot({
      path: 'test-results/screenshots/guest-profile-redirect.png',
      fullPage: true,
    });
  });
});
