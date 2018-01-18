import Validator from 'validatorjs';
import db from '../models/';

const { Recipes, User, Reviews } = db;

const reviewsController = {
  /**
   * @description Create a review for a recipe
   *
   * @param {Object} request - HTTP request
   * @param {Object} response - HTTP response
   *
   * @returns {Object} recipe
   */
  create(request, response) {
    const { body } = request;
    const rules = {
      review: 'required|min:3'
    };

    const validation = new Validator(body, rules);
    if (validation.fails()) {
      return response.status(400).json({ error: 'review is required' });
    }

    User.findById(request.decoded.id)
      .then((user) => {
        if (!user) {
          return response.status(404).json({
            error: 'User not found.'
          });
        }
      })
      .catch(error => response.status(400).json(error.message));

    return Recipes.findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          return response.status(404).json({
            error: 'Recipe not found.'
          });
        }

        Reviews.create({
          review: request.body.review.trim(),
          recipeId: request.params.id,
          userId: request.decoded.id
        })
          .then(() => Recipes
            .findOne({
              where: { id: request.params.id },
              include: [
                {
                  attributes: ['id', 'review'],
                  model: Reviews,
                  include: [
                    { attributes: ['firstName'], model: User }
                  ]
                }
              ]
            })
            .then(updatedRecipe => response.status(201).json({
              statusCode: 201,
              message: 'Review created.',
              recipe: updatedRecipe
            }))
            .catch(error => response.status(404).json({
              error: error.message
            })))
          .catch(error => response.status(400).json({
            error: error.message
          }));
      })
      .catch(error => response.status(400).json({
        error: error.message
      }));
  },

  /**
   * @description Get a review
   *
   * @param {Object} request - HTTP request
   * @param {any} response - HTTP response
   *
   * @returns {Object} review - the requested review object
   */
  get(request, response) {
    Reviews.findAll({
      where: { recipeId: request.params.id },
      include: [{
        attributes: ['id', 'firstName'],
        model: User
      }]
    })
      .then((review) => {
        if (!review) {
          return response.status(404).json({ error: review });
        }
        return response.status(200).json({ review });
      })
      .catch(error => response.status(500).json(error.message));
  },

  getUserReviews(request, response) {
    Reviews.findAll({
      where: { userId: request.decoded.id }
    })
      .then((review) => {
        if (!review) {
          return response.status(404).json({ error: review });
        }
      })
      .then(review => response.status(200).json({ message: review }))
      .catch(error => response.status(400).json(error.message));
  }
};

export default reviewsController;
