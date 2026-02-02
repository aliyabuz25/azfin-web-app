import contentService from '../services/contentService.js';
import { sanitizeHtml } from '../utils/sanitize.js';

class ContentController {
    async getPage(req, res) {
        try {
            const { pageId } = req.params;
            const mode = req.query.mode || 'published'; // 'draft' or 'published'
            const content = await contentService.getPageContent(pageId, mode);
            res.json(content);
        } catch (error) {
            res.status(500).json({ message: 'Məzmun yüklənərkən xəta baş verdi.' });
        }
    }

    async updatePage(req, res) {
        try {
            const { pageId } = req.params;
            const content = sanitizeHtml(req.body);
            const updated = await contentService.updatePageContent(pageId, content, req.user);
            res.json(updated);
        } catch (error) {
            res.status(500).json({ message: 'Məzmun yadda saxlanılarkən xəta baş verdi.' });
        }
    }

    async publish(req, res) {
        try {
            const { pageId } = req.params;
            const published = await contentService.publishPage(pageId, req.user);
            res.json(published);
        } catch (error) {
            res.status(500).json({ message: 'Paylaşım zamanı xəta baş verdi.' });
        }
    }

    async getSections(req, res) {
        try {
            const sections = await contentService.getSections();
            res.json(sections);
        } catch (error) {
            res.status(500).json({ message: 'Bölmələr yüklənərkən xəta baş verdi.' });
        }
    }

    async getHistory(req, res) {
        try {
            const { pageId } = req.params;
            const history = await contentService.getHistory(pageId);
            res.json(history);
        } catch (error) {
            res.status(500).json({ message: 'Tarixçə yüklənərkən xəta baş verdi.' });
        }
    }

    async rollback(req, res) {
        try {
            const { pageId } = req.params;
            const { timestamp } = req.body;
            const restored = await contentService.rollback(pageId, timestamp);
            res.json(restored);
        } catch (error) {
            res.status(500).json({ message: 'Geri qaytarma zamanı xəta baş verdi.' });
        }
    }
}

export default new ContentController();
