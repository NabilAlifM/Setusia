import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBagIcon, HeartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../stores/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../assets/Logo.png';


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { wishlist } = useStore();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="layout-container flex items-center justify-between">
                <div className="Logo flex items-center gap-2">
                    <Link to="/" className="text-2xl font-bold text-primary tracking-tighter">
                        <img src={Logo} alt="Setusia Logo" className="h-14 hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.6)] transition-all duration-300" />
                    </Link>
                    <Link to="/" className="flex flex-col justify-center gap-1">
                        <span className="text-xl font-bold text-primary tracking-tighter">Setusia</span>
                        <span className="text-sm text-neutral-500 font-medium leading-none">Sepatu Terbaik untuk Semua</span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Beranda</Link>
                    <Link to="/catalog" className="text-sm font-medium hover:text-primary transition-colors">Katalog</Link>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Link to="/wishlist" className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors">
                        <HeartIcon className="w-6 h-6 text-neutral-900" />
                        {wishlist.length > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-[10px] text-white flex items-center justify-center rounded-full font-bold">
                                {wishlist.length}
                            </span>
                        )}
                    </Link>
                    <Link to="/catalog">
                        <button className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-colors shadow-lg shadow-red-200">
                            Masuk
                        </button>
                    </Link>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-neutral-900"
                >
                    {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-neutral-100 overflow-hidden"
                    >
                        <div className="layout-container py-4 flex flex-col gap-4">
                            <Link to="/" className="text-sm font-medium py-2 border-b border-neutral-50">Beranda</Link>
                            <Link to="/catalog" className="text-sm font-medium py-2 border-b border-neutral-50">Katalog</Link>
                            <Link to="/wishlist" className="flex items-center justify-between py-2 border-b border-neutral-50">
                                <span className="text-sm font-medium">Wishlist</span>
                                <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">{wishlist.length}</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
