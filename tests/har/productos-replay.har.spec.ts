import { test, expect } from '@playwright/test';
import { ProductosPage } from '../pages/ProductosPage';

test(
  'usa trafico HAR grabado',
  async ({ page }) => {

    await page.routeFromHAR(
      'mocks/productos.har',
      {
        url: '**/api/productos**',
        update: false,
        notFound: 'fallback'
      }
    );

    const productosPage =
      new ProductosPage(page);

    await productosPage.abrirDesdeApi();

    await expect(
      productosPage.productos()
    ).toHaveCount(10);
  }
);