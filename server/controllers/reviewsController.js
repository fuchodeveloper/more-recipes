import dotenv from 'dotenv';
import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import db from '../models/';

const { Recipes, User, Reviews } = db;

dotenv.config();
const secret = process.env.SECRET_TOKEN;

const reviewsController = {
  create(request, response) {
    const { body } = request;
    const rules = {
      review: 'required|min:3'
    };

    const validation = new Validator(body, rules);
    if (validation.fails()) {
      return response.json({ error: validation.errors.all() });
    }

    const token = request.headers['x-access-token'];
    if (!token) return response.status(401).send({ auth: false, error: 'No token provided.' });

    const decodedId = jwt.verify(token, secret);

    User.findById(request.decoded.id)
      .then((user) => {
        if (!user) {
          return response.status(404).json({ errorCode: 404, error: 'User not found.' });
        }
      })
      .catch(error => response.status(400).json(error.message));

    Recipes.findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          return response.status(404).json({ code: 404, error: 'Recipe not found.' });
        }

        return Reviews.create({
          review: request.body.review,
          recipeId: request.params.id,
          userId: request.decoded.id
        })
          .then(reviewPosted => response.status(201).json({ statusCode: 201, message: 'Review created.', data: reviewPosted }))
          .catch(error => response.status(404).json(error.message));
      })
      .catch(error => response.status(400).json(error.message));
  },

  get(request, response) {
    Reviews.findAll({
      where: { recipeId: request.params.id }
    })
      .then((review) => {
        if (!review) {
          return response.status(404).json({ error: review });
        }
        return response.status(200).json({ review });
      })
      .catch(error => response.status(400).json(error.message));
  },

  getUserReviews(request, response) {
    // const token = request.headers['x-access-token'];
    // if (!token) return response.status(401).send({ auth: false, message: 'No token provided.' });

    // const decodedId = jwt.verify(token, secret);

    // User.findById(decodedId.data.id)
    //   .then((user) => {
    //     if (!user) {
    //       return response.status(404).json({ errorCode: 404, message: 'User not found.' });
    //     }
    //   })
    //   .catch(error => response.status(400).json(error.message));

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
