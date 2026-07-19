import { useState } from "react";

export default function TodoItem({ todo, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(todo.text);
    const todoId = todo.id || todo._id;

    function saveEdit() {
        if (text.trim() && text !== todo.text) {
            onUpdate(todoId, { text });
        }

        setEditing(false);
    }

    return (
        <li className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onUpdate(todoId, { completed: !todo.completed })}
            />

            {editing ? (
                <input
                    className="todo-edit-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                    autoFocus
                />
            ) : (
                <span
                    className={`todo-text ${todo.completed ? 'completed' : ''}`}
                    onClick={() => setEditing(true)}
                >
                    {todo.text}
                </span>
            )}

            <button onClick={() => onDelete(todoId)}>Delete</button>
        </li>
    );
}