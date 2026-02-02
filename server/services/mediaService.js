import jsonService from './jsonService.js';
import fs from 'fs-extra';
import path from 'path';
import { config } from '../config/config.js';

class MediaService {
    async getMediaList() {
        return await jsonService.read('media', 'library') || [];
    }

    async addMedia(file, metadata = {}, user) {
        const library = await this.getMediaList();

        const newMedia = {
            id: file.filename, // Using filename as ID for simplicity
            originalName: file.originalname,
            filename: file.filename,
            url: `/${config.UPLOAD_PATH}${file.filename}`,
            mimetype: file.mimetype,
            size: file.size,
            altText: metadata.altText || '',
            tags: metadata.tags || [],
            category: metadata.category || 'general',
            uploadedAt: new Date().toISOString(),
            uploadedBy: user.username
        };

        library.unshift(newMedia);
        await jsonService.write('media', 'library', library);
        return newMedia;
    }

    async updateMedia(id, updates) {
        let library = await this.getMediaList();
        const index = library.findIndex(m => m.id === id);

        if (index !== -1) {
            library[index] = { ...library[index], ...updates };
            await jsonService.write('media', 'library', library);
            return library[index];
        }
        return null;
    }

    async deleteMedia(id) {
        let library = await this.getMediaList();
        const media = library.find(m => m.id === id);

        if (media) {
            const filePath = path.join(process.cwd(), config.UPLOAD_PATH, media.filename);
            await fs.remove(filePath).catch(e => console.error('File delete error:', e));

            library = library.filter(m => m.id !== id);
            await jsonService.write('media', 'library', library);
            return true;
        }
        return false;
    }
}

export default new MediaService();
