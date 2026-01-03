import { expect, test } from '@playwright/test'

test('display post detail', async ({ page }) => {
  await page.goto(process.env.E2E_HOST || '')
  await page.getByTestId('post-comments-link').first().click()
  await expect(page.getByTestId('post-text').first()).toHaveText('Hello World! #newpost.')
})

test('like in post detail', async ({ page }) => {
  await page.goto(process.env.E2E_HOST || '')
  await page.getByTestId('post-comments-link').first().click()

  await expect(page.getByTestId('post-like-toggle').first()).toHaveText('42 Likes')
  await page.getByTestId('post-like-toggle').first().click()
  await expect(page.getByTestId('post-like-toggle').first()).toHaveText('41 Likes')
  await page.getByTestId('post-like-toggle').first().click()
  await expect(page.getByTestId('post-like-toggle').first()).toHaveText('42 Likes')
})

test('copy detail url', async ({ page, context }) => {
  await page.goto(process.env.E2E_HOST || '')
  await page.getByTestId('post-comments-link').first().click()

  await page.getByTestId('post-copy-link-button').first().click()
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  const handle = await page.evaluateHandle(() => navigator.clipboard.readText())
  const clipboardContent = await handle.jsonValue()

  expect(clipboardContent).toContain('/mumble/post/01GDMMR85BEHP8AKV8ZGGM259K')
})

test('display replies in post detail', async ({ page }) => {
  await page.goto(process.env.E2E_HOST || '')
  await page.goto('/mumble/post/01GDMMR85BEHP8AKV8ZGGM259K')

  await page.getByTestId('post-copy-link-button').first().click()
  await expect(page.getByTestId('reply-content').getByTestId('post-text').first()).toHaveText(
    'This is a reply to a post. #reply'
  )
})
