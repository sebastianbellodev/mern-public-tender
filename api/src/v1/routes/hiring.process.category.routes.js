import Router from 'express';

import {
  getHiringProcessCategory,
  getHiringProcessCategoryById,
  postHiringProcessCategory,
  putHiringProcessCategory,
  deleteHiringProcessCategory,
} from '../../controllers/hiring-process-category-controller.js';
import { checkToken } from '../../middleware/jwt/jwt.js';

const router = Router();

const HIRINGS_PROCESS_CATEGORIES = '/hiring-process-categories';
const HIRINGS_PROCESS_CATEGORIES_ID = '/hiring-process-categories/:id';

router.get(HIRINGS_PROCESS_CATEGORIES, checkToken, getHiringProcessCategory);
router.get(
  HIRINGS_PROCESS_CATEGORIES_ID,
  checkToken,
  getHiringProcessCategoryById
);
router.post(HIRINGS_PROCESS_CATEGORIES, checkToken, postHiringProcessCategory);
router.put(HIRINGS_PROCESS_CATEGORIES_ID, checkToken, putHiringProcessCategory);
router.delete(
  HIRINGS_PROCESS_CATEGORIES_ID,
  checkToken,
  deleteHiringProcessCategory
);

export default router;
