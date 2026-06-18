import { test, expect }
from '../fixtures/api.fixture';

test(
  'health usando fixture',
  async ({ api }) => {

    const response =
      await api.health();

    expect(
      response.status()
    ).toBe(200);

    const body =
      await response.json();

    expect(
      body.status
    ).toBe('ok');
  }
);