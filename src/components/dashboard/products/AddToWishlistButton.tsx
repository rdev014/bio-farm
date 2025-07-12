'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { addToWishlist, removeFromWishlist } from '@/actions/wishlist';
import { useWishlistStore } from '@/store/wishlist';

interface AddToWishlistButtonProps {
  productId: string;
  name: string;
  price: number;
  images: string[];
}

export const AddToWishlistButton: React.FC<AddToWishlistButtonProps> = ({
  productId,
  name,
  price,
  images,
}) => {
  const {
    addToWishlist: addToStore,
    removeFromWishlist: removeFromStore,
    setWishlist,
    wishlist,
  } = useWishlistStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const found = wishlist.some((item) => item._id === productId);
    setIsInWishlist(found);
  }, [wishlist, productId]);

  const handleToggleWishlist = async () => {
    setIsLoading(true);
    try {
      if (isInWishlist) {
        const serverWishlist = await removeFromWishlist(productId);
        setWishlist(serverWishlist);
        removeFromStore(productId);
        toast.success('Removed from wishlist');
      } else {
        const serverWishlist = await addToWishlist(productId);
        setWishlist(serverWishlist);
        addToStore({ _id: productId, name, price, images });
        toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
      console.error('Wishlist update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isLoading}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-emerald-300 bg-white text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 focus:ring-2 focus:ring-emerald-300 transition-all shadow-sm disabled:opacity-50"
      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {isLoading ? (
        <FaHeart className="w-5 h-5 animate-pulse" />
      ) : isInWishlist ? (
        <FaHeart className="w-6 h-6 fill-emerald-500 text-emerald-500" />
      ) : (
        <FaRegHeart className="w-6 h-6" />
      )}
    </button>
  );
};
