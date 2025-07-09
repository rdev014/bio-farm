'use client'
import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cart';
import { getCart, updateCartItem, removeFromCart, clearCart } from '@/actions/cart';
import { toast } from 'sonner';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, Package, Leaf, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const Cart: React.FC = () => {
  const { cart, setCart, updateQuantity, removeFromCart: remove, clearCart: clear } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);
  const [processingItems, setProcessingItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
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
        toast.error('Failed to load cart');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, [setCart]);

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;

    try {
      setProcessingItems(prev => new Set(prev).add(productId));
      updateQuantity(productId, quantity);
      await updateCartItem(productId, quantity);
      toast.success('Quantity updated');
    } catch (error) {
      toast.error('Failed to update quantity');
      console.error('Failed to update quantity:', error);
    } finally {
      setProcessingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    try {
      setProcessingItems(prev => new Set(prev).add(productId));
      remove(productId);
      await removeFromCart(productId);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove from cart');
      console.error('Failed to remove from cart:', error);
    } finally {
      setProcessingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleClearCart = async () => {
    if (!confirm('Are you sure you want to clear your entire cart?')) return;

    try {
      clear();
      await clearCart();
      toast.success('Cart cleared successfully');
    } catch (error) {
      toast.error('Failed to clear cart');
      console.error('Failed to clear cart:', error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Package className="w-4 h-4" />
              <span>{calculateTotalItems()} items</span>
            </div>
            <div className="flex items-center gap-1">
              <Leaf className="w-4 h-4 text-green-600" />
              <span>Organic & Natural</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Discover our premium organic products and start building your healthy lifestyle today.
            </p>
            <Link href={'/our-products'} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-32 h-32 bg-gray-100 rounded-xl overflow-hidden">
                        <Image
                          src={item.image || '/placeholder-product.jpg'}
                          alt={item.name || 'Product'}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {item.name || 'Product'}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl font-bold text-green-600">
                          ${(item.price || 0).toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">per unit</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600 font-medium">Quantity:</span>
                          <div className="flex items-center bg-gray-50 rounded-lg border">
                            <button
                              onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1 || processingItems.has(item.productId)}
                              className="p-2 hover:bg-gray-100 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (value > 0) {
                                  handleUpdateQuantity(item.productId, value);
                                }
                              }}
                              className="w-16 text-center py-2 bg-transparent border-none focus:outline-none"
                              disabled={processingItems.has(item.productId)}
                            />
                            <button
                              onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                              disabled={processingItems.has(item.productId)}
                              className="p-2 hover:bg-gray-100 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveFromCart(item.productId)}
                          disabled={processingItems.has(item.productId)}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="flex-shrink-0 text-right">
                      <div className="text-lg font-bold text-gray-900">
                        ${((item.price || 0) * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.quantity} × ${(item.price || 0).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({calculateTotalItems()} items)</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Proceed to Checkout
                  </button>

                  <button className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200">
                    Continue Shopping
                  </button>

                  <button
                    onClick={handleClearCart}
                    className="w-full text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200"
                  >
                    Clear Cart
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Secure Checkout</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      256-bit SSL encryption • Money-back guarantee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;