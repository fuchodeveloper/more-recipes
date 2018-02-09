import express from 'express';
import UsersController from '../controllers/UsersController';
import authorization from '../middleware/tokenMiddleware';

const router = express.Router();

/**
 * @description route to get an authenticated user's profile
 */
router.get('/profile/:id', authorization.verifyToken, UsersController.getUser);

export default router;
