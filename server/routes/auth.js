import express from 'express';
import { body } from 'express-validator';
import authController from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', [
    body('username').notEmpty().withMessage('İstifadəçi adı vacibdir.'),
    body('password').notEmpty().withMessage('Şifrə vacibdir.')
], authController.login);

router.get('/me', authenticate, authController.me);

export default router;
