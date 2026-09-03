const { test, expect } = require('@playwright/test');

const FORMSPREE_URL = 'https://formspree.io/f/xkopnbro';

test.describe('Contact form', () => {
  test('shows a success message after a successful submission', async ({ page }) => {
    await page.route(FORMSPREE_URL, (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
    );

    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();

    await page.getByLabel('Name').fill('Jane Recruiter');
    await page.getByLabel('Email').fill('jane@example.com');
    await page.getByLabel('Message').fill('Interested in chatting about an opportunity.');
    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByText(/message sent/i)).toBeVisible();
  });

  test('shows an error message when the request fails', async ({ page }) => {
    await page.route(FORMSPREE_URL, (route) => route.fulfill({ status: 500 }));

    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();

    await page.getByLabel('Name').fill('Jane Recruiter');
    await page.getByLabel('Email').fill('jane@example.com');
    await page.getByLabel('Message').fill('Hello.');
    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByText(/something went wrong/i)).toBeVisible();
  });

  test('blocks submission via native validation when required fields are empty', async ({
    page,
  }) => {
    let requestFired = false;
    await page.route(FORMSPREE_URL, (route) => {
      requestFired = true;
      route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });

    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();

    await page.getByRole('button', { name: /send message/i }).click();

    // Native HTML5 validation should block the submit; no network call is made
    // and the form should still be in its idle state.
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
    expect(requestFired).toBe(false);
  });
});
