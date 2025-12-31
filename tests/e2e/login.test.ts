import { expect, test } from '@playwright/test'
import signin from '../methods/signin'

test('sign in', async ({ page }) => {
  await signin(page)

  await expect(page.getByText('Willkommen auf Mumble!')).toBeVisible()
})
