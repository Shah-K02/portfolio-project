const { test, expect } = require('@playwright/test');

test.describe('Project details modal', () => {
  test('opens on Details click, shows the dialog, and closes on Escape', async ({ page }) => {
    await page.goto('/');
    await page.locator('#projects').scrollIntoViewIfNeeded();

    const detailsButton = page.getByRole('button', { name: /view details of/i }).first();
    await detailsButton.waitFor({ state: 'visible' });
    await detailsButton.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });

  test('closes when clicking the close button', async ({ page }) => {
    await page.goto('/');
    await page.locator('#projects').scrollIntoViewIfNeeded();

    await page.getByRole('button', { name: /view details of/i }).first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await page.getByRole('button', { name: /close modal/i }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('closes when clicking outside the dialog (backdrop)', async ({ page }) => {
    await page.goto('/');
    await page.locator('#projects').scrollIntoViewIfNeeded();

    await page.getByRole('button', { name: /view details of/i }).first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Click near the top-left corner of the viewport, outside the centered dialog.
    await page.mouse.click(10, 10);
    await expect(dialog).not.toBeVisible();
  });
});
