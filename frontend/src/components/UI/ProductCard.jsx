import { motion } from 'framer-motion';
import { HeartIcon, ShoppingCartIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { cardVariants } from '../../animations/variants';
import { useStore } from '../../stores/useStore';
import { cn } from '../../utils/cn';

export default function ProductCard({ product }) {
    const { wishlist, addToWishlist, removeFromWishlist, compareList, addToCompare, removeFromCompare } = useStore();
    const isWishlisted = wishlist.some((p) => p.id === product.id);
    const isInCompare = compareList.some((p) => p.id === product.id);

    const toggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-neutral-100"
        >
            <Link to={`/product/${product.id || product.slug}`} className="block">
                <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100 relative">
                    <img
                        src={product.images?.[0] || 'https://via.placeholder.com/400'}
                        alt={product.name}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.discount_price && (
                        <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                            SALE
                        </div>
                    )}
                    <button
                        onClick={toggleWishlist}
                        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
                    >
                        {isWishlisted ? (
                            <HeartIconSolid className="w-5 h-5 text-primary" />
                        ) : (
                            <HeartIcon className="w-5 h-5 text-neutral-500 hover:text-primary transition-colors" />
                        )}
                    </button>
                </div>
                <div className="p-4">
                    <p className="text-xs text-neutral-500 mb-1">{product.category}</p>
                    <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between gap-2">
                        <div>
                            {product.discount_price ? (
                                <>
                                    <span className="text-primary font-bold">
                                        Rp {parseInt(product.discount_price).toLocaleString('id-ID')}
                                    </span>
                                    <span className="text-xs text-neutral-400 line-through ml-2">
                                        Rp {parseInt(product.price).toLocaleString('id-ID')}
                                    </span>
                                </>
                            ) : (
                                <span className="text-neutral-900 font-bold">
                                    Rp {parseInt(product.price).toLocaleString('id-ID')}
                                </span>
                            )}
                        </div>

                        {(
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (isInCompare) {
                                        removeFromCompare(product.id);
                                    } else {
                                        addToCompare(product);
                                    }
                                }}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md",
                                    isInCompare
                                        ? "bg-red-600 text-white hover:bg-red-700 shadow-red-100"
                                        : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                                )}
                                title={isInCompare ? "Hapus dari perbandingan" : "Bandingkan Produk Ini"}
                            >
                                <ArrowsRightLeftIcon className="w-3.5 h-3.5" />
                                <span>{isInCompare ? "Batal" : "Bandingkan"}</span>
                            </button>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
