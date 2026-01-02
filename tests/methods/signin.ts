import { Page, expect } from '@playwright/test'

export default async function signin(page: Page) {
  await page.goto(`http://localhost:3000/`)
  await page.getByTestId('login-button').click()

  // redirect to zitadel login
  await page.getByTestId('username-text-input').fill(process.env.E2E_PASSWORD || '')
  await page.getByTestId('submit-button').click()
  await page.getByTestId('password-text-input').fill(process.env.E2E_PASSWORD || '')
  await page.getByTestId('submit-button').click()

  await expect(page.getByText('Willkommen auf Mumble!')).toBeVisible()
}
