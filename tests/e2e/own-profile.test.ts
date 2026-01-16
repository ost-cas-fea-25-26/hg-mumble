import { expect } from '@playwright/test'
import test from './fixtures/mumble'

test.describe('Own Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.E2E_HOST}/mumble/profile`)
  })

  test('renders own profile layout', async ({ page }) => {
    await Promise.all([
      expect(page.getByTestId('profile-header')).toBeVisible(),
      expect(page.getByTestId('profile-display-name')).toBeVisible(),
      expect(page.getByTestId('profile-username')).toBeVisible(),
      expect(page.getByTestId('profile-avatar')).toBeVisible(),
      expect(page.getByTestId('profile-cover-image')).toBeVisible(),
      expect(page.getByTestId('profile-bio')).toBeVisible(),
    ])
  })

  test('does not show follow button on own profile', async ({ page }) => {
    await expect(page.getByTestId('profile-follow-button')).not.toBeVisible()
  })

  test('displays profile tabs', async ({ page }) => {
    await expect(page.getByRole('tablist')).toBeVisible()
    await expect(page.getByRole('tab').first()).toBeVisible()
    await expect(page.getByRole('tab').nth(1)).toBeVisible()
  })

  test('can switch between tabs', async ({ page }) => {
    const tabs = page.getByRole('tab')
    const firstTab = tabs.first()
    const secondTab = tabs.nth(1)

    await expect(firstTab).toHaveAttribute('aria-selected', 'true')

    await secondTab.click()
    await expect(secondTab).toHaveAttribute('aria-selected', 'true')
    await expect(firstTab).toHaveAttribute('aria-selected', 'false')

    await firstTab.click()
    await expect(firstTab).toHaveAttribute('aria-selected', 'true')
  })

  test('displays recommended profiles section', async ({ page }) => {
    const hasRecommendations = page.getByTestId('recommended-profiles')
    const noRecommendations = page.getByText(/no.*recommendations/i)

    await expect(hasRecommendations.or(noRecommendations)).toBeVisible()
  })
})
