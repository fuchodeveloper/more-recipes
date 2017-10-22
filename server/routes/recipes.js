import express from 'express';
import recipesController from '../controllers/recipesController';
import authorization from '../middleware/tokenMiddleware';

const router = express.Router();

router.post('/', authorization.verifyToken, recipesController.create);

export default router;
