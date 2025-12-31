import { defineConfig, devices } from '@playwright/test'

const envReuse = process.env.PLAYWRIGHT_REUSE_EXISTING
const envReuseBool = envReuse === 'true'

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'npm run mock',
      url: 'http://localhost:4011',
      reuseExistingServer: envReuse ? envReuseBool : true,
      timeout: 120 * 1000,
    },
    {
      command: 'npm run dev:mock',
      url: 'http://localhost:3000',
      reuseExistingServer: envReuse ? envReuseBool : !process.env.CI,
      timeout: 120 * 1000,
      stdout: 'pipe',
    },
  ],
})
