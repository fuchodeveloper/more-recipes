import express from 'express';
import votesController from '../controllers/votesController';
import authorization from '../middleware/tokenMiddleware';

const router = express.Router();

/**
 * @description routes for upvote and downvote
 */
router.post(
  '/:id/upvote',
  authorization.verifyToken, votesController.upVote
);
router.post(
  '/:id/downvote',
  authorization.verifyToken, votesController.downVote
);

export default router;
