import { Outlet, Navigate, useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { cn } from '../../utils/cn';
import Logo from '../../assets/Logo.png';

export default function AdminLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Verify token
        axios.get('http://127.0.0.1:8000/api/user')
            .then(() => setIsAuthenticated(true))
            .catch(() => {
                localStorage.removeItem('admin_token');
                setIsAuthenticated(false);
            });
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/logout');
        } catch (e) {
            console.error(e);
        }
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    if (isAuthenticated === null) return <div className="p-10">Loading...</div>;
    if (isAuthenticated === false) return <Navigate to="/admin/login" />;

    const navItems = [
        { label: 'Products', path: '/admin/products' },
        { label: 'Create Product', path: '/admin/products/create' },
    ];

    return (
        <div className="flex min-h-screen bg-neutral-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-neutral-200">
                <div className="flex items-center gap-3 p-6 border-b border-neutral-100">
                    <img src={Logo} alt="Setusia" className="h-10 w-10 object-contain" />
                    <Link to="/admin" className="flex flex-col justify-center">
                        <span className="text-lg font-bold text-primary tracking-tighter">Setusia</span>
                        <span className="text-xs text-neutral-500 font-medium leading-none">Admin Page</span>
                    </Link>
                </div>
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "block px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                location.pathname === item.path
                                    ? "bg-neutral-900 text-white"
                                    : "text-neutral-600 hover:bg-neutral-100"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 mt-8"
                    >
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
