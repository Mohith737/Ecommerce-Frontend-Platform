import { Page } from '@playwright/test';

/**
 * Base Page Object — shared functionality for all page objects.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Navigate to a path relative to baseURL configured in playwright.config.ts */
  async goto(path: string) {
    await this.page.goto(path);
  }
}
