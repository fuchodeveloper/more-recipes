import express from 'express';
import VotesController from '../controllers/VotesController';
import authorization from '../middleware/tokenMiddleware';

const router = express.Router();

/**
 * @description routes for upvote and downvote
 */
router.post(
  '/:id/upvote',
  authorization.verifyToken, VotesController.upVote
);

router.post(
  '/:id/downvote',
  authorization.verifyToken, VotesController.downVote
);

export default router;
