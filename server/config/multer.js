import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from './config.js';
import fs from 'fs-extra';

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        await fs.ensureDir(config.UPLOAD_PATH);
        cb(null, config.UPLOAD_PATH);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (config.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Yalnız şəkil və PDF faylları qəbul edilir.'), false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: config.MAX_FILE_SIZE
    }
});
