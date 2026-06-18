import http from 'node:http';
import crypto from 'node:crypto';

const PORT = 3001;

const productos = [
  {
    id: 'lasana-casera',
    nombre: 'Lasaña casera',
    categoria: 'Pasta',
    etiqueta: 'Familiar',
    descripcion: 'Lasaña al horno con carne, tomate y bechamel.',
    precio: '7,95 €',
    icono: '🍝'
  },
  {
    id: 'ensalada-mediterranea',
    nombre: 'Ensalada mediterránea',
    categoria: 'Ensaladas',
    etiqueta: 'Saludable',
    descripcion: 'Lechuga, tomate, aceitunas, queso fresco y aceite de oliva.',
    precio: '5,95 €',
    icono: '🥗'
  },
  {
    id: 'pollo-curry',
    nombre: 'Pollo al curry',
    categoria: 'Carnes',
    etiqueta: 'Especiado',
    descripcion: 'Pollo tierno con salsa curry y arroz basmati.',
    precio: '8,50 €',
    icono: '🍛'
  },
  {
    id: 'crema-calabaza',
    nombre: 'Crema de calabaza',
    categoria: 'Cremas',
    etiqueta: 'Vegetal',
    descripcion: 'Crema suave de calabaza con un toque de jengibre.',
    precio: '4,95 €',
    icono: '🥣'
  },
  {
    id: 'bowl-vegetal',
    nombre: 'Bowl vegetal',
    categoria: 'Vegetal',
    etiqueta: 'Saludable',
    descripcion: 'Quinoa, garbanzos, aguacate, verduras y salsa ligera.',
    precio: '7,25 €',
    icono: '🥙'
  },
  {
    id: 'albondigas-tomate',
    nombre: 'Albóndigas con tomate',
    categoria: 'Carnes',
    etiqueta: 'Tradicional',
    descripcion: 'Albóndigas caseras con salsa de tomate natural.',
    precio: '7,75 €',
    icono: '🍅'
  },
  {
    id: 'tortilla-patata',
    nombre: 'Tortilla de patata',
    categoria: 'Tradicional',
    etiqueta: 'Clásico',
    descripcion: 'Tortilla jugosa de patata y cebolla.',
    precio: '5,50 €',
    icono: '🥔'
  },
  {
    id: 'arroz-verduras',
    nombre: 'Arroz con verduras',
    categoria: 'Arroces',
    etiqueta: 'Vegetal',
    descripcion: 'Arroz salteado con verduras frescas de temporada.',
    precio: '6,75 €',
    icono: '🍚'
  },
  {
    id: 'pasta-carbonara',
    nombre: 'Pasta carbonara',
    categoria: 'Pasta',
    etiqueta: 'Cremoso',
    descripcion: 'Pasta con salsa carbonara, queso y panceta.',
    precio: '7,50 €',
    icono: '🍜'
  },
  {
    id: 'salmon-patatas',
    nombre: 'Salmón con patatas',
    categoria: 'Pescados',
    etiqueta: 'Saludable',
    descripcion: 'Salmón al horno con patatas panadera.',
    precio: '9,95 €',
    icono: '🐟'
  }
];
const solicitudes = [];

function json(res, status, body) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*'
  });

  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {

  if (req.method === 'GET' && req.url === '/api/health') {

    return json(res, 200, {
      status: 'ok',
      service: 'delicias-api'
    });
  }

  // GET /api/productos/:id
  if (
    req.method === 'GET' &&
    req.url.startsWith('/api/productos/')
  ) {

    const id = req.url.split('/').pop();

    const producto = productos.find(
      (p) => p.id === id
    );

    if (!producto) {
      return json(res, 404, {
        message: 'Producto no encontrado'
      });
    }

    return json(res, 200, producto);
  }

  // GET /api/productos
  if (req.method === 'GET' && req.url.startsWith('/api/productos')) {

    const url = new URL(req.url, `http://127.0.0.1:${PORT}`);

    const q = url.searchParams.get('q');
    const categoria = url.searchParams.get('categoria');
    const etiqueta = url.searchParams.get('etiqueta');

    let resultado = [...productos];

    if (q) {
      resultado = resultado.filter((p) =>
        JSON.stringify(p)
          .toLowerCase()
          .includes(q.toLowerCase())
      );
    }

    if (categoria) {
      resultado = resultado.filter(
        (p) => p.categoria === categoria
      );
    }

    if (etiqueta) {
      resultado = resultado.filter(
        (p) => p.etiqueta === etiqueta
      );
    }

    return json(res, 200, {
      total: resultado.length,
      data: resultado
    });
  }

  if (
    req.method === 'HEAD' &&
    req.url.startsWith('/api/productos')
  ) {

    res.writeHead(200, {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*'
    });

    return res.end();
  }

  if (
    req.method === 'OPTIONS' &&
    req.url.startsWith('/api/productos')
  ) {

    res.writeHead(204, {
      Allow: 'GET,HEAD,OPTIONS',
      'access-control-allow-origin': '*'
    });

    return res.end();
  }
  if (
  req.method === 'POST' &&
  req.url === '/api/solicitudes'
) {

  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {

    try {

      const solicitud = JSON.parse(body);

      const nuevaSolicitud = {
        id: crypto.randomUUID(),
        ...solicitud
      };

      solicitudes.push(nuevaSolicitud);

      return json(res, 201, nuevaSolicitud);

    } catch (error) {

      return json(res, 400, {
        message: 'JSON inválido'
      });

    }

  });

  return;
}
if (
  req.method === 'DELETE' &&
  req.url.startsWith('/api/solicitudes/')
) {

  const id = req.url.split('/').pop();

  const indice = solicitudes.findIndex(
    (s) => s.id === id
  );

  if (indice === -1) {

    return json(res, 404, {
      message: 'Solicitud no encontrada'
    });
  }

  solicitudes.splice(indice, 1);

  res.writeHead(204);

  return res.end();
}


  return json(res, 404, {
    message: 'Not Found'
  });
});

server.listen(PORT, () => {
  console.log(
    `Delicias API escuchando en http://127.0.0.1:${PORT}`
  );
});