import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jsonService from './jsonService.js';
import { config } from '../config/config.js';

class AuthService {
    async findUserByUsername(username) {
        const users = await jsonService.read('users', 'users') || [];
        return users.find(u => u.username === username);
    }

    async createUser(userData) {
        const users = await jsonService.read('users', 'users') || [];

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = {
            id: userData.id || Date.now().toString(),
            username: userData.username,
            password: hashedPassword,
            role: userData.role || 'editor',
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        await jsonService.write('users', 'users', users);

        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async login(username, password) {
        const user = await this.findUserByUsername(username);
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            config.JWT_SECRET,
            { expiresIn: '24h' }
        );

        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }

    async listUsers() {
        const users = await jsonService.read('users', 'users') || [];
        return users.map(({ password, ...user }) => user);
    }

    async updateUser(id, updateData) {
        const users = await jsonService.read('users', 'users') || [];
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return null;

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        users[index] = { ...users[index], ...updateData };
        await jsonService.write('users', 'users', users);

        const { password, ...userWithoutPassword } = users[index];
        return userWithoutPassword;
    }

    async deleteUser(id) {
        const users = await jsonService.read('users', 'users') || [];
        const filtered = users.filter(u => u.id !== id);
        if (users.length === filtered.length) return false;

        await jsonService.write('users', 'users', filtered);
        return true;
    }

    async initializeAdmin() {
        const users = await jsonService.read('users', 'users');
        if (!users || users.length === 0) {
            // Create default admin if none exists
            await this.createUser({
                username: 'admin',
                password: 'adminpAssword123!', // This should be changed immediately
                role: 'admin'
            });
            console.log('Default admin created.');
        }
    }
}

export default new AuthService();
