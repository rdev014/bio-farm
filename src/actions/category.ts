"use server";

import connectDb from "@/lib/db";
import Category from "@/models/categorySchema";
import { revalidatePath } from "next/cache";

interface CategoryResponse {
  success: boolean;
  category?: {
    _id: string;
    name: string;
    slug: string;
    author: {
      name: string;
      image: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  error?: string;
}

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

// Create
export async function createCategory(formData: FormData, user_id: string): Promise<CategoryResponse> {
  try {
    const name = formData.get("name")?.toString();
    if (!name) throw new Error("Name is required");

    const slug = generateSlug(name);

    await connectDb();
    const existingCategory = await Category.findOne({ slug, author: user_id });
    if (existingCategory) throw new Error("Category already exists");

    const category = await Category.create({ name, slug, author: user_id });
    const populatedCategory = await Category.findById(category._id).populate({
      path: "author",
      select: "name image",
    });

    revalidatePath("/category");

    return {
      success: true,
      category: {
        _id: populatedCategory._id.toString(),
        name: populatedCategory.name,
        slug: populatedCategory.slug,
        author: {
          name: populatedCategory.author?.name || "Unknown",
          image: populatedCategory.author?.image || "",
        },
        createdAt: populatedCategory.createdAt.toISOString(),
        updatedAt: populatedCategory.updatedAt.toISOString(),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create category",
    };
  }
}

// Update
export async function updateCategory(formData: FormData, user_id: string): Promise<CategoryResponse> {
  try {
    const name = formData.get("name")?.toString();
    const id = formData.get("id")?.toString();
    if (!name || !id) throw new Error("Name and ID are required");

    const slug = generateSlug(name);

    await connectDb();
    const category = await Category.findById(id);
    if (!category) throw new Error("Category not found");
    if (category.author.toString() !== user_id) throw new Error("Unauthorized to update this category");

    const existingCategory = await Category.findOne({ slug, _id: { $ne: id } });
    if (existingCategory) throw new Error("Category name already exists");

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, slug },
      { new: true }
    ).populate({ path: "author", select: "name image" });

    revalidatePath("/category");
    return {
      success: true,
      category: {
        _id: updatedCategory._id.toString(),
        name: updatedCategory.name,
        slug: updatedCategory.slug,
        author: {
          name: updatedCategory.author?.name || "Unknown",
          image: updatedCategory.author?.image || "",
        },
        createdAt: updatedCategory.createdAt.toISOString(),
        updatedAt: updatedCategory.updatedAt.toISOString(),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update category",
    };
  }
}

// Delete
export async function deleteCategory(formData: FormData, user_id: string): Promise<CategoryResponse> {
  try {
    const id = formData.get("id")?.toString();
    if (!id) throw new Error("ID is required");

    await connectDb();
    const category = await Category.findById(id);
    if (!category) throw new Error("Category not found");
    if (category.author.toString() !== user_id) throw new Error("Unauthorized to delete this category");

    await category.deleteOne();
    revalidatePath("/category");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete category",
    };
  }
}

// Get all categories
export async function getCategories(): Promise<CategoryResponse["category"][]> {
  try {
    await connectDb();
    const categories = await Category.find({})
      .populate({ path: "author", select: "name image" })
      .sort({ createdAt: -1 });

    return categories.map((category) => ({
      _id: category._id.toString(),
      name: category.name,
      slug: category.slug,
      author: {
        name: category.author?.name || "Unknown",
        image: category.author?.image || "",
      },
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch categories");
  }
}
