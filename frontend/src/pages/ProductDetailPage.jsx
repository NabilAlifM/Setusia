import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { HeartIcon, BellIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import AnimatedPageWrapper from '../components/UI/AnimatedPageWrapper';
import NotifyModal from '../components/UI/NotifyModal';
import { useStore } from '../stores/useStore';
import { cn } from '../utils/cn';

export default function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [isNotifyOpen, setIsNotifyOpen] = useState(false);
    const { wishlist, addToWishlist, removeFromWishlist, addToCart, addToCompare } = useStore();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    const isWishlisted = wishlist.some(p => p.id === product.id);

    const handleWishlist = () => {
        if (isWishlisted) removeFromWishlist(product.id);
        else addToWishlist(product);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Pilih ukuran terlebih dahulu!");
            return;
        }
        addToCart({ ...product, selectedSize });
        alert("Produk berhasil ditambahkan ke keranjang!");
    };

    return (
        <AnimatedPageWrapper className="pt-24 pb-20 min-h-screen bg-white">
            <div className="layout-container md:grid md:grid-cols-2 gap-12">

                {/* Gallery */}
                <div className="space-y-4">
                    <Link to="/catalog" className="inline-flex items-center gap-2 text-neutral-500 hover:text-primary mb-4">
                        <ArrowLeftIcon className="w-4 h-4" /> Kembali
                    </Link>

                    <motion.div
                        className="aspect-square bg-neutral-100 rounded-3xl overflow-hidden relative cursor-zoom-in"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <img
                            src={product.images?.[currentImage] || 'https://via.placeholder.com/800'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        {product.discount_price && (
                            <div className="absolute top-6 left-6 bg-primary text-white font-bold px-3 py-1 rounded-full">
                                SALE
                            </div>
                        )}
                    </motion.div>

                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.images?.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImage(idx)}
                                className={cn(
                                    "w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all",
                                    currentImage === idx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                                )}
                            >
                                <img src={img} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info & Actions */}
                <div className="mt-8 md:mt-12">
                    <div className="mb-2 text-sm text-primary font-medium tracking-wide uppercase">{product.category}</div>
                    <h1 className="text-4xl font-bold mb-4 text-neutral-900">{product.name}</h1>

                    <div className="flex items-end gap-3 mb-8">
                        {product.discount_price ? (
                            <>
                                <span className="text-3xl font-bold text-primary">
                                    Rp {parseInt(product.discount_price).toLocaleString('id-ID')}
                                </span>
                                <span className="text-xl text-neutral-400 line-through mb-1">
                                    Rp {parseInt(product.price).toLocaleString('id-ID')}
                                </span>
                            </>
                        ) : (
                            <span className="text-3xl font-bold text-neutral-900">
                                Rp {parseInt(product.price).toLocaleString('id-ID')}
                            </span>
                        )}
                    </div>

                    <p className="text-neutral-500 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    {/* Size Selector */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold mb-3">Pilih Ukuran</h3>
                        <div className="flex flex-wrap gap-3">
                            {product.sizes?.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={cn(
                                        "w-12 h-12 rounded-lg font-medium transition-all flex items-center justify-center border",
                                        selectedSize === size
                                            ? "bg-neutral-900 text-white border-neutral-900"
                                            : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
                                    )}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-primary text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-red-200"
                            >
                                Tambah ke Keranjang
                            </button>
                            <button
                                onClick={handleWishlist}
                                className="p-4 rounded-xl border border-neutral-200 hover:border-primary/50 text-neutral-500 hover:text-primary transition-colors"
                                title={isWishlisted ? "Hapus dari Wishlist" : "Tambah ke Wishlist"}
                            >
                                {isWishlisted ? <HeartIconSolid className="w-7 h-7" /> : <HeartIcon className="w-7 h-7" />}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => addToCompare(product)}
                                className="py-3 rounded-lg border border-neutral-200 text-sm font-medium hover:bg-neutral-50"
                            >
                                Bandingkan
                            </button>
                            <button
                                onClick={() => setIsNotifyOpen(true)}
                                className="py-3 rounded-lg border border-neutral-200 text-sm font-medium hover:bg-neutral-50 flex items-center justify-center gap-2"
                            >
                                <BellIcon className="w-4 h-4" /> Stok Habis?
                            </button>
                        </div>
                    </div>

                    <NotifyModal
                        isOpen={isNotifyOpen}
                        onClose={() => setIsNotifyOpen(false)}
                        productName={product.name}
                    />

                    {/* Features List */}
                    {product.features && (
                        <div className="mt-10 border-t border-neutral-100 pt-8">
                            <h3 className="font-semibold mb-4">Fitur Unggulan</h3>
                            <ul className="grid grid-cols-2 gap-2">
                                {product.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full" /> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </AnimatedPageWrapper>
    );
}
