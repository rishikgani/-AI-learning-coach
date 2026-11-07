import { test, expect } from '@playwright/test'

test.describe('AI Coach Page', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication - in real tests you'd set up proper auth
    await page.goto('/dashboard/ai-coach')
  })

  test('should load AI Coach page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('AI Learning Coach')
  })

  test('should display all AI feature tabs', async ({ page }) => {
    await expect(page.locator('text=AI Chat')).toBeVisible()
    await expect(page.locator('text=Generate Plan')).toBeVisible()
    await expect(page.locator('text=Generate Quiz')).toBeVisible()
    await expect(page.locator('text=Explain Concept')).toBeVisible()
    await expect(page.locator('text=Flashcards')).toBeVisible()
    await expect(page.locator('text=Mind Map')).toBeVisible()
    await expect(page.locator('text=Settings')).toBeVisible()
  })

  test('should switch between tabs', async ({ page }) => {
    // Click Generate Plan tab
    await page.click('text=Generate Plan')
    await expect(page.locator('text=Generate Study Plan')).toBeVisible()

    // Click Generate Quiz tab
    await page.click('text=Generate Quiz')
    await expect(page.locator('text=Generate Practice Quiz')).toBeVisible()

    // Click Explain Concept tab
    await page.click('text=Explain Concept')
    await expect(page.locator('text=Explain Concept')).toBeVisible()

    // Click Settings tab
    await page.click('text=Settings')
    await expect(page.locator('text=AI Provider Settings')).toBeVisible()
  })

  test('should have working chat input', async ({ page }) => {
    const input = page.locator('input[placeholder="Ask me anything about your studies..."]')
    await expect(input).toBeVisible()

    await input.fill('What is photosynthesis?')
    await expect(input).toHaveValue('What is photosynthesis?')
  })

  test('should display study plan form', async ({ page }) => {
    await page.click('text=Generate Plan')

    await expect(page.locator('label:has-text("Subject")')).toBeVisible()
    await expect(page.locator('label:has-text("Goal")')).toBeVisible()
    await expect(page.locator('label:has-text("Current Level")')).toBeVisible()
    await expect(page.locator('label:has-text("Duration (days)")')).toBeVisible()
    await expect(page.locator('label:has-text("Daily Hours")')).toBeVisible()
    await expect(page.locator('label:has-text("Target Exam")')).toBeVisible()
    await expect(page.locator('label:has-text("Language")')).toBeVisible()
  })

  test('should display quiz generation form', async ({ page }) => {
    await page.click('text=Generate Quiz')

    await expect(page.locator('label:has-text("Topic")')).toBeVisible()
    await expect(page.locator('label:has-text("Subject")')).toBeVisible()
    await expect(page.locator('label:has-text("Difficulty")')).toBeVisible()
    await expect(page.locator('label:has-text("Number of Questions")')).toBeVisible()
    await expect(page.locator('label:has-text("Language")')).toBeVisible()
  })

  test('should display AI settings panel', async ({ page }) => {
    await page.click('text=Settings')

    await expect(page.locator('text=Default Provider')).toBeVisible()
    await expect(page.locator('text=Default Model')).toBeVisible()
    await expect(page.locator('text=Temperature')).toBeVisible()
    await expect(page.locator('text=Max Tokens')).toBeVisible()
    await expect(page.locator('text=API Keys')).toBeVisible()

    // Check all providers are listed
    await expect(page.locator('text=Google Gemini')).toBeVisible()
    await expect(page.locator('text=Groq')).toBeVisible()
    await expect(page.locator('text=OpenRouter')).toBeVisible()
    await expect(page.locator('text=OpenAI')).toBeVisible()
    await expect(page.locator('text=Anthropic')).toBeVisible()
  })
})