'use server';

import { connectDb } from '@/lib/db';
import { getSession } from '@/lib/getSession';
import { User } from '@/models/UserSchema';
import '@/models/Product';
import { Types, Document } from 'mongoose';
import { revalidatePath } from 'next/cache';

interface WishlistItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  images: string[];
}

interface WishlistUser extends Document {
  wishlist: Array<{
    _id: Types.ObjectId;
    productId: string;
    name: string;
    price: number;
    images: string[];
  }>;
}

const ensureAuthorized = async (): Promise<string> => {
  const session = await getSession();
  if (!session?.user?.email) {
    throw new Error('Unauthorized: No user session found');
  }
  return session.user.email;
};

export async function getWishlist(): Promise<WishlistItem[]> {
  try {
    await connectDb();
    const email = await ensureAuthorized();
    const user = (await User.findOne({ email })
      .select('wishlist')
      .populate('wishlist', 'productId name price images')
      .lean()) as WishlistUser | null;

    if (!user) throw new Error('User not found');

    return user.wishlist?.map((item) => ({
      _id: item._id.toString(),
      productId: item.productId,
      name: item.name,
      price: item.price,
      images: item.images,
    })) || [];
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw new Error('Failed to fetch wishlist');
  }
}

export async function addToWishlist(productId: string): Promise<WishlistItem[]> {
  try {
    await connectDb();
    const email = await ensureAuthorized();

    if (!Types.ObjectId.isValid(productId)) {
      throw new Error('Invalid product ID');
    }

    const user = (await User.findOneAndUpdate(
      { email },
      { $addToSet: { wishlist: new Types.ObjectId(productId) } },
      { new: true }
    )
      .select('wishlist')
      .populate('wishlist', 'productId name price images')
      .lean()) as WishlistUser | null;

    if (!user) throw new Error('User not found');

    revalidatePath('/wishlist');

    return user.wishlist.map((item) => ({
      _id: item._id.toString(),
      productId: item.productId,
      name: item.name,
      price: item.price,
      images: item.images,
    }));
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw new Error('Failed to add product to wishlist');
  }
}

export async function removeFromWishlist(productId: string): Promise<WishlistItem[]> {
  try {
    await connectDb();
    const email = await ensureAuthorized();

    if (!Types.ObjectId.isValid(productId)) {
      throw new Error('Invalid product ID');
    }

    const user = (await User.findOneAndUpdate(
      { email },
      { $pull: { wishlist: new Types.ObjectId(productId) } },
      { new: true }
    )
      .select('wishlist')
      .populate('wishlist', 'productId name price images')
      .lean()) as WishlistUser | null;

    if (!user) throw new Error('User not found');

    revalidatePath('/wishlist');

    return user.wishlist.map((item) => ({
      _id: item._id.toString(),
      productId: item.productId,
      name: item.name,
      price: item.price,
      images: item.images,
    }));
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw new Error('Failed to remove product from wishlist');
  }
}

export async function clearWishlist(): Promise<WishlistItem[]> {
  try {
    await connectDb();
    const email = await ensureAuthorized();

    const user = (await User.findOneAndUpdate(
      { email },
      { $set: { wishlist: [] } },
      { new: true }
    )
      .select('wishlist')
      .lean()) as WishlistUser | null;

    if (!user) throw new Error('User not found');

    revalidatePath('/wishlist');

    return [];
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    throw new Error('Failed to clear wishlist');
  }
}
