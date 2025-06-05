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
    const status = formData.get("status")?.toString() as "draft" | "publish";
    const metaTitle = formData.get("metaTitle")?.toString();
    const metaDescription = formData.get("metaDescription")?.toString();
    const keywords = JSON.parse(formData.get("keywords")?.toString() || "[]");

    // Validation
    if (!title || !content || !excerpt || !authorName || !featuredImage || !readTime) {
      return {
        success: false,
        error: "Missing required fields. Please fill in all required information.",
      };
    }

    if (categories.length === 0) {
      return {
        success: false,
        error: "Please select at least one category for your blog post.",
      };
    }

    // Generate unique slug
    let slug = generateSlug(title);
    await connectDb();

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      slug = `${slug}-${Date.now()}`;
    }

    // Create blog post
    const blogData = {
      title: title.trim(),
      slug,
      content: content.trim(),
      excerpt: excerpt.trim(),
      author: {
        name: authorName.trim(),
        image: authorImage?.trim() || undefined
      },
      featuredImage: featuredImage.trim(),
      categories,
      tags,
      readTime,
      status,
      seo: {
        metaTitle: metaTitle?.trim() || undefined,
        metaDescription: metaDescription?.trim() || undefined,
        keywords: keywords.length > 0 ? keywords : undefined
      },
    };

    const newBlog = await Blog.create(blogData);

    // Revalidate the blogs page
    revalidatePath("/blogs");
    revalidatePath("/");

    return {
      success: true,
      message: status === "publish" ? "Blog published successfully!" : "Blog saved as draft successfully!",
      blog: {
        _id: newBlog._id.toString(),
        title: newBlog.title,
        slug: newBlog.slug,
        status: newBlog.status,
      },
    };
  } catch (error) {
    console.error("Create blog error:", error);

    if (error instanceof Error) {
      // Handle specific MongoDB errors
      if (error.message.includes("duplicate key")) {
        return {
          success: false,
          error: "A blog with this title already exists. Please choose a different title.",
        };
      }

      if (error.message.includes("validation")) {
        return {
          success: false,
          error: "Validation error: Please check your input data and try again.",
        };
      }
    }

    return {
      success: false,
      error: "Failed to create blog post. Please try again later.",
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

export async function getBlogs() {
  await connectDb();
  const blogs = await Blog.find({}).sort({ publishedAt: -1 });

  return blogs.map((blog) => ({
    _id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    content: blog.content,
    excerpt: blog.excerpt,
    author: {
      name: blog.author.name,
      image: blog.author.image || null,
    },
    featuredImage: blog.featuredImage,
    categories: Array.isArray(blog.categories) ? blog.categories.map(String) : [],
    tags: Array.isArray(blog.tags) ? blog.tags.map(String) : [],
    readTime: blog.readTime,
    publishedAt: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : null,
    updatedAt: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : null,
    status: blog.status,
     seo: {
      metaTitle: blog.seo?.metaTitle || null,
      metaDescription: blog.seo?.metaDescription || null,
      keywords: Array.isArray(blog.seo?.keywords) ? blog.seo.keywords.map(String) : [],
    },
  }));
}


interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: {
    name: string;
    image?: string | null;
  };
  featuredImage: string;
  categories: string[];
  tags: string[];
  readTime: number;
  publishedAt?: string | null;
  updatedAt?: string | null;
  status: string;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    keywords?: string[];
  };
  __v: number;
}

export async function showBlog({ slug }: { slug: string }): Promise<Blog | null> {
  await connectDb();
  const blog = await Blog.findOne({ slug }).lean<Blog>();

  if (!blog) {
    return null;
  }

  return {
    _id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    content: blog.content,
    excerpt: blog.excerpt,
    author: {
      name: blog.author.name,
      image: blog.author.image || null,
    },
    featuredImage: blog.featuredImage,
    categories: Array.isArray(blog.categories) ? blog.categories.map(String) : [],
    tags: Array.isArray(blog.tags) ? blog.tags.map(String) : [],
    readTime: blog.readTime,
    publishedAt: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : null,
    updatedAt: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : null,
    status: blog.status,
    seo: {
      metaTitle: blog.seo?.metaTitle || null,
      metaDescription: blog.seo?.metaDescription || null,
      keywords: Array.isArray(blog.seo?.keywords) ? blog.seo.keywords.map(String) : [],
    },
    __v: blog.__v,
  };
}

