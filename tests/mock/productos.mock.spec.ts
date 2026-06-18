import { test, expect } from '@playwright/test';
import { ProductosPage } from '../pages/ProductosPage';

test(
  'muestra catálogo mockeado',
  async ({ page }) => {

    await page.route(
      'http://127.0.0.1:3001/api/productos',
      async route => {

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            total: 2,
            data: [
              {
                id: 'mock-1',
                nombre: 'Pizza Mock',
                categoria: 'Mock',
                etiqueta: 'Test',
                descripcion: 'Producto de prueba',
                precio: '1 €',
                icono: '🍕'
              },
              {
                id: 'mock-2',
                nombre: 'Hamburguesa Mock',
                categoria: 'Mock',
                etiqueta: 'Test',
                descripcion: 'Producto de prueba',
                precio: '2 €',
                icono: '🍔'
              }
            ]
          })
        });
      }
    );

    const productosPage =
      new ProductosPage(page);

    await productosPage.abrirDesdeApi();

    await expect(
      productosPage.productos()
    ).toHaveCount(2);

    await expect(
      productosPage.productoPorNombre(
        'Pizza Mock'
      )
    ).toBeVisible();

    await expect(
      productosPage.productoPorNombre(
        'Hamburguesa Mock'
      )
    ).toBeVisible();
  }
);
test(
  'muestra mensaje cuando no hay productos',
  async ({ page }) => {

    await page.route(
      'http://127.0.0.1:3001/api/productos',
      async route => {

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            total: 0,
            data: []
          })
        });
      }
    );

    const productosPage =
      new ProductosPage(page);

    await productosPage.abrirDesdeApi();

    await expect(
      productosPage.productos()
    ).toHaveCount(0);

    await expect(
      productosPage.mensajeSinResultados()
    ).toBeVisible();
  }
);
test(
  'muestra error cuando la API falla',
  async ({ page }) => {

    await page.route(
      'http://127.0.0.1:3001/api/productos',
      async route => {

        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            message: 'Error interno'
          })
        });
      }
    );

    const productosPage =
      new ProductosPage(page);

    await productosPage.abrirDesdeApi();

    await expect(
  page.getByRole('heading', {
    name: /no se pudo cargar el catalogo/i
  })
).toBeVisible();
  }
);