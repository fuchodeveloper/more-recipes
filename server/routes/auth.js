import express from 'express';
import UsersController from '../controllers/UsersController';
import authorization from '../middleware/tokenMiddleware';

const router = express.Router();

router.post('/signup', UsersController.create);
router.post('/signin', UsersController.login);
router.post('/update', authorization.verifyToken, UsersController.updateUser);

export default router;
