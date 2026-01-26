
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
    id: string;
    username: string;
    role: 'admin' | 'editor';
    password?: string;
    lastLogin?: string;
}

interface AuthContextType {
    user: User | null;
    users: User[];
    login: (username: string, password: string) => Promise<boolean>;
    register: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    hasAdmin: boolean;
    addUser: (user: Omit<User, 'id'>) => void;
    updateUser: (id: string, user: Partial<User>) => void;
    deleteUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [hasAdmin, setHasAdmin] = useState<boolean>(false);

    useEffect(() => {
        const storedActiveUser = localStorage.getItem('azfin_active_user');
        if (storedActiveUser) {
            setUser(JSON.parse(storedActiveUser));
        }

        const storedUsers = localStorage.getItem('azfin_users');
        if (storedUsers) {
            const parsedUsers = JSON.parse(storedUsers);
            setUsers(parsedUsers);
            setHasAdmin(parsedUsers.some((u: User) => u.role === 'admin'));
        } else {
            // No users at all, hasAdmin is false
            setHasAdmin(false);
        }
    }, []);

    const saveUsers = (newUsers: User[]) => {
        setUsers(newUsers);
        localStorage.setItem('azfin_users', JSON.stringify(newUsers));
        setHasAdmin(newUsers.some(u => u.role === 'admin'));
    };

    const login = async (username: string, password: string) => {
        const foundUser = users.find(u => u.username === username && u.password === password);
        if (foundUser) {
            const { password, ...userWithoutPassword } = foundUser;
            const activeUser = { ...userWithoutPassword, lastLogin: new Date().toISOString() };
            setUser(activeUser);
            localStorage.setItem('azfin_active_user', JSON.stringify(activeUser));

            // Update last login in users list
            const updatedUsers = users.map(u => u.id === foundUser.id ? { ...u, lastLogin: activeUser.lastLogin } : u);
            saveUsers(updatedUsers);
            return true;
        }
        return false;
    };

    const register = async (username: string, password: string) => {
        if (hasAdmin) return false;

        const newUser: User = {
            id: '1',
            username,
            password,
            role: 'admin',
            lastLogin: new Date().toISOString()
        };

        const newUsers = [newUser];
        saveUsers(newUsers);

        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('azfin_active_user', JSON.stringify(userWithoutPassword));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('azfin_active_user');
    };

    const addUser = (userData: Omit<User, 'id'>) => {
        const newUser: User = {
            ...userData,
            id: Date.now().toString(),
        };
        saveUsers([...users, newUser]);
    };

    const updateUser = (id: string, userData: Partial<User>) => {
        const updatedUsers = users.map(u => u.id === id ? { ...u, ...userData } : u);
        saveUsers(updatedUsers);

        // If current user is updated, update local state
        if (user && user.id === id) {
            const { password, ...rest } = updatedUsers.find(u => u.id === id)!;
            setUser(rest);
            localStorage.setItem('azfin_active_user', JSON.stringify(rest));
        }
    };

    const deleteUser = (id: string) => {
        if (user && user.id === id) return; // Cannot delete self
        const updatedUsers = users.filter(u => u.id !== id);
        saveUsers(updatedUsers);
    };

    return (
        <AuthContext.Provider value={{
            user, users, login, register, logout,
            isAuthenticated: !!user, hasAdmin,
            addUser, updateUser, deleteUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
