import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotifyModal({ isOpen, onClose, productName }) {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const notifies = JSON.parse(localStorage.getItem('setusia-notify') || '[]');
        notifies.push({ productName, email, date: new Date().toISOString() });
        localStorage.setItem('setusia-notify', JSON.stringify(notifies));

        alert('Kami akan memberitahu Anda saat stok tersedia!');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog static as={motion.div} open={isOpen} onClose={onClose} className="relative z-50">
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel
                            as={motion.div}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
                        >
                            <Dialog.Title className="text-lg font-bold mb-2">Stok Habis?</Dialog.Title>
                            <Dialog.Description className="text-sm text-neutral-500 mb-4">
                                Masukkan email Anda untuk mendapatkan notifikasi saat {productName} tersedia kembali.
                            </Dialog.Description>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-neutral-800 transition-colors"
                                >
                                    Ingatkan Saya
                                </button>
                            </form>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
}
