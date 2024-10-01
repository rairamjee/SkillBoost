"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(''); // Clear any previous errors

        try {
            const { data: { data } } = await axios.post('/api/login', {
                email: username,
                password: userPassword,
            });

            console.log(data);

            localStorage.setItem('user', JSON.stringify(data));
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
            setError('Invalid username or password.'); // Set error message for invalid login
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-slate-900">
            {/* Left side for login form */}
            <div className="left-side ml-4 w-full lg:w-1/2 md:w-2/3 h-screen p-8 flex flex-col justify-center text-slate-50">
                <h2 className="text-4xl font-bold mb-4">SkillBoost!</h2>
                <h3 className="mb-24 text-lg">Welcome Back...</h3>
                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-900 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-white focus:text-indigo-700"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <a className="inline-block mt-4 align-baseline font-bold text-sm text-red-200 hover:text-red-400" href="#">
                    Forgot Password?
                </a>
            </div>

            {/* Right side for illustration */}
            <div className="right-side hidden md:flex lg:flex w-1/2 h-screen items-center justify-start p-8">
                <img src="/login.jpg" alt="Login Illustration" className="w-4/5 h-4/5 object-contain" />
            </div>
        </div>
    );
};

export default Login;
