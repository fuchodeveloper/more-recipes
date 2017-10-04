import dotenv from 'dotenv';
import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import db from '../models/';

const Recipe = db.Recipes;
const User = db.User;
const Review = db.Review;

dotenv.config();
const secret = process.env.SECRET_TOKEN;

const recipeController = {
  create(request, response) {
    const body = request.body;
    const rules = {
      recipeName: 'required|min:3',
      ingredient: 'required',
      recipeDirection: 'required:min:6'
    };

    const token = request.headers['x-access-token'];
    if (!token) return response.status(401).send({ auth: false, message: 'No token provided.' });

    const decodedId = jwt.verify(token, secret);

    const validation = new Validator(body, rules);
    if (validation.fails()) {
      return response.json({ error: validation.errors.all() });
    }
    User.findById(decodedId.data.id)
      .then((user) => {
        if (!user) response.status(404).json({ code: 404, message: 'User not found.' });
        return Recipe.create({
          userId: decodedId.data.id,
          recipeName: request.body.recipeName,
          ingredientQuantity: request.body.ingredientQuantity,
          ingredient: request.body.ingredient,
          recipeDirection: request.body.recipeDirection,
          recipeImage: request.body.recipeImage
        })
          .then(recipe => response.status(201).json({ message: 'Recipe created successfully ', recipe }))
          .catch(error => response.status(404).send(error.message));
      })
      .catch(error => response.status(404).send(error));
  },

  get(request, response) {
    console.log(request.params.id);
    return Recipe
      .findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          response.status(404).json({ message: 'Recipe not found' });
        }
        return recipe
          .update({ views: recipe.views + 1 });
      })
      .then((recipe) => {
        if (!recipe) {
          response.status(404).json({ message: 'Recipe not found' });
        }
        // const token = request.headers['x-access-token'];
        // if (token) {
        //   const decodedId = jwt.verify(token, secret);
        //   if (decodedId.data.id === recipe.userId) recipe.views = 1;
        // }
        response.status(200).json({ recipe });
      })
      .catch(error => response.status(400).json({ error: error.message }));
  },

  getAll(request, response) {
    // return all recipes;
    return Recipe
      .findAll()
      .then(recipes => response.status(200).json({ message: recipes }))
      .catch(error => response.status(400).json(error));
  },

  delete(request, response) {
    return Recipe
      .findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          response.status(404).json({ message: 'Recipe not found' });
        }
        const token = request.headers['x-access-token'];
        if (!token) return response.status(401).json({ auth: false, message: 'No token provided.' });
        if (token) {
          const decodedId = jwt.verify(token, secret);
          if (decodedId.data.id === recipe.userId) recipe.views = 1;
        }
        return recipe
          .destroy()
          .then(() => response.status(200).json({ message: 'Recipe deleted' }))
          .catch(error => response.status(400).json(error));
      })
      .catch(error => response.status(400).json(error));
  }
};

export default recipeController;
