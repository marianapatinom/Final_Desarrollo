# Backend - Restaurant Reviews API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

API REST construida con Node.js, Express, MongoDB, Mongoose y JWT para gestionar reseñas de restaurantes.

## Requisitos

- Node.js 18 o superior
- MongoDB local o MongoDB Atlas

## Instalacion

```bash
cd backend
npm install
```

## Variables de entorno

Copia `.env.example` a `.env`:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/restaurant_reviews
JWT_SECRET=change_this_secret_for_development
```

## Ejecutar

```bash
npm run dev
```

### Sembrar Datos de Prueba (Opcional)
Para poblar automáticamente la base de datos MongoDB local con 2 usuarios y 15 opiniones de prueba, ejecuta:

```bash
npm run seed
```

Para produccion:

```bash
npm start
```

## Endpoints

### Auth

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesion |

### Reviews

| Metodo | Ruta | Protegida | Descripcion |
| --- | --- | --- | --- |
| GET | `/api/reviews` | No | Ver todas las reseñas |
| POST | `/api/reviews` | Si | Crear reseña |
| PUT | `/api/reviews/:id` | Si | Editar reseña propia |
| DELETE | `/api/reviews/:id` | Si | Eliminar reseña propia |

## Seguridad

- Las passwords se guardan con hash usando bcrypt.
- El login genera un JWT valido por 1 dia.
- Las rutas de crear, editar y eliminar reseñas validan el token.
- El servicio de reseñas verifica que el usuario autenticado sea dueño de la reseña antes de editarla o eliminarla.

## Datos de prueba

Registro:

```json
{
  "nombre": "Ana Perez",
  "email": "ana@example.com",
  "password": "123456"
}
```

Crear reseña:

```json
{
  "restaurante": "La Mesa Feliz",
  "calificacion": 5,
  "fechaVisita": "2026-05-28",
  "observaciones": "La atencion fue muy buena y la comida estuvo deliciosa."
}
```
