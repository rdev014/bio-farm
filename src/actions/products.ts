'use server';

import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { randomUUID } from 'crypto';
import connectDb from "@/lib/db";
import Product, { IProduct } from "@/models/Product";

export interface ActionResponse<T> {
  success: boolean;
  product?: T;
  products?: T[];
  error?: string;
  message?: string;
}

interface ProductFormData {
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
  unit?: IProduct["unit"];
  specifications?: string;
  createdBy?: string;
  productId?: string;
}
interface ProductFilter {
  $or?: Array<{ [key in keyof IProduct]?: { $regex: string; $options: string } }>;
  category?: Types.ObjectId;
  isActive?: boolean;
}
// Utility function to validate ObjectId
function isValidObjectId(id: string): boolean {
  return Types.ObjectId.isValid(id);
}

// Utility function to sanitize form data
function sanitizeFormData(formData: ProductFormData): Partial<IProduct> {
  const name = formData.name?.trim();

  return {
    productId: formData.productId || `prod-${randomUUID()}`,
    name,
    description: formData.description?.trim(),
    sku: formData.sku?.trim(),
    category: formData.category ? new Types.ObjectId(formData.category) : undefined,
    brand: formData.brand?.trim() || undefined,
    images: formData.images?.filter(img => img && img !== '') ?? [],
    price: formData.price ? parseFloat(formData.price) : 0,
    discount: formData.discount ? parseFloat(formData.discount) : 0,
    stock: formData.stock ? parseInt(formData.stock, 10) : 0,
    isActive: formData.isActive === "true",
    tags: formData.tags?.filter(tag => tag && tag !== '') ?? [],
    weight: formData.weight ? parseFloat(formData.weight) : 0,
    unit: formData.unit,
    specifications: (() => {
      try {
        const specs = formData.specifications ? JSON.parse(formData.specifications) : {};
        return new Map<string, string>(Object.entries(specs));
      } catch {
        return new Map<string, string>();
      }
    })(),
    createdBy: formData.createdBy ? new Types.ObjectId(formData.createdBy) : undefined,
  };
}

// Validation function
function validateProductData(productData: Partial<IProduct>): string | null {
  const required: (keyof IProduct)[] = ['name', 'sku', 'category', 'price', 'weight', 'unit'];

  for (const field of required) {
    if (!productData[field]) {
      return `${field} is required`;
    }
  }

  if (productData.price && productData.price < 0) {
    return 'Price must be positive';
  }

  if (productData.weight && productData.weight < 0) {
    return 'Weight must be positive';
  }

  if (productData.stock && productData.stock < 0) {
    return 'Stock must be positive';
  }

  if (productData.discount && (productData.discount < 0 || productData.discount > 100)) {
    return 'Discount must be between 0 and 100';
  }

  return null;
}

// Create Product
export async function createProduct(formData: ProductFormData): Promise<ActionResponse<IProduct>> {
  try {
    await connectDb();

    const productData = sanitizeFormData(formData);

    // Validate data
    const validationError = validateProductData(productData);
    if (validationError) {
      return { success: false, error: validationError };
    }

    // Check if SKU already exists
    const existingSku = await Product.findOne({ sku: productData.sku }).lean();
    if (existingSku) {
      return { success: false, error: "SKU already exists" };
    }

    // Check if productId already exists
    const existingProductId = await Product.findOne({ productId: productData.productId }).lean();
    if (existingProductId) {
      return { success: false, error: "Product ID already exists" };
    }

    const product = await Product.create(productData);
    const populatedProduct = await Product.findById(product._id)
      .populate({ path: "category", select: "name" })
      .populate({ path: "createdBy", select: "name email" })
      .lean()
      .exec();

    revalidatePath('/products');
    return {
      success: true,
      product: populatedProduct as unknown as IProduct,
      message: "Product created successfully"
    };
  } catch (error) {
    console.error("Create product error:", error);

    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return { success: false, error: "Validation failed: " + error.message };
      }

      if (error.message.includes('duplicate key')) {
        return { success: false, error: "Product with this SKU or productId already exists" };
      }

      return { success: false, error: error.message };
    }

    return { success: false, error: "Failed to create product" };
  }
}

// Get All Products with pagination and filtering
export async function getProducts(
  page: number = 1,
  limit: number = 10,
  search?: string,
  category?: string,
  isActive?: boolean
): Promise<ActionResponse<IProduct>> {
  try {
    await connectDb();

    const skip = (page - 1) * limit;
    const filter: ProductFilter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && isValidObjectId(category)) {
      filter.category = new Types.ObjectId(category);
    }

    if (typeof isActive === 'boolean') {
      filter.isActive = isActive;
    }

    const products = await Product.find(filter)
      .populate({ path: "category", select: "name" })
      .populate({ path: "createdBy", select: "name email" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    const total = await Product.countDocuments(filter);

    return {
      success: true,
      products: products as unknown as IProduct[],
      message: `Found ${products.length} products (${total} total)`
    };
  } catch (error) {
    console.error("Get products error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch products"
    };
  }
}

// Get Single Product by ID or productId
export async function getProduct(identifier: string): Promise<ActionResponse<IProduct>> {
  try {
    await connectDb();

    let product;

    if (isValidObjectId(identifier)) {
      product = await Product.findById(identifier)
        .populate({ path: "category", select: "name" })
        .populate({ path: "createdBy", select: "name email" })
        .lean()
        .exec();
    }

    if (!product) {
      product = await Product.findOne({ productId: identifier })
        .populate({ path: "category", select: "name" })
        .populate({ path: "createdBy", select: "name email" })
        .lean()
        .exec();
    }

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    return { success: true, product: product as unknown as IProduct };
  } catch (error) {
    console.error("Get product error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch product"
    };
  }
}

// Update Product
export async function updateProduct(identifier: string, formData: ProductFormData): Promise<ActionResponse<IProduct>> {
  try {
    await connectDb();

    const productData = sanitizeFormData(formData);
    delete productData.productId;

    const validationError = validateProductData(productData);
    if (validationError) {
      return { success: false, error: validationError };
    }

    let product;

    if (isValidObjectId(identifier)) {
      product = await Product.findById(identifier);
    } else {
      product = await Product.findOne({ productId: identifier });
    }

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    if (productData.sku && productData.sku !== product.sku) {
      const existingSku = await Product.findOne({
        sku: productData.sku,
        _id: { $ne: product._id }
      }).lean();
      if (existingSku) {
        return { success: false, error: "SKU already exists" };
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      productData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate({ path: "category", select: "name" })
      .populate({ path: "createdBy", select: "name email" })
      .lean()
      .exec();

    revalidatePath('/products');
    return {
      success: true,
      product: updatedProduct as unknown as IProduct,
      message: "Product updated successfully"
    };
  } catch (error) {
    console.error("Update product error:", error);

    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return { success: false, error: "Validation failed: " + error.message };
      }

      if (error.message.includes('duplicate key')) {
        return { success: false, error: "Product with this SKU or productId already exists" };
      }

      return { success: false, error: error.message };
    }

    return { success: false, error: "Failed to update product" };
  }
}

// Delete Product
export async function deleteProduct(identifier: string): Promise<ActionResponse<never>> {
  try {
    await connectDb();

    let product;

    if (isValidObjectId(identifier)) {
      product = await Product.findByIdAndDelete(identifier).lean().exec();
    } else {
      product = await Product.findOneAndDelete({ productId: identifier }).lean().exec();
    }

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    revalidatePath('/products');
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Delete product error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete product"
    };
  }
}

// Get Product by ProductId
export async function getProductByProductId(productId: string): Promise<ActionResponse<IProduct>> {
  try {
    await connectDb();

    const product = await Product.findOne({ productId })
      .populate({ path: "category", select: "name" })
      .populate({ path: "createdBy", select: "name email" })
      .lean()
      .exec();

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    return { success: true, product: product as unknown as IProduct };
  } catch (error) {
    console.error("Get product by productId error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch product"
    };
  }
}

// Toggle Product Active Status
export async function toggleProductStatus(identifier: string): Promise<ActionResponse<IProduct>> {
  try {
    await connectDb();

    let product;

    if (isValidObjectId(identifier)) {
      product = await Product.findById(identifier);
    } else {
      product = await Product.findOne({ productId: identifier });
    }

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    product.isActive = !product.isActive;
    await product.save();

    const updatedProduct = await Product.findById(product._id)
      .populate({ path: "category", select: "name" })
      .populate({ path: "createdBy", select: "name email" })
      .lean()
      .exec();

    revalidatePath('/products');
    return {
      success: true,
      product: updatedProduct as unknown as IProduct,
      message: `Product ${product.isActive ? 'activated' : 'deactivated'} successfully`
    };
  } catch (error) {
    console.error("Toggle product status error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to toggle product status"
    };
  }
}