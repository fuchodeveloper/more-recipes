import express from 'express';
import UsersController from '../controllers/UsersController';


const router = express.Router();

/**
 * @description route to get an authenticated user's profile
 */
router.get('/profile/:id', UsersController.getUser);

export default router;
