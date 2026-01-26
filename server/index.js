
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;
const DATA_FILE = path.join(__dirname, '../data.json');

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

// Data Management Endpoints
app.get('/api/data', async (req, res) => {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = await fs.promises.readFile(DATA_FILE, 'utf8');
            res.json(JSON.parse(data));
        } else {
            console.log('Data file not found at:', DATA_FILE);
            res.json({});
        }
    } catch (error) {
        console.error('Error reading data file:', error);
        res.status(500).json({ error: 'Server data error' });
    }
});

app.post('/api/data', async (req, res) => {
    try {
        await fs.promises.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2));
        console.log('Data saved successfully to:', DATA_FILE);
        res.json({ success: true });
    } catch (error) {
        console.error('Error writing data file:', error);
        res.status(500).json({ error: 'Fayl yazıla bilmədi' });
    }
});

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    // Relative URL for Traefik compatibility
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
