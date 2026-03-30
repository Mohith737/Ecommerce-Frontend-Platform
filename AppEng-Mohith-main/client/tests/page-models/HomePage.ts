import { Locator, Page } from '@playwright/test';

export class HomePageModel {
  readonly page: Page;
  readonly homePage: Locator;
  readonly heroBanner: Locator;
  readonly featuredProducts: Locator;
  readonly shopByCategory: Locator;
  readonly trendingNow: Locator;
  readonly quickAccess: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homePage = page.getByTestId('home-page');
    this.heroBanner = page.getByTestId('hero-banner');
    this.featuredProducts = page.getByTestId('featured-products');
    this.shopByCategory = page.getByTestId('shop-by-category');
    this.trendingNow = page.getByTestId('trending-now');
    this.quickAccess = page.getByTestId('quick-access');
  }

  async goto() {
    await this.page.goto('/#/home');
  }
}
