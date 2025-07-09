'use client';

import React, { useEffect, useState } from 'react';
import { getWishlist, removeFromWishlist, clearWishlist } from '@/actions/wishlist';
import { addToCart } from '@/actions/cart';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { 
  Heart, 
  ShoppingCart, 
  Eye, 
  Trash2, 
  Leaf, 
  Star, 
  ShieldCheck,
  Package,
  Plus,
  ArrowRight
} from 'lucide-react';

interface WishlistItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  images: string[];
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  category?: string;
}

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingItems, setProcessingItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const items = await getWishlist();
        setWishlist(items);
      } catch (error) {
        console.log(error);
        toast.error('Failed to load wishlist');
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (productId: string) => {
    try {
      setProcessingItems(prev => new Set(prev).add(productId));
      const updatedWishlist = await removeFromWishlist(productId);
      setWishlist(updatedWishlist);
      toast.success('Removed from wishlist');
    } catch (error) {
      console.log(error);
      toast.error('Failed to remove item');
    } finally {
      setProcessingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleClear = async () => {
    if (!confirm('Are you sure you want to clear your entire wishlist?')) return;
    
    try {
      await clearWishlist();
      setWishlist([]);
      toast.success('Wishlist cleared successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to clear wishlist');
    }
  };

  const handleAddToCart = async (item: WishlistItem) => {
    try {
      setProcessingItems(prev => new Set(prev).add(item._id));
      await addToCart(item._id, 1);
      toast.success('Added to cart');
    } catch (error) {
      console.log(error);
      toast.error('Failed to add to cart');
    } finally {
      setProcessingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item._id);
        return newSet;
      });
    }
  };

  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-100 to-red-100 rounded-full mb-6">
        <Heart className="w-12 h-12 text-red-400" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Start adding your favorite organic products to your wishlist and never lose track of what you love.
      </p>
      <Link
        href="/our-products"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <Package className="w-5 h-5" />
        Explore Products
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );

  const WishlistItem = ({ item }: { item: WishlistItem }) => (
    <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 relative overflow-hidden">
      {/* Wishlist Badge */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => handleRemove(item._id)}
          disabled={processingItems.has(item._id)}
          className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-red-50 transition-colors duration-200 disabled:opacity-50"
        >
          <Heart className="w-5 h-5 text-red-500 fill-current" />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={item.images[0] || '/placeholder-product.jpg'}
          alt={item.name}
          width={300}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.inStock === false && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Category */}
        {item.category && (
          <div className="flex items-center gap-1 text-sm text-green-600">
            <Leaf className="w-4 h-4" />
            <span>{item.category}</span>
          </div>
        )}

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[3.5rem]">
          {item.name}
        </h3>

        {/* Rating */}
        {item.rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(item.rating)}
            </div>
            <span className="text-sm text-gray-500">
              ({item.reviews || 0} reviews)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            ${item.price.toFixed(2)}
          </span>
          {item.inStock !== false && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>In Stock</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => handleAddToCart(item)}
            disabled={processingItems.has(item._id) || item.inStock === false}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            {processingItems.has(item._id) ? 'Adding...' : 'Add to Cart'}
          </button>
          
          <Link
            href={`/our-products/${item.productId}`}
            className="flex items-center justify-center p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl text-white">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          
          {!loading && wishlist.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>{wishlist.length} saved items</span>
                </div>
                <div className="flex items-center gap-1">
                  <Leaf className="w-4 h-4 text-green-600" />
                  <span>Organic & Natural</span>
                </div>
              </div>
              
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : wishlist.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {wishlist.map((item) => (
                <WishlistItem key={item._id} item={item} />
              ))}
            </div>

            {/* Bulk Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-gray-600">
                  <span className="font-semibold text-gray-900">{wishlist.length}</span> items in your wishlist
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      wishlist.forEach(item => {
                        if (item.inStock !== false) {
                          handleAddToCart(item);
                        }
                      });
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    Add All to Cart
                  </button>
                  
                  <Link
                    href="/our-products"
                    className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                  >
                    Continue Shopping
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;