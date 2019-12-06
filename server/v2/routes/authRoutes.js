import Router from 'express';

import UserController from '../controllers/userController';
import AuthValidator from '../middlewares/authValidator';
import asyncErrorHandler from '../helpers/asyncErrorHandler';

const router = Router();

router.post('/auth/signup', AuthValidator.signupValidator, asyncErrorHandler(UserController.signUp));
router.post('/auth/signin', AuthValidator.signinValidator, asyncErrorHandler(UserController.signIn));

export default router;
