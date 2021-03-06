import Sequelize from 'sequelize';
import db from '../models/';
import validateId from '../validations/validateId';
import validateRecipes from '../validations/validateRecipes';


const { Op } = Sequelize;
const {
  Recipes, Reviews, User, Favorites
} = db;

const recipeController = {

  /**
   * @description Create a new recipe
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} Returned object
   */
  createRecipe(request, response) {
    const { body } = request;
    const decodedId = request.user.id;

    const { errors, isValid } = validateRecipes(body);
    if (!isValid) {
      return response.status(400).json({ error: errors });
    }

    Recipes.create({
      userId: decodedId,
      name: request.body.name.trim().toLowerCase(),
      ingredients: request.body.ingredients.trim().toLowerCase(),
      direction: request.body.direction.trim().toLowerCase(),
      image: request.body.image
    })
      .then(recipe => response.status(201)
        .json({ message: 'Recipe created successfully', recipe }))
      .catch(() => response.status(500)
        .json({ error: 'An unexpected error occurred' }));
  },

  /**
   * @description Get a single recipe
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {Object} recipe
   */
  getRecipe(request, response) {
    const { error } = validateId(request.params.id, response);

    if (error) return response.status(400).json({ error });

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

        if (request.user) {
          const decodedId = request.user.id;
          Favorites.findOne({
            where: {
              userId: decodedId,
              recipeId: request.params.id
            }
          })
            .then((favorite) => {
              if (favorite) {
                return response.status(200).json({ recipe, favorited: true });
              }

              if (decodedId === recipe.userId &&
                recipe.recipeOwnerView === false) {
                recipe
                  .update({ views: recipe.views + 1, recipeOwnerView: true });
              } else if (decodedId !== recipe.userId) {
                recipe
                  .update({ views: recipe.views + 1 });
              }

              return response.status(200).json({ recipe, favorited: false });
            });
        } else {
          recipe
            .update({ views: recipe.views + 1 });
          return response.status(200)
            .json({ recipe, favorited: false });
        }
      })
      .catch(() => response.status(500)
        .json({ error: 'An unexpected error occurred' }));
  },

  /**
   * @description Return all recipes with pagination
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @param {Function} next - next request
   *
   * @returns {Object} Returned object
   */
  getAllRecipesPaginate(request, response, next) {
    if (request.query.sort === 'upvotes') {
      return next();
    }

    const page = Number.isInteger(parseInt(request.query.page, 10))
  && request.query.page > 0 ? request.query.page : 1;
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
      .catch(() => response.status(500).json({
        error: 'An unexpected error occurred'
      }));
  },

  /**
   * @description Get all recipes for authenticated user
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {Object} recipes
   */
  getAllForUser(request, response) {
    const decodedId = request.user.id;
    const page = request.query.page || 1;
    const limit = request.query.limit || 9;
    const offset = (page - 1) * limit;

    return Recipes
      .findAndCountAll({
        limit,
        offset,
        where: { userId: decodedId },
        order: [
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
      .catch(() => response.status(500)
        .json({ error: 'An unexpected error occurred' }));
  },

  /**
   * @description Delete a recipe
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {String} message
   */
  deleteRecipe(request, response) {
    /**
     * @description validate request id
     */
    validateId(request.params.id, response);

    const decodedId = request.user.id;

    return Recipes
      .findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          return response.status(404)
            .json({ message: 'Recipe not found' });
        }
        if (decodedId === recipe.userId) {
          return recipe
            .destroy()
            .then(() => {
              response.status(200)
                .json({
                  message: 'Recipe deleted',
                  recipes: request.params.id
                });
            })
            .catch(error => response.status(400)
              .json({ error: error.message }));
        }
        return response.status(403).json({
          error: 'Only recipe owners can delete recipe.'
        });
      })
      .catch(() => response.status(500)
        .json({ error: 'An unexpected error occurred' }));
  },

  /**
   * @description Update a recipe
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {Object} recipe
   */
  updateRecipe(request, response) {
    /**
     * @description validate request id
     */
    validateId(request.params.id, response);

    const { body } = request;

    /**
     * @description validate recipe update input
     */
    const { errors, isValid } = validateRecipes(body);
    if (!isValid) {
      return response.status(400).json({ error: errors });
    }

    /**
     * Destructure body
     */
    const name = body.name.trim().toLowerCase();
    const ingredients = body.ingredients.trim().toLowerCase();
    const direction = body.direction.trim().toLowerCase();
    const { image } = body;

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
            name: name ? name : recipe.name,
            ingredients: ingredients ? ingredients : recipe.body,
            direction: direction ? direction : recipe.direction,
            image: image ? image : recipe.image
          }, { where: { id: request.params.id } })
          .then(updateSuccess => response.status(200).json({
            message: 'Recipe updated', recipe: updateSuccess
          }));
      })
      .catch(() => response.status(500)
        .json({ error: 'An unexpected error occurred' }));
  },

  /**
   * Sort recipes according to upvotes in descending order
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {Object} - Returned json
   */
  sortRecipes(request, response) {
    const page = request.query.page || 1;
    const limit = request.query.limit || 9;
    const offset = (page - 1) * limit;

    return Recipes
      .findAndCountAll({
        limit,
        offset,
        order: [
          ['upVotes', 'DESC']
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
      .catch(() => response.status(500)
        .json({ error: 'An unexpected error occurred' }));
  },
  /**
 * @description Search for a recipe
 *
 * @param {Object} request - HTTP Request
 * @param {Object} response - HTTP Response
 *
 * @returns {Object} recipes
 */
  searchRecipes(request, response) {
    const page = Number.isInteger(parseInt(request.query.page, 10))
  && request.query.page > 0 ? request.query.page : 1;
    const limit = request.query.limit || 9;
    const offset = (page - 1) * limit;

    return Recipes
      .findAndCountAll({
        limit,
        offset,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${request.body.searchQuery.trim()}%`
              }
            },
            {
              ingredients: {
                [Op.iLike]: `%${request.body.searchQuery.trim()}%`
              }
            }
          ]
        }
      })
      .then((recipes) => {
        if (recipes.length === 0) {
          response.status(404).json({ error: 'Recipe not found!' });
        } else {
          const totalCount = recipes.count;
          const pageCount = Math.ceil(totalCount / limit);
          const pageSize = recipes.rows.length;

          return response.status(200)
            .json({
              page, pageCount, pageSize, totalCount, recipes: recipes.rows
            });
        }
      })
      .catch(() => response.status(500)
        .json({ error: 'An unexpected error occurred' }));
  }
};

export default recipeController;
