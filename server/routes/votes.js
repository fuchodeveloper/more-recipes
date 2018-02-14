import express from 'express';
import VotesController from '../controllers/VotesController';
import Authorization from '../middleware/Authorization';

const votes = express.Router();

/**
 * @description routes for upvote and downvote
 */
votes.post(
  '/:id/upvote',
  Authorization.verifyToken, VotesController.upVote
);

votes.post(
  '/:id/downvote',
  Authorization.verifyToken, VotesController.downVote
);

export default votes;
