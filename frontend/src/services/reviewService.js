import api from './api.js';

export const getReviewsRequest = () => {
  return api.get('/reviews');
};

export const createReviewRequest = (reviewData) => {
  return api.post('/reviews', reviewData);
};

export const updateReviewRequest = (id, reviewData) => {
  return api.put(`/reviews/${id}`, reviewData);
};

export const deleteReviewRequest = (id) => {
  return api.delete(`/reviews/${id}`);
};
