import express from 'express';
import FavoritesController from '../controllers/FavoritesController';
import authorization from '../middleware/tokenMiddleware';

const router = express.Router();

/**
 * Recipe favorite routes
 */
router.post(
  '/users/:id/recipes',
  authorization.verifyToken, FavoritesController.create
);
router.get(
  '/users/:id/recipes',
  authorization.verifyToken, FavoritesController.getAllFavorites
);
router.get(
  '/favorites/:id',
  FavoritesController.getFavoriteCount
);

router.get(
  '/favorites/:id/identifiers',
  authorization.injectToken,
  FavoritesController.getFavoriteIds
);

export default router;

