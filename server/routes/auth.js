import express from 'express';
import UsersController from '../controllers/UsersController';

const auth = express.Router();

auth.post('/signup', UsersController.create);
auth.post('/signin', UsersController.login);

export default auth;
