import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import reviewRoutes from './routes/review.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API de reseñas de restaurantes funcionando' });
});

app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use(errorHandler);

export default app;
