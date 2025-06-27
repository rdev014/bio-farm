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
    const author = formData.get("author")?.toString(); // Should be ObjectId string
    const featuredImage = formData.get("featuredImage")?.toString();
    const categories = JSON.parse(formData.get("categories")?.toString() || "[]");
    const tags = JSON.parse(formData.get("tags")?.toString() || "[]");
    const readTime = Number(formData.get("readTime"));
    const status = formData.get("status")?.toString() as "draft" | "publish";
    const metaTitle = formData.get("metaTitle")?.toString();
    const metaDescription = formData.get("metaDescription")?.toString();
    const keywords = JSON.parse(formData.get("keywords")?.toString() || "[]");

    if (!title || !content || !excerpt || !author || !featuredImage || !readTime || categories.length === 0) {
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
      author,
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
        _id: blog._id.toString(),
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
    const categories = JSON.parse(formData.get("categories")?.toString() || "[]");
    const tags = JSON.parse(formData.get("tags")?.toString() || "[]");
    const readTime = Number(formData.get("readTime"));
    const status = formData.get("status")?.toString() as "draft" | "publish";
    const metaTitle = formData.get("metaTitle")?.toString();
    const metaDescription = formData.get("metaDescription")?.toString();
    const keywords = JSON.parse(formData.get("keywords")?.toString() || "[]");

    if (!id || !title || !content || !excerpt || !author || !featuredImage || !readTime || categories.length === 0) {
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
  const blogs = await Blog.find({}).sort({ publishedAt: -1 }).populate('author').populate('categories');
  console.log(blogs);

  return blogs.map((blog) => ({
    _id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    content: blog.content,
    excerpt: blog.excerpt,
    author: typeof blog.author === "object" && blog.author !== null && "name" in blog.author
      ? { _id: blog.author._id.toString(), name: blog.author.name }
      : blog.author,
    featuredImage: blog.featuredImage,
    categories: blog.categories.map((cat: { _id: { toString: () => string }, name?: string }) => ({
      _id: cat._id.toString(),
      name: cat.name ?? "",
    })),
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
  const blog = await Blog.findOne({ slug }).populate('author').lean();

  if (!blog || Array.isArray(blog)) return null;

  const typedBlog = blog as {
    _id: { toString: () => string },
    title: string,
    slug: string,
    content: string,
    excerpt: string,
    author: {
      name: string;
      image: string;
    },
    featuredImage: string,
    categories: string[],
    tags: string[],
    readTime: number,
    publishedAt?: Date,
    updatedAt?: Date,
    status: string,
    seo?: {
      metaTitle?: string | null,
      metaDescription?: string | null,
      keywords?: string[],
    },
    __v?: number,
  };

  return {
    _id: typedBlog._id.toString(),
    title: typedBlog.title,
    slug: typedBlog.slug,
    content: typedBlog.content,
    excerpt: typedBlog.excerpt,
    author: {
      name: typedBlog.author.name,
      image: typedBlog.author.image
    },
    featuredImage: typedBlog.featuredImage,
    categories: typedBlog.categories.map((cat: { toString: () => string }) => cat.toString()),
    tags: typedBlog.tags,
    readTime: typedBlog.readTime,
    publishedAt: typedBlog.publishedAt?.toISOString() || null,
    updatedAt: typedBlog.updatedAt?.toISOString() || null,
    status: typedBlog.status,
    seo: {
      metaTitle: typedBlog.seo?.metaTitle || null,
      metaDescription: typedBlog.seo?.metaDescription || null,
      keywords: typedBlog.seo?.keywords || [],
    },
    __v: typedBlog.__v,
  };
}
