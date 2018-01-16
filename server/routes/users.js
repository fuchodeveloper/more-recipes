import express from 'express';
import usersController from '../controllers/usersController';


const router = express.Router();

/**
 * @description route to get an authenticated user's profile
 */
router.get('/profile/:id', usersController.getUser);

export default router;
