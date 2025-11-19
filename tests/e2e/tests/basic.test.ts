import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto(`${process.env.E2E_HOST}/signin`)
  await page.getByRole('button', { name: "Let's gooo!!!" }).click()
})
