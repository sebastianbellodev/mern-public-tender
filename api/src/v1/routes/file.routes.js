import Router from 'express';

import {
  getFile,
  getFileById,
  postFile,
  putFile,
  deleteFile,
} from '../../controllers/file-controller.js';
import { checkToken } from '../../middleware/jwt/jwt.js';
import { checkSchema } from '../../middleware/validator/validator.js';
import fileSchema from '../../schemas/file-schema.js';

const router = Router();

const FILES = '/files';
const FILES_ID = '/files/:id';

router.get(FILES, checkToken, getFile);
router.get(FILES_ID, checkToken, getFileById);
router.post(FILES, checkToken, checkSchema(fileSchema), postFile);
router.put(FILES_ID, checkToken, checkSchema(fileSchema), putFile);
router.delete(FILES_ID, checkToken, deleteFile);

export default router;
