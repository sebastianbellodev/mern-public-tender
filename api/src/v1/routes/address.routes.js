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

/**
 * @openapi
 * /addresses:
 *   get:
 *     tags:
 *       - Address
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/address'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Addresses not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ups! Something went wrong. Please try again later...
 */
router.get(ADDRESSES, checkBasicAuth, getAddress);
/**
 * @openapi
 * /addresses/{id}:
 *   get:
 *     tags:
 *       - Address
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/address'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Address not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ups! Something went wrong. Please try again later...
 */
router.get(ADDRESSES_ID, checkBasicAuth, getAddressById);
/**
 * @openapi
 * /addresses:
 *   post:
 *     tags:
 *       - Address
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/address'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/address'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: The request is invalid
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ups! Something went wrong. Please try again later...
 */
router.post(ADDRESSES, checkBasicAuth, checkSchema(addressSchema), postAddress);
/**
 * @openapi
 * /addresses/{id}:
 *   put:
 *     tags:
 *       - Address
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/address'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/address'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: The request is invalid
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Address not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ups! Something went wrong. Please try again later...
 */
router.put(
  ADDRESSES_ID,
  checkBasicAuth,
  checkSchema(addressSchema),
  putAddress
);
/**
 * @openapi
 * /addresses/{id}:
 *   delete:
 *     tags:
 *       - Address
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - basicAuth: []
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Address not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ups! Something went wrong. Please try again later...
 */
router.delete(ADDRESSES_ID, checkBasicAuth, deleteAddress);

export default router;
