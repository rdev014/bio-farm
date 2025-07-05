"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteBlog, getBlogs } from "@/actions/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Loader2, Plus, Calendar, Clock, BookOpen } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  readTime: number;
  publishedAt: string | null;
  status: "draft" | "publish";
  categories: { _id: string; name: string }[];
  tags: string[];
  author: { _id: string; name: string | null };
}

export default function HomePage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isPending, startTransition] = useTransition();
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await getBlogs();
        setBlogs(fetchedBlogs);
      } catch (error) {
        toast.error("Failed to load blogs");
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async () => {
    if (!deleteBlogId) return;

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("id", deleteBlogId);
        const result = await deleteBlog(formData);

        if (result.success) {
          setBlogs(blogs.filter((blog) => blog._id !== deleteBlogId));
          toast.success("Blog deleted successfully");
        } else {
          toast.error(result.error || "Failed to delete blog");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the blog");
        console.error("Delete error:", error);
      } finally {
        setDeleteBlogId(null);
      }
    });
  };

  const publishedBlogs = blogs.filter(blog => blog.status === "publish").length;
  const draftBlogs = blogs.filter(blog => blog.status === "draft").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50">
      {/* Header Section */}
      <header className=" border-b border-gray-200 sticky top-0 z-10 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-emerald-600" />
                <h1 className="text-xl font-bold text-gray-900">Arkin Blog Manager</h1>
              </div>
            </div>
            <Link
              href="/admin/blogs/create"
              className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Blog
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-emerald-600">{publishedBlogs}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-full">
                  <Calendar className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-amber-600">{draftBlogs}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-full">
                  <Pencil className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Posts</h2>
          <p className="text-gray-600">Manage and organize your agricultural content library</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <p className="text-gray-500">Loading your blog posts...</p>
          </div>
        ) : blogs.length === 0 ? (
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-500 mb-6">Start creating content to engage your audience</p>
              <Link
                href="/admin/blogs/create"
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Blog
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Card
                key={blog._id}
                className="group bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={blog.featuredImage}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge 
                        variant={blog.status === "publish" ? "default" : "secondary"}
                        className={`${
                          blog.status === "publish" 
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                            : "bg-amber-100 text-amber-700 border-amber-200"
                        } font-medium`}
                      >
                        {blog.status === "publish" ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <CardTitle className="text-lg font-semibold line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors">
                      <Link href={`/admin/blogs/${blog.slug}/edit`}>
                        {blog.title}
                      </Link>
                    </CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Categories */}
                  {blog.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.categories.slice(0, 2).map((category) => (
                        <Badge 
                          key={category.name} 
                          variant="outline" 
                          className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
                        >
                          {category.name}
                        </Badge>
                      ))}
                      {blog.categories.length > 2 && (
                        <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 text-xs">
                          +{blog.categories.length - 2} more
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="bg-gray-50 text-gray-600 border-gray-200 text-xs px-2 py-1"
                        >
                          #{tag}
                        </Badge>
                      ))}
                      {blog.tags.length > 3 && (
                        <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 text-xs">
                          +{blog.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{blog.readTime} min</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>
                          {blog.publishedAt
                            ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })
                            : "Unpublished"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/blogs/${blog.slug}/edit`)}
                      className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteBlogId(blog._id)}
                      disabled={isPending}
                      className="hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteBlogId} onOpenChange={() => setDeleteBlogId(null)}>
          <AlertDialogContent className="sm:max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-semibold">Delete Blog Post</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Are you sure you want to delete this blog post? This action cannot be undone and will permanently remove the content.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="hover:bg-gray-50">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete} 
                disabled={isPending}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Post
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}