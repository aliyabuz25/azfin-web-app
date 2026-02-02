import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import NodeCache from 'node-cache';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
const DATA_DIR = path.join(__dirname, '../data');

class JsonService {
    constructor() {
        this.ensureDirectories();
    }

    async ensureDirectories() {
        const dirs = [
            'content',
            'media',
            'users',
            'backups',
            'requests'
        ];
        for (const dir of dirs) {
            await fs.ensureDir(path.join(DATA_DIR, dir));
        }
    }

    async read(category, filename) {
        const filePath = path.join(DATA_DIR, category, `${filename}.json`);

        // Try cache first
        const cacheKey = `${category}:${filename}`;
        const cachedData = cache.get(cacheKey);
        if (cachedData) return cachedData;

        if (!(await fs.pathExists(filePath))) {
            return null;
        }

        const data = await fs.readJson(filePath);
        cache.set(cacheKey, data);
        return data;
    }

    async write(category, filename, data, createBackup = true) {
        const filePath = path.join(DATA_DIR, category, `${filename}.json`);

        if (createBackup && await fs.pathExists(filePath)) {
            await this.backup(category, filename);
        }

        await fs.writeJson(filePath, data, { spaces: 2 });

        // Update cache
        const cacheKey = `${category}:${filename}`;
        cache.set(cacheKey, data);

        return data;
    }

    async backup(category, filename) {
        const sourcePath = path.join(DATA_DIR, category, `${filename}.json`);
        const backupDir = path.join(DATA_DIR, 'backups', category, filename);
        await fs.ensureDir(backupDir);

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(backupDir, `${timestamp}.json`);

        await fs.copy(sourcePath, backupPath);

        // Limit backups to last 10
        const files = await fs.readdir(backupDir);
        if (files.length > 10) {
            files.sort();
            const toDelete = files.slice(0, files.length - 10);
            for (const file of toDelete) {
                await fs.remove(path.join(backupDir, file));
            }
        }
    }

    async getBackups(category, filename) {
        const backupDir = path.join(DATA_DIR, 'backups', category, filename);
        if (!(await fs.pathExists(backupDir))) return [];

        const files = await fs.readdir(backupDir);
        return files.sort().reverse();
    }

    async restore(category, filename, backupTimestamp) {
        const backupPath = path.join(DATA_DIR, 'backups', category, filename, `${backupTimestamp}.json`);
        const targetPath = path.join(DATA_DIR, category, `${filename}.json`);

        if (!(await fs.pathExists(backupPath))) {
            throw new Error('Backup not found');
        }

        await fs.copy(backupPath, targetPath);

        const data = await fs.readJson(targetPath);
        const cacheKey = `${category}:${filename}`;
        cache.set(cacheKey, data);

        return data;
    }

    clearCache() {
        cache.flushAll();
    }
}

export default new JsonService();
