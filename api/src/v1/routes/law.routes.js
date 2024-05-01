import Router from 'express';

import {
  getLaw,
  getLawById,
  deleteLaw,
  postLaw,
  putLaw,
} from '../../controllers/law-controller.js';
import { checkToken } from '../../middleware/jwt/jwt.js';

const router = Router();

const LAWS = '/laws';
const LAWS_ID = '/laws/:id';

router.get(LAWS, checkToken, getLaw);
router.get(LAWS_ID, checkToken, getLawById);
router.post(LAWS, checkToken, postLaw);
router.put(LAWS_ID, checkToken, putLaw);
router.delete(LAWS_ID, checkToken, deleteLaw);

export default router;
