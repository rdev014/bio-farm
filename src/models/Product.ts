import mongoose, { Schema, model, Model } from 'mongoose';
import { randomUUID } from 'crypto';

// Define the interface for TypeScript type safety
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

// Define the Mongoose schema
const productSchema = new Schema<IProduct>(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => randomUUID(),
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    brand: { type: String, default: 'Arkin Organics' },
    images: [{ type: String, default: '' }],
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    stock: { type: Number, required: true, min: 0 },
    stockleft: { type: Number, min: 0 },
    isActive: { type: Boolean, default: true },
    tags: [{ type: String, default: '' }],
    weight: { type: Number, required: true, min: 0 },
    unit: {
      type: String,
      enum: ['g', 'kg', 'ml', 'ltr', 'unit'],
      required: true,
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model redefinition in development with hot reloading
const Product: Model<IProduct> = mongoose.models.Product || model<IProduct>('Product', productSchema);

export default Product;