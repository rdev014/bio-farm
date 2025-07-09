'use server';

import { connectDb } from '@/lib/db';
import { User } from '@/models/UserSchema';
import '@/models/Product';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/getSession';
import { Types } from 'mongoose';
import Product from '@/models/Product';

// Define types clearly
interface PopulatedProduct {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

interface CartItem {
  product: PopulatedProduct;
  quantity: number;
}

interface RawCartItem {
  product: {
    _id: Types.ObjectId;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
}

// Helper function to transform raw cart items
function transformCartItems(rawCart: RawCartItem[]): CartItem[] {
  return rawCart.map((item): CartItem => ({
    product: {
      _id: item.product._id.toString(),
      name: item.product.name,
      price: item.product.price,
      images: item.product.images,
    },
    quantity: item.quantity,
  }));
}

export async function getCart(): Promise<CartItem[]> {
  try {
    await connectDb();
    const session = await getSession();
    if (!session?.user?.email) throw new Error('Unauthorized');

    const user = await User.findOne({ email: session.user.email })
      .select('cart')
      .populate('cart.product', '_id name price images')
      .lean<{ cart: RawCartItem[] }>();

    return user?.cart ? transformCartItems(user.cart) : [];
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new Error('Failed to fetch cart');
  }
}

export async function addToCart(productId: string, quantity: number = 1): Promise<CartItem[]> {
  try {
    await connectDb();
    const session = await getSession();
    if (!session?.user?.email) throw new Error('Unauthorized');

    // Verify product exists and has stock
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');
    if (product.stock < quantity) throw new Error('Insufficient stock');

    const existingUser = await User.findOne({
      email: session.user.email,
      'cart.product': productId
    });

    let user;
    if (existingUser) {
      // Check stock for updated quantity
      const cartItem = existingUser.cart.find((item: { product: Types.ObjectId; quantity: number }) =>
        item.product.toString() === productId
      );
      if (cartItem && cartItem.quantity + quantity > product.stock) {
        throw new Error('Requested quantity exceeds available stock');
      }
      user = await User.findOneAndUpdate(
        {
          email: session.user.email,
          'cart.product': productId
        },
        {
          $inc: { 'cart.$.quantity': Math.max(1, quantity) }
        },
        { new: true }
      )
        .select('cart')
        .populate('cart.product', '_id name price images')
        .lean<{ cart: RawCartItem[] }>();
    } else {
      user = await User.findOneAndUpdate(
        { email: session.user.email },
        {
          $push: {
            cart: {
              product: new Types.ObjectId(productId),
              quantity: Math.max(1, quantity),
            },
          },
        },
        { new: true }
      )
        .select('cart')
        .populate('cart.product', '_id name price images')
        .lean<{ cart: RawCartItem[] }>();
    }

    revalidatePath('/cart');
    return user?.cart ? transformCartItems(user.cart) : [];
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw new Error((error as Error).message || 'Failed to add to cart');
  }
}


export async function updateCartItem(productId: string, quantity: number): Promise<CartItem[]> {
  try {
    await connectDb();
    const session = await getSession();
    if (!session?.user?.email) throw new Error('Unauthorized');

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      return await removeFromCart(productId);
    }

    const user = await User.findOneAndUpdate(
      {
        email: session.user.email,
        'cart.product': productId
      },
      {
        $set: {
          'cart.$.quantity': Math.max(1, quantity)
        }
      },
      { new: true }
    )
      .select('cart')
      .populate('cart.product', '_id name price images')
      .lean<{ cart: RawCartItem[] }>();

    revalidatePath('/cart');
    return user?.cart ? transformCartItems(user.cart) : [];
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw new Error('Failed to update cart item');
  }
}

export async function removeFromCart(productId: string): Promise<CartItem[]> {
  try {
    await connectDb();
    const session = await getSession();
    if (!session?.user?.email) throw new Error('Unauthorized');

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $pull: { cart: { product: productId } } },
      { new: true }
    )
      .select('cart')
      .populate('cart.product', '_id name price images')
      .lean<{ cart: RawCartItem[] }>();

    revalidatePath('/cart');
    return user?.cart ? transformCartItems(user.cart) : [];
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw new Error('Failed to remove from cart');
  }
}

export async function clearCart(): Promise<CartItem[]> {
  try {
    await connectDb();
    const session = await getSession();
    if (!session?.user?.email) throw new Error('Unauthorized');

    await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { cart: [] } },
      { new: true }
    );

    revalidatePath('/cart');
    return [];
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw new Error('Failed to clear cart');
  }
}