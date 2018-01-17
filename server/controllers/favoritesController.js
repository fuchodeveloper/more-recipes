import db from '../models/';

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
    if (!request.params.id) {
      return response.status(400).json({ error: 'Recipe id is required.' });
    }

    if (Number.isNaN(request.params.id)) {
      return response.status(400).json({ error: 'Recipe id is invalid!' });
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
                  favorite: recipe.favoriteCount,
                  favorited: false,
                  message: messageText
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
                favorite: recipe.favoriteCount,
                favorited: true,
                message: messageText
              }));
          });
      })
      .catch(() => response.status(500).json({
        error: 'An unexpected error occurred'
      }));
  },

  getFavoriteCount(request, response) {
    if (!request.params.id) {
      return response.status(400).json({ error: 'Recipe id is required.' });
    }

    if (Number.isNaN(request.params.id)) {
      return response.status(400).json({ error: 'Recipe id is invalid!' });
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
      .catch(error => response.status(500).json({ error: error.message }));
  },

  getAllFavorites(request, response) {
    if (!request.params.id) {
      return response.status(400).json({ error: 'Recipe id is required.' });
    }

    if (Number.isNaN(request.params.id)) {
      return response.status(400).json({ error: 'Recipe id is invalid!' });
    }

    Favorites.findAll({
      distinct: 'recipeId',
      where: { userId: request.params.id },
      include: [{ model: Recipes }]
    })
      .then((favoritesFound) => {
        if (favoritesFound.length === 0) {
          return response.status(404).json({ error: 'No favorites found.' });
        }
        return response.status(200).json({ favorites: favoritesFound });
      })
      .catch(error => response.status(500).json({ error: error.message }));
  }
};

export default favoritesController;
