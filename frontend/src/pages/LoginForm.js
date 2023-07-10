import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [pageStatus, setPageStatus] = useState('noloading');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPageStatus('loading');
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        if (!response) {
        } else if (response.status === 401) setPageStatus('unauthorized');
        else if (response.status === 404) setPageStatus('nouser');
        else {
            setPageStatus('done');
            window.username = username;
        }
    };

    const navigateToMessaging = () => {
        navigate('/messaging/');
    };

    if (pageStatus === 'done') {
        navigateToMessaging();
        return null;
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col py-5 text-2xl my-3">
            <label className="block">
                <span className="block mb-2">Username</span>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-500 block text-2xl rounded-2xl border-2 border-slate-400
                        focus:border-white autofill:bg-gray-700"
                />
            </label>
            <label className="block mt-5">
                <span className="block mb-2">Password</span>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-500 text-2xl rounded-2xl border-2 border-slate-400
                        focus:border-white autofill:bg-gray-700"
                />
            </label>
            <div className="text-red-500 mt-2">
                {pageStatus === 'loading'
                    ? 'Please wait while loading...'
                    : pageStatus === 'unauthorized'
                        ? 'Incorrect Password'
                        : pageStatus === 'nouser'
                            ? 'No user exists with this name'
                            : ''}
            </div>
            <button type="submit" className="mt-7 bg-blue-500 text-white px-4 py-2 rounded-3xl hover:bg-blue-400">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
