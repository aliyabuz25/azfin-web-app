import express from 'express';
import jsonService from '../services/jsonService.js';
import authService from '../services/authService.js';
import { upload } from '../config/multer.js';
import mediaController from '../controllers/mediaController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Compatibility for /api/upload
router.post('/upload', authenticate, upload.single('image'), mediaController.upload);

// Compatibility for /api/data
router.get('/data', async (req, res) => {
    try {
        const data = await jsonService.read('content', 'legacy_data') || {};
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/data', authenticate, async (req, res) => {
    try {
        await jsonService.write('content', 'legacy_data', req.body);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User Management (Missing endpoints the frontend calls)
router.get('/users', authenticate, async (req, res) => {
    try {
        const users = await authService.listUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/users', authenticate, authorize('admin'), async (req, res) => {
    try {
        const user = await authService.createUser(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/users/:id', authenticate, async (req, res) => {
    try {
        // Only admin can update others, users can update themselves
        if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
            return res.status(403).json({ error: 'Permission denied' });
        }
        const user = await authService.updateUser(req.params.id, req.body);
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/users/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const success = await authService.deleteUser(req.params.id);
        res.json({ success });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Compatibility for /api/auth/check
router.get('/auth/check', async (req, res) => {
    const users = await jsonService.read('users', 'users') || [];
    res.json({ hasUsers: users.length > 0 });
});

// Compatibility for register (first time)
router.post('/auth/register', async (req, res) => {
    const users = await jsonService.read('users', 'users') || [];
    if (users.length > 0) return res.status(403).json({ error: 'Already initialized' });

    const user = await authService.createUser({
        username: req.body.username,
        password: req.body.password,
        role: 'admin'
    });

    const result = await authService.login(req.body.username, req.body.password);
    res.json({ success: true, ...result });
});

export default router;
