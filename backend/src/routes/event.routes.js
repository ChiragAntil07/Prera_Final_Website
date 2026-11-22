
import express from 'express';
import {
  createEventSubmission,
  getEvents,
  getPublicEvents,
  getEventById,
  updateEventStatus,
  deleteEvent,
} from '../controllers/event.controller.js';

import {
  eventSubmissionValidationRules,
  statusUpdateValidationRules,
  validate,
} from '../middleware/validation.middleware.js';

import { authenticateAdmin } from '../middleware/auth.middleware.js';
import uploadEventPoster from '../middleware/upload.middleware.js';

const router = express.Router();

// Public: Submit an event; posters are optional for collaboration proposals.
router.post(
  '/',
  uploadEventPoster.single('poster'),
  eventSubmissionValidationRules,
  validate,
  createEventSubmission
);

// Public: Display approved events on the website
router.get('/public', getPublicEvents);

// Admin Protected: Manage events
router.get('/', authenticateAdmin, getEvents);
router.get('/:id', authenticateAdmin, getEventById);

router.patch(
  '/:id/status',
  authenticateAdmin,
  statusUpdateValidationRules,
  validate,
  updateEventStatus
);

router.delete('/:id', authenticateAdmin, deleteEvent);

export default router;
