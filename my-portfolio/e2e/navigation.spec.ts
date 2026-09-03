const { test, expect } = require('@playwright/test');

const sections = [
  { label: 'Home', id: 'introduction' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

test.describe('Section navigation', () => {
  test('clicking each nav node scrolls to and activates its section', async ({ page }) => {
    await page.goto('/');

    for (const { label, id } of sections) {
      const navButton = page.getByRole('button', { name: `Navigate to ${label} section` });
      await navButton.click();

      await expect(navButton).toHaveAttribute('aria-current', 'true');
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
  });

  test('scrolling the page updates which nav node is marked active', async ({ page }) => {
    await page.goto('/');

    await page.locator('#contact').scrollIntoViewIfNeeded();

    await expect(
      page.getByRole('button', { name: 'Navigate to Contact section' })
    ).toHaveAttribute('aria-current', 'true');
  });
});
