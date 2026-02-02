import express from 'express';
import mediaController from '../controllers/mediaController.js';
import { upload } from '../config/multer.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, mediaController.list);
router.post('/upload', authenticate, upload.single('image'), mediaController.upload);
router.put('/:id', authenticate, mediaController.update);
router.delete('/:id', authenticate, mediaController.delete);

export default router;
