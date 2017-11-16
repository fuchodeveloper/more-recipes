import express from 'express';
import recipesController from '../controllers/recipesController';
import authorization from '../middleware/tokenMiddleware';

const router = express.Router();

/**
 * Routes to handle recipe operations
 */

// Allow an authenticated user create a new recipe
router.post('/', authorization.verifyToken, recipesController.createRecipe);

// Get all the available recipes
router.get('/', recipesController.getAllRecipesPaginate);

// Get all the recipes created by a user
router.get('/get_all_for_user', authorization.verifyToken, recipesController.getAllForUser);

// Get a particular recipe
router.get('/:id', recipesController.getRecipe);

// An authenticated user can delete their recipes
router.delete('/:id', authorization.verifyToken, recipesController.deleteRecipe);

//  An authenticated user can update their recipes
router.put('/:id', authorization.verifyToken, recipesController.updateRecipe);

// GET most upvoted recipes in desc order
router.get('/?sort=upvotes&order=desc', recipesController.sortRecipes);

// search for a recipe
router.post('/search', recipesController.searchRecipes);

export default router;
