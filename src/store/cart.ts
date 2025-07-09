import { create } from "zustand";

export type CartItem = {
  productId: string;
  quantity: number;
  _id: string;
  name: string;
  price: number;
  image: string;
};

interface CartStore {
  cart: CartItem[];
  setCart: (items: CartItem[]) => void;
  addToCart: (item: CartItem, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  setCart: (items) => set({ cart: items }),
  addToCart: (newItem, quantity = 1) =>
    set((state) => {
      const existing = state.cart.find((item) => item.productId === newItem.productId);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.productId === newItem.productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        cart: [...state.cart, { ...newItem, quantity }],
      };
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      ),
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.productId !== productId),
    })),
  clearCart: () => set({ cart: [] }),
}));
