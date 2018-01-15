import express from 'express';
import reviewsController from '../controllers/reviewsController';
import authorization from '../middleware/tokenMiddleware';

const router = express.Router();

/**
 * Recipe review routes
 */

router.post(
  '/:id/reviews',
  authorization.verifyToken, reviewsController.create
);
router.get('/:id/reviews', reviewsController.get);

export default router;
