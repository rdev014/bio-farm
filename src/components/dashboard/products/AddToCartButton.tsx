'use client';

import { useCartStore } from '@/store/cart';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { addToCart as addToCartServer } from '@/actions/cart';

interface AddToCartButtonProps {
  productId: string;
}

interface ServerCartProduct {
  product: {
    _id: string;
    name?: string;
    price: number;
  };
  quantity: number;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const { addToCart, setCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart(productId, 1);
      const serverCart: ServerCartProduct[] = await addToCartServer(productId, 1);
      setCart(
        serverCart.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
          name: item.product.name,
          price: item.product.price,
        }))
      );
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
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
    >
      <ShoppingCart className="w-5 h-5" />
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};
