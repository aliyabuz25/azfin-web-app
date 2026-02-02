
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
    id: string;
    username: string;
    role: 'admin' | 'editor';
    password?: string;
    lastLogin?: string;
    token?: string;
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

// Helper to get base URL - leaving empty to let Vite proxy or relative path handle it
const BASE_URL = '';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [hasAdmin, setHasAdmin] = useState<boolean>(false);

    // Initial check
    useEffect(() => {
        const storedActiveUser = localStorage.getItem('azfin_active_user');
        if (storedActiveUser) {
            setUser(JSON.parse(storedActiveUser));
        }

        checkSystemStatus();
        fetchUsers();
    }, []);

    const checkSystemStatus = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/auth/check`);
            const data = await res.json();
            setHasAdmin(data.hasUsers);
        } catch (error) {
            console.error('Error checking system status:', error);
        }
    };

    const fetchUsers = async () => {
        const token = user?.token;
        if (!token) {
            const storedActiveUser = localStorage.getItem('azfin_active_user');
            if (!storedActiveUser) return;
        }

        const activeToken = token || (user?.token) || (localStorage.getItem('azfin_active_user') ? JSON.parse(localStorage.getItem('azfin_active_user')!).token : null);

        try {
            const res = await fetch(`${BASE_URL}/api/users`, {
                headers: {
                    'Authorization': activeToken ? `Bearer ${activeToken}` : ''
                }
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
                // Also update hasAdmin state based on fetched users (though /auth/check handles initial load)
                if (data.length > 0) setHasAdmin(true);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const res = await fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (res.ok) {
                const data = await res.json();
                const userWithToken = { ...data.user, token: data.token };
                setUser(userWithToken);
                localStorage.setItem('azfin_active_user', JSON.stringify(userWithToken));
                await fetchUsers();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const register = async (username: string, password: string) => {
        try {
            const res = await fetch(`${BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (res.ok) {
                const data = await res.json();
                // Since register might not return a token, we might need a separate login or fix register on server
                const userWithToken = data.token ? { ...data.user, token: data.token } : data.user;
                setUser(userWithToken);
                localStorage.setItem('azfin_active_user', JSON.stringify(userWithToken));
                setHasAdmin(true);
                await fetchUsers();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Register error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('azfin_active_user');
    };

    const addUser = async (userData: Omit<User, 'id'>) => {
        const token = user?.token;

        try {
            const res = await fetch(`${BASE_URL}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(userData)
            });
            if (res.ok) {
                await fetchUsers();
            } else {
                const error = await res.json();
                alert('Xəta: ' + (error.message || 'İstifadəçi əlavə edilə bilmədi'));
            }
        } catch (error) {
            console.error('Add user error:', error);
        }
    };

    const updateUser = async (id: string, userData: Partial<User>) => {
        const token = user?.token;

        try {
            const res = await fetch(`${BASE_URL}/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(userData)
            });

            if (res.ok) {
                await fetchUsers();
                // Check if we updated ourselves
                if (user && user.id === id) {
                    const data = await res.json();
                    const updatedUserWithToken = { ...data.user, token: user.token };
                    setUser(updatedUserWithToken);
                    localStorage.setItem('azfin_active_user', JSON.stringify(updatedUserWithToken));
                }
            }
        } catch (error) {
            console.error('Update user error:', error);
        }
    };

    const deleteUser = async (id: string) => {
        const token = user?.token;

        try {
            const res = await fetch(`${BASE_URL}/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });
            if (res.ok) {
                await fetchUsers();
            }
        } catch (error) {
            console.error('Delete user error:', error);
        }
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
