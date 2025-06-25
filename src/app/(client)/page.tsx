import { getBlogs } from "@/actions/blog";
import Home from "@/components/home/Home";

// Define or import the BlogPost type (ensure it matches your component's expectations)
interface SEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: { name: string; image: string };
  featuredImage: string;
  categories: string[];
  tags: string[];
  readTime: number;
  publishedAt: string; // Expects string, not string | null
  updatedAt: string;  // Expects string, not string | null
  status: string;
  seo: SEO;
}

export default async function Page() {
  const blogs = await getBlogs();

  // Transform blogs to ensure publishedAt and updatedAt are strings
  const formattedBlogs: BlogPost[] = blogs.map((blog) => ({
    ...blog,
    publishedAt: blog.publishedAt || "", // Fallback to empty string if null
    updatedAt: blog.updatedAt || "",     // Fallback to empty string if null
  }));

  return <Home blogs={formattedBlogs} />;
}