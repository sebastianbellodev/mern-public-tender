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

const ASSESSMENT_METRICS = '/assessment-metrics';
const ASSESSMENT_METRICS_ID = '/assessment-metrics/:id';

router.get(ASSESSMENT_METRICS, checkToken, getAssessmentCriteria);
router.get(ASSESSMENT_METRICS_ID, checkToken, getAssessmentCriteriaById);
router.post(ASSESSMENT_METRICS, checkToken, postAssessmentCriteria);
router.put(ASSESSMENT_METRICS_ID, checkToken, putAssessmentCriteria);
router.delete(ASSESSMENT_METRICS_ID, checkToken, deleteAssessmentCriteria);

export default router;
