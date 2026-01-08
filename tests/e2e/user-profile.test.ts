import { expect, test } from '@playwright/test'

test.describe('Profile Navigation', () => {
  test('navigates to profile from post author link', async ({ page }) => {
    await page.goto(process.env.E2E_HOST || '')
    await page.getByTestId('post-author-link').first().click()
    await expect(page).toHaveURL(/\/mumble\/profile\//)
    await expect(page.getByTestId('profile-header')).toBeVisible()
  })
})

test.describe('Public Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.E2E_HOST || '')
    await page.getByTestId('post-author-link').first().click()
    await page.waitForURL(/\/mumble\/profile\//)
  })

  test('renders public profile layout', async ({ page }) => {
    await Promise.all([
      expect(page.getByTestId('profile-header')).toBeVisible(),
      expect(page.getByTestId('profile-display-name')).toBeVisible(),
      expect(page.getByTestId('profile-username')).toBeVisible(),
      expect(page.getByTestId('profile-avatar')).toBeVisible(),
      expect(page.getByTestId('profile-cover-image')).toBeVisible(),
      expect(page.getByTestId('profile-followers-count')).toBeVisible(),
      expect(page.getByTestId('profile-bio')).toBeVisible(),
    ])
  })
})

test.describe('Profile Follow Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.E2E_HOST || '')
    await page.getByTestId('post-author-link').first().click()
    await page.waitForURL(/\/mumble\/profile\//)
  })

  test('displays follow button for other users profile', async ({ page }) => {
    await expect(page.getByTestId('profile-follow-button')).toBeVisible()
  })

  test('can toggle follow state', async ({ page }) => {
    const followContainer = page.getByTestId('profile-follow-button')
    const button = followContainer.locator('button')

    await expect(button).toBeVisible()
    const initialText = await button.innerText()

    await button.click()
    await expect(button).not.toHaveText(initialText, { timeout: 10000 })

    await button.click()
    await expect(button).toHaveText(initialText, { timeout: 10000 })
  })
})
