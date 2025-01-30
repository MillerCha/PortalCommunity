'use client';

import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { AppDispatch } from '../../redux/store';
import { loginUser, registerUser } from '@/services/authService';

interface AuthFormProps {
    type: 'register' | 'login';
}

export default function AuthForm({ type }: AuthFormProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token =
                type === 'register'
                    ? await registerUser(username, password)
                    : await loginUser(username, password);

            const decoded: { id: number; username: string } = jwtDecode(token);
            dispatch(setUser(decoded));
            localStorage.setItem('token', token);
        } catch (error: any) {
            console.error('Error:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
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
            <button type="submit">{type === 'register' ? 'Register' : 'Login'}</button>
        </form>
    );
}