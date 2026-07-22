import { useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import TodoItem from './TodoItem';

function getTodoId(todo) {
    return todo.id || todo._id;
}

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [trash, setTrash] = useState([]);
    const [view, setView] = useState('active');
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const { username, logout } = useAuth();

    useEffect(() => {
        loadTodos();
    }, []);

    useEffect(() => {
        if (view === 'trash') {
            loadTrash();
        }
    }, [view]);

    async function loadTodos() {
        try {
            const data = await api.getTodos();
            setTodos(data);
        } catch (err) {
            setError(err.message);
        }
    }

    async function loadTrash() {
        try {
            const data = await api.getTrash();
            setTrash(data);
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleAdd(e) {
        e.preventDefault();

        if (!text.trim()) {
            return;
        }

        try {
            const newTodo = await api.addTodo(text);
            setTodos((currentTodos) => [newTodo, ...currentTodos]);
            setText('');
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleUpdate(id, updates) {
        try {
            const updated = await api.updateTodo(id, updates);
            setTodos((currentTodos) => currentTodos.map((todo) => (getTodoId(todo) === id ? updated : todo)));
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDelete(id) {
        try {
            const deleted = await api.deleteTodo(id);
            setTodos((currentTodos) => currentTodos.filter((todo) => getTodoId(todo) !== id));
            setTrash((currentTrash) => [deleted, ...currentTrash]);
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleRestore(id) {
        try {
            const restored = await api.restoreTodo(id);
            setTrash((currentTrash) => currentTrash.filter((todo) => getTodoId(todo) !== id));
            setTodos((currentTodos) => [restored, ...currentTodos]);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="todo-list-wrapper">
            <div className="todo-header">
                <h2>{username}'s todos</h2>
                <button onClick={logout}>Log out</button>
            </div>

            <div className="view-toggle">
                <span
                    className={view === 'active' ? 'view-tab active' : 'view-tab'}
                    onClick={() => setView('active')}
                >
                    Todos
                </span>
                <span
                    className={view === 'trash' ? 'view-tab active' : 'view-tab'}
                    onClick={() => setView('trash')}
                >
                    Trash
                </span>
            </div>

            {error && <p className="error">{error}</p>}

            {view === 'active' && (
                <>
                    <form className="add-todo-form" onSubmit={handleAdd}>
                        <input
                            placeholder="Add a todo..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button type="submit">Add</button>
                    </form>

                    <ul className="todo-list">
                        {todos.map((todo) => (
                            <TodoItem
                                key={getTodoId(todo)}
                                todo={todo}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                            />
                        ))}
                    </ul>
                </>
            )}

            {view === 'trash' && (
                <ul className="todo-list">
                    {trash.map((todo) => (
                        <li key={getTodoId(todo)} className="todo-item trash-item">
                            <div className="todo-main">
                                <span className="todo-text completed">{todo.text}</span>
                                <button onClick={() => handleRestore(getTodoId(todo))}>Restore</button>
                            </div>
                            <div className="todo-meta">
                                <span>
                                    deleted{' '}
                                    {new Date(todo.deletedAt).toLocaleString(undefined, {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}