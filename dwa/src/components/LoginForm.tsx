import React, { useState } from 'react';

interface LoginProps {
    onLogin: (did: string, verifiableCredentials: string) => void;
}

const LoginForm = ({ onLogin }) => {
    const [did, setDid] = useState('');
    const [verifiableCredentials, setVerifiableCredentials] = useState('');

    const handleDidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDid(e.target.value);
    };

    const handleVerifiableCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVerifiableCredentials(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onLogin(did, verifiableCredentials);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="did">Username:</label>
                <input
                    type="text"
                    id="did"
                    value={did}
                    onChange={handleDidChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="verifiableCredentials">Password:</label>
                <input
                    type="verifiableCredentials"
                    id="verifiableCredentials"
                    value={verifiableCredentials}
                    onChange={handleVerifiableCredentialChange}
                    required
                />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    );
};

export default LoginForm;
