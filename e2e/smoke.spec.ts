import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/SpenTrade/);
});

test('navbar has home link', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
});
