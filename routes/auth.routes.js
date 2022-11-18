import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import { register, login, updateUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/updateUser', authenticate, updateUser);

export default router;