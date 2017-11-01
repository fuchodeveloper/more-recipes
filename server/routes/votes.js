import express from 'express';
import votesController from '../controllers/votesController';
import authorization from '../middleware/tokenMiddleware';

const router = express.Router();

router.post('/:id/upvote', authorization.verifyUser, votesController.upVote);
router.post('/:id/downvote', authorization.verifyUser, votesController.downVote);

export default router;
