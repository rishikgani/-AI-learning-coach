# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: exams.spec.ts >> Medical Exams Page >> should navigate to register on CTA click
- Location: e2e\exams.spec.ts:34:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=Start Preparing Free').or(locator('text=Start Learning Free')).first()

```

# Page snapshot

```yaml
- dialog "Unhandled Runtime Error" [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - navigation [ref=e7]:
          - button "previous" [disabled] [ref=e8]:
            - img "previous" [ref=e9]
          - button "next" [disabled] [ref=e11]:
            - img "next" [ref=e12]
          - generic [ref=e14]: 1 of 1 error
          - generic [ref=e15]:
            - text: Next.js (14.2.5) is outdated
            - link "(learn more)" [ref=e17] [cursor=pointer]:
              - /url: https://nextjs.org/docs/messages/version-staleness
        - button "Close" [ref=e18] [cursor=pointer]
      - heading "Unhandled Runtime Error" [level=1] [ref=e23]
      - paragraph [ref=e24]: "Error: Slot failed to slot onto its children. Expected a single React element child or `Slottable`."
    - generic [ref=e25]:
      - heading "Call Stack" [level=2] [ref=e26]
      - generic [ref=e27]:
        - heading "eval" [level=3] [ref=e28]
        - generic [ref=e29]: node_modules\@radix-ui\react-slot\dist\index.mjs (44:1)
      - group [ref=e31]:
        - generic "React" [ref=e32] [cursor=pointer]
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
  19 |       await expect(page.locator('h1')).toContainText(name)
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
> 36 |       await ctaButton.first().click()
     |                               ^ Error: locator.click: Test timeout of 30000ms exceeded.
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