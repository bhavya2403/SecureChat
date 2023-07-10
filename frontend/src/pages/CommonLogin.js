import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const CommonLogin = () => {
    const [showLogin, setShowLogin] = useState(true);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleRegisterClick = () => {
        setShowLogin(false);
    };

    return (
        <div className="flex flex-col items-center mt-20 font-sans">
            <h1 className="text-5xl mb-4">{showLogin ? 'Login Page' : 'Register Page'}</h1>
            {showLogin ? <LoginForm /> : <RegisterForm />}
            <div className="mt-4 text-2xl">
                {showLogin ? (
                    <p>
                        Don't have an account?{' '}
                        <a href="#" onClick={handleRegisterClick} className="text-blue-500">
                            Register here
                        </a>
                        .
                    </p>
                ) : (
                    <p>
                        Already have an account?{' '}
                        <a href="#" onClick={handleLoginClick} className="text-blue-500">
                            Login here
                        </a>
                        .
                    </p>
                )}
            </div>
        </div>
    );
};

export default CommonLogin;
