/* eslint-disable no-restricted-globals */
import db from '../models/';
import validateId from '../validations/validateId';

const {
  Recipes, Votes
} = db;

const VotesController = {

  /**
   * @description Upvote a recipe
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {object} recipe
   */
  upVote(request, response) {
    /**
     * @description validate request id
     */
    const { error } = validateId(request.params.id);
    if (error) {
      return response.status(400).json({ error });
    }

    const decodedId = request.user.id;

    return Recipes.findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          return response.status(404).json({ error: 'Recipe not found.' });
        }

        let messageText;
        const upvoteFalse = 0;

        Votes.findOne({
          where:
          { userId: decodedId, recipeId: request.params.id }
        })
          .then((vote) => {
            if (vote) {
              if (vote.upvotes === true && vote.downvotes === false) {
                vote.updateAttributes({
                  upvotes: false
                });

                messageText = 'Upvote removed';
                recipe.updateAttributes({
                  upVotes: recipe.upVotes === upvoteFalse ? upvoteFalse
                    : recipe.upVotes - 1
                })
                  .then(upvoteResponse => response.status(200).json({
                    recipe: {
                      upVotes: upvoteResponse.upVotes,
                      downVotes: upvoteResponse.downVotes,
                      message: messageText
                    }
                  }));
              } else
              if (vote.upvotes === false && vote.downvotes === true) {
                vote.updateAttributes({
                  downvotes: false,
                  upvotes: true
                });
                messageText = 'Recipe upvoted';
                recipe.updateAttributes({
                  downVotes: recipe.downVotes === upvoteFalse ? upvoteFalse
                    : recipe.downVotes - 1,
                  upVotes: recipe.upVotes + 1
                })
                  .then(upvoteResponse => response.status(201).json({
                    recipe: {
                      upVotes: upvoteResponse.upVotes,
                      downVotes: upvoteResponse.downVotes,
                      message: messageText
                    }
                  }));
              } else
              if (vote.upvotes === false && vote.downvotes === false) {
                vote.updateAttributes({
                  upvotes: true
                });

                messageText = 'Recipe upvoted';
                recipe.increment('upVotes')
                  .then(upvoteResponse => response.status(201).json({
                    recipe: {
                      upVotes: upvoteResponse.upVotes,
                      downVotes: upvoteResponse.downVotes,
                      message: messageText
                    }
                  }));
              }
            } else {
              recipe.increment('upVotes').then((upvoteResponse) => {
                messageText = 'Recipe upvoted';
                return Votes.create({
                  recipeId: request.params.id,
                  userId: decodedId,
                  upvotes: true
                }).then(() => response.status(201)
                  .json({
                    recipe: {
                      upVotes: upvoteResponse.upVotes,
                      downVotes: upvoteResponse.downVotes,
                      message: messageText
                    }
                  }));
              });
            }
          });
      })
      .catch(() => response.status(500).json({
        message: 'An unexpected error occurred'
      }));
  },

  /**
 * @description function to downvote a recipe
 *
 * @param {Object} request - HTTP request
 * @param {Object} response - HTTP response
 *
 * @returns {Object} recipe
 */
  downVote(request, response) {
    /**
     * @description validate request id
     */
    const { error } = validateId(request.params.id);
    if (error) {
      return response.status(400).json({ error });
    }

    const decodedId = request.user.id;

    Recipes.findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          return response.status(404).json({ error: 'Recipe not found.' });
        }

        let messageText;
        const upvoteFalse = 0;

        Votes.findOne({
          where:
          { userId: decodedId, recipeId: request.params.id }
        })
          .then((vote) => {
            if (vote) {
              if (vote.upvotes === false && vote.downvotes === true) {
                vote.updateAttributes({
                  downvotes: false
                });

                messageText = 'Downvote removed';
                recipe.updateAttributes({
                  downVotes: recipe.downVotes === upvoteFalse ? upvoteFalse
                    : recipe.downVotes - 1
                })
                  .then(downvoteResponse => response.status(200).json({
                    recipe: {
                      upVotes: downvoteResponse.upVotes,
                      downVotes: downvoteResponse.downVotes,
                      message: messageText
                    }
                  }));
              } else if (vote.upvotes === true && vote.downvotes === false) {
                vote.updateAttributes({
                  upvotes: false,
                  downvotes: true
                });
                messageText = 'Recipe downvoted';
                recipe.updateAttributes({
                  upVotes: recipe.upVotes === upvoteFalse ? upvoteFalse
                    : recipe.upVotes - 1,
                  downVotes: recipe.downVotes + 1
                })
                  .then(downvoteResponse => response.status(201).json({
                    recipe: {
                      upVotes: downvoteResponse.upVotes,
                      downVotes: downvoteResponse.downVotes,
                      message: messageText
                    }
                  }));
              } else if (vote.upvotes === false && vote.downvotes === false) {
                vote.updateAttributes({
                  downvotes: true
                });

                messageText = 'Recipe downvoted';
                recipe.increment('downVotes')
                  .then(downvoteResponse => response.status(201).json({
                    recipe: {
                      upVotes: downvoteResponse.upVotes,
                      downVotes: downvoteResponse.downVotes,
                      message: messageText
                    }
                  }));
              }
            } else {
              recipe.increment('downVotes').then((downvoteResponse) => {
                messageText = 'Recipe downvoted';
                return Votes.create({
                  recipeId: request.params.id,
                  userId: decodedId,
                  downvotes: true
                }).then(() => response.status(201)
                  .json({
                    recipe: {
                      upVotes: downvoteResponse.upVotes,
                      downVotes: downvoteResponse.downVotes,
                      message: messageText
                    }
                  }));
              });
            }
          });
      }).catch(() => response.status(500).json({
        message: 'An unexpected error occurred'
      }));
  }
};

export default VotesController;
