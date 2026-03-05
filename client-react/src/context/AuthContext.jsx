import React, { createContext, useContext, useState } from 'react';
import { API_URL } from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
    const [username, setUsername] = useState('Admin');

    const login = async (user, pass) => {
        try {
            const res = await fetch(`${API_URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user, password: pass })
            });

            let data = {};
            try {
                data = await res.json();
            } catch (err) {
                data = {};
            }

            if (res.ok) {
                setToken(data.token);
                setUsername(data.username);
                localStorage.setItem('admin_token', data.token);
                return { success: true };
            }

            return { success: false, message: data.message || 'Login failed' };
        } catch (err) {
            return { success: false, message: 'Backend unavailable. Please try again.' };
        }
    };

    const logout = () => {
        setToken('');
        localStorage.removeItem('admin_token');
    };

    return (
        <AuthContext.Provider value={{ token, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
