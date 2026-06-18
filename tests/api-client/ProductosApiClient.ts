import { APIRequestContext } from '@playwright/test';
import { API_BASE_URL } from '../support/env';

export class ProductosApiClient {

  constructor(
    private readonly request: APIRequestContext
  ) {}

  async health() {
    return this.request.get(
      `${API_BASE_URL}/api/health`
    );
  }

  async obtenerProductos() {
    return this.request.get(
      `${API_BASE_URL}/api/productos`
    );
  }

  async obtenerProducto(id: string) {
    return this.request.get(
      `${API_BASE_URL}/api/productos/${id}`
    );
  }

  async crearSolicitud(data: {
    nombre: string;
    producto: string;
  }) {

    return this.request.post(
      `${API_BASE_URL}/api/solicitudes`,
      {
        data
      }
    );
  }

  async eliminarSolicitud(id: string) {

    return this.request.delete(
      `${API_BASE_URL}/api/solicitudes/${id}`
    );
  }
}