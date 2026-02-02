import jsonService from './jsonService.js';
import nodemailer from 'nodemailer';

class RequestService {
    async getRequests() {
        return await jsonService.read('requests', 'submissions') || [];
    }

    async addRequest(requestData) {
        const requests = await this.getRequests();
        const newRequest = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            status: 'pending',
            ...requestData
        };
        requests.unshift(newRequest);
        await jsonService.write('requests', 'submissions', requests);

        // Trigger email notification
        this.sendEmail(newRequest).catch(console.error);

        return newRequest;
    }

    async updateRequest(id, updates) {
        let requests = await this.getRequests();
        const index = requests.findIndex(r => r.id === id);
        if (index !== -1) {
            requests[index] = { ...requests[index], ...updates };
            await jsonService.write('requests', 'submissions', requests);
            return requests[index];
        }
        return null;
    }

    async deleteRequest(id) {
        let requests = await this.getRequests();
        const filtered = requests.filter(r => r.id !== id);
        await jsonService.write('requests', 'submissions', filtered);
        return true;
    }

    async sendEmail(data) {
        const smtp = await jsonService.read('settings', 'smtp');
        if (!smtp || !smtp.host) return;

        const transporter = nodemailer.createTransport({
            host: smtp.host,
            port: smtp.port || 587,
            secure: smtp.secure || false,
            auth: {
                user: smtp.user,
                pass: smtp.pass
            }
        });

        await transporter.sendMail({
            from: smtp.fromEmail || smtp.user,
            to: smtp.toEmail || smtp.user,
            subject: `Yeni Müraciət: ${data.name || 'Adsız'}`,
            html: `<h3>Yeni Müraciət Daxil Oldu</h3><p>Ad: ${data.name}</p><p>Telefon: ${data.phone}</p><p>Mesaj: ${data.message}</p>`
        });
    }

    async getSmtpSettings() {
        return await jsonService.read('settings', 'smtp') || {};
    }

    async updateSmtpSettings(settings) {
        return await jsonService.write('settings', 'smtp', settings);
    }
}

export default new RequestService();
