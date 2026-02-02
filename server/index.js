import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config/config.js';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import mediaRoutes from './routes/media.js';
import requestRoutes from './routes/requests.js';
import compatibilityRoutes from './routes/compatibility.js';
import authService from './services/authService.js';
import jsonService from './services/jsonService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security Middlewares
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
}));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Serve uploads
app.use('/' + config.UPLOAD_PATH, express.static(path.join(__dirname, '../', config.UPLOAD_PATH)));

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api', compatibilityRoutes);

// Serve Frontend (Static files)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Wildcard route for React SPA (must be after API routes)
app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// Initialize data and start server
const start = async () => {
    try {
        await jsonService.ensureDirectories();
        // Removed automatic admin initialization to allow first-time registration through UI

        app.listen(config.PORT, '0.0.0.0', () => {
            console.log(`CMS Backend running on port ${config.PORT}`);
        });
    } catch (error) {
        console.error('Initialization error:', error);
    }
};

start();
