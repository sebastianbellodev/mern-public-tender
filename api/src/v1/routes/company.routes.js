import Router from 'express';

import {
  getCompany,
  getCompanyById,
  postCompany,
  putCompany,
  deleteCompany,
} from '../../controllers/company-controller.js';
import { checkToken } from '../../middleware/jwt/jwt.js';
import { checkBasicAuth } from '../../middleware/auth/auth.js';
import { checkSchema } from '../../middleware/validator/validator.js';
import companySchema from '../../schemas/company-schema.js';

const router = Router();

const COMPANIES = '/companies';
const COMPANIES_ID = '/companies/:id';

router.get(COMPANIES, checkBasicAuth, getCompany);
router.get(COMPANIES_ID, checkBasicAuth, getCompanyById);
router.post(COMPANIES, checkBasicAuth, checkSchema(companySchema), postCompany);
router.put(
  COMPANIES_ID,
  checkBasicAuth,
  checkSchema(companySchema),
  putCompany
);
router.delete(COMPANIES_ID, checkBasicAuth, deleteCompany);

export default router;
