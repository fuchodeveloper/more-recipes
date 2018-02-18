import express from 'express';
import FavoritesController from '../controllers/FavoritesController';
import Authorization from '../middleware/Authorization';

const favorites = express.Router();

/**
 * Recipe favorite routes
 */
favorites.post(
  '/users/:id/recipes',
  Authorization.verifyToken, FavoritesController.create
);
favorites.get(
  '/users/:id/recipes',
  Authorization.verifyToken, FavoritesController.getAllFavorites
);
favorites.get(
  '/favorites/:id',
  FavoritesController.getFavoriteCount
);

favorites.get(
  '/favorites/:id/identifiers',
  Authorization.injectToken,
  FavoritesController.getFavoriteIds
);

export default favorites;

