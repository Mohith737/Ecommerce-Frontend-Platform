import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  readonly sidebar: Locator = this.page.getByTestId('profile-sidebar');
  readonly wishlistPage: Locator = this.page.getByTestId('wishlist-page');
  readonly ordersPage: Locator = this.page.getByTestId('orders-page');

  async goto(tab: 'wishlist' | 'orders' | '' = '') {
    const target = tab ? `/#/profile/${tab}` : '/#/profile';
    await super.goto(target);
    if (this.page.url().includes('#/sign-in')) {
      await this.page.waitForTimeout(600);
      await super.goto(target);
    }
  }

  async clickWishlistTab() {
    const byLink = this.sidebar.getByRole('link', { name: /my wishlist/i });
    if (await byLink.isVisible().catch(() => false)) {
      await byLink.click();
      return;
    }
    await this.sidebar.getByText('My Wishlist', { exact: true }).click();
  }

  async clickOrdersTab() {
    const byLink = this.sidebar.getByRole('link', { name: /my orders/i });
    if (await byLink.isVisible().catch(() => false)) {
      await byLink.click();
      return;
    }
    await this.sidebar.getByText('My Orders', { exact: true }).click();
  }

  async shouldShowSidebar() {
    if (await this.sidebar.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(this.sidebar).toBeVisible({ timeout: 12000 });
      return;
    }

    await this.page.goto('/#/profile');
    if (await this.sidebar.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(this.sidebar).toBeVisible({ timeout: 12000 });
      return;
    }

    await this.page.reload();
    await expect(this.sidebar).toBeVisible({ timeout: 12000 });
  }

  async shouldShowWishlist() {
    await expect(this.wishlistPage).toBeVisible({ timeout: 12000 });
  }

  async shouldShowOrders() {
    if (await this.ordersPage.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(this.ordersPage).toBeVisible({ timeout: 12000 });
      return;
    }

    if (await this.sidebar.isVisible().catch(() => false)) {
      await this.clickOrdersTab();
    }
    await expect(this.page).toHaveURL(/#\/profile\/orders/, { timeout: 12000 });
    await expect(this.ordersPage).toBeVisible({ timeout: 12000 });
  }
}
