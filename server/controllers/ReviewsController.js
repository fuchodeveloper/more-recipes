import Validator from 'validatorjs';
import db from '../models/';
import validateId from '../validations/validateId';

const { Recipes, User, Reviews } = db;

const ReviewsController = {
  /**
   * @description Create a review for a recipe
   *
   * @param {Object} request - HTTP request
   * @param {Object} response - HTTP response
   *
   * @returns {Object} recipe
   */
  create(request, response) {
    /**
     * @description validate request id
     */
    validateId(request.params.id, response);
    const { body } = request;
    const rules = {
      review: 'required|min:3'
    };

    const validation = new Validator(body, rules);
    if (validation.fails()) {
      return response.status(400).json({ error: 'review is required' });
    }

    const decodedId = request.user.id;

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
          userId: decodedId
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
            })));
      })
      .catch(() => response.status(500).json({
        error: 'An unexpected error occurred'
      }));
  },

  /**
   * @description Get a review
   *
   * @param {Object} request - HTTP request
   * @param {Object} response - HTTP response
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
          return response.status(404).json({ error: 'Review not found' });
        }
        return response.status(200).json({ review });
      })
      .catch(() => response.status(500)
        .json({ error: 'An unexpected error occurred' }));
  },

  getUserReviews(request, response) {
    Reviews.findAll({
      where: { userId: request.decoded.id }
    })
      .then((review) => {
        if (!review) {
          return response.status(404).json({ error: 'Review not found' });
        }
      })
      .then(review => response.status(200).json({ message: review }))
      .catch(() => response.status(500)
        .json({ error: 'An unexpected error occurred' }));
  }
};

export default ReviewsController;
