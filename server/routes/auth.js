import express from 'express';
import usersController from '../controllers/usersController';

const router = express.Router();

router.post('/signup', usersController.create);
router.post('/signin', usersController.login);

export default router;
