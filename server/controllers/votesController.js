import db from '../models/';

const {
  Recipes, Votes
} = db;

const votesController = {

  /**
   * Upvote a recipe
   *
   * @param {any} request
   * @param {any} response
   * @returns {object} object
   */
  upVote(request, response) {
    if (!request.params.id) {
      return response.status(400)
        .json({ error: 'Id of recipe is needed.' });
    }

    Recipes.findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          return response.status(404).json({ error: 'Recipe not found.' });
        }

        let messageText;

        Votes.findOne({
          where:
          { userId: request.decoded.id, recipeId: request.params.id }
        })
          .then((vote) => {
            if (vote) {
              if (vote.upvotes === 1 && vote.downvotes === 0) {
                vote.updateAttributes({
                  upvotes: 0
                });

                messageText = 'Upvote removed';
                recipe.updateAttributes({
                  upVotes: recipe.upVotes === 0 ? 0 : recipe.upVotes - 1
                })
                  .then(recipeDecrem => response.status(200).json({
                    recipe: recipeDecrem, message: messageText
                  }));
              } else if (vote.upvotes === 0 && vote.downvotes === 1) {
                vote.updateAttributes({
                  downvotes: 0,
                  upvotes: 1
                });
                messageText = 'Recipe upvoted';
                recipe.updateAttributes({
                  downVotes: recipe.downVotes === 0 ? 0 : recipe.downVotes - 1,
                  upVotes: recipe.upVotes + 1
                })
                  .then(recipeDecrem => response.status(200).json({
                    recipe: recipeDecrem, message: messageText
                  }));
              } else if (vote.upvotes === 0 && vote.downvotes === 0) {
                vote.updateAttributes({
                  upvotes: 1
                });

                messageText = 'Recipe upvoted';
                recipe.increment('upVotes')
                  .then(recipeDecrem => response.status(200).json({
                    recipe: recipeDecrem,
                    message: messageText
                  }));
              }
            } else {
              recipe.increment('upVotes').then((recipeDecrem) => {
                messageText = 'Recipe upvoted';
                return Votes.create({
                  recipeId: request.params.id,
                  userId: request.decoded.id,
                  upvotes: +1
                }).then(() => response.status(201)
                  .json({ recipe: recipeDecrem, message: messageText }));
              });
            }
          });
      })
      .catch(() => response.status(500).json({
        message: 'something went wrong'
      }));
  },

  downVote(request, response) {
    if (!request.params.id) {
      return response.status(400)
        .json({ error: 'Id of recipe is needed.' });
    }

    Recipes.findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          return response.status(404).json({ error: 'Recipe not found.' });
        }

        let messageText;

        Votes.findOne({
          where:
          { userId: request.decoded.id, recipeId: request.params.id }
        })
          .then((vote) => {
            if (vote) {
              if (vote.upvotes === 0 && vote.downvotes === 1) {
                vote.updateAttributes({
                  downvotes: 0
                });

                messageText = 'recipe downvoted';
                recipe.updateAttributes({
                  downVotes: recipe.downVotes === 0 ? 0 : recipe.downVotes - 1
                })
                  .then(recipeDecrem => response.status(200).json({
                    recipe: recipeDecrem, message: messageText
                  }));
              } else if (vote.upvotes === 1 && vote.downvotes === 0) {
                vote.updateAttributes({
                  upvotes: 0,
                  downvotes: 1
                });
                messageText = 'Recipe downvoted';
                recipe.updateAttributes({
                  upVotes: recipe.upVotes === 0 ? 0 : recipe.upVotes - 1,
                  downVotes: recipe.downVotes + 1
                })
                  .then(recipeDecrem => response.status(200).json({
                    recipe: recipeDecrem, message: messageText
                  }));
              } else if (vote.upvotes === 0 && vote.downvotes === 0) {
                vote.updateAttributes({
                  downvotes: 1
                });

                messageText = 'Recipe downvoted';
                recipe.increment('downVotes')
                  .then(recipeDecrem => response.status(200).json({
                    recipe: recipeDecrem,
                    message: messageText
                  }));
              }
            } else {
              recipe.increment('downVotes').then((recipeDecrem) => {
                messageText = 'Recipe downvoted';
                return Votes.create({
                  recipeId: request.params.id,
                  userId: request.decoded.id,
                  downvotes: +1
                }).then(() => response.status(201)
                  .json({ recipe: recipeDecrem, message: messageText }));
              });
            }
          });
      }).catch(() => response.status(500).json({
        message: 'something went wrong'
      }));
  }
};

export default votesController;
