import jsonService from '../services/jsonService.js';
import { v4 as uuidv4 } from 'uuid';

class ContentService {
    async getPageContent(pageId, mode = 'published') {
        const data = await jsonService.read('content', pageId) || {};
        return mode === 'draft' ? (data.draft || data.published || {}) : (data.published || {});
    }

    async updatePageContent(pageId, content, user) {
        const existing = await jsonService.read('content', pageId) || { published: {}, draft: {} };
        const updated = {
            ...existing,
            draft: {
                ...existing.draft,
                ...content
            },
            _metadata: {
                ...existing._metadata,
                lastDraftAt: new Date().toISOString(),
                lastDraftBy: user.username,
                version: (existing._metadata?.version || 0) + 1
            }
        };
        return await jsonService.write('content', pageId, updated);
    }

    async publishPage(pageId, user) {
        const existing = await jsonService.read('content', pageId);
        if (!existing || !existing.draft) throw new Error('No draft to publish');

        const updated = {
            ...existing,
            published: { ...existing.draft },
            _metadata: {
                ...existing._metadata,
                lastPublishedAt: new Date().toISOString(),
                lastPublishedBy: user.username
            }
        };
        return await jsonService.write('content', pageId, updated);
    }

    async getSections() {
        // Return a list of available sections/pages
        // In a real app, this might be a static list or derived from file list
        return ['home', 'about', 'services', 'contact', 'seo', 'header', 'footer'];
    }

    async rollback(pageId, backupTimestamp) {
        return await jsonService.restore('content', pageId, backupTimestamp);
    }

    async getHistory(pageId) {
        return await jsonService.getBackups('content', pageId);
    }
}

export default new ContentService();
