import { Locator, Page } from '@playwright/test';

export class AuthPage {
  readonly page: Page;
  readonly signUpForm: Locator;
  readonly signInForm: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly signInEmail: Locator;
  readonly signInPassword: Locator;
  readonly signInSubmit: Locator;
  readonly errorModal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpForm = page.getByTestId('sign-up-form');
    this.signInForm = page.getByTestId('sign-in-form');
    this.nameInput = page.getByTestId('sign-up-name');
    this.emailInput = page.getByTestId('sign-up-email');
    this.passwordInput = page.getByTestId('sign-up-password');
    this.confirmPasswordInput = page.getByTestId('sign-up-confirm-password');
    this.submitButton = page.getByTestId('sign-up-submit');
    this.signInEmail = page.getByTestId('sign-in-email');
    this.signInPassword = page.getByTestId('sign-in-password');
    this.signInSubmit = page.getByTestId('sign-in-submit');
    this.errorModal = page.getByTestId('sign-in-error-modal');
  }

  async goToSignUp() {
    await this.page.goto('/#/sign-up');
  }

  async goToSignIn() {
    await this.page.goto('/#/sign-in');
  }

  async fillSignUp(name: string, email: string, password: string, confirm: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirm);
  }

  async fillSignIn(email: string, password: string) {
    await this.signInEmail.fill(email);
    await this.signInPassword.fill(password);
  }
}
