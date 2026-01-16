import { test as base } from '@playwright/test'

// Extend basic test by providing a "todoPage" fixture.
const test = base.extend<{ home: void }>({
  home: [
    async ({ page }, use) => {
      await page.goto(process.env.E2E_HOST || '')
      await use()
    },
    { auto: true },
  ],
})

export default test
