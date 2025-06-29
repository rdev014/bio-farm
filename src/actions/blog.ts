"use server";

import connectDb from "@/lib/db";
import { generateSlug } from "@/lib/utils";
import { Blog } from "@/models/blogSchema";
import { revalidatePath } from "next/cache";
import "@/models/categorySchema";
import "@/models/UserSchema";

// Create blog
export async function createBlog(formData: FormData, user_id: string) {
  try {
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const excerpt = formData.get("excerpt")?.toString();
    const featuredImage = formData.get("featuredImage")?.toString();
    const categories = JSON.parse(
      formData.get("categories")?.toString() || "[]"
    );
    const tags = JSON.parse(formData.get("tags")?.toString() || "[]");
    const readTime = Number(formData.get("readTime"));
    const status = formData.get("status")?.toString() as "draft" | "publish";
    const metaTitle = formData.get("metaTitle")?.toString();
    const metaDescription = formData.get("metaDescription")?.toString();
    const keywords = JSON.parse(formData.get("keywords")?.toString() || "[]");

    if (
      !title ||
      !content ||
      !excerpt ||
      !featuredImage ||
      !readTime ||
      categories.length === 0
    ) {
      return {
        success: false,
        error: "All required fields must be provided.",
      };
    }

    await connectDb();
    let slug = generateSlug(title);
    const existing = await Blog.findOne({ slug });
    if (existing) slug += `-${Date.now()}`;

    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt,
      author: user_id,
      featuredImage,
      categories,
      tags,
      readTime,
      status,
      seo: {
        metaTitle,
        metaDescription,
        keywords: Array.isArray(keywords) ? keywords : [],
      },
    });

    revalidatePath("/blogs");
    revalidatePath("/");

    return {
      success: true,
      blog: {
        _id: (blog._id as { toString: () => string }).toString(),
        title: blog.title,
        slug: blog.slug,
        status: blog.status,
      },
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
    const author = formData.get("author")?.toString();
    const featuredImage = formData.get("featuredImage")?.toString();
    const categories = JSON.parse(
      formData.get("categories")?.toString() || "[]"
    );
    const tags = JSON.parse(formData.get("tags")?.toString() || "[]");
    const readTime = Number(formData.get("readTime"));
    const status = formData.get("status")?.toString() as "draft" | "publish";
    const metaTitle = formData.get("metaTitle")?.toString();
    const metaDescription = formData.get("metaDescription")?.toString();
    const keywords = JSON.parse(formData.get("keywords")?.toString() || "[]");

    if (
      !id ||
      !title ||
      !content ||
      !excerpt ||
      !author ||
      !featuredImage ||
      !readTime ||
      categories.length === 0
    ) {
      throw new Error("Missing required fields");
    }

    await connectDb();
    const slug = generateSlug(title);

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        content,
        excerpt,
        author,
        featuredImage,
        categories,
        tags,
        readTime,
        status,
        seo: {
          metaTitle,
          metaDescription,
          keywords,
        },
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!blog) throw new Error("Blog not found");

    revalidatePath("/blogs");

    return { success: true, blog };
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
    if (!id) throw new Error("Blog ID required");

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
  const blogs = await Blog.find({})
    .sort({ publishedAt: -1 })
    .populate("author")
    .populate("categories")
    .lean();

  return blogs.map((blog) => ({
    _id: (blog._id as { toString: () => string }).toString(),
    title: blog.title,
    slug: blog.slug,
    content: blog.content,
    excerpt: blog.excerpt,
    author:
      typeof blog.author === "object" &&
        blog.author !== null &&
        "name" in blog.author
        ? { _id: blog.author._id.toString(), name: blog.author.name }
        : blog.author,
    featuredImage: blog.featuredImage,
    categories: blog.categories.map(
      (cat: {  name?: string }) => ({
        name: cat.name ?? "",
      })
    ),
    tags: blog.tags,
    readTime: blog.readTime,
    publishedAt: blog.publishedAt?.toISOString() || null,
    updatedAt: blog.updatedAt?.toISOString() || null,
    status: blog.status,
    seo: {
      metaTitle: blog.seo?.metaTitle || null,
      metaDescription: blog.seo?.metaDescription || null,
      keywords: blog.seo?.keywords || [],
    },
  }));
}
export async function getHomeBlogs() {
  await connectDb();
  const blogs = await Blog.find({})
    .sort({ publishedAt: -1 })
    .limit(3)
    .populate("author")
    .populate("categories")
    .lean();

  return blogs.map((blog) => ({
    _id: (blog._id as { toString: () => string }).toString(),
    title: blog.title,
    slug: blog.slug,
    content: blog.content,
    excerpt: blog.excerpt,
    author:
      typeof blog.author === "object" &&
        blog.author !== null &&
        "name" in blog.author
        ? { _id: blog.author._id.toString(), name: blog.author.name }
        : blog.author,
    featuredImage: blog.featuredImage,
    categories: blog.categories.map(
      (cat: { _id: { toString: () => string }; name?: string }) => ({
        _id: cat._id.toString(),
        name: cat.name ?? "",
      })
    ),
    tags: blog.tags,
    readTime: blog.readTime,
    publishedAt: blog.publishedAt?.toISOString() || null,
    updatedAt: blog.updatedAt?.toISOString() || null,
    status: blog.status,
    seo: {
      metaTitle: blog.seo?.metaTitle || null,
      metaDescription: blog.seo?.metaDescription || null,
      keywords: blog.seo?.keywords || [],
    },
  }));
}

// Show single blog
export async function showBlog({ slug }: { slug: string }) {
  await connectDb();
  const blog = await Blog.findOne({ slug })
    .populate("author")
    .populate("categories")
    .lean();

  console.log("this is blog", blog);

  if (!blog || Array.isArray(blog)) return null;

  return {
    _id: (blog._id as { toString: () => string }).toString(),
    title: blog.title,
    slug: blog.slug,
    content: blog.content,
    excerpt: blog.excerpt,
    author:
      typeof blog.author === "object" &&
        blog.author !== null &&
        "name" in blog.author
        ? { _id: blog.author._id.toString(), name: blog.author.name }
        : blog.author,
    featuredImage: blog.featuredImage,
    categories: blog.categories.map(
      (cat: { _id: { toString: () => string }; name?: string }) => ({
        _id: cat._id.toString(),
        name: cat.name ?? "",
      })
    ),
    tags: blog.tags,
    readTime: blog.readTime,
    publishedAt: blog.publishedAt?.toISOString() || null,
    updatedAt: blog.updatedAt?.toISOString() || null,
    status: blog.status,
    seo: {
      metaTitle: blog.seo?.metaTitle || null,
      metaDescription: blog.seo?.metaDescription || null,
      keywords: blog.seo?.keywords || [],
    },
    __v: blog.__v,
  };
}
