import { test, expect } from '@playwright/test';
import { ProductosApiClient } from '../api-client/ProductosApiClient';

test('health usando api client', async ({ request }) => {

  const api =
    new ProductosApiClient(request);

  const response =
    await api.health();

  expect(response.status()).toBe(200);

  const body =
    await response.json();

  expect(body.status).toBe('ok');
});