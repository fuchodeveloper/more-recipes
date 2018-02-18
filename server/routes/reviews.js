import express from 'express';
import ReviewsController from '../controllers/ReviewsController';
import Authorization from '../middleware/Authorization';

const reviews = express.Router();

/**
 * Recipe review routes
 */

reviews.post(
  '/:id/reviews',
  Authorization.verifyToken, ReviewsController.create
);
reviews.get('/:id/reviews', ReviewsController.get);

export default reviews;
