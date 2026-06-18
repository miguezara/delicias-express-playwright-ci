import { test, expect } from '../fixtures/api.fixture';
import { ProductosPage } from '../pages/ProductosPage';

test(
  'API y UI muestran el mismo número de productos',
  async ({ api, page }) => {

    const response =
      await api.obtenerProductos();

    expect(
      response.status()
    ).toBe(200);

    const body =
      await response.json();

    const productosPage =
      new ProductosPage(page);

    await productosPage.abrirDesdeApi();

    await expect(
      productosPage.productos()
    ).toHaveCount(body.total);
  }
);

test(
  'API y UI muestran los mismos nombres',
  async ({ api, page }) => {

    const response =
      await api.obtenerProductos();

    const body =
      await response.json();

    const productosPage =
      new ProductosPage(page);

    await productosPage.abrirDesdeApi();

    for (const producto of body.data) {

      await expect(
        productosPage.productoPorNombre(
          producto.nombre
        )
      ).toBeVisible();
    }
  }
);
test(
  'espera respuesta API y valida UI',
  async ({ page }) => {

    const productosPage =
      new ProductosPage(page);

    const responsePromise =
      page.waitForResponse(
        response =>
          response.url().includes('/api/productos')
          &&
          response.status() === 200
      );

    await productosPage.abrirDesdeApi();

    const response =
      await responsePromise;

    const body =
      await response.json();

    await expect(
      productosPage.productos()
    ).toHaveCount(body.total);
  }
);