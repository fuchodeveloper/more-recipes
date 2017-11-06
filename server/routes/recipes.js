import express from 'express';
import recipesController from '../controllers/recipesController';
import authorization from '../middleware/tokenMiddleware';

const router = express.Router();

/**
 * Routes to handle recipe operations
 */

router.post('/', authorization.verifyToken, recipesController.create);
router.get('/', recipesController.getAll);
router.get('/get_all_for_user', authorization.verifyToken, recipesController.getAllForUser);
router.get('/:id', recipesController.get);
router.delete('/:id', authorization.verifyToken, recipesController.delete);
router.put('/:id', authorization.verifyToken, recipesController.update);
router.get('/?sort=upvotes&order=desc', recipesController.sort); // GET most upvoted recipes in desc order
router.post('/search', recipesController.search); // search for a recipe

export default router;
