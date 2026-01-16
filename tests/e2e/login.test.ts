import { expect } from '@playwright/test'
import test from './fixtures/mumble'

test('sign in', async ({ page }) => {
  await expect(page.getByText('Willkommen auf Mumble!').first()).toBeVisible({ timeout: 20000 })
})
