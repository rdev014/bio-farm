import { getBlogs } from "@/actions/blog";
import Blogs from "@/components/blogs/Blogs";

export default async function Page() {
  const blogs = await getBlogs();

  const formattedBlogs = blogs.map((blog) => ({
    ...blog,
    publishedAt: blog.publishedAt || "",
    updatedAt: blog.updatedAt || "",
  }));

  return (
    <>
      <section className="relative bg-emerald-100 text-emerald-900 py-20 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center z-10 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Arkin Organics Blog</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Dive into expert tips, sustainable farming insights, and organic growth stories straight from the soil.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full blur-2xl opacity-20 animate-pulse"></div>
      </section>

      <Blogs blogs={formattedBlogs} />
    </>
  );
}
