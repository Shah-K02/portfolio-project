const { test, expect } = require('@playwright/test');

test.describe('Theme toggle', () => {
  test('toggles the theme, updates the label, and persists across reload', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByRole('button', { name: /switch to (light|dark) mode/i });
    const initialLabel = (await toggle.textContent())?.trim();
    const startedDark = initialLabel === 'Dark';

    await toggle.click();

    await expect(page.locator('html')).toHaveAttribute(
      'data-theme',
      startedDark ? 'light' : 'dark'
    );
    await expect(toggle).toHaveText(startedDark ? 'Light' : 'Dark');

    await page.reload();

    await expect(page.locator('html')).toHaveAttribute(
      'data-theme',
      startedDark ? 'light' : 'dark'
    );
  });
});
