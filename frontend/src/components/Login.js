import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login({ switchToSignup }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        try {
            await login(username, password);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Log In</h2>
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
            <button type="submit">Log in</button>
            <p>
                No account?{' '}
                <span className="link" onClick={switchToSignup}>Sign up</span>
            </p>
        </form>
    );
}