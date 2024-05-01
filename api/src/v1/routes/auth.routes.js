import Router from 'express';

import {
  signup,
  login,
  logout,
  verifyToken,
} from '../../controllers/auth-controller.js';
import { checkBasicAuth } from '../../middleware/auth/auth.js';
import { checkSchema } from '../../middleware/validator/validator.js';
import authSchema from '../../schemas/auth-schema.js';

const router = Router();

router.post('/signup', checkBasicAuth, checkSchema(authSchema), signup);
router.post('/login', checkBasicAuth, login);
router.post('/logout', checkBasicAuth, logout);
router.get('/verify', verifyToken);

export default router;
