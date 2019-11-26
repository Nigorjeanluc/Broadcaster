import Router from 'express';

import UserController from '../controllers/userController';
import AuthValidator from '../middlewares/authValidator';

const router = Router();

router.post('/auth/signup', AuthValidator.signupValidator, UserController.signUp);
router.post('/auth/signin', AuthValidator.signinValidator, UserController.signIn);

export default router;