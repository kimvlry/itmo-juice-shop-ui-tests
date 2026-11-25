const { test, expect } = require('./catalog');

test.describe('Подробности товара', () => {
  const product = 'Apple Juice (1000ml)';
  let details;

  test.beforeEach(async ({ catalog }) => {
    await catalog.getByText(product, { exact: true }).click();
    details = catalog.getByRole('dialog').filter({
      has: catalog.getByRole('heading', { name: product, exact: true }),
    });
    await expect(details).toBeVisible();
  });

  test('Закрыть подробности товара', async ({ catalog }) => {
    await details.getByRole('button', { name: 'Close Dialog' }).click();
    await expect(details).toBeHidden();
    await expect(catalog.getByText(product, { exact: true })).toBeVisible();
  });

  test('Открыть отзывы', async () => {
    const reviews = details.getByRole('button', { name: /Reviews/ });
    await expect(reviews).toHaveAttribute('aria-expanded', 'false');
    await reviews.click();
    await expect(reviews).toHaveAttribute('aria-expanded', 'true');
    await expect(details.locator('.review-message').first()).toHaveText(/\S/);
  });

  test('Оставить отзыв без входа в аккаунт', async () => {
    await details.getByRole('button', { name: /Reviews/ }).click();
    const field = details.getByRole('textbox', { name: 'Text field to review a product' });
    const message = 'Приятный яблочный вкус.';
    await expect(field).toBeVisible();
    await field.fill(message);
    await details.getByRole('button', { name: 'Send the review' }).click();
    await expect(details.getByRole('listitem').filter({ hasText: message }).first()).toBeVisible();
  });
});
