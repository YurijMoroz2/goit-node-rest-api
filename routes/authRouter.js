import { Router } from 'express';
import validateBody from '../helpers/validateBody.js';
import { registerSchema } from '../schemas/userSchemas.js';
import { createContactAuth } from '../controllers/authControllers.js';


// import { checkLoginData, checkSignupData } from '../middlewares/authMiddlewares.js';
// import { login, signup } from '../controllers/authController.js';

const router = Router();
router.post('/register', createContactAuth)

// router.post('/register', validateBody(registerSchema), createContactAuth)
// router.post('/signup', checkSignupData, signup);
// router.post('/login', checkLoginData, login);

export { router };

