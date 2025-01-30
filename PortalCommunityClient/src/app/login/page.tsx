'use client';

import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { loginUser, registerUser } from '@/services/authService';

interface AuthFormProps {
    type: 'register' | 'login';
}

export default function AuthForm({ type }: AuthFormProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token =
                type === 'register'
                    ? await registerUser(username, password)
                    : await loginUser(username, password);


        } catch (error: any) {
            console.error('Error:', error.message);
        }
    };

    return (

        <div className='w-full'>

            <div className="w-80 m-auto text-right items-center">
                <form onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            שם משתמש
                        </label>
                        <input className="shadow appearance-none borde rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="שם משתמש"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            סיסמה
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password"
                            placeholder="סיסמה"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /></div>

                    <div className="flex items-center justify-between">
                        <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                            {type === 'register' ? 'Register' : 'Login'}
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
               
            </div>

        </div>
    );
}