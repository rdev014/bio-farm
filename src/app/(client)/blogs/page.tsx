import { getBlogs } from "@/actions/blog";
import Blogs from "@/components/blogs/Blogs";


export default async function Page() {
  const blogs = await getBlogs();

  // Transform blogs to ensure publishedAt and updatedAt are strings
  const formattedBlogs = blogs.map((blog) => ({
    ...blog,
    publishedAt: blog.publishedAt || "", // Fallback to empty string if null
    updatedAt: blog.updatedAt || "",     // Fallback to empty string if null
  }));

  return <Blogs blogs={formattedBlogs} />;
}