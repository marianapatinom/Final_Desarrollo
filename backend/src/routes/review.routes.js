import { Router } from 'express';
import {
  editReview,
  listReviews,
  removeReview,
  storeReview
} from '../controllers/review.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', listReviews);
router.post('/', protect, storeReview);
router.put('/:id', protect, editReview);
router.delete('/:id', protect, removeReview);

export default router;
