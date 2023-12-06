import React from "react";
import LoginForm from "../components/LoginForm.tsx";

const LoginPage: React.FC = () => {
    const handleLogin = (did: string, verifiableCredentials: string) => {
        // Perform api call from election center here
        console.log('Logging in with:', did, verifiableCredentials);
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onLogin={handleLogin} />
        </div>
    );
};

export default LoginPage;
