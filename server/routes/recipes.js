import express from 'express';
import recipesController from '../controllers/recipesController';
import authorization from '../middleware/tokenMiddleware';

const router = express.Router();

router.post('/', authorization.verifyToken, recipesController.create);
router.get('/', recipesController.getAll);
router.get('/:id', recipesController.get);
router.delete('/:id', authorization.verifyToken, recipesController.delete);

export default router;
