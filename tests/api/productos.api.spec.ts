import { test, expect } from '@playwright/test';
import { API_BASE_URL } from '../support/env';

test.describe('API Delicias Express', () => {

  test('health check', async ({ request }) => {

    const response =
      await request.get(
        `${API_BASE_URL}/api/health`
      );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.status).toBe('ok');
  });

  test('obtiene productos', async ({ request }) => {

  const response =
    await request.get(
      `${API_BASE_URL}/api/productos`
    );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.total).toBeGreaterThan(0);

  expect(Array.isArray(body.data))
    .toBeTruthy();
});

test('obtiene producto por id', async ({ request }) => {

  const response =
    await request.get(
      `${API_BASE_URL}/api/productos/lasana-casera`
    );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe('lasana-casera');
  expect(body.nombre).toBe('Lasaña casera');
  expect(body.categoria).toBe('Pasta');
});
test('crea solicitud', async ({ request }) => {

  const response =
    await request.post(
      `${API_BASE_URL}/api/solicitudes`,
      {
        data: {
          nombre: 'Miguel',
          producto: 'lasana-casera'
        }
      }
    );

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.nombre).toBe('Miguel');
  expect(body.producto).toBe('lasana-casera');
  expect(body.id).toBeTruthy();
});

test('crea y elimina solicitud', async ({ request }) => {

  const crear =
    await request.post(
      `${API_BASE_URL}/api/solicitudes`,
      {
        data: {
          nombre: 'Miguel',
          producto: 'lasana-casera'
        }
      }
    );

  expect(crear.status()).toBe(201);

  const solicitud =
    await crear.json();

  const eliminar =
    await request.delete(
      `${API_BASE_URL}/api/solicitudes/${solicitud.id}`
    );

  expect(eliminar.status()).toBe(204);
});

});