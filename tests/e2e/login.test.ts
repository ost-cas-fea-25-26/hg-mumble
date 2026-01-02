import { expect, test } from '@playwright/test'

test('sign in', async ({ page }) => {
  await page.goto(`http://localhost:3000/`)
  await expect(page.getByText('Willkommen auf Mumble!')).toBeVisible()
})
