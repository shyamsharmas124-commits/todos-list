import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const { username, logout } = useAuth();

    function getTodoId(todo) {
        return todo.id || todo._id;
    }

    useEffect(() => {
        loadTodos();
    }, []);

    async function loadTodos() {
        try {
            const data = await api.getTodos();
            setTodos(data);
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
            setTodos([newTodo, ...todos]);
            setText('');
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleUpdate(id, updates) {
        try {
            const updated = await api.updateTodo(id, updates);
            setTodos(todos.map((t) => (getTodoId(t) === id ? updated : t)));
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDelete(id) {
        try {
            await api.deleteTodo(id);
            setTodos(todos.filter((t) => getTodoId(t) !== id));
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="todo-list-wrapper">
            <div className="todo-header">
                <h2>{username}'s todos</h2>
                <button onClick={logout}>Log Out</button>
            </div>

            {error && <p className="error">{error}</p>}

            <form className="add-todo-form" onSubmit={handleAdd}>
                <input
                    placeholder="Add a todo.."
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
        </div>

        
    );
}