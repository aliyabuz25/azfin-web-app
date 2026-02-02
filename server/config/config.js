import dotenv from 'dotenv';
dotenv.config();

export const config = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || 'azfin-secure-secret-key-2024',
    UPLOAD_PATH: 'uploads/',
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf']
};
