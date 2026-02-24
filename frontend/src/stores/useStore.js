import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
    persist(
        (set) => ({
            wishlist: [],
            addToWishlist: (product) => set((state) => ({
                wishlist: [...state.wishlist, product]
            })),
            removeFromWishlist: (productId) => set((state) => ({
                wishlist: state.wishlist.filter((p) => p.id !== productId)
            })),

            compareList: [],
            isCompareModalOpen: false,
            setCompareModalOpen: (isOpen) => set({ isCompareModalOpen: isOpen }),
            addToCompare: (product) => set((state) => {
                if (state.compareList.length >= 2) return state; // Max 2
                if (state.compareList.find(p => p.id === product.id)) return { isCompareModalOpen: true };
                return {
                    compareList: [...state.compareList, product],
                    isCompareModalOpen: true
                };
            }),
            removeFromCompare: (productId) => set((state) => ({
                compareList: state.compareList.filter((p) => p.id !== productId)
            })),
            clearCompare: () => set({ compareList: [], isCompareModalOpen: false }),

            cart: [],
            addToCart: (product) => set((state) => ({
                cart: [...state.cart, product]
            })),
        }),
        {
            name: 'setusia-storage',
            partialize: (state) => ({
                wishlist: state.wishlist,
                compareList: state.compareList,
                cart: state.cart
            }),
        }
    )
);
