# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: exams.spec.ts >> Competitive Exams Page >> should load Competitive page successfully
- Location: e2e\exams.spec.ts:18:5

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected substring: "Competitive"
Received string:    "Unhandled Runtime Error"
Timeout: 5000ms

Call log:
  - Expect "toContainText" locator('h1') with timeout 5000ms
  - waiting for locator('h1')
    8 × locator resolved to <h1 id="nextjs__container_errors_label">Unhandled Runtime Error</h1>
      - unexpected value "Unhandled Runtime Error"

```

```yaml
- heading "Unhandled Runtime Error" [level=1]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | const examCategories = [
  4  |   { name: 'Engineering', path: '/exams/engineering', heading: 'Engineering Entrance Exams' },
  5  |   { name: 'Medical', path: '/exams/medical', heading: 'Medical Entrance Exams' },
  6  |   { name: 'Competitive', path: '/exams/competitive', heading: 'Competitive & Government Exams' },
  7  |   { name: 'Engineering Streams', path: '/exams/engineering-streams', heading: 'Engineering Stream Subjects' },
  8  |   { name: 'School', path: '/exams/school', heading: 'School & Foundation Exams' },
  9  |   { name: 'More Exams', path: '/exams/more-exams', heading: 'Other Important Exams' },
  10 | ]
  11 | 
  12 | examCategories.forEach(({ name, path, heading }) => {
  13 |   test.describe(`${name} Exams Page`, () => {
  14 |     test.beforeEach(async ({ page }) => {
  15 |       await page.goto(path)
  16 |     })
  17 | 
  18 |     test(`should load ${name} page successfully`, async ({ page }) => {
> 19 |       await expect(page.locator('h1')).toContainText(name)
     |                                        ^ Error: expect(locator).toContainText(expected) failed
  20 |       await expect(page.locator(`text=${heading}`)).toBeVisible()
  21 |     })
  22 | 
  23 |     test(`should display exam cards for ${name}`, async ({ page }) => {
  24 |       // Each page should have exam cards
  25 |       const examCards = page.locator('.exam-card')
  26 |       await expect(examCards.first()).toBeVisible()
  27 |     })
  28 | 
  29 |     test(`should have CTA button on ${name} page`, async ({ page }) => {
  30 |       const ctaButton = page.locator('text=Start Preparing Free').or(page.locator('text=Start Learning Free'))
  31 |       await expect(ctaButton.first()).toBeVisible()
  32 |     })
  33 | 
  34 |     test(`should navigate to register on CTA click`, async ({ page }) => {
  35 |       const ctaButton = page.locator('text=Start Preparing Free').or(page.locator('text=Start Learning Free'))
  36 |       await ctaButton.first().click()
  37 |       await expect(page).toHaveURL(/.*auth\/register/)
  38 |     })
  39 |   })
  40 | })
  41 | 
  42 | test.describe('Exam Navigation from Home', () => {
  43 |   test.beforeEach(async ({ page }) => {
  44 |     await page.goto('/')
  45 |   })
  46 | 
  47 |   test('should navigate to all exam category pages', async ({ page }) => {
  48 |     for (const { path } of examCategories) {
  49 |       // Find and click the exam category link
  50 |       const categoryLink = page.locator(`a[href="${path}"]`)
  51 |       if (await categoryLink.count() > 0) {
  52 |         await categoryLink.first().click()
  53 |         await expect(page).toHaveURL(new RegExp(path))
  54 |         await page.goto('/') // Go back to home
  55 |       }
  56 |     }
  57 |   })
  58 | })
```