'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Heart, HeartOff } from 'lucide-react';
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
      className="flex items-center gap-2 bg-green-600/50 text-white p-3 rounded-lg hover:bg-green-700/50  transition-colors"
    >
      {isLoading ? (
        <Heart className="w-5 h-5 animate-pulse" />
      ) : isInWishlist ? (
        <HeartOff className="w-5 h-5 fill-white" />
      ) : (
        <Heart className="w-5 h-5" />
      )}
    </button>
  );
};
