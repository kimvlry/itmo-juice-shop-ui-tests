const { test: base, expect } = require('@playwright/test');

const test = base.extend({
  catalog: async ({ page }, use) => {
    await page.goto('/#/search');
    await page.getByRole('button', { name: 'Close Welcome Banner' }).click();
    await page.getByRole('button', { name: 'dismiss cookie message' }).click();
    await expect(page.getByText('All Products', { exact: true })).toBeVisible();
    await use(page);
  },
});

module.exports = { test, expect };
