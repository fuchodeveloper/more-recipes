import dotenv from 'dotenv';
import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import db from '../models/';

const { Recipe, User, Review } = db;

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
    if (!token) return response.status(401).send({ auth: false, message: 'No token provided.' });

    const decodedId = jwt.verify(token, secret);

    User.findById(decodedId.data.id)
      .then((user) => {
        if (!user) {
          return response.status(404).json({ errorCode: 404, message: 'User not found.' });
        }
      })
      .catch(error => response.status(400).json(error.message));

    Recipe.findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          return response.status(404).json({ code: 404, message: 'Recipe not found.' });
        }

        return Review.create({
          review: request.body.review,
          recipeId: request.params.id,
          userId: decodedId.data.id
        })
          .then(reviewPosted => response.status(201).json({ statusCode: 201, message: 'Review created.', data: reviewPosted }))
          .catch(error => response.status(404).json(error.message));
      })
      .catch(error => response.status(400).json(error.message));
  },

  get(request, response) {
    // const { body } = request;

    const token = request.headers['x-access-token'];
    if (!token) return response.status(401).send({ auth: false, message: 'No token provided.' });

    const decodedId = jwt.verify(token, secret);

    User.findById(decodedId.data.id)
      .then((user) => {
        if (!user) {
          return response.status(404).json({ errorCode: 404, message: 'User not found.' });
        }
      })
      .catch(error => response.status(400).json(error.message));

    Review.findAll({
      where: { userId: decodedId.data.id }
    })
      .then((review) => {
        if (review) {
          return response.status(404).json({ code: 404, message: review });
        }


        // return Review.findAll({
        //   where: { userId: decodedId.data.id }
        // })
        //   .then(reviews => response.status(200)
        //     .json({ message: reviews }))
        //   .catch(error => response.status(400)
        //     .json(error));
      })
      .then(review => response.status(200).json({ message: review }))
      .catch(error => response.status(400).json(error.message));
  }
};

export default reviewsController;
