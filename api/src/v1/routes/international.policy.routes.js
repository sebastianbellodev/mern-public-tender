import Router from 'express';

import {
  getInternationalPolicy,
  getInternationalPolicyById,
  postInternationalPolicy,
  putInternationalPolicy,
  deleteInternationalPolicy,
} from '../../controllers/international-policy-controller.js';
import { checkToken } from '../../middleware/jwt/jwt.js';

const router = Router();

const INTERNATIONAL_POLICIES = '/international-policies';
const INTERNATIONAL_POLICIES_ID = '/international-policies/:id';

router.get(INTERNATIONAL_POLICIES, checkToken, getInternationalPolicy);
router.get(INTERNATIONAL_POLICIES_ID, checkToken, getInternationalPolicyById);
router.post(INTERNATIONAL_POLICIES, checkToken, postInternationalPolicy);
router.put(INTERNATIONAL_POLICIES_ID, checkToken, putInternationalPolicy);
router.delete(INTERNATIONAL_POLICIES_ID, checkToken, deleteInternationalPolicy);

export default router;
