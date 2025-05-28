"use server";

import { connectDb } from "@/lib/db";
import { Blog } from "@/models/blogSchema";
import { revalidatePath } from "next/cache";

const create = async (formData: FormData) => {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const featuredImage = formData.get("featuredImage") as string;
    const categoriesStr = formData.get("categories") as string;
    const tagsStr = formData.get("tags") as string;

    // Validate required fields
    if (
      !title ||
      !content ||
      !excerpt ||
      !featuredImage ||
      !categoriesStr ||
      !tagsStr
    ) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    // Process categories and tags from comma-separated strings
    const categories = categoriesStr.split(",").map((cat) => cat.trim());
    const tags = tagsStr.split(",").map((tag) => tag.trim());

    await connectDb();

    // Check for duplicate title
    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return {
        success: false,
        error: "A blog with this title already exists",
      };
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, "-");

    const blogData = {
      title,
      content,
      excerpt,
      featuredImage,
      categories,
      tags,
      slug,
      status: "published",
      publishedAt: new Date(),
    };

    const savedBlog = await Blog.create(blogData);

    // Revalidate the blogs page to show the new post
    revalidatePath("/blogs");

    return {
      success: true,
      slug: savedBlog.slug,
    };
  } catch (error) {
    console.error("Blog creation error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create blog post",
    };
  }
};

export default create;