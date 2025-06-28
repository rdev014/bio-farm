"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    author: {
      name: string;
      image: string | null;
    };
    featuredImage: string;
    categories: string[];
    tags: string[];
    readTime: number;
    publishedAt: string | null;
    updatedAt: string | null;
    status: string;
    seo: {
      metaTitle: string | null;
      metaDescription: string | null;
      keywords: string[];
    };
  };
}


export default function BlogPost({ post }: BlogPostProps) {
  // Find the current blog post

  if (!post) notFound();
console.log(post);
  // Find related posts based on tags (up to 3)
  //   const relatedPosts = post

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Share functionality
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const sharePost = (platform: string) => {
    const text = `Check out this article: ${post.title}`;
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        shareUrl
      )}&title=${encodeURIComponent(post.title)}`,
    };
    window.open(urls[platform as keyof typeof urls], "_blank");
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[600px] mb-12">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium text-white bg-green-600/80 backdrop-blur-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-2 mb-6">
              {post.categories.map((cat,index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium text-white bg-green-600/80 backdrop-blur-sm rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center text-white space-x-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-600/10 to-green-400/10 flex items-center justify-center">
                  <span className="text-green-50 font-medium text-sm">
                    <Image
                      src={
                        post.author.image ||
                        "https://placehold.net/avatar-2.svg"
                      } // Fallback for missing images
                      alt={post.author.name || "Author"}
                      width={36}
                      height={36}
                      className="rounded-full mr-3 border-2 border-gray-200 object-cover"
                    />
                  </span>
                </div>
                <span className="ml-2">{post.author.name}</span>
              </div>
              <span>•</span>
              <span>
                {post.publishedAt
                  ? formatDate(post.publishedAt)
                  : "Not published"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Social Share Sidebar */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-32">
              <div className="flex flex-col items-center space-y-4">
                <span className="text-sm font-medium text-gray-500">Share</span>
                <button
                  onClick={() => sharePost("twitter")}
                  className="p-3 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <svg
                    className="w-5 h-5 text-[#1DA1F2]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
                <button
                  onClick={() => sharePost("facebook")}
                  className="p-3 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <svg
                    className="w-5 h-5 text-[#4267B2]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button
                  onClick={() => sharePost("linkedin")}
                  className="p-3 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <svg
                    className="w-5 h-5 text-[#0A66C2]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <article className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
              <div className="prose prose-lg max-w-none prose-green">
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-6 text-gray-700 leading-relaxed">
                  {post.content.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  Tagged with
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blogs?tag=${tag}`}
                      className="px-3 py-1 text-sm font-medium text-green-600 bg-green-50 rounded-full hover:bg-green-100 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center">
                  <div className=" flex items-center justify-center">
                    <span className="text-green-600 font-medium text-lg">
                      <Image
                        src={
                          post.author.image ||
                          "https://placehold.net/avatar-2.svg"
                        } // Fallback for missing images
                        alt={post.author.name || "Author"}
                        width={36}
                        height={36}
                        className="rounded-full mr-3 border-2 border-gray-200 object-cover"
                      />
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {post.author.name}
                    </h3>
                    <p className="text-gray-500">
                      Expert in Sustainable Agriculture
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Table of Contents & Related Posts Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-32 space-y-8">
              {/* Related Posts */}
              {/* {relatedPosts.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link 
                        key={related.id} 
                        href={`/blogs/${related.slug}`}
                        className="block group"
                      >
                        <div className="relative h-24 rounded-lg overflow-hidden mb-2">
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-green-50 mb-6">
              Get the latest insights about sustainable farming and organic
              practices delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border-2 border-transparent focus:outline-none focus:border-white/20 bg-white/10 text-white placeholder-white/60"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
