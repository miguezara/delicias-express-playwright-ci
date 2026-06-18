import { test, expect } from '@playwright/test';
import { ProductosPage } from '../pages/ProductosPage';

test(
  'graba trafico HAR',
  async ({ page }) => {

    const productosPage =
      new ProductosPage(page);

    await productosPage.abrirDesdeApi();

    await expect(
      productosPage.productos()
    ).toHaveCount(10);
  }
);