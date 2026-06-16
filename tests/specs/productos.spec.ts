import { test, expect } from '../fixtures/app.fixture';
import { PRODUCTOS_ESPERADOS } from '../data/productos';

test.describe('Productos', () => {
  test('muestra todas las cards al entrar', async ({ productosPage }) => {
    await productosPage.abrir();

    await productosPage.comprobarCargada();
    await productosPage.comprobarCantidad(PRODUCTOS_ESPERADOS.length);
  });

  test('valida algunos datos concretos del catálogo', async ({ productosPage }) => {
    await productosPage.abrir();
  
    await expect(productosPage.productoPorNombre('Lasaña casera')).toContainText('Categoría: Pasta');
    await expect(productosPage.productoPorNombre('Bowl vegetal')).toContainText('Etiqueta: Saludable');
    await expect(productosPage.productoPorNombre('Salmón con patatas')).toContainText('9,95 €');
  });
  
  test('todos los productos muestran un precio con formato correcto', async ({ productosPage }) => {
    await productosPage.abrir();
  
    for (const producto of PRODUCTOS_ESPERADOS) {
      await expect(
        productosPage.productoPorNombre(producto.nombre)
      ).toContainText(producto.precio);
    }
  });
})