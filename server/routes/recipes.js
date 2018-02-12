import express from 'express';
import RecipesController from '../controllers/RecipesController';
import authorization from '../middleware/tokenMiddleware';

const router = express.Router();

/**
 * Routes to handle recipe operations
 */

// Allow an authenticated user create a new recipe
router.post(
  '/',
  authorization.verifyToken, RecipesController.createRecipe
);

// Get all the available recipes, get sorted recipes
router.get(
  '/',
  RecipesController.getAllRecipesPaginate, RecipesController.sortRecipes
);

// Get all the recipes created by a user
router.get(
  '/userRecipes',
  authorization.verifyToken, RecipesController.getAllForUser
);

// Get a particular recipe
router.get('/:id', authorization.injectToken, RecipesController.getRecipe);

// An authenticated user can delete their recipes
router.delete(
  '/:id',
  authorization.verifyToken, RecipesController.deleteRecipe
);

//  An authenticated user can update their recipes
router.put('/:id', authorization.verifyToken, RecipesController.updateRecipe);

// search for a recipe
router.post('/search', RecipesController.searchRecipes);

export default router;
