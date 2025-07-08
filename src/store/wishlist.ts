import { create } from 'zustand';

type WishlistStore = {
  wishlist: string[];
  setWishlist: (items: string[]) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistStore>((set) => ({
  wishlist: [],

  setWishlist: (items) => set({ wishlist: items }),

  addToWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist
        : [...state.wishlist, productId],
    })),

  removeFromWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.filter((id) => id !== productId),
    })),

  clearWishlist: () => set({ wishlist: [] }),
}));
