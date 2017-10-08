import db from '../models/';

const { Recipes, Votes, downvotes } = db;

const votesController = {
  upVote(request, response) {
    if (!request.params.id) {
      return response.status(400)
        .json({ message: 'Id of recipe is needed.' });
    }

    Recipes.findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          return response.status(404).json({ message: 'Recipe not found.' });
        }
        Votes.findOne({ where: { userId: request.decoded.id, recipeId: request.params.id } })
          .then((vote) => {
            if (vote) {
              return response.status(400)
                .json({ error: 'You already upvoted this recipe!' });
            }
            /**
             * Increment the upvotes column by 1 for the recipe
             */
            const recipeUpvote = recipe.increment('upVotes');
            recipe.update({ upvotes: recipeUpvote });

            /**
             * Create a new upvote
             */
            return Votes.create({
              recipeId: request.params.id,
              userId: request.decoded.id,
              upvotes: +1
            });
          })
          .then(() => response.status(201)
            .json({ message: 'Recipe upvoted.' }))
          .catch(error => response.status(400)
            .json({ error: error.message }));
      })
      .catch(error => response.status(400)
        .json({ error: error.message }));
  },

  downVote(request, response) {
    if (!request.params.id) {
      return response.status(400)
        .json({ message: 'Id of recipe is needed.' });
    }


    Recipes.findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          return response.status(404).json({ message: 'Recipe not found.' });
        }
        downvotes.findOne({ where: { userId: request.decoded.id, recipeId: request.params.id } })
          .then((vote) => {
            if (vote) {
              return response.status(400)
                .json({ error: 'You already downvoted this recipe!' });
            }
            /**
             * Increment the downvotes column by 1 for the recipe
             */
            const recipeDownvote = recipe.increment('downVotes');
            recipe.update({ downvotes: recipeDownvote });

            /**
             * Create a new downvote
             */
            return downvotes.create({
              recipeId: request.params.id,
              userId: request.decoded.id,
              downVotes: +1
            });
          })
          .then(() => response.status(201)
            .json({ message: 'Recipe downvoted.' }))
          .catch(() => response.status(400)
            .json({ error: 'An error occurred while voting' }));
      })
      .catch(error => response.status(400)
        .json({ error: error.message }));
  }
};

export default votesController;
