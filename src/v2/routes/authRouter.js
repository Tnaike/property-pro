import Router from 'express';
import AuthController from '../controllers/AuthController';
import validateSignupFields from '../middlewares/validateSignupFields';

const route = Router();

route.post('/signin', AuthController.signin);
route.post('/signup', validateSignupFields, AuthController.signup);

export default route;
