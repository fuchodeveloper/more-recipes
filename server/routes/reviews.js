import express from 'express';
import ReviewsController from '../controllers/ReviewsController';
import authorization from '../middleware/tokenMiddleware';

const router = express.Router();

/**
 * Recipe review routes
 */

router.post(
  '/:id/reviews',
  authorization.verifyToken, ReviewsController.create
);
router.get('/:id/reviews', ReviewsController.get);

export default router;
