import express from 'express';
import usersController from '../controllers/usersController';
import authorization from '../middleware/tokenMiddleware';

const router = express.Router();

router.post('/signup', usersController.create);
router.post('/signin', usersController.login);
router.post('/update', authorization.verifyToken, usersController.updateUser);

export default router;
