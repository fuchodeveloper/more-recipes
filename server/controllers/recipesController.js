import Validator from 'validatorjs';
import Sequelize from 'sequelize';
import jwtDecode from 'jwt-decode';
import db from '../models/';


const { Op } = Sequelize;
const { Recipes, Reviews, User } = db;

const recipeController = {

  /**
   * Create a new recipe
   *
   * @param {any} request - HTTP Request
   * @param {any} response - HTTP Response
   * @returns {object} Returned object
   */
  createRecipe(request, response) {
    const { body } = request;
    const rules = {
      recipeName: 'required|min:3',
      ingredient: 'required',
      recipeDirection: 'required|min:6'
    };

    const validation = new Validator(body, rules);
    if (validation.fails()) {
      return response.json({ error: validation.errors.all() });
    }

    Recipes.create({
      userId: request.decoded.id,
      recipeName: request.body.recipeName.trim().toLowerCase(),
      ingredient: request.body.ingredient.trim().toLowerCase(),
      recipeDirection: request.body.recipeDirection.trim().toLowerCase(),
      recipeImage: request.body.recipeImage
    })
      .then(recipe => response.status(201)
        .json({ message: 'Recipe created successfully ', recipe }))
      .catch(error => response.status(400)
        .json({ error: error.message }));
  },

  /**
   * Get a single recipe
   * @param {any} request - HTTP Request
   * @param {any} response - HTTP Response
   * @returns {object} json - Returned object
   */
  getRecipe(request, response) {
    const token =
    request.body.token ||
    request.query.token ||
    request.headers['x-access-token'];

    return Recipes
      .findOne({
        where: { id: request.params.id },
        include: [{
          attributes: ['id', 'review'],
          model: Reviews,
          include: [{
            attributes: ['firstName'],
            model: User
          }]
        }]
      })
      .then((recipe) => {
        if (!recipe) {
          return response.status(404)
            .json({ error: 'Recipe not found' });
        }

        response.status(200)
          .json({ recipe });

        if (!token) {
          return recipe
            .update({ views: recipe.views + 1 });
        }

        const decoded = jwtDecode(token);
        if (decoded.id === recipe.userId && recipe.recipeOwnerView === false) {
          return recipe
            .update({ views: recipe.views + 1, recipeOwnerView: true });
        } else if (decoded.id !== recipe.userId) {
          return recipe
            .update({ views: recipe.views + 1 });
        }
      })
      .catch(error => response.status(400)
        .json({ error: error.message }));
  },

  /**
   * Return all recipes with pagination
   * @param {any} request - HTTP Request
   * @param {any} response - HTTP Response
   * @param {any} next - next request
   * @returns {object} Returned object
   */
  getAllRecipesPaginate(request, response, next) {
    if (request.query.sort === 'upvotes') {
      return next();
    }
    const page = request.query.page || 1;
    const limit = request.query.limit || 9;
    const offset = (page - 1) * limit;

    return Recipes
      .findAndCountAll({
        limit,
        offset,
        order: [

          // Will sort recipes by latest ascending order
          ['createdAt', 'DESC']
        ]
      })
      .then((recipes) => {
        const totalCount = recipes.count;
        const pageCount = Math.ceil(totalCount / limit);
        const pageSize = recipes.rows.length;

        return response.status(200)
          .json({
            page, pageCount, pageSize, totalCount, recipes: recipes.rows
          });
      })
      .catch(error => response.status(400).json(error.message));
  },

  /**
   * Get all recipes for authenticated user
   * @param {any} request - HTTP Request
   * @param {any} response - HTTP Response
   * @returns {json} Returned json
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
        .json({ error: error.message }));
  },

  /**
   * Delete a recipe
   * @param {any} request - HTTP Request
   * @param {any} response - HTTP Response
   * @returns {json} Returned json
   */
  deleteRecipe(request, response) {
    return Recipes
      .findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          return response.status(404)
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
        return response.status(401).json({
          error: 'Only recipe owners can delete recipe.'
        });
      })
      .catch(error => response.status(400)
        .json({ error: error.message }));
  },

  /**
   * Update a recipe
   * @param {any} request - HTTP Request
   * @param {any} response - HTTP Response
   * @returns {json} Returned json
   */
  updateRecipe(request, response) {
    const { body } = request;
    return Recipes
      .findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          return response.status(404)
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
          .then(updateSuccess => response.status(204).json({
            message: 'Recipe updated', updateSuccess
          }));
      })
      .catch(error => response.status(400)
        .json({ error: error.message }));
  },

  /**
   * Sort recipes according to upvotes in descending order
   *
   * @param {any} request - HTTP Request
   * @param {any} response - HTTP Response
   * @returns {json} - Returned json
   */
  sortRecipes(request, response) {
    return Recipes
      .findAll({
        order: [
          ['upVotes', 'DESC']
        ]
      })
      .then(allSortedRecipes => response.status(200)
        .json({ recipes: allSortedRecipes }))
      .catch(error => response.status(400)
        .json({ error: error.message }));
  },
  /**
 * Search for a recipe
 *
 * @param {any} request - HTTP Request
 * @param {any} response - HTTP Response
 * @returns {object} Returned object
 */
  searchRecipes(request, response) {
    return Recipes
      .findAll({
        where: {
          recipeName: {
            [Op.like]: `%${request.body.search.trim().toLowerCase()}%`
          }
        }
      })
      .then((searchedRecipes) => {
        if (searchedRecipes.length === 0) {
          response.status(404).json({ error: 'Recipe not found!' });
        } else {
          response.status(200).json({ recipes: searchedRecipes });
        }
      })
      .catch(error => response.status(500).json({ error: error.message }));
  }
};

export default recipeController;
