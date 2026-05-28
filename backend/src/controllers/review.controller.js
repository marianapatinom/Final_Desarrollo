import {
  createReview,
  deleteReview,
  getAllReviews,
  updateReview
} from '../services/review.service.js';

export const listReviews = async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const storeReview = async (req, res, next) => {
  try {
    const review = await createReview(req.body, req.user.id);
    const populatedReview = await review.populate('usuario', 'nombre email');
    res.status(201).json(populatedReview);
  } catch (error) {
    next(error);
  }
};

export const editReview = async (req, res, next) => {
  try {
    const review = await updateReview(req.params.id, req.body, req.user.id);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

export const removeReview = async (req, res, next) => {
  try {
    await deleteReview(req.params.id, req.user.id);
    res.status(200).json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};
