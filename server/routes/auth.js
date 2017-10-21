import express from 'express';
import usersController from '../controllers/usersController';

const router = express.Router();

router.post('/signin', usersController.login);

export default router;
