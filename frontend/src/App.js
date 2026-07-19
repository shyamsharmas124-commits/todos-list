import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodoList from "./components/TodoList";
import './App.css';

function Main() {
    const { username } = useAuth();
    const [view, setView] = useState('login');

    if (username) {
        return <TodoList />;
    }
    return view === 'login' ? (
        <Login switchToSignup={() => setView('signup')} />

    ) : (
        <Signup switchToLogin={() => setView('login')} />
    );
}

export default function App() {
    return (
        <AuthProvider>
            <div className="app">
                <Main />
            </div>
        </AuthProvider>
    );
}