import { expect, test } from '@playwright/test'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const authFile = path.join(__dirname, '../.auth/user.json')

test('authenticate', async ({ page }) => {
  await page.goto(process.env.E2E_HOST || '')

  await page.waitForURL('**/auth/signin')
  await page.getByTestId('login-button').click()

  await page.waitForURL('**/login/**', { timeout: 20000 })

  // redirect to zitadel login
  await page.getByTestId('username-text-input').fill(process.env.E2E_USERNAME || '')
  await page.getByTestId('submit-button').click()
  await page.getByTestId('password-text-input').fill(process.env.E2E_PASSWORD || '')
  await page.getByTestId('submit-button').click()

  await expect(page.getByText('Willkommen auf Mumble!').first()).toBeVisible({ timeout: 20000 })

  await page.context().storageState({ path: authFile })
})
