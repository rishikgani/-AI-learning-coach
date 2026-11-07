import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/AI Learning Coach/)
  })

  test('should display hero section', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('AI Learning Coach')
    await expect(page.locator('text=Start Learning Free')).toBeVisible()
  })

  test('should display exam categories', async ({ page }) => {
    await expect(page.locator('h3:has-text("Engineering")').first()).toBeVisible()
    await expect(page.locator('h3:has-text("Medical")').first()).toBeVisible()
    await expect(page.locator('h3:has-text("Competitive")').first()).toBeVisible()
  })

  test('should navigate to exam category pages', async ({ page }) => {
    await page.click('a[href="/exams/engineering"]')
    await expect(page).toHaveURL(/.*engineering/)
  })

  test('should display features section', async ({ page }) => {
    await expect(page.locator('h3:has-text("AI-Powered Personalization")').first()).toBeVisible()
    await expect(page.locator('h3:has-text("Handwritten Notes")').first()).toBeVisible()
    await expect(page.locator('h3:has-text("Video Lectures")').first()).toBeVisible()
  })

  test('should display stats', async ({ page }) => {
    await expect(page.locator('text=50+').first()).toBeVisible()
    await expect(page.locator('div:has-text("Exams Covered")').first()).toBeVisible()
  })

  test('should have working CTA buttons', async ({ page }) => {
    const startButton = page.locator('text=Start Learning Free').first()
    await expect(startButton).toBeVisible()
    await startButton.click()
    await expect(page).toHaveURL(/.*auth\/register/)
  })
})

test.describe('Authentication Pages', () => {
  test('should load login page', async ({ page }) => {
    await page.goto('/auth/login')
    await expect(page.locator('h3:has-text("Sign In")')).toBeVisible()
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test('should load register page', async ({ page }) => {
    await page.goto('/auth/register')
    await expect(page.locator('h1:has-text("Create Free Account")')).toBeVisible()
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
  })
})

test.describe('Onboarding Flow', () => {
  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto('/onboarding')
    // Should redirect to login since no session
    await expect(page).toHaveURL(/.*auth\/login/)
  })
})