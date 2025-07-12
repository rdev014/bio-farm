'use client';

import { useCartStore } from '@/store/cart';
import { FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'sonner';
import { addToCart as addToCartServer } from '@/actions/cart';

interface AddToCartButtonProps {
  productId: string;
}



export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const { setCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const serverCart = await addToCartServer(productId, 1);
      setCart(
        serverCart.map(item => ({
          productId: item._id,
          quantity: item.quantity,
          _id: item._id,
          name: item.name,
          price: item.price,
          image: item.image
        })))
      toast.success('Added to cart');
    } catch (error) {
      toast.error('Failed to add to cart');
      console.error('Failed to sync cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      aria-label="Add to cart"
      className="w-10 h-10 flex items-center justify-center rounded-full border border-emerald-300 bg-white text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 focus:ring-2 focus:ring-emerald-300 transition-all shadow-sm disabled:opacity-50"
      title="Add to cart"
    >
      {isLoading ? (
        <FaShoppingCart className="w-5 h-5 animate-pulse" />
      ) : (
        <FaShoppingCart className="w-6 h-6" />
      )}
    </button>
  );
};
