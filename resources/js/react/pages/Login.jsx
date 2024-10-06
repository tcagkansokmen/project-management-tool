import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center">
            <div className="text-center mb-8 z-50 relative">
                <h1 className="text-2xl font-bold text-white mb-2">MagicPort - Project Management Tool Development</h1>
                <p className="text-gray-400">
                    This project is a part of the MagicPort project management tool development.
                    The project is developed by the MagicPort team.
                </p>
            </div>

            <div className="bg-[#111] bg-opacity-70 max-w-lg w-full p-6 rounded-[12px] shadow-lg border border-[#1f1f1f] z-50 relative flex align-items-center justify-center flex-col">
                <img src="https://magicport.ai/front/img/logo-light.svg" alt="Logo" className="h-12 mb-5" />
                <h3 className="text-xl font-semibold text-center mb-6 text-white">Login</h3>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="email"
                        id="email"
                        className="bg-[rgb(39,39,42)] text-white rounded-[12px] p-[22px_14px] focus:outline-none hover:bg-[rgb(63,63,70)] text-[14px] mb-[15px]"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        id="password"
                        className="bg-[rgb(39,39,42)] text-white rounded-[12px] p-[22px_14px] focus:outline-none hover:bg-[rgb(63,63,70)] text-[14px] mb-[15px]"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <p className="text-red-500 text-sm mt-2 mb-5">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="bg-white text-black rounded-[12px] p-[16px_12px] hover:bg-gray-200 focus:outline-none text-[14px] mb-[15px] font-semibold mt-5"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
