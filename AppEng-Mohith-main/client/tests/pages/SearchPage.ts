import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  private readonly searchPage: Locator;
  private readonly searchInput: Locator;
  private readonly recentSearches: Locator;
  private readonly trendingProducts: Locator;
  private readonly resultsGrid: Locator;
  private readonly noResults: Locator;

  constructor(page: ConstructorParameters<typeof BasePage>[0]) {
    super(page);
    this.searchPage = this.page.getByTestId('search-page');
    this.searchInput = this.searchPage.getByTestId('search-bar-input');
    this.recentSearches = this.searchPage.getByTestId('recent-searches');
    this.trendingProducts = this.searchPage.getByTestId('trending-products');
    this.resultsGrid = this.searchPage.getByTestId('search-results-grid');
    this.noResults = this.searchPage.getByTestId('no-results');
  }

  async goto(query?: string) {
    await super.goto(query ? `/#/search?q=${encodeURIComponent(query)}` : '/#/search');
  }

  async typeQuery(query: string) {
    await this.searchInput.fill(query);
  }

  async submitSearch(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async clickRecentSearch(index: number) {
    const items = this.page
      .getByTestId('recent-searches')
      .locator('[data-testid="recent-search-item"]');
    await items.nth(index).click();
  }

  async shouldShowIdleState() {
    await expect(this.recentSearches).toBeVisible();
    await expect(this.trendingProducts).toBeVisible();
  }

  async shouldShowResults() {
    await expect(this.resultsGrid).toBeVisible();
    await expect(this.noResults).not.toBeVisible();
  }

  async shouldShowNoResults() {
    await expect(this.noResults).toBeVisible();
  }

  async shouldBeVisible() {
    await expect(this.searchInput).toBeVisible();
  }
}
