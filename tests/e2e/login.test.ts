import { expect, test } from '@playwright/test'

test('sign in', async ({ page }) => {
  await page.goto(process.env.E2E_HOST || '')
  await page.waitForURL('**/mumble')
  await expect(page.getByText('Willkommen auf Mumble!')).toBeVisible()
})
