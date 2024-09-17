import Router from 'express';

import {
  getAddress,
  getAddressById,
  postAddress,
  putAddress,
  deleteAddress,
} from '../../controllers/address-controller.js';
import { checkToken } from '../../middleware/jwt/jwt.js';
import { checkBasicAuth } from '../../middleware/auth/auth.js';
import { checkSchema } from '../../middleware/validator/validator.js';
import addressSchema from '../../schemas/address-schema.js';

const router = Router();

const ADDRESSES = '/addresses';
const ADDRESSES_ID = '/addresses/:id';

router.get(ADDRESSES, checkBasicAuth, getAddress);
router.get(ADDRESSES_ID, checkBasicAuth, getAddressById);
router.post(ADDRESSES, checkBasicAuth, checkSchema(addressSchema), postAddress);
router.put(
  ADDRESSES_ID,
  checkBasicAuth,
  checkSchema(addressSchema),
  putAddress
);
router.delete(ADDRESSES_ID, checkBasicAuth, deleteAddress);

export default router;
