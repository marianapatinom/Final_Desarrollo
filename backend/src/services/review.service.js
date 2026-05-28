import Review from '../models/Review.js';
import { AppError } from '../utils/AppError.js';

const validateReviewData = ({ titulo, descripcion, calificacion, restaurante }) => {
  if (!titulo || !descripcion || !calificacion || !restaurante) {
    throw new AppError('Todos los campos de la reseña son obligatorios', 400);
  }

  const numericRating = Number(calificacion);
  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    throw new AppError('La calificacion debe ser un numero entero entre 1 y 5', 400);
  }

  if (titulo.trim().length < 3) {
    throw new AppError('El titulo debe tener al menos 3 caracteres', 400);
  }

  if (descripcion.trim().length < 10) {
    throw new AppError('La descripcion debe tener al menos 10 caracteres', 400);
  }

  if (restaurante.trim().length < 2) {
    throw new AppError('El restaurante debe tener al menos 2 caracteres', 400);
  }
};

export const getAllReviews = async () => {
  return Review.find()
    .populate('usuario', 'nombre email')
    .sort({ createdAt: -1 });
};

export const createReview = async (reviewData, userId) => {
  validateReviewData(reviewData);

  return Review.create({
    titulo: reviewData.titulo,
    descripcion: reviewData.descripcion,
    calificacion: Number(reviewData.calificacion),
    restaurante: reviewData.restaurante,
    usuario: userId
  });
};

export const updateReview = async (reviewId, reviewData, userId) => {
  validateReviewData(reviewData);

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new AppError('Reseña no encontrada', 404);
  }

  if (review.usuario.toString() !== userId.toString()) {
    throw new AppError('No tienes permiso para editar esta reseña', 403);
  }

  review.titulo = reviewData.titulo;
  review.descripcion = reviewData.descripcion;
  review.calificacion = Number(reviewData.calificacion);
  review.restaurante = reviewData.restaurante;

  await review.save();
  return review.populate('usuario', 'nombre email');
};

export const deleteReview = async (reviewId, userId) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new AppError('Reseña no encontrada', 404);
  }

  if (review.usuario.toString() !== userId.toString()) {
    throw new AppError('No tienes permiso para eliminar esta reseña', 403);
  }

  await review.deleteOne();
};
