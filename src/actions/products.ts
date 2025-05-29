"use server";

import connectDb from "@/lib/db";
import { generateSlug } from "@/lib/utils";
import Product from "@/models/ProductSchema";
import { revalidatePath } from "next/cache";

// Create product
export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const price = Number(formData.get("price"));
    const comparePrice = Number(formData.get("comparePrice"));
    const images = JSON.parse(formData.get("images")?.toString() || "[]");
    const category = formData.get("category")?.toString();
    const subcategory = formData.get("subcategory")?.toString();
    const farm = JSON.parse(formData.get("farm")?.toString() || "{}");
    const stock = Number(formData.get("stock"));
    const unit = formData.get("unit")?.toString();
    const weight = Number(formData.get("weight"));
    const organic = formData.get("organic") === "true";
    const seasonal = formData.get("seasonal") === "true";
    const seasonAvailability = JSON.parse(formData.get("seasonAvailability")?.toString() || "null");
    const nutritionalInfo = JSON.parse(formData.get("nutritionalInfo")?.toString() || "null");
    const certifications = JSON.parse(formData.get("certifications")?.toString() || "[]");
    const storageInstructions = formData.get("storageInstructions")?.toString();
    const tags = JSON.parse(formData.get("tags")?.toString() || "[]");
    const featured = formData.get("featured") === "true";
    const rating = Number(formData.get("rating"));
    const reviews = Number(formData.get("reviews"));

    if (!name || !description || !images.length || !category || !unit || !farm.name || !farm.location) {
      throw new Error("Missing required fields");
    }

    const slug = generateSlug(name);

    await connectDb();

    const product = await Product.create({
      name,
      slug,
      description,
      price,
      comparePrice,
      images,
      category,
      subcategory,
      farm,
      stock,
      unit,
      weight,
      organic,
      seasonal,
      seasonAvailability,
      nutritionalInfo,
      certifications,
      storageInstructions,
      tags,
      featured,
      rating,
      reviews,
    });

    revalidatePath("/products");

    return {
      success: true,
      product,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create product",
    };
  }
}

// Update product
export async function updateProduct(formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const price = Number(formData.get("price"));
    const comparePrice = Number(formData.get("comparePrice"));
    const images = JSON.parse(formData.get("images")?.toString() || "[]");
    const category = formData.get("category")?.toString();
    const subcategory = formData.get("subcategory")?.toString();
    const farm = JSON.parse(formData.get("farm")?.toString() || "{}");
    const stock = Number(formData.get("stock"));
    const unit = formData.get("unit")?.toString();
    const weight = Number(formData.get("weight"));
    const organic = formData.get("organic") === "true";
    const seasonal = formData.get("seasonal") === "true";
    const seasonAvailability = JSON.parse(formData.get("seasonAvailability")?.toString() || "null");
    const nutritionalInfo = JSON.parse(formData.get("nutritionalInfo")?.toString() || "null");
    const certifications = JSON.parse(formData.get("certifications")?.toString() || "[]");
    const storageInstructions = formData.get("storageInstructions")?.toString();
    const tags = JSON.parse(formData.get("tags")?.toString() || "[]");
    const featured = formData.get("featured") === "true";
    const rating = Number(formData.get("rating"));
    const reviews = Number(formData.get("reviews"));

    if (!id || !name || !description || !images.length || !category || !unit || !farm.name || !farm.location) {
      throw new Error("Missing required fields");
    }

    const slug = generateSlug(name);

    await connectDb();

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        description,
        price,
        comparePrice,
        images,
        category,
        subcategory,
        farm,
        stock,
        unit,
        weight,
        organic,
        seasonal,
        seasonAvailability,
        nutritionalInfo,
        certifications,
        storageInstructions,
        tags,
        featured,
        rating,
        reviews,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!product) throw new Error("Product not found");

    revalidatePath("/products");

    return {
      success: true,
      product,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update product",
    };
  }
}

// Delete product
export async function deleteProduct(formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    if (!id) throw new Error("Product ID is required");

    await connectDb();
    await Product.findByIdAndDelete(id);

    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete product",
    };
  }
}

// Get all products
export async function getProducts() {
  await connectDb();
  const products = await Product.find({}).sort({ createdAt: -1 });

  return products.map((product) => ({
    _id: product._id.toString(),
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    comparePrice: product.comparePrice,
    images: product.images,
    category: product.category,
    subcategory: product.subcategory,
    farm: product.farm,
    stock: product.stock,
    unit: product.unit,
    weight: product.weight,
    organic: product.organic,
    seasonal: product.seasonal,
    seasonAvailability: product.seasonAvailability,
    nutritionalInfo: product.nutritionalInfo,
    certifications: product.certifications,
    storageInstructions: product.storageInstructions,
    tags: product.tags,
    featured: product.featured,
    rating: product.rating,
    reviews: product.reviews,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }));
}
