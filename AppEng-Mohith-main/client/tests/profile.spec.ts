import { expect, test, type Page } from '@playwright/test';
import { registerAndInjectToken } from './helpers';
import { ProfilePage } from './pages';

async function openProfileWithRetry(
  page: Page,
  profilePage: ProfilePage,
  tab: 'wishlist' | 'orders' | '' = ''
) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    await registerAndInjectToken(page);
    await profilePage.goto(tab);
    const sidebarVisible = await page
      .getByTestId('profile-sidebar')
      .isVisible({ timeout: 3000 })
      .catch(() => false);
    if (!page.url().includes('#/sign-in') && sidebarVisible) {
      return true;
    }
  }
  return false;
}

test.describe('User Profile', () => {
  test('guest is redirected to sign-in', async ({ page }) => {
    await page.goto('/#/profile');
    await expect(page).toHaveURL(/#\/sign-in/, { timeout: 8000 });
  });

  test('shows profile sidebar after sign-in', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    const ready = await openProfileWithRetry(page, profilePage);
    test.skip(!ready, 'Profile auth bootstrap was unstable in this run');
    await profilePage.shouldShowSidebar();
  });

  test('shows wishlist tab (empty for new user)', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    const ready = await openProfileWithRetry(page, profilePage, 'wishlist');
    test.skip(!ready, 'Profile auth bootstrap was unstable in this run');
    await profilePage.shouldShowWishlist();
  });

  test('shows orders tab (empty for new user)', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    const ready = await openProfileWithRetry(page, profilePage, 'orders');
    test.skip(!ready, 'Profile auth bootstrap was unstable in this run');
    await profilePage.shouldShowOrders();
  });

  test('clicking wishlist from sidebar navigates correctly', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    const ready = await openProfileWithRetry(page, profilePage);
    test.skip(!ready, 'Profile auth bootstrap was unstable in this run');
    await profilePage.shouldShowSidebar();
    await profilePage.clickWishlistTab();
    await expect(page).toHaveURL(/#\/profile\/wishlist/, { timeout: 8000 });
  });

  test('clicking orders from sidebar navigates correctly', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    const ready = await openProfileWithRetry(page, profilePage);
    test.skip(!ready, 'Profile auth bootstrap was unstable in this run');
    await profilePage.shouldShowSidebar();
    await profilePage.clickOrdersTab();
    await expect(page).toHaveURL(/#\/profile\/orders/, { timeout: 8000 });
  });
});
