import express from 'express';
import requestController from '../controllers/requestController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Submit a request
router.post('/', requestController.create);

// Protected: Management
router.get('/', authenticate, requestController.list);
router.put('/:id', authenticate, requestController.update);
router.delete('/:id', authenticate, authorize('admin'), requestController.delete);

// SMTP Settings
router.get('/settings/smtp', authenticate, authorize('admin'), requestController.getSmtp);
router.post('/settings/smtp', authenticate, authorize('admin'), requestController.updateSmtp);

export default router;
