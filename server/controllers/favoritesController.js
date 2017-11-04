import db from '../models/';

const { Favorites, Recipes } = db;

const favoritesController = {
  /**
   * Favorite a recipe
   *
   * @param {any} request
   * @param {any} response
   * @returns {obj} obj
   */

  create(request, response) {
    if (!request.params.id) {
      return response.status(404).json({ error: 'Recipe id is required.' });
    }
    Favorites.findOne({
      where: {
        recipeId: request.params.id,
        userId: request.decoded.id
      }
    })
      .then((favorite) => {
        if (favorite) {
          return response.status(400).json({
            error: 'Recipe already favorited.'
          });
        }
        Favorites.create({
          recipeId: request.params.id,
          userId: request.decoded.id
        });

        return Recipes.increment({ favoriteCount: 1 }, { where: { id: request.params.id } });
      })
      .then(favoriteSuccess => response.status(201).json({
        message: 'Recipe successfully favorited.',
        data: favoriteSuccess
      }))
      .catch(error => response.status(400).json({
        // error: 'An error occured during this operation',
        error: error.message
      }));
  },

  getFavoriteCount(request, response) {
    Favorites.count({
      where: { recipeId: request.params.id }
    })
      .then((isFound) => {
        if (isFound.length === 0) {
          return response.status(200).send({ isFound });
        }
        return response.status(200).send({ isFound });
      })
      .catch(error => response.status(400).json({ error: error.message }));
  },

  getAll(request, response) {
    Favorites.findAll({
      where: { userId: request.params.id },
      include: [{ model: Recipes }]
    })
      .then((isFound) => {
        if (isFound.length === 0) {
          return response.status(404).json({ error: 'No favorites found.' });
        } else
        if (isFound) {
          return response.status(200).json({ isFound });
        }
      })
      .catch(error => response.status(400).json({ error: error.message }));
  }
};

export default favoritesController;
