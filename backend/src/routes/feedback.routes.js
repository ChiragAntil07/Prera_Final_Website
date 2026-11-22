
import express from 'express';
import {
  createFeedback,
  getApprovedFeedback,
} from '../controllers/feedback.controller.js';
import {
  feedbackSubmissionValidationRules,
  validate,
} from '../middleware/validation.middleware.js';

const router = express.Router();

// Public: Submit feedback
router.get('/approved', getApprovedFeedback);
router.post('/', feedbackSubmissionValidationRules, validate, createFeedback);

export default router;
