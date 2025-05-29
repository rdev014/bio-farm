"use server";

import connectDb from "@/lib/db";
import { generateSlug } from "@/lib/utils";
import { Blog } from "@/models/blogSchema";
import { revalidatePath } from "next/cache";

// Create blog
export async function createBlog(formData: FormData) {
  try {
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const excerpt = formData.get("excerpt")?.toString();
    const authorName = formData.get("authorName")?.toString();
    const authorImage = formData.get("authorImage")?.toString();
    const featuredImage = formData.get("featuredImage")?.toString();
    const categories = JSON.parse(formData.get("categories")?.toString() || "[]");
    const tags = JSON.parse(formData.get("tags")?.toString() || "[]");
    const readTime = Number(formData.get("readTime"));
    const status = formData.get("status")?.toString() as "draft" | "published";
    const metaTitle = formData.get("metaTitle")?.toString();
    const metaDescription = formData.get("metaDescription")?.toString();
    const keywords = JSON.parse(formData.get("keywords")?.toString() || "[]");

    if (!title || !content || !excerpt || !authorName || !featuredImage || !readTime) {
      throw new Error("Missing required fields");
    }

    const slug = generateSlug(title);

    await connectDb();

    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt,
      author: { name: authorName, image: authorImage },
      featuredImage,
      categories,
      tags,
      readTime,
      status,
      seo: { metaTitle, metaDescription, keywords },
    });

    revalidatePath("/blogs");

    return {
      success: true,
      blog,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create blog",
    };
  }
}

// Update blog
export async function updateBlog(formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const excerpt = formData.get("excerpt")?.toString();
    const authorName = formData.get("authorName")?.toString();
    const authorImage = formData.get("authorImage")?.toString();
    const featuredImage = formData.get("featuredImage")?.toString();
    const categories = JSON.parse(formData.get("categories")?.toString() || "[]");
    const tags = JSON.parse(formData.get("tags")?.toString() || "[]");
    const readTime = Number(formData.get("readTime"));
    const status = formData.get("status")?.toString() as "draft" | "published";
    const metaTitle = formData.get("metaTitle")?.toString();
    const metaDescription = formData.get("metaDescription")?.toString();
    const keywords = JSON.parse(formData.get("keywords")?.toString() || "[]");

    if (!id || !title || !content || !excerpt || !authorName || !featuredImage || !readTime) {
      throw new Error("Missing required fields");
    }

    const slug = generateSlug(title);

    await connectDb();

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        content,
        excerpt,
        author: { name: authorName, image: authorImage },
        featuredImage,
        categories,
        tags,
        readTime,
        status,
        seo: { metaTitle, metaDescription, keywords },
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!blog) throw new Error("Blog not found");

    revalidatePath("/blogs");

    return {
      success: true,
      blog,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update blog",
    };
  }
}

// Delete blog
export async function deleteBlog(formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    if (!id) throw new Error("Blog ID is required");

    await connectDb();
    await Blog.findByIdAndDelete(id);

    revalidatePath("/blogs");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete blog",
    };
  }
}

// Get all blogs
export async function getBlogs() {
  await connectDb();
  const blogs = await Blog.find({}).sort({ publishedAt: -1 });

  return blogs.map((blog) => ({
    _id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    content: blog.content,
    excerpt: blog.excerpt,
    author: blog.author,
    featuredImage: blog.featuredImage,
    categories: blog.categories,
    tags: blog.tags,
    readTime: blog.readTime,
    publishedAt: blog.publishedAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
    status: blog.status,
    seo: blog.seo,
  }));
}
