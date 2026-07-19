import { createContext, useContext, useState } from 'react';
import { api } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [username, setUsername] = useState(localStorage.getItem('username') || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    function saveSession(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        setToken(data.token);
        setUsername(data.username);
    }

    async function login(username, password) {
        const data = await api.login(username, password);
        saveSession(data);
    }

    async function signup(username, password) {
        const data = await api.signup(username, password);
        saveSession(data);
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken(null);
        setUsername(null);
    }

    return (
        <AuthContext.Provider value={{ username, token, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}