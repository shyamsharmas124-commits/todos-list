const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function getToken() {
    return localStorage.getItem('token');
}

async function request(path, options = {}) {
    const token = getToken();
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.message || 'Request failed');
    }

    return data;
}

export const api = {
    signup: (username, password) => request('/auth/signup', { method: 'POST', body: JSON.stringify({ username, password }) }),
    login: (username, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
    getTodos: () => request('/todos'),
    addTodo: (text) => request('/todos', { method: 'POST', body: JSON.stringify({ text }) }),
    updateTodo: (id, updates) => request(`/todos/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
    deleteTodo: (id) => request(`/todos/${id}`, { method: 'DELETE' }),
};


