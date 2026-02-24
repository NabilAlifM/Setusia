import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../stores/useStore';
import AnimatedPageWrapper from '../components/UI/AnimatedPageWrapper';
import ProductCard from '../components/UI/ProductCard';

export default function WishlistPage() {
    const { wishlist } = useStore();

    return (
        <AnimatedPageWrapper className="pt-24 pb-20 min-h-screen">
            <div className="layout-container">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Wishlist Saya</h1>
                        <p className="text-neutral-500">
                            {wishlist.length} item tersimpan
                        </p>
                    </div>
                    {wishlist.length > 0 && (
                        <Link to="/catalog" className="text-primary font-medium hover:underline">
                            Lanjut Belanja
                        </Link>
                    )}
                </div>

                {wishlist.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                        <div className="mb-4 text-6xl">💔</div>
                        <h2 className="text-xl font-bold mb-2">Wishlist Kosong</h2>
                        <p className="text-neutral-500 mb-6">Anda belum menandai sepatu favorit Anda.</p>
                        <Link
                            to="/catalog"
                            className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-red-600 transition-colors inline-block"
                        >
                            Jelajahi Katalog
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
                        {wishlist.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </AnimatedPageWrapper>
    );
}
