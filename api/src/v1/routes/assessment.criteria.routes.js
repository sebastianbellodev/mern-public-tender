import Router from 'express';

import {
  getAssessmentCriteria,
  getAssessmentCriteriaById,
  postAssessmentCriteria,
  putAssessmentCriteria,
  deleteAssessmentCriteria,
} from '../../controllers/assessment-criteria-controller.js';
import { checkToken } from '../../middleware/jwt/jwt.js';

const router = Router();

const ASSESSMENT_CRITERIA = '/assessment-criteria';
const ASSESSMENT_CRITERIA_ID = '/assessment-criteria/:id';

router.get(ASSESSMENT_CRITERIA, checkToken, getAssessmentCriteria);
router.get(ASSESSMENT_CRITERIA_ID, checkToken, getAssessmentCriteriaById);
router.post(ASSESSMENT_CRITERIA, checkToken, postAssessmentCriteria);
router.put(ASSESSMENT_CRITERIA_ID, checkToken, putAssessmentCriteria);
router.delete(ASSESSMENT_CRITERIA_ID, checkToken, deleteAssessmentCriteria);

export default router;
