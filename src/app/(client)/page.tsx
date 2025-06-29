import { getHomeBlogs } from "@/actions/blog";
import { Category } from "@/components/FetchCategory/FetchCategory";
import Home from "@/components/home/Home";

// Define or import the BlogPost and Category types correctly
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
  categories: Category[];
  tags: string[];
  readTime: number;
  publishedAt: string;
  updatedAt: string;
  status: string;
  seo: SEO;
}

export default async function Page() {
  const blogs = await getHomeBlogs();

  const formattedBlogs: BlogPost[] = blogs.map((blog) => ({
    ...blog,
    publishedAt: blog.publishedAt || "",
    updatedAt: blog.updatedAt || "",
    categories: blog.categories.map((cat: Category) => ({
      _id: cat._id || "",
      name: cat.name || "",
      slug: cat.slug || "",
    })),
  }));

  return <Home blogs={formattedBlogs} />;
}
