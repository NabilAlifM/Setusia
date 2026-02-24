import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../stores/useStore';
import { modalVariants } from '../../animations/variants';

export default function CompareModal() {
    const { compareList, removeFromCompare, clearCompare, isCompareModalOpen, setCompareModalOpen } = useStore();
    const navigate = useNavigate();

    if (!isCompareModalOpen || compareList.length === 0) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setCompareModalOpen(false)}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div
                    variants={modalVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="bg-white w-full max-w-6xl shadow-2xl rounded-t-2xl sm:rounded-2xl border border-neutral-100 relative z-10 overflow-hidden"
                >
                    <div className="p-4 bg-neutral-900 text-white flex justify-between items-center">
                        <h3 className="font-bold">Bandingkan Produk ({compareList.length}/2)</h3>
                        <div className="flex gap-4">
                            {compareList.length > 0 && (
                                <button onClick={clearCompare} className="text-xs text-neutral-400 hover:text-white">
                                    Hapus Semua
                                </button>
                            )}
                            <button onClick={() => setCompareModalOpen(false)}><XMarkIcon className="w-6 h-6" /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-neutral-100 bg-neutral-50 max-h-[60vh] overflow-y-auto">
                        {compareList.map((product) => (
                            <div key={product.id} className="p-4 relative group">
                                <button
                                    onClick={() => removeFromCompare(product.id)}
                                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <XMarkIcon className="w-4 h-4 text-red-500" />
                                </button>

                                <img
                                    src={product.images?.[0]}
                                    alt={product.name}
                                    className="w-24 h-24 object-cover rounded-lg mx-auto mb-4"
                                />
                                <h4 className="font-bold text-center mb-2 text-sm">{product.name}</h4>
                                <div className="text-center font-bold text-primary mb-4">
                                    Rp {parseInt(product.discount_price || product.price).toLocaleString('id-ID')}
                                </div>

                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between border-b pb-1">
                                        <span className="text-neutral-500">Kategori</span>
                                        <span>{product.category}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <span className="text-neutral-500">Stok</span>
                                        <span>{product.stock > 0 ? 'Tersedia' : 'Habis'}</span>
                                    </div>
                                    <div className="pt-2">
                                        <p className="font-semibold mb-1">Fitur:</p>
                                        <ul className="list-disc list-inside text-neutral-500">
                                            {product.features?.map((f, i) => <li key={i}>{f}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {compareList.length < 2 && (
                            <div className="flex flex-col items-center justify-center p-8 text-neutral-400 gap-3">
                                <p className="text-sm italic">Pilih 1 produk lagi</p>
                                <button
                                    onClick={() => {
                                        setCompareModalOpen(false);
                                        navigate('/catalog');
                                    }}
                                    className="flex items-center gap-2 bg-primary hover:bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-red-200"
                                >
                                    <PlusIcon className="w-5 h-5" /> Tambah Sepatu
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
