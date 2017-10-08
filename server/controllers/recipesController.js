import dotenv from 'dotenv';
import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import db from '../models/';

const { Recipes } = db;

/**
 * Get secret key from environment variable
 */
dotenv.config();
const secret = process.env.SECRET_TOKEN;

const recipeController = {
  create(request, response) {
    const { body } = request;
    const rules = {
      recipeName: 'required|min:3',
      ingredient: 'required',
      recipeDirection: 'required:min:6'
    };

    const validation = new Validator(body, rules);
    if (validation.fails()) {
      return response.json({ error: validation.errors.all() });
    }

    Recipes.create({
      userId: request.decoded.id,
      recipeName: request.body.recipeName,
      ingredientQuantity: request.body.ingredientQuantity,
      ingredient: request.body.ingredient,
      recipeDirection: request.body.recipeDirection,
      recipeImage: request.body.recipeImage
    })
      .then(recipe => response.status(201)
        .json({ message: 'Recipe created successfully ', recipe }))
      .catch(error => response.status(404)
        .send(error.message));
  },

  /**
   * Get a single recipe
   * @param {any} request
   * @param {any} response
   * @returns {obj} json
   */
  get(request, response) {
    return Recipes
      .findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          response.status(404)
            .json({ message: 'Recipe not found' });
        }
        return recipe
          .update({ views: recipe.views + 1 });
      })
      .then((recipe) => {
        if (!recipe) {
          response.status(404)
            .json({ message: 'Recipe not found' });
        }
        response.status(200)
          .json({ recipe });
      })
      .catch(error => response.status(400)
        .json({ error: error.message }));
  },

  /**
   * Return all recipes;
   * @param {any} request
   * @param {any} response
   * @returns {obj} obj
   */
  getAll(request, response) {
    return Recipes
      .findAll()
      .then(recipes => response.status(200)
        .json({ message: recipes }))
      .catch(error => response.status(400)
        .json(error));
  },

  /**
   * Delete a recipe
   * @param {any} request
   * @param {any} response
   * @returns {json} json
   */
  delete(request, response) {
    return Recipes
      .findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          response.status(404)
            .json({ message: 'Recipe not found' });
        }
        if (request.decoded.id === recipe.userId) {
          return recipe
            .destroy()
            .then(recipeDeleted => response.status(200)
              .json({ message: 'Recipe deleted', recipeDeleted }))
            .catch(error => response.status(400)
              .json(error));
        }
        return response.json({ message: 'Only recipe owners can delete recipe.' });

        // }
      })
      .catch(error => response.status(400)
        .json(error));
  },

  /**
   * Update a recipe
   * @param {any} request
   * @param {any} response
   * @returns {json} json
   */
  update(request, response) {
    const { body } = request;
    return Recipes
      .findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          response.status(404)
            .json({ message: 'Recipe not found.' });
        }
        /**
         * Update the specified recipe and catch any errors
         */
        return Recipes
          .update({
            recipeName: body.recipeName,
            ingredientQuantity: body.ingredientQuantity,
            ingredient: body.ingredient,
            recipeDirection: body.recipeDirection,
            recipeImage: body.recipeImage
          }, { where: { id: request.params.id } })
          .then(updateSucess => response.status(201).json({ message: 'Recipe updated', updateSucess }));
      })
      .catch(error => response.status(400)
        .json({ error: error.message }));
  },

  /**
   * Sort recipes according to upvotes in descending order
   *
   * @param {any} request
   * @param {any} response
   * @returns {json} json
   */
  sort(request, response) {
    if (request.query.sort) {
      return Recipes
        .findAll({
          order: [
            ['upVotes', 'DESC']
          ]
        })
        .then(allSortedRecipes => response.status(200)
          .json({ SortedRecipes: allSortedRecipes }))
        .catch(error => response.status(400)
          .json({ error: error.message }));
    }
  }
};

export default recipeController;
