import Image from "next/image";
import Link from "next/link";
import React from "react";

// --- Type Definitions ---
// Updated to reflect potential nullability for image/SEO fields as per common data practices
interface Author {
  name: string;
  image: string | null;
}

interface SEO {
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string[];
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: Author;
  featuredImage: string;
  categories: {
    name?:string;
  }[];
  tags: string[];
  readTime: number;
  publishedAt: string;
  updatedAt: string;
  status: string; // Consider making this 'draft' | 'publish' for strictness
  seo: SEO;
}

interface BlogProps {
  blogs: BlogPost[];
}

// --- Helper Functions (No Logical Change) ---
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getTimeAgo = (dateString: string) => {
  const now = new Date();
  const publishDate = new Date(dateString);
  const diffInDays = Math.floor(
    (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return formatDate(dateString);
};


export default function Blogs({ blogs }: BlogProps) {

  
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          {blogs.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-2xl shadow-lg border border-zinc-100 overflow-hidden
                                       transform transition-all duration-500 ease-in-out
                                       hover:scale-[1.02] hover:shadow-xl hover:border-green-400 group
                                       relative isolate flex flex-col h-full" // Ensure consistent height for grid alignment
            >
              <Link
                href={`/blogs/${post.slug}`}
                className="absolute inset-0 z-10"
                aria-label={`Read more about ${post.title}`}
              >
                {/* This full-card link overlay improves clickability */}
              </Link>

              <div className="relative h-56 w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  priority={false} // Adjust based on your content loading strategy
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>{" "}
                {/* Subtle dark overlay */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-white bg-black/60 backdrop-blur-sm rounded-full shadow-md">
                    {post.readTime} min read
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow relative z-20">
                {" "}
                {/* `flex-grow` ensures consistent footer alignment */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.slice(0, 2).map((cat,index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 text-xs font-medium rounded-full
                                                       bg-green-50 text-green-700
                                                       hover:bg-green-100 hover:text-green-800 transition-colors duration-200 cursor-pointer"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
                <Link href={`/blogs/${post.slug}`} aria-label={`Read more about ${post.title}`} >
                  <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 mb-3 group-hover:text-green-600 transition-colors leading-snug">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-zinc-600 mb-5 line-clamp-3 leading-relaxed text-sm flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-zinc-100">
                  {post.author &&
                    <div className="flex items-center">
                      <Image
                        src={
                          post.author.image ||
                          "https://placehold.net/avatar-2.svg"
                        } // Fallback for missing images
                        alt={post.author.name || "Author"}
                        width={36}
                        height={36}
                        className="rounded-full mr-3 border-2 border-zinc-200 object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-zinc-900">
                          {post.author.name}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {getTimeAgo(post.publishedAt)}
                        </p>
                      </div>
                    </div>
                  }
                  <Link href={`/blogs/${post.slug}`} aria-label={`Read more about ${post.title}`} className="group flex items-center text-green-600 group-hover:text-green-700 transition-colors duration-300">
                    <span className="text-sm font-semibold mr-1 group-hover:underline ">
                      Read More
                    </span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* No Results Found - Modernized State */
        <div className="text-center py-20 bg-zinc-50 rounded-xl shadow-lg border border-zinc-200">
          <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-8 text-zinc-500 animate-pulse-slow">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.077-2.33"
              />
            </svg>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-4 tracking-tight">
            No Articles Yet!
          </h3>
          <p className="text-zinc-600 mb-8 max-w-lg mx-auto leading-relaxed text-base md:text-lg">
            It looks like our blog is still blooming. Check back soon for fresh
            insights and engaging stories!
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg shadow-md
                                   text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                                   transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Go to Homepage
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}
