'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Recipes = _models2.default.Recipes,
    Votes = _models2.default.Votes,
    downvotes = _models2.default.downvotes;


var votesController = {
  upVote: function upVote(request, response) {
    if (!request.params.id) {
      return response.status(400).json({ message: 'Id of recipe is needed.' });
    }

    Recipes.findById(request.params.id).then(function (recipe) {
      if (!recipe) {
        return response.status(404).json({ message: 'Recipe not found.' });
      }
      Votes.findOne({ where: { userId: request.decoded.id } }).then(function (vote) {
        if (vote) {
          return response.status(400).json({ error: 'You already upvoted this recipe!' });
        }
        /**
         * Increment the upvotes column by 1 for the recipe
         */
        var recipeUpvote = recipe.increment('upVotes');
        recipe.update({ upvotes: recipeUpvote });

        /**
         * Create a new upvote
         */
        return Votes.create({
          recipeId: request.params.id,
          userId: request.decoded.id,
          upvotes: +1
        });
      }).then(function () {
        return response.status(201).json({ message: 'Recipe upvoted.' });
      }).catch(function (error) {
        return response.status(400).json({ error: error.message });
      });
    }).catch(function (error) {
      return response.status(400).json({ error: error.message });
    });
  },
  downVote: function downVote(request, response) {
    if (!request.params.id) {
      return response.status(400).json({ message: 'Id of recipe is needed.' });
    }

    Recipes.findById(request.params.id).then(function (recipe) {
      if (!recipe) {
        return response.status(404).json({ message: 'Recipe not found.' });
      }
      downvotes.findOne({ where: { userId: request.decoded.id } }).then(function (vote) {
        if (vote) {
          return response.status(400).json({ error: 'You already downvoted this recipe!' });
        }
        /**
         * Increment the downvotes column by 1 for the recipe
         */
        var recipeDownvote = recipe.increment('downVotes');
        recipe.update({ downvotes: recipeDownvote });

        /**
         * Create a new downvote
         */
        return downvotes.create({
          recipeId: request.params.id,
          userId: request.decoded.id,
          downVotes: +1
        });
      }).then(function () {
        return response.status(201).json({ message: 'Recipe downvoted.' });
      }).catch(function () {
        return response.status(400).json({ error: 'An error occurred while voting' });
      });
    }).catch(function (error) {
      return response.status(400).json({ error: error.message });
    });
  }
};

exports.default = votesController;