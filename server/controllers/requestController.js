import requestService from '../services/requestService.js';

class RequestController {
    async list(req, res) {
        try {
            const list = await requestService.getRequests();
            res.json(list);
        } catch (error) {
            res.status(500).json({ message: 'Müraciətlər yüklənərkən xəta baş verdi.' });
        }
    }

    async create(req, res) {
        try {
            const request = await requestService.addRequest(req.body);
            res.json(request);
        } catch (error) {
            res.status(500).json({ message: 'Müraciət göndərilərkən xəta baş verdi.' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const updated = await requestService.updateRequest(id, req.body);
            res.json(updated);
        } catch (error) {
            res.status(500).json({ message: 'Yenilənmə zamanı xəta baş verdi.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await requestService.deleteRequest(id);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ message: 'Silinmə zamanı xəta baş verdi.' });
        }
    }

    async getSmtp(req, res) {
        try {
            const smtp = await requestService.getSmtpSettings();
            res.json(smtp);
        } catch (error) {
            res.status(500).json({ message: 'SMTP ayarları yüklənərkən xəta baş verdi.' });
        }
    }

    async updateSmtp(req, res) {
        try {
            await requestService.updateSmtpSettings(req.body);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ message: 'SMTP ayarları yadda saxlanılarkən xəta baş verdi.' });
        }
    }
}

export default new RequestController();
