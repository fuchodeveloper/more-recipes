import express from 'express';
import usersController from '../controllers/usersController';


const router = express.Router();

router.get('/findUser/:id', usersController.getUser);

export default router;
