# Proyecto Full Stack - Reseñas de Restaurantes

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## 👥 Integrantes del Equipo
*   **Mariana Patiño Múnera**
*   **Mariana Gutiérrez Restrepo**
*   **Sebastian López Gutiérrez**

---

Aplicacion web full stack para gestionar reseñas de restaurantes. Incluye autenticacion JWT, CRUD de reseñas, validacion de dueño para editar/eliminar y visualizacion publica de todas las reseñas.

## Stack

### Frontend

- React + Vite
- React Router
- Axios
- Context API
- `sessionStorage` para guardar token y usuario
- CSS moderno responsive

### Backend

- Node.js
- Express
- MongoDB con Mongoose
- JWT
- bcrypt
- dotenv
- Arquitectura por capas

## Estructura del proyecto

```text
ParcialFinalDW/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.js
│   ├── .env.example
│   ├── package.json
│   ├── README.md
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── README.md
└── README.md
```

## Instalacion paso a paso

### 1. Backend

```bash
cd backend
npm install
```

Crea el archivo `.env` usando `.env.example`:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/restaurant_reviews
JWT_SECRET=mi_clave_secreta_para_el_parcial
```

Ejecuta el backend:

```bash
npm run dev
```

### 3. Sembrar Base de Datos (Opcional)
Para cargar automáticamente opiniones de prueba reales de los integrantes en la base de datos local de MongoDB, ejecuta en la carpeta `backend`:

```bash
npm run seed
```


### 2. Frontend

En otra terminal:

```bash
cd frontend
npm install
```

Crea el archivo `.env` usando `.env.example`:

```bash
VITE_API_URL=http://localhost:5000/api
```

Ejecuta el frontend:

```bash
npm run dev
```

Abre la URL que muestre Vite, normalmente `http://localhost:5173`.

## Endpoints principales

### Auth

| Metodo | Endpoint | Descripcion |
| --- | --- | --- |
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesion |

### Reviews

| Metodo | Endpoint | Protegido | Descripcion |
| --- | --- | --- | --- |
| GET | `/api/reviews` | No | Ver todas las reseñas |
| POST | `/api/reviews` | Si | Crear reseña |
| PUT | `/api/reviews/:id` | Si | Editar reseña propia |
| DELETE | `/api/reviews/:id` | Si | Eliminar reseña propia |

## Datos de prueba

Usuario:

```json
{
  "nombre": "Carlos Ruiz",
  "email": "carlos@example.com",
  "password": "123456"
}
```

Reseña:

```json
{
  "restaurante": "Sabor Central",
  "calificacion": 5,
  "fechaVisita": "2026-05-28",
  "observaciones": "El servicio fue rapido, la comida deliciosa y el ambiente muy agradable."
}
```

## Partes importantes del codigo

- El backend protege rutas privadas con `protect` en `backend/src/middlewares/auth.middleware.js`.
- El token se genera en `backend/src/utils/generateToken.js`.
- La validacion de ownership esta en `backend/src/services/review.service.js`; antes de editar o eliminar compara `review.usuario` contra el id del usuario autenticado.
- El frontend guarda token y usuario en `sessionStorage` dentro de `frontend/src/context/AuthContext.jsx`.
- Axios agrega el header `Authorization: Bearer token` automaticamente en `frontend/src/services/api.js`.
- Las rutas privadas se controlan con `frontend/src/routes/ProtectedRoute.jsx`.

## Screenshots sugeridos

- Login.
- Registro.
- Dashboard.
- Listado publico de reseñas.
- Formulario de crear reseña.
- Edicion de reseña propia.
- Vista donde un usuario no ve botones de editar/eliminar en reseñas ajenas.

## Nota academica

El proyecto no incluye `node_modules`. Para subirlo a GitHub, sube las carpetas `backend`, `frontend` y este `README.md`. Cada persona que descargue el proyecto debe ejecutar `npm install` en ambas carpetas.
