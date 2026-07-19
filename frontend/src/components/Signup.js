import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Signup({ switchToLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        try {
            await signup(username, password);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            {error && <p className="error">{error}</p>}
            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
            <p>
                Already have an account?{' '}
                <span className="link" onClick={switchToLogin}>Log In</span>
            </p>
        </form>
    );
}