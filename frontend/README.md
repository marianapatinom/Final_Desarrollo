# Frontend - Restaurant Reviews

Aplicacion React + Vite para consumir la API de reseñas de restaurantes.

## Requisitos

- Node.js 18 o superior
- Backend ejecutandose en `http://localhost:5000`

## Instalacion

```bash
cd frontend
npm install
```

## Variables de entorno

Copia `.env.example` a `.env`:

```bash
VITE_API_URL=http://localhost:5000/api
```

## Ejecutar

```bash
npm run dev
```

Vite mostrara una URL como:

```bash
http://localhost:5173
```

## Funcionalidades

- Registro de usuarios.
- Login con JWT.
- Token guardado en `sessionStorage`.
- Rutas privadas con React Router.
- Listado publico de todas las reseñas.
- Crear reseñas solo con usuario autenticado.
- Editar y eliminar solo reseñas propias.
- Formularios con validaciones.
- Estados de carga y mensajes de error.

## Paginas

- `/login`: inicio de sesion.
- `/register`: registro.
- `/dashboard`: panel privado.
- `/reviews`: listado publico.
- `/reviews/new`: crear reseña.
- `/reviews/:id/edit`: editar reseña propia.

## Screenshots sugeridos

Para la entrega academica se recomienda capturar:

- Pantalla de login.
- Pantalla de registro.
- Listado de reseñas.
- Formulario de crear reseña.
- Botones de editar/eliminar visibles solo en reseñas propias.
