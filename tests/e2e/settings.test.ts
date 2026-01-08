import { expect } from '@playwright/test'
import test from './fixtures/mumble'

test('change name test', async ({ page }) => {
  await page.getByRole('button', { name: 'Settings' }).click()
  await page.getByRole('textbox', { name: 'Vorname' }).fill('Lord')
  await page.getByRole('textbox', { name: 'Nachname' }).fill('Voldemort')
  await page.getByRole('button', { name: 'Speichern' }).click()
  await expect(page.getByTestId('login-button')).toBeVisible()
})
