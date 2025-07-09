import mongoose, { Types } from "mongoose";


export interface IProduct {
  productId: string;
  name: string;
  description: string;
  sku: string;
  category: mongoose.Types.ObjectId;
  brand?: string;
  images: string[];
  price: number;
  discount?: number;
  stock: number;
  stockleft: number;
  isActive: boolean;
  tags: string[];
  weight: number;
  unit: 'g' | 'kg' | 'ml' | 'ltr' | 'unit';
  specifications: Map<string, string>;
  createdBy: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ActionResponse<T> {
  success: boolean;
  product?: T;
  products?: T[];
  error?: string;
  message?: string;
}

export interface ProductFormData {
  name?: string;
  description?: string;
  sku?: string;
  category?: string;
  brand?: string;
  images?: string[];
  price?: string;
  discount?: string;
  stock?: string;
  isActive?: string;
  tags?: string[];
  weight?: string;
  unit?: IProduct['unit'];
  specifications?: string;
  createdBy?: string;
  productId?: string;
}

export interface ProductFilter {
  $or?: Array<{ [key in keyof IProduct]?: { $regex: string; $options: string } }>;
  category?: Types.ObjectId;
  isActive?: boolean;
}