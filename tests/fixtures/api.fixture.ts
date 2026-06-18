import { test as base } from '@playwright/test';
import { ProductosApiClient } from '../api-client/ProductosApiClient';

type ApiFixtures = {
  api: ProductosApiClient;
};

export const test = base.extend<ApiFixtures>({
  api: async ({ request }, use) => {

    const api =
      new ProductosApiClient(request);

    await use(api);
  }
});

export { expect } from '@playwright/test';