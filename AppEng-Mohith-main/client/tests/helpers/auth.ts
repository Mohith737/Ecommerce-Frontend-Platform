import type { Page } from '@playwright/test';

const API_BASE = 'https://ecom-api-956506160468.us-central1.run.app';

export function uniqueEmail(): string {
  return `test_${Date.now()}_${Math.random().toString(36).slice(2, 7)}@shophub-test.com`;
}

export const TEST_PASSWORD = 'TestPass1234!';
export const TEST_FULL_NAME = 'Test User';

export async function registerAndInjectToken(page: Page): Promise<string> {
  const email = uniqueEmail();
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password: TEST_PASSWORD,
      full_name: TEST_FULL_NAME,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Register failed: ${errorText}`);
  }

  const { access_token } = (await response.json()) as { access_token: string };

  await page.goto('/#/home');
  await page.evaluate((token: string) => {
    localStorage.setItem('access_token', token);
    localStorage.removeItem('shophub_guest');
  }, access_token);
  await page.reload();
  await page.waitForTimeout(400);

  return email;
}

export async function signInViaUI(
  page: Page,
  email: string,
  password = TEST_PASSWORD
): Promise<void> {
  const openSignIn = async () => {
    await page.goto('/#/sign-in', { waitUntil: 'domcontentloaded', timeout: 30000 });
    const emailField = page.getByTestId('sign-in-email');
    if (await emailField.isVisible({ timeout: 5000 }).catch(() => false)) {
      return true;
    }
    return false;
  };

  let ready = await openSignIn();
  if (!ready) {
    await page.reload();
    ready = await openSignIn();
  }
  if (!ready) {
    throw new Error('Sign-in form did not render');
  }

  await page.getByTestId('sign-in-email').fill(email);
  await page.getByTestId('sign-in-password').fill(password);
  await page.getByTestId('sign-in-submit').click();
  await page.waitForURL(url => !url.hash.includes('sign-in'), { timeout: 15000 });
}
