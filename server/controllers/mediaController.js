import mediaService from '../services/mediaService.js';

class MediaController {
    async list(req, res) {
        try {
            const list = await mediaService.getMediaList();
            res.json(list);
        } catch (error) {
            res.status(500).json({ message: 'Media siyahısı yüklənərkən xəta baş verdi.' });
        }
    }

    async upload(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Fayl seçilməyib.' });
            }

            const metadata = {
                altText: req.body.altText,
                tags: req.body.tags ? JSON.parse(req.body.tags) : [],
                category: req.body.category
            };

            const media = await mediaService.addMedia(req.file, metadata, req.user);
            res.json(media);
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({ message: 'Fayl yüklənərkən xəta baş verdi.' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const updated = await mediaService.updateMedia(id, req.body);
            if (!updated) return res.status(404).json({ message: 'Media tapılmadı.' });
            res.json(updated);
        } catch (error) {
            res.status(500).json({ message: 'Media yenilənərkən xəta baş verdi.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const success = await mediaService.deleteMedia(id);
            if (!success) return res.status(404).json({ message: 'Media tapılmadı.' });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ message: 'Media silinərkən xəta baş verdi.' });
        }
    }
}

export default new MediaController();
