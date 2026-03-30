import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 30000,
  // Allow overriding the app URL/port in local runs.
  // Example: PLAYWRIGHT_BASE_URL=http://localhost:5175 pnpm -C client exec playwright test
  // This avoids failures when 5173 is unavailable.
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:5173',
    trace: 'on-first-retry',
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `pnpm run dev --port ${new URL(process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:5173').port || '5173'} --strictPort`,
    url: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
