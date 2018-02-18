import express from 'express';
import UsersController from '../controllers/UsersController';
import Authorization from '../middleware/Authorization';

const users = express.Router();

/**
 * @description route to get an authenticated user's profile
 */
users.get('/profile/:id', Authorization.verifyToken, UsersController.getUser);
users
  .post('/users/update', Authorization.verifyToken, UsersController.updateUser);

export default users;
