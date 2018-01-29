import jwtDecode from 'jwt-decode';
import db from '../models/';
import validateId from '../validations/validateId';

const { Favorites, Recipes } = db;

const favoritesController = {
  /**
   * @description Favorite a recipe
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} object - express http response object
   */

  create(request, response) {
    /**
     * @description validate request id
     */
    const { error } = validateId(request.params.id);
    if (error) {
      return response.status(400).json({ error });
    }

    Favorites.findOne({
      where: {
        recipeId: request.params.id,
        userId: request.decoded.id
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
              userId: request.decoded.id
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
      .catch(serverError => response.status(500)
        .json({ error: serverError.message }));
  },

  getAllFavorites(request, response) {
    /**
     * @description validate request id
     */
    const { error } = validateId(request.params.id);
    if (error) {
      return response.status(400).json({ error });
    }

    const page = Number.isInteger(parseInt(request.query.page, 10))
  && request.query.page > 0 ? request.query.page : 1;
    const limit = request.query.limit || 9;
    const offset = (page - 1) * limit;

    return Favorites
      .findAndCountAll({
        limit,
        offset,
        where: { userId: request.decoded.id },
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
      .catch(serverError => response.status(500)
        .json({ error: serverError.message }));
  },

  getFavoriteIds(request, response) {
    const userDecodedToken = jwtDecode(request.decoded);
    const { id } = userDecodedToken;
    Favorites.findOne({
      where: {
        userId: id,
        recipeId: request.params.id
      }
    })
      .then(favoritesId => response.status(200).json({ favoritesId }))
      .catch(error => response.status(500).json({ error: error.message }));
  }
};

export default favoritesController;
