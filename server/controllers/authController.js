import authService from '../services/authService.js';
import { validationResult } from 'express-validator';

class AuthController {
    async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { username, password } = req.body;
            const result = await authService.login(username, password);

            if (!result) {
                return res.status(401).json({ message: 'İstifadəçi adı və ya şifrə yanlışdır.' });
            }

            res.json(result);
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Server xətası baş verdi.' });
        }
    }

    async me(req, res) {
        // req.user comes from authMiddleware
        res.json(req.user);
    }
}

export default new AuthController();
