import Validator from 'validatorjs';
import Sequelize from 'sequelize';
// import validator from 'validator';
import db from '../models/';

const { Op } = Sequelize;
const { Recipes } = db;

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

    // const errors = {};
    // if (validator.isEmpty(body.recipeName)) {
    //   errors.recipeImage = 'Recipe name is required';
    // }

    Recipes.create({
      userId: request.decoded.id,
      recipeName: request.body.recipeName.trim().toLowerCase(),
      ingredient: request.body.ingredient.trim().toLowerCase(),
      recipeDirection: request.body.recipeDirection.trim().toLowerCase(),
      recipeImage: request.body.recipeImage
    })
      .then(recipe => response.status(201)
        .json({ message: 'Recipe created successfully ', recipe }))
      .catch(error => response.status(404)
        .json({ error: error.message }));
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
            .json({ error: 'Recipe not found' });
        }
        return recipe
          .update({ views: recipe.views + 1 });
      })
      .then((recipe) => {
        if (!recipe) {
          response.status(404)
            .json({ error: 'Recipe not found' });
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
      .findAll({
        order: [
          // Will sort recipes by latest ascending order
          ['createdAt', 'DESC']
        ]
      })
      .then(recipes => response.status(200)
        .json({ recipes }))
      .catch(error => response.status(400)
        .json(error));
  },

  /**
   * Get all recipes for authenticated user
   * @param {any} request
   * @param {any} response
   * @returns {json} json
   */
  getAllForUser(request, response) {
    return Recipes
      .findAll({
        where: { userId: request.decoded.id },
        order: [
          ['createdAt', 'DESC']
        ]
      })
      .then(recipes => response.status(200)
        .json({ recipes }))
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
              .json({ error: error.message }));
        }
        return response.json({ error: 'Only recipe owners can delete recipe.' });

        // }
      })
      .catch(error => response.status(400)
        .json({ error: error.message }));
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
            recipeName: body.recipeName.trim().toLowerCase(),
            ingredient: body.ingredient.trim().toLowerCase(),
            recipeDirection: body.recipeDirection.trim().toLowerCase(),
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
  },
  /**
 * Search for a recipe
 *
 * @param {any} request
 * @param {any} response
 * @returns {obj} obj
 */
  search(request, response) {
    return Recipes
      .findAll({
        where: {
          recipeName: {
            [Op.like]: `%${request.body.value.trim().toLowerCase()}%`
          }
        }
      })
      .then(recipe => response.status(200).json({ recipe }))
      .catch(error => response.status(404).json({ error }));
  }
};

export default recipeController;
