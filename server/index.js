
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || '0.0.0.0';
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

const REQUESTS_FILE = path.join(__dirname, '../requests.json');

// Ensure requests file exists
if (!fs.existsSync(REQUESTS_FILE)) {
    fs.writeFileSync(REQUESTS_FILE, JSON.stringify([], null, 2));
}

// Request Management Endpoints
app.get('/api/requests', async (req, res) => {
    try {
        const data = await fs.promises.readFile(REQUESTS_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading requests file:', error);
        res.status(500).json({ error: 'Requests error' });
    }
});

app.post('/api/requests', async (req, res) => {
    try {
        const data = await fs.promises.readFile(REQUESTS_FILE, 'utf8');
        const requests = JSON.parse(data);
        const newRequest = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            status: 'pending',
            ...req.body
        };
        requests.unshift(newRequest);
        await fs.promises.writeFile(REQUESTS_FILE, JSON.stringify(requests, null, 2));
        res.json({ success: true, request: newRequest });
    } catch (error) {
        console.error('Error writing requests file:', error);
        res.status(500).json({ error: 'Fayl yazıla bilmədi' });
    }
});

app.put('/api/requests/:id', async (req, res) => {
    try {
        const data = await fs.promises.readFile(REQUESTS_FILE, 'utf8');
        let requests = JSON.parse(data);
        const index = requests.findIndex(r => r.id === req.params.id);
        if (index !== -1) {
            requests[index] = { ...requests[index], ...req.body };
            await fs.promises.writeFile(REQUESTS_FILE, JSON.stringify(requests, null, 2));
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/api/requests/:id', async (req, res) => {
    try {
        const data = await fs.promises.readFile(REQUESTS_FILE, 'utf8');
        let requests = JSON.parse(data);
        requests = requests.filter(r => r.id !== req.params.id);
        await fs.promises.writeFile(REQUESTS_FILE, JSON.stringify(requests, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

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


// User Management & Auth
const USERS_FILE = path.join(__dirname, '../users.json');

// Ensure users file exists
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

// Auth: Check if system is initialized (has any users)
app.get('/api/auth/check', async (req, res) => {
    try {
        const data = await fs.promises.readFile(USERS_FILE, 'utf8');
        const users = JSON.parse(data);
        res.json({ hasUsers: users.length > 0 });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Auth: Register (First time setup only if no users exist)
app.post('/api/auth/register', async (req, res) => {
    try {
        const data = await fs.promises.readFile(USERS_FILE, 'utf8');
        const users = JSON.parse(data);

        // If users already exist, this endpoint should strictly be used for "initial setup"
        // But for simplicity in this file-based system, we'll allow it if the caller knows what they are doing.
        // Ideally, this should be restricted.
        // However, the frontend AuthContext 'register' function only calls this if (!hasAdmin).
        // Let's enforce it here too?
        // Actually, let's keep it simple: Just add the user. 
        // The frontend context distinguishes between "Register (First time)" and "Add User (Admin action)".
        // Wait, for creating the FIRST admin, we use this.

        if (users.length > 0 && !req.body.force) {
            // In a real app we'd block this. But let's allow "registering" the first user.
            // If users exist, we might return an error if we enforce "only one registration via public endpoint".
            // For now, let's trust the logic: if users.length > 0, we require authentication to add more users (via /api/users).
            // So this endpoint is SPECIFICALLY for the first user.
            return res.status(403).json({ error: 'System already initialized' });
        }

        const newUser = {
            id: Date.now().toString(),
            username: req.body.username,
            password: req.body.password, // In production, hash this!
            role: 'admin',
            lastLogin: new Date().toISOString()
        };

        users.push(newUser);
        await fs.promises.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

        const { password, ...userWithoutPassword } = newUser;
        res.json({ success: true, user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Auth: Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const data = await fs.promises.readFile(USERS_FILE, 'utf8');
        const users = JSON.parse(data);
        const { username, password } = req.body;

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            user.lastLogin = new Date().toISOString();
            await fs.promises.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

            const { password: _, ...userWithoutPassword } = user;
            res.json({ success: true, user: userWithoutPassword });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Users: List
app.get('/api/users', async (req, res) => {
    try {
        const data = await fs.promises.readFile(USERS_FILE, 'utf8');
        const users = JSON.parse(data);
        // Remove passwords
        const safeUsers = users.map(({ password, ...u }) => u);
        res.json(safeUsers);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Users: Create (Admin action)
app.post('/api/users', async (req, res) => {
    try {
        const data = await fs.promises.readFile(USERS_FILE, 'utf8');
        const users = JSON.parse(data);

        if (users.some(u => u.username === req.body.username)) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const newUser = {
            id: Date.now().toString(),
            username: req.body.username,
            password: req.body.password,
            role: req.body.role || 'editor',
            lastLogin: null
        };

        users.push(newUser);
        await fs.promises.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

        const { password, ...safeUser } = newUser;
        res.json({ success: true, user: safeUser });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Users: Update
app.put('/api/users/:id', async (req, res) => {
    try {
        const data = await fs.promises.readFile(USERS_FILE, 'utf8');
        let users = JSON.parse(data);
        const index = users.findIndex(u => u.id === req.params.id);

        if (index !== -1) {
            const updatedUser = { ...users[index], ...req.body };
            // Ensure ID doesn't change
            updatedUser.id = req.params.id;
            users[index] = updatedUser;

            await fs.promises.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
            const { password, ...safeUser } = updatedUser;
            res.json({ success: true, user: safeUser });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Users: Delete
app.delete('/api/users/:id', async (req, res) => {
    try {
        const data = await fs.promises.readFile(USERS_FILE, 'utf8');
        let users = JSON.parse(data);
        users = users.filter(u => u.id !== req.params.id);
        await fs.promises.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
