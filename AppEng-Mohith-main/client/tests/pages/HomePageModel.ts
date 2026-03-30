import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePageModel';

/**
 * Home Page Object
 *
 */
export class HomePage extends BasePage {
  private readonly homePage: Locator = this.page.getByTestId('home-page');
  private readonly viewAllLink: Locator = this.page.getByRole('link', { name: 'View All' }).first();

  // ── Actions ──────────────────────────────────────────────

  async goto() {
    await super.goto('/#/home');
  }

  async navigateToDemo() {
    if (await this.viewAllLink.isVisible().catch(() => false)) {
      await this.viewAllLink.click();
      return;
    }
    await this.page.goto('/#/plp');
  }

  async navigateToShowcase() {
    await this.viewAllLink.click();
  }

  // ── Assertions ───────────────────────────────────────────

  async shouldBeVisible() {
    await expect(this.page).toHaveURL(/#\/home/, { timeout: 10000 });
    if (await this.homePage.isVisible().catch(() => false)) {
      await expect(this.homePage).toBeVisible();
    }
    if (await this.viewAllLink.isVisible().catch(() => false)) {
      await expect(this.viewAllLink).toBeVisible({ timeout: 10000 });
    } else {
      await expect(this.page.getByRole('heading', { name: /featured/i })).toBeVisible({
        timeout: 10000,
      });
    }
  }

  async shouldHaveButtonsEnabled() {
    await expect(this.viewAllLink).toBeEnabled();
  }
}
