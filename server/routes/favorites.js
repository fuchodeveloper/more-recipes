import express from 'express';
import favoritesController from '../controllers/favoritesController';
import authorization from '../middleware/tokenMiddleware';

const router = express.Router();

/**
 * Recipe favorite routes
 */
router.post('/users/:id/recipes', authorization.verifyToken, favoritesController.create);
router.get('/users/:id/recipes', authorization.verifyToken, favoritesController.getAll);
router.get('/favorites/:id', favoritesController.getFavoriteCount);

export default router;

