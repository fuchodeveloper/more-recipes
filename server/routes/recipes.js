import express from 'express';
import RecipesController from '../controllers/RecipesController';
import Authorization from '../middleware/Authorization';

const recipes = express.Router();

/**
 * Routes to handle recipe operations
 */

// Allow an authenticated user create a new recipe
recipes.post(
  '/',
  Authorization.verifyToken, RecipesController.createRecipe
);

// Get all the available recipes, get sorted recipes
recipes.get(
  '/',
  RecipesController.getAllRecipesPaginate, RecipesController.sortRecipes
);

// Get all the recipes created by a user
recipes.get(
  '/userRecipes',
  Authorization.verifyToken, RecipesController.getAllForUser
);

// Get a particular recipe
recipes.get('/:id', Authorization.injectToken, RecipesController.getRecipe);

// An authenticated user can delete their recipes
recipes.delete(
  '/:id',
  Authorization.verifyToken, RecipesController.deleteRecipe
);

//  An authenticated user can update their recipes
recipes.put('/:id', Authorization.verifyToken, RecipesController.updateRecipe);

// search for a recipe
recipes.post('/search', RecipesController.searchRecipes);

export default recipes;
