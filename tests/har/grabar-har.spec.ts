import { test, expect } from '@playwright/test';

test(
  'graba trafico HAR',
  async ({ browser }) => {

    const context =
      await browser.newContext({
        recordHar: {
          path: 'mocks/productos.har'
        }
      });

    const page =
      await context.newPage();

    await page.goto(
      'http://127.0.0.1:4173/productos.html?fuente=api'
    );

    await expect(
      page.locator('.producto-card')
    ).toHaveCount(10);

    await context.close();
  }
);