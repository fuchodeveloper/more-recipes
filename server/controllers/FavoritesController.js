import db from '../models/';
import validateId from '../validations/validateId';

const { Favorites, Recipes } = db;

const FavoritesController = {
  /**
   * @description Favorite a recipe
   *
   * @param {Object} request - HTTP request object
   * @param {Object} response - HTTP response object
   *
   * @returns {Object} favorite - returns favorite object
   */

  create(request, response) {
    /**
     * @description validate request id
     */
    const { error } = validateId(request.params.id);
    if (error) {
      return response.status(400).json({ error });
    }

    const decodedId = request.user.id;

    Favorites.findOne({
      where: {
        recipeId: request.params.id,
        userId: decodedId
      }
    })
      .then((favorite) => {
        let messageText;
        if (favorite) {
          // destroy favorite and decrement recipes table

          messageText = 'Favorite removed';
          return Recipes.findOne({
            where: { id: request.params.id }
          })
            .then((recipe) => {
              recipe.decrement('favoriteCount');
              favorite.destroy()
                .then(() => response.status(200).json({
                  favorite: {
                    favoriteCount: recipe.favoriteCount,
                    userId: recipe.userId,
                    favorited: false,
                    message: messageText
                  }
                }));
            });
        }

        // create favorite and increment table

        messageText = 'Recipe favorited';
        return Recipes.findOne({
          where: { id: request.params.id }
        })
          .then((recipe) => {
            recipe.increment('favoriteCount');
            return Favorites.create({
              recipeId: request.params.id,
              userId: decodedId
            })
              .then(() => response.status(201).json({
                favorite: {
                  favoriteCount: recipe.favoriteCount,
                  userId: recipe.userId,
                  favorited: true,
                  message: messageText
                }
              }));
          });
      })
      .catch(() => response.status(500).json({
        error: 'An unexpected error occurred'
      }));
  },
  /**
 * @description get favorite count
 *
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response object
 *
 * @returns {Object} isFound returns favorite count object
 */
  getFavoriteCount(request, response) {
    /**
     * @description validate request id
     */
    const { error } = validateId(request.params.id);
    if (error) {
      return response.status(400).json({ error });
    }

    Favorites.count({
      where: { recipeId: request.params.id }
    })
      .then((isFound) => {
        if (isFound.length === 0) {
          return response.status(404).send(0);
        }
        return response.status(200).send({ isFound });
      })
      .catch(() => response.status(500)
        .json({ error: 'An unexpected error occurred' }));
  },

  /**
   * @description get all favorites
   *
   * @param {Object} request - HTTP request object
   * @param {Object} response - HTTP response object
   *
   * @returns {Object} recipes returns paginated favorite recipes
   */
  getAllFavorites(request, response) {
    /**
     * @description validate request id
     */
    const { error } = validateId(request.params.id);
    if (error) {
      return response.status(400).json({ error });
    }
    const decodedId = request.user.id;

    const page = Number.isInteger(parseInt(request.query.page, 10))
  && request.query.page > 0 ? request.query.page : 1;
    const limit = request.query.limit || 9;
    const offset = (page - 1) * limit;

    return Favorites
      .findAndCountAll({
        limit,
        offset,
        where: { userId: decodedId },
        include: [{ model: Recipes }]
      })
      .then((recipes) => {
        if (recipes.length === 0) {
          return response.status(404).json({ error: 'No favorites found.' });
        }

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
   * @description favorite recipes id
   *
   * @param {Object} request - HTTP request object
   * @param {Object} response - HTTP response object
   *
   * @returns {Object} favoritesId returns favorite recipes id
   */
  getFavoriteIds(request, response) {
    const decodedId = request.user.id;
    Favorites.findOne({
      where: {
        userId: decodedId,
        recipeId: request.params.id
      }
    })
      .then(favoritesId => response.status(200).json({ favoritesId }))
      .catch(() => response.status(500)
        .json({ error: 'An unexpected error occurred' }));
  }
};

export default FavoritesController;
