import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

interface WishlistStore {
  wishlist: WishlistItem[];
  setWishlist: (items: WishlistItem[]) => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      wishlist: [],

      setWishlist: (items) => set({ wishlist: items }),

      addToWishlist: (item) =>
        set((state) => ({
          wishlist: state.wishlist.some((i) => i._id === item._id)
            ? state.wishlist
            : [...state.wishlist, item],
        })),

      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item._id !== productId),
        })),

      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);