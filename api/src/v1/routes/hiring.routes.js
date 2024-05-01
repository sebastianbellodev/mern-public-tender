import Router from 'express';

import {
  getHiring,
  getHiringById,
  postHiring,
  putHiring,
  deleteHiring,
} from '../../controllers/hiring-controller.js';
import { checkToken } from '../../middleware/jwt/jwt.js';

const router = Router();

const HIRINGS = '/hirings';
const HIRINGS_ID = '/hirings/:id';

router.get(HIRINGS, checkToken, getHiring);
router.get(HIRINGS_ID, checkToken, getHiringById);
router.post(HIRINGS, checkToken, postHiring);
router.put(HIRINGS_ID, checkToken, putHiring);
router.delete(HIRINGS_ID, checkToken, deleteHiring);

export default router;
