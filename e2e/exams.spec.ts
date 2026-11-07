import { test, expect } from '@playwright/test'

const examCategories = [
  { name: 'Engineering', path: '/exams/engineering', heading: 'Engineering Entrance Exams' },
  { name: 'Medical', path: '/exams/medical', heading: 'Medical Entrance Exams' },
  { name: 'Competitive', path: '/exams/competitive', heading: 'Competitive & Government Exams' },
  { name: 'Engineering Streams', path: '/exams/engineering-streams', heading: 'Engineering Stream Subjects' },
  { name: 'School', path: '/exams/school', heading: 'School & Foundation Exams' },
  { name: 'More Exams', path: '/exams/more-exams', heading: 'Other Important Exams' },
]

examCategories.forEach(({ name, path, heading }) => {
  test.describe(`${name} Exams Page`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path)
    })

    test(`should load ${name} page successfully`, async ({ page }) => {
      await expect(page.locator('h1')).toContainText(name)
      await expect(page.locator(`text=${heading}`)).toBeVisible()
    })

    test(`should display exam cards for ${name}`, async ({ page }) => {
      // Each page should have exam cards
      const examCards = page.locator('.exam-card')
      await expect(examCards.first()).toBeVisible()
    })

    test(`should have CTA button on ${name} page`, async ({ page }) => {
      const ctaButton = page.locator('text=Start Preparing Free').or(page.locator('text=Start Learning Free'))
      await expect(ctaButton.first()).toBeVisible()
    })

    test(`should navigate to register on CTA click`, async ({ page }) => {
      const ctaButton = page.locator('text=Start Preparing Free').or(page.locator('text=Start Learning Free'))
      await ctaButton.first().click()
      await expect(page).toHaveURL(/.*auth\/register/)
    })
  })
})

test.describe('Exam Navigation from Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to all exam category pages', async ({ page }) => {
    for (const { path } of examCategories) {
      // Find and click the exam category link
      const categoryLink = page.locator(`a[href="${path}"]`)
      if (await categoryLink.count() > 0) {
        await categoryLink.first().click()
        await expect(page).toHaveURL(new RegExp(path))
        await page.goto('/') // Go back to home
      }
    }
  })
})