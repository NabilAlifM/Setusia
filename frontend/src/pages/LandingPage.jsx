import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckBadgeIcon, FaceSmileIcon, HeartIcon } from '@heroicons/react/24/outline';
import AnimatedPageWrapper from '../components/UI/AnimatedPageWrapper';
import HeroImage from '../assets/Hero.png';
import Ventela from '../assets/Ventela.png';
import Ortus from '../assets/Ortus.png';
import Wakai from '../assets/Wakai.png';
import Logo from '../assets/Logo.png';

export default function LandingPage() {
    return (
        <AnimatedPageWrapper>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-neutral-50 to-white overflow-hidden">
                <div className="layout-container grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                            Kebanggaan Indonesia
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-neutral-900">
                            Platform Katalog Sepatu Indonesia <br />
                            <span className="text-primary">Terlengkap & Terbaik.</span>
                        </h1>
                        <p className="text-xl text-neutral-500 mb-8 max-w-md leading-relaxed">
                            Temukan, bandingkan, dan amankan sepatu impian lo dari brand lokal yang terkurasi tim kita. ngga pake ribet, tanpa drama, langsung dari sentuhan jari elo.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/catalog">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-primary text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-red-200 flex items-center gap-2"
                                >
                                    Mulai Gratis <ArrowRightIcon className="w-5 h-5" />
                                </motion.button>
                            </Link>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-neutral-900 border border-neutral-200 px-8 py-4 rounded-xl font-semibold hover:border-neutral-300 transition-colors"
                            >
                                Tentang Kami
                            </motion.button>
                        </div>
                        <div class="flex items-center flex-wrap max-lg:justify-center gap-4 mt-8">
                            <div class="flex -space-x-2">
                                <img class="w-10 h-10 rounded-full border-2 border-white"
                                    src={Ventela} alt="Logo Ventela" />
                                <img class="w-10 h-10 rounded-full border-2 border-white"
                                    src={Ortus} alt="Logo Ortus" />
                                <img class="w-10 h-10 rounded-full border-2 border-white"
                                    src={Wakai} alt="Logo Wakai" />
                            </div>
                            <div class="text-slate-600 text-base">
                                <span class="font-semibold">50++</span> <br />Brand Lokal Terbaik
                            </div>
                        </div>
                    </motion.div>




                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl transform -translate-y-10"></div>
                        <img
                            src={HeroImage}
                            alt="Hero Shoe"
                            className="relative z-10 w-[1272px] h-[635px] object-contain drop-shadow-2xl rotate-12 hover:rotate-0 transition-transform duration-700 ease-out cursor-pointer"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Fitur Section */}
            <section className="py-24 bg-white">
                <div className="layout-container">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Kenapa Setusia?</h2>
                        <p className="text-neutral-500">Kami mengkurasi sepatu lokal terbaik agar Anda tidak perlu bingung memilih.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<CheckBadgeIcon className="w-8 h-8 text-primary" />}
                            title="Kualitas Terjamin"
                            desc="Semua produk telah melewati proses kurasi ketat tim kami."
                        />
                        <FeatureCard
                            icon={<FaceSmileIcon className="w-8 h-8 text-primary" />}
                            title="Harga Transparan"
                            desc="Tidak ada biaya tersembunyi. Harga terbaik langsung dari pengrajin."
                        />
                        <FeatureCard
                            icon={<HeartIcon className="w-8 h-8 text-primary" />}
                            title="Support Lokal"
                            desc="Setiap pembelian elo ngedukung industri kreatif di Indonesia."
                        />
                    </div>
                </div>
            </section>
        </AnimatedPageWrapper>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-neutral-50 border border-neutral-100 hover:shadow-lg transition-all"
        >
            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-primary">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
        </motion.div>
    );
}
