"use client";

import { subscribeToNewsletter } from "@/actions/newsletter";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FacebookIcon, LinkedinIcon, XIcon } from "../icons/socialIcon";

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
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  // Find the current blog post

  if (!post) notFound();
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
      twitter: `https://x.com/intent/tweet?text=${encodeURIComponent(
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
  // Newsletter submission handler
  const handleNewsletterSubmit = async (formData: FormData) => {
    setStatus("submitting");
    try {
      const res = await subscribeToNewsletter(formData);
      setStatus(res?.success ? "success" : "error");
      setMessage(
        res?.message ||
          (res?.success
            ? "Successfully subscribed!"
            : "Failed to subscribe. Please try again.")
      );
    } catch (error) {
      console.log(error);
      
      setStatus("error");
      setMessage("An error occurred. Please try again later.");
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[600px] mb-12">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center gap-2 mb-4">
              {post.categories.map((cat, index) => (
                <span
                  key={index}
                  className="px-4 py-1 text-sm font-medium text-white bg-green-700/80 rounded-full shadow-md"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center text-white space-x-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center border-2 border-green-300">
                  <Image
                    src={
                      post.author.image || "https://placehold.net/avatar-2.png"
                    }
                    alt={post.author.name || "Author"}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <span className="ml-2 font-medium">{post.author.name}</span>
              </div>
              <span>•</span>
              <span className="text-sm">
                {post.publishedAt
                  ? formatDate(post.publishedAt)
                  : "Not published"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Social Share Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 flex flex-col items-center space-y-4 p-3 bg-white rounded-xl shadow-lg">
              <span className="text-sm font-semibold text-gray-700 mb-2">
                Share
              </span>
              <button
                onClick={() => sharePost("twitter")}
                className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200"
                aria-label="Share on X (Twitter)"
              >
                <XIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => sharePost("facebook")}
                className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
                aria-label="Share on Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => sharePost("linkedin")}
                className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-700 hover:text-white transition-all duration-200"
                aria-label="Share on LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <article className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 lg:p-12">
              <div className="prose prose-lg max-w-none prose-green">
                <p className="text-xl text-gray-700 mb-8 leading-relaxed font-serif">
                  {post.excerpt}
                </p>
                <div
                  className="mt-6 text-gray-800 leading-relaxed prose-p:mb-4 prose-li:mb-2 prose-headings:font-bold prose-a:text-green-600 prose-a:hover:underline"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(/\n/g, "")
                      .replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/g, ""),
                  }}
                />
              </div>

              {/* Tags */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="text-base font-semibold text-gray-600 mb-3">
                  Tagged with:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blogs?tag=${tag}`}
                      className="px-4 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded-full hover:bg-green-200 transition-colors duration-200 shadow-sm"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        post.author.image ||
                        "https://placehold.net/avatar-2.png"
                      } // Fallback for missing images
                      alt={post.author.name || "Author"}
                      width={60}
                      height={60}
                      className="rounded-full border-2 border-green-300 object-cover"
                    />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-bold text-gray-900">
                      {post.author.name}
                    </h3>
                    <p className="text-green-700 text-base mt-1">
                      Expert in Sustainable Agriculture
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Newsletter Section */}
        <section className="mt-16 py-12 bg-gradient-to-br from-emerald-800 to-green-900 rounded-2xl shadow-xl overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-center"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-700 text-emerald-100 font-semibold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Stay Connected
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-3xl lg:text-4xl font-extrabold text-white mb-4 relative pb-4"
              >
                Join Our Organic Farming Community
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full"></span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-md text-emerald-100 mb-8 max-w-xl mx-auto leading-relaxed"
              >
                Get the latest insights, tips, and news on organic farming directly
                to your inbox.
              </motion.p>

              <motion.form
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                action={handleNewsletterSubmit}
                aria-live="polite"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full bg-white/15 border border-emerald-500/50 text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all shadow-md text-base"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-full hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center text-base"
                >
                  {status === "submitting" ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </motion.form>

              {message && (
                <motion.p
                  variants={itemVariants}
                  className={`mt-6 text-sm font-medium text-center p-3 rounded-lg max-w-md mx-auto ${
                    status === "success"
                      ? "bg-emerald-700/30 text-emerald-200"
                      : "bg-red-700/30 text-red-200"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message}
                </motion.p>
              )}

              <motion.p
                variants={itemVariants}
                className="mt-6 text-sm text-emerald-200"
              >
                We respect your privacy.{" "}
                <Link
                  href="/unsubscribe"
                  className="underline hover:text-emerald-100 font-medium"
                >
                  Unsubscribe at any time.
                </Link>
              </motion.p>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}