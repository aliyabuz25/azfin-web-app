import express from 'express';
import contentController from '../controllers/contentController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Get page content
router.get('/:pageId', contentController.getPage);

// Protected: Management
router.get('/sections', authenticate, contentController.getSections);
router.post('/:pageId', authenticate, contentController.updatePage);
router.post('/:pageId/publish', authenticate, contentController.publish);
router.get('/:pageId/history', authenticate, contentController.getHistory);
router.post('/:pageId/rollback', authenticate, authorize('admin'), contentController.rollback);

export default router;
