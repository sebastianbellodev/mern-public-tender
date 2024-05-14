import Router from 'express';

import {
  getAssessmentCriteria,
  getAssessmentCriteriaById,
  postAssessmentCriteria,
  putAssessmentCriteria,
  deleteAssessmentCriteria,
} from '../../controllers/assessment-metric-controller.js';
import { checkToken } from '../../middleware/jwt/jwt.js';

const router = Router();

const ASSESSMENT_CRITERIA = '/assessment-metrics';
const ASSESSMENT_CRITERIA_ID = '/assessment-metrics/:id';

router.get(ASSESSMENT_CRITERIA, checkToken, getAssessmentCriteria);
router.get(ASSESSMENT_CRITERIA_ID, checkToken, getAssessmentCriteriaById);
router.post(ASSESSMENT_CRITERIA, checkToken, postAssessmentCriteria);
router.put(ASSESSMENT_CRITERIA_ID, checkToken, putAssessmentCriteria);
router.delete(ASSESSMENT_CRITERIA_ID, checkToken, deleteAssessmentCriteria);

export default router;
