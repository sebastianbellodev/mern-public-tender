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

/**
 * @openapi
 * /companies:
 *   get:
 *     tags:
 *       - Company
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
 *                $ref: '#/components/schemas/company'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Companies not found
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
router.get(COMPANIES, checkBasicAuth, getCompany);
/**
 * @openapi
 * /companies/{id}:
 *   get:
 *     tags:
 *       - Company
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
 *              $ref: '#/components/schemas/company'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Company not found
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
router.get(COMPANIES_ID, checkBasicAuth, getCompanyById);
/**
 * @openapi
 * /companies:
 *   post:
 *     tags:
 *       - Company
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/company'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/companies'
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
router.post(COMPANIES, checkBasicAuth, checkSchema(companySchema), postCompany);
/**
 * @openapi
 * /companies/{id}:
 *   put:
 *     tags:
 *       - Company
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
 *             $ref: '#/components/schemas/company'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/companies'
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
 *                   example: Company not found
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
  COMPANIES_ID,
  checkBasicAuth,
  checkSchema(companySchema),
  putCompany
);
/**
 * @openapi
 * /companies/{id}:
 *   delete:
 *     tags:
 *       - Company
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
 *                   example: Company not found
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
router.delete(COMPANIES_ID, checkBasicAuth, deleteCompany);

export default router;
