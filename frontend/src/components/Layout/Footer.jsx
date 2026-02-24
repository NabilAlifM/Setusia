import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white py-12 mt-20">
            <div className="layout-container grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                    <div className="Logo flex items-center gap-2 mb-4">
                        <Link to="/" className="text-2xl font-bold text-primary tracking-tighter">
                            <img src={Logo} alt="Setusia Logo" className="h-14 hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.6)] transition-all duration-300" />
                        </Link>
                        <Link to="/" className="flex flex-col justify-center gap-1">
                            <span className="text-xl font-bold text-primary tracking-tighter">Setusia</span>
                            <span className="text-sm text-neutral-500 font-medium leading-none">Sepatu Terbaik untuk Semua</span>
                        </Link>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                        Platform katalog sepatu lokal Indonesia terlengkap. Temukan sepatu impianmu dari brand-brand lokal terbaik.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">Eksplorasi</h4>
                    <ul className="space-y-2 text-sm text-neutral-400">
                        <li><a href="#" className="hover:text-white transition-colors">Katalog Baru</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Paling Populer</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Brand Lokal</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">Bantuan</h4>
                    <ul className="space-y-2 text-sm text-neutral-400">
                        <li><a href="#" className="hover:text-white transition-colors">Cara Belanja</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Konfirmasi Pembayaran</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Hubungi Kami</a></li>
                    </ul>
                </div>
            </div>
            <div className="layout-container mt-12 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500">
                &copy; {new Date().getFullYear()} Setusia . Dibuat oleh Nabil Alif Malikulmulki dalam kegiatan Bi Got Talent 2026
            </div>
        </footer >
    );
}
