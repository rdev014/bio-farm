'use client'
import React, { useEffect } from 'react';
import { useCartStore } from '@/store/cart';
import { getCart, updateCartItem, removeFromCart, clearCart } from '@/actions/cart';
import { toast } from 'sonner';
import Image from 'next/image';

const Cart: React.FC = () => {
  const { cart, setCart, updateQuantity, removeFromCart: remove, clearCart: clear } = useCartStore();


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        setCart(
          cartData.map(item => ({
            productId: item._id,
            quantity: item.quantity,
            _id: item._id,
            name: item.name,
            price: item.price,
            image: item.image
          }))
        );

      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };
    fetchCart();
  }, [setCart]);
  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      updateQuantity(productId, quantity);
      await updateCartItem(productId, quantity);
    } catch (error) {
      toast.error('Failed to update quantity');
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    try {
      remove(productId);
      await removeFromCart(productId);
    } catch (error) {
      toast.error('Failed to remove from cart');
      console.error('Failed to remove from cart:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      clear();
      await clearCart();
      toast.success('Cart cleared');
    } catch (error) {
      toast.error('Failed to clear cart');
      console.error('Failed to clear cart:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.productId} className="flex items-center justify-between p-4 bg-gray-100 rounded">

                <div className='flex gap-4'>
                  <div>
                    <Image src={item.image} alt={item.name} width={100} height={100} className='rounded-md' />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{item.name || 'Product'}</h2>
                    <p>Price: ${item.price || 0}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.productId, parseInt(e.target.value))}
                    className="w-16 p-1 border rounded"
                  />
                  <button
                    onClick={() => handleRemoveFromCart(item.productId)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleClearCart}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear Cart
            </button>

          </div>
        </>
      )}
    </div>
  );
};

export default Cart;