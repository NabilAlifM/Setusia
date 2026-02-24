import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        
            await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');

            const res = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            });

            localStorage.setItem('admin_token', res.data.token);
            // Configure axios defaults
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

            navigate('/admin/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-neutral-900 text-white py-2 rounded-lg font-bold hover:bg-neutral-800 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
