'use server';

import { connectDb } from '@/lib/db';
import { getSession } from '@/lib/getSession';
import { User } from '@/models/UserSchema';
import { Types, Document } from 'mongoose';
import { revalidatePath } from 'next/cache';

type ObjectIdString = string;

interface WishlistUser extends Document {
  wishlist: Types.ObjectId[];
}

const ensureAuthorized = async (): Promise<string> => {
  const session = await getSession();
  if (!session?.user?.email) throw new Error('Unauthorized');
  return session.user.email;
};

export async function getWishlist(): Promise<ObjectIdString[]> {
  await connectDb();
  const email = await ensureAuthorized();

  const user = await User.findOne({ email }).select('wishlist').lean() as unknown as WishlistUser;
  return user?.wishlist?.map(id => id.toString()) || [];
}

export async function addToWishlist(productId: ObjectIdString): Promise<ObjectIdString[]> {
  await connectDb();
  const email = await ensureAuthorized();

  const user = await User.findOneAndUpdate(
    { email },
    { $addToSet: { wishlist: new Types.ObjectId(productId) } },
    { new: true }
  ).select('wishlist').lean() as unknown as WishlistUser;

  revalidatePath('/wishlist');
  return user?.wishlist?.map(id => id.toString()) || [];
}

export async function removeFromWishlist(productId: ObjectIdString): Promise<ObjectIdString[]> {
  await connectDb();
  const email = await ensureAuthorized();

  const user = await User.findOneAndUpdate(
    { email },
    { $pull: { wishlist: new Types.ObjectId(productId) } },
    { new: true }
  ).select('wishlist').lean() as unknown as WishlistUser;

  revalidatePath('/wishlist');
  return user?.wishlist?.map(id => id.toString()) || [];
}

export async function clearWishlist(): Promise<ObjectIdString[]> {
  await connectDb();
  const email = await ensureAuthorized();

  const user = await User.findOneAndUpdate(
    { email },
    { $set: { wishlist: [] } },
    { new: true }
  ).select('wishlist').lean() as unknown as WishlistUser;

  revalidatePath('/wishlist');
  return user?.wishlist?.map(id => id.toString()) || [];
}
