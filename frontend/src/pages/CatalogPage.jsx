import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import AnimatedPageWrapper from '../components/UI/AnimatedPageWrapper';
import ProductCard from '../components/UI/ProductCard';
import { staggerContainer } from '../animations/variants';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export default function CatalogPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {};
            if (category) params.category = category;


            const respons = await axios.get('http://127.0.0.1:8000/api/products', { params });
            setProducts(respons.data);
        } catch (error) {
            console.error("Gagal mengambil data produk", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // Filter search
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AnimatedPageWrapper className="pt-24 min-h-screen">
            <div className="layout-container">

                {/* Header & Filter */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold mb-6">Katalog Pilihan</h1>

                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-neutral-100">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Cari sepatu favoritmu..."
                                className="w-full pl-10 pr-4 py-2 bg-neutral-50 rounded-lg border-none focus:ring-2 focus:ring-primary/20 outline-none"
                                value={search}
                                onChange={handleSearch}
                            />
                        </div>

                        {/* Filter Categories */}
                        <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                            {['', 'Sneakers', 'Running', 'Casual', 'Original', 'Soccer'].map((c) => (
                                <button
                                    key={c || 'all'}
                                    onClick={() => setCategory(c)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${category === c
                                        ? 'bg-neutral-900 text-white'
                                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                        }`}
                                >
                                    {c || 'Semua'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-[4/5] bg-neutral-200 rounded-2xl"></div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="animate"
                        className="grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center text-neutral-500">
                                Tidak ada produk ditemukan.
                            </div>
                        )}
                    </motion.div>
                )}

            </div>
        </AnimatedPageWrapper>
    );
}
