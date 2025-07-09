'use client';

import React, { useEffect, useState } from 'react';
import { getWishlist, removeFromWishlist, clearWishlist } from '@/actions/wishlist';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';


interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const items = await getWishlist();
        setWishlist(items);
      } catch (error) {
        console.log(error);

        toast.error('Failed to load wishlist',);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (productId: string) => {
    try {
      const updatedWishlist = await removeFromWishlist(productId);
      setWishlist(updatedWishlist);
      toast.success('Removed from wishlist');
    } catch (error) {
      console.log(error);
      toast.error('Failed to remove item');
    }
  };

  const handleClear = async () => {
    try {
      await clearWishlist();
      setWishlist([]);
      toast.success('Wishlist cleared');
    } catch (error) {
      console.log(error);
      toast.error('Failed to clear wishlist');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {loading ? (
        <p>Loading...</p>
      ) : wishlist.length === 0 ? (
        <p className="text-lg">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="border rounded-lg p-4 shadow-md">
              <Image
                src={item.images[0] || 'https://placehold.co/300x300'}
                alt={item.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
              <div className="flex justify-between mt-4">
                <Link href={`/products/${item._id}`} className="text-blue-600 hover:underline">
                  View Product
                </Link>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {wishlist.length > 0 && (
        <button
          onClick={handleClear}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Clear Wishlist
        </button>
      )}
    </div>
  );
};

export default WishlistPage;