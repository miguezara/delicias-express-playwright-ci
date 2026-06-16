import { test, expect } from '../fixtures/app.fixture';

test.describe('Responsive básico', () => {
  test('la página de productos funciona en viewport móvil', async ({ page, productosPage }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await productosPage.abrir();

    await expect(productosPage.titulo()).toBeVisible();
    await expect(productosPage.buscador.input()).toBeVisible();
  });

  test('la página de productos funciona en viewport tablet', async ({ page, productosPage }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    await productosPage.abrir();

    await expect(productosPage.titulo()).toBeVisible();
    await expect(productosPage.buscador.input()).toBeVisible();
  });
});