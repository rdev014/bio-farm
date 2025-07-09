"use server";

import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import connectDb from "@/lib/db";
import Product from "@/models/Product";
import "@/models/categorySchema";
import "@/models/UserSchema";
import {
  ActionResponse,
  ProductFilter,
  ProductFormData,
  IProduct,
} from "@/types/product";

function isValidObjectId(id: string): boolean {
  return Types.ObjectId.isValid(id);
}

function sanitizeFormData(formData: ProductFormData): Partial<IProduct> {
  return {
    productId: formData.productId || `prod-${randomUUID()}`,
    name: formData.name?.trim(),
    description: formData.description?.trim(),
    sku: formData.sku?.trim()?.toUpperCase(),
    category:
      formData.category && isValidObjectId(formData.category)
        ? new Types.ObjectId(formData.category)
        : undefined,
    brand: formData.brand?.trim() || undefined,
    images: formData.images?.filter((img) => img && img.trim() !== "") ?? [],
    price: formData.price ? parseFloat(formData.price) : 0,
    discount: formData.discount ? Number(formData.discount) : 0,
    stock: formData.stock ? parseInt(formData.stock, 10) : 0,
    isActive: formData.isActive === "true",
    tags: formData.tags?.filter((tag) => tag && tag.trim() !== "") ?? [],
    weight: formData.weight ? parseFloat(formData.weight) : 0,
    unit: formData.unit || "unit",
    specifications: (() => {
      try {
        const specs = formData.specifications
          ? JSON.parse(formData.specifications)
          : {};
        return new Map<string, string>(Object.entries(specs));
      } catch {
        return new Map<string, string>();
      }
    })(),
    createdBy:
      formData.createdBy && isValidObjectId(formData.createdBy)
        ? new Types.ObjectId(formData.createdBy)
        : undefined,
  };
}

function validateProductData(productData: Partial<IProduct>): string | null {
  const required: (keyof IProduct)[] = [
    "name",
    "sku",
    "category",
    "price",
    "weight",
    "unit",
  ];

  for (const field of required) {
    if (!productData[field]) {
      return `${field} is required`;
    }
  }

  if (productData.price && productData.price < 0) {
    return "Price must be positive";
  }

  if (productData.weight && productData.weight < 0) {
    return "Weight must be positive";
  }

  if (productData.stock && productData.stock < 0) {
    return "Stock must be positive";
  }

  if (
    productData.discount &&
    (productData.discount < 0 || productData.discount > 100)
  ) {
    return "Discount must be between 0 and 100";
  }

  if (
    !productData.category ||
    !isValidObjectId(productData.category.toString())
  ) {
    return "Invalid category ID";
  }

  return null;
}

export async function createProduct(
  formData: ProductFormData
): Promise<ActionResponse<IProduct>> {
  try {
    await connectDb();
    const productData = sanitizeFormData(formData);
    const validationError = validateProductData(productData);
    if (validationError) {
      return { success: false, error: validationError };
    }

    const existingSku = await Product.findOne({ sku: productData.sku }).lean();
    if (existingSku) {
      return { success: false, error: "SKU already exists" };
    }

    const existingProductId = await Product.findOne({
      productId: productData.productId,
    }).lean();
    if (existingProductId) {
      return { success: false, error: "Product ID already exists" };
    }

    const product = await Product.create(productData);
    const populatedProduct = await Product.findById(product._id)
      .populate({ path: "category", select: "name" })
      .populate({ path: "createdBy", select: "name email" })
      .lean()
      .exec();

    revalidatePath("/products");
    return {
      success: true,
      product: populatedProduct as unknown as IProduct,
      message: "Product created successfully",
    };
  } catch (error) {
    console.error("Create product error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create product",
    };
  }
}

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
    const appliedFilters: string[] = [];

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
      appliedFilters.push(`search="${search}"`);
    }

    if (category && isValidObjectId(category)) {
      filter.category = new Types.ObjectId(category);
      appliedFilters.push(`category="${category}"`);
    }

    if (typeof isActive === "boolean") {
      filter.isActive = isActive;
      appliedFilters.push(`isActive=${isActive}`);
    }

    const rawProducts = await Product.find(filter)
      .populate({ path: "category", select: "name" })
      .populate({ path: "createdBy", select: "name email" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const products = rawProducts.map((product) => ({
      _id: product._id.toString(),
      productId: product.productId || "",
      name: product.name,
      sku: product.sku,
      brand: product.brand ?? "",
      description: product.description,
      price: product.price,
      stock: product.stock,
      stockleft: product.stockleft,
      isActive: product.isActive,
      createdAt: product.createdAt || undefined, // Use Date or undefined
      updatedAt: product.updatedAt || undefined, // Use Date or undefined
      images: product.images || [],
      tags: product.tags || [],
      weight: product.weight || 0,
      unit: product.unit || "unit",
      specifications:
        product.specifications instanceof Map
          ? product.specifications
          : new Map<string, string>(
            Object.entries(product.specifications || {})
          ),
      category: product.category?._id || product.category,
      createdBy: product.createdBy?._id || product.createdBy,
    }));

    const total = await Product.countDocuments(filter);

    return {
      success: true,
      products,
      message: `Found ${products.length} products (${total} total)${appliedFilters.length
          ? " with filters: " + appliedFilters.join(", ")
          : ""
        }`,
    };
  } catch (error) {
    console.error("Get products error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch products",
    };
  }
}

export async function getProduct(
  identifier: string
): Promise<ActionResponse<IProduct>> {
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
      error: error instanceof Error ? error.message : "Failed to fetch product",
    };
  }
}

export async function updateProduct(
  identifier: string,
  formData: ProductFormData
): Promise<ActionResponse<IProduct>> {
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
        _id: { $ne: product._id },
      }).lean();
      if (existingSku) {
        return { success: false, error: "SKU already exists" };
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      productData,
      { new: true, runValidators: true }
    )
      .populate({ path: "category", select: "name" })
      .populate({ path: "createdBy", select: "name email" })
      .lean()
      .exec();

    revalidatePath("/products");
    return {
      success: true,
      product: updatedProduct as unknown as IProduct,
      message: "Product updated successfully",
    };
  } catch (error) {
    console.error("Update product error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update product",
    };
  }
}

export async function deleteProduct(
  identifier: string
): Promise<ActionResponse<never>> {
  try {
    await connectDb();
    let product;

    if (isValidObjectId(identifier)) {
      product = await Product.findByIdAndDelete(identifier).lean().exec();
    } else {
      product = await Product.findOneAndDelete({ productId: identifier })
        .lean()
        .exec();
    }

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    revalidatePath("/products");
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Delete product error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete product",
    };
  }
}

export async function toggleProductStatus(
  identifier: string
): Promise<ActionResponse<IProduct>> {
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

    revalidatePath("/products");
    return {
      success: true,
      product: updatedProduct as unknown as IProduct,
      message: `Product ${product.isActive ? "activated" : "deactivated"
        } successfully`,
    };
  } catch (error) {
    console.error("Toggle product status error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to toggle product status",
    };
  }
}

// frontend

// Extend IProduct to include _id
interface IProductExtended extends Omit<IProduct, "specifications"> {
  _id: Types.ObjectId;
  specifications: Record<string, string>;
}

// Server action to fetch public products with pagination, search, and filters
export async function getPublicProducts({
  page = 1,
  limit = 12,
  search = "",
  category = "",
  minPrice = 0,
  maxPrice = Number.MAX_SAFE_INTEGER,
  sort = "createdAt",
  order = "desc",
}: {
  page: number;
  limit: number;
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sort: string;
  order: string;
}) {
  try {
    await connectDb();

    const query = {
      isActive: true,
      price: { $gte: minPrice, $lte: maxPrice },
      ...(search && { name: { $regex: search, $options: "i" } }),
      ...(category && { category }),
    };

    const sortOptions: { [key: string]: 1 | -1 } = {
      [sort]: order === "desc" ? -1 : 1,
    };

    const [rawProducts, total] = await Promise.all([
      Product.find(query)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean() as Promise<IProductExtended[]>,
      Product.countDocuments(query) as Promise<number>,
    ]);

    const products = rawProducts.map((product) => ({
      _id: product._id.toString(),
      productId: product.productId || "",
      name: product.name,
      sku: product.sku,
      brand: product.brand ?? "",
      description: product.description,
      price: product.price,
      stock: product.stock,
      discount: product.discount,
      isActive: product.isActive,
      createdAt: product.createdAt || undefined,
      updatedAt: product.updatedAt || undefined,
      images: product.images || [],
      tags: product.tags || [],
      weight: product.weight || 0,
      unit: product.unit || "unit",
      specifications: new Map<string, string>(
        Object.entries(product.specifications || {})
      ),
      category:
        product.category?._id?.toString() || product.category?.toString() || "",
      createdBy:
        product.createdBy?._id?.toString() ||
        product.createdBy?.toString() ||
        "",
    }));

    return {
      products,
      total,
      pages: Math.ceil(total / limit),
      page,
      limit,
    };
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function getProductById(productId: string) {
  try {
    await connectDb();
    const product = await Product.findOne({
      productId,
    }).populate<{ category: { name: string } }>('category').lean();
    if (!product) return null;

    return {
      ...product,
      category: product.category?.name || "",
      createdBy: product.createdBy?.toString() || "",
      specifications: new Map<string, string>(
        Object.entries(product.specifications || {})
      ),
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
}

export async function getHomeProducts() {
  try {
    await connectDb();
    const rawProducts = await Product.find({ isActive: true })
      .sort({ updatedAt: -1 })
      .limit(3)
      .populate({ path: "category", select: "name" })
      .populate({ path: "createdBy", select: "name email" })
      .lean();

    const products = rawProducts.map((product) => ({
      _id: product._id.toString(),
      productId: product.productId || "",
      name: product.name,
      sku: product.sku,
      brand: product.brand ?? "",
      description: product.description,
      price: product.price,
      discount: product.discount,
      stock: product.stock,
      stockleft: product.stockleft,
      isActive: product.isActive,
      createdAt: product.createdAt || undefined, // Use Date or undefined
      updatedAt: product.updatedAt || undefined, // Use Date or undefined
      images: product.images || [],
      tags: product.tags || [],
      weight: product.weight || 0,
      unit: product.unit || "unit",
      specifications:
        product.specifications instanceof Map
          ? product.specifications
          : new Map<string, string>(
            Object.entries(product.specifications || {})
          ),
      category: product.category?._id || product.category,
      createdBy: product.createdBy?._id || product.createdBy,
    }));

    return {
      success: true,
      products,
    };
  } catch (error) {
    console.error("Get products error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch products",
    };
  }
}
