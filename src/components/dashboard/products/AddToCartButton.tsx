'use client';

import { useCartStore } from '@/store/cart';
import { ShoppingCart } from 'lucide-react';
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
      className="flex items-center gap-2 bg-green-600 text-white p-3 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
    >
      {isLoading ? <ShoppingCart className="w-5 h-5 animate-pulse" /> : <ShoppingCart className="w-5 h-5" />}
    </button>
  );
};
