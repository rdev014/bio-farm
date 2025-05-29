"use server";

import connectDb from "@/lib/db";
import { generateSlug } from "@/lib/utils";
import Category from "@/models/categorySchema";
import { revalidatePath } from "next/cache";

// create
export async function createCategory(formData: FormData) {
  try {
    const name = formData.get("name")?.toString();
    if (!name) {
      throw new Error("Name is required");
    }
    await connectDb();
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      throw new Error("Category Already Exist");
    }
    const category = await Category.create({ name });
    revalidatePath("/category");
    return {
      success: true,
      category: {
        _id: category._id.toString(), 
        name: category.name,
        slug: category.slug,
        createdAt: category.createdAt.toISOString(), 
        updatedAt: category.updatedAt.toISOString(), 
      },
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create category",
    };
  }
}
//update
export async function updateCategory(formData: FormData) {
  try {
    const name = formData.get("name")?.toString() as string;
    const id = formData.get("id")?.toString();
    const slug = generateSlug(name);
    if (!name || !id) {
      throw new Error("Name , Id is required");
    }
    await connectDb();
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      throw new Error("Category Already Exist");
    }
    const category = await Category.findByIdAndUpdate(id, { name, slug });
    revalidatePath("/category");
     return {
      success: true,
      category: {
        _id: category._id.toString(), 
        name: category.name,
        slug: category.slug,
        createdAt: category.createdAt.toISOString(), 
        updatedAt: category.updatedAt.toISOString(), 
      },
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update category",
    };
  }
}
// delete
export async function deleteCategory(formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    if (!id) {
      throw new Error(" Id is required");
    }
    await connectDb();
    await Category.findByIdAndDelete(id);
    revalidatePath("/category");
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete category",
    };
  }
}

//getting all categories
export async function getCategories() {
  await connectDb();
  const categories = await Category.find({});
  return categories.map((category) => ({
    _id: category._id.toString(),
    name: category.name,
    slug: category.slug,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString(),
  }));
}
