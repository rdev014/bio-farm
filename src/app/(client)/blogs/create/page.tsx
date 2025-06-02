"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ImagePlus, Plus, X } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { createBlog } from "@/actions/blog";
import { getCategories } from "@/actions/category";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(150, "Title cannot exceed 150 characters"),
  content: z.string().min(100, "Content must be at least 100 characters"),
  excerpt: z.string().min(50, "Excerpt must be at least 50 characters").max(300, "Excerpt cannot exceed 300 characters"),
  authorName: z.string().min(2, "Author name is required"),
  authorImage: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  featuredImage: z.string().url("Please enter a valid URL"),
  readTime: z.number().min(1, "Reading time must be at least 1 minute"),
  metaTitle: z.string().max(60, "Meta title cannot exceed 60 characters").optional().or(z.literal("")),
  metaDescription: z.string().max(160, "Meta description cannot exceed 160 characters").optional().or(z.literal("")),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function CreateBlogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      authorName: "",
      authorImage: "",
      featuredImage: "",
      readTime: 1,
      metaTitle: "",
      metaDescription: "",
    },
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoadingCategories(true);
        const categories = await getCategories();
        if (Array.isArray(categories)) {
          setAvailableCategories(categories);
        } else {
          throw new Error("Invalid categories data");
        }
      } catch (error) {
        toast.error(`Failed to load categories: ${error instanceof Error ? error.message : "Unknown error"}`);
        setAvailableCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const addTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags((prev) => [...prev, trimmedTag]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const addKeyword = () => {
    const trimmedKeyword = newKeyword.trim();
    if (trimmedKeyword && !keywords.includes(trimmedKeyword)) {
      setKeywords((prev) => [...prev, trimmedKeyword]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value.toString());
        }
      });
      formData.append("categories", JSON.stringify(selectedCategories));
      formData.append("tags", JSON.stringify(tags));
      formData.append("keywords", JSON.stringify(keywords));
      formData.append("status", "draft");

      const result = await createBlog(formData);
      if (result.success) {
        toast.success("Blog created successfully!");
        router.push("/blogs");
      } else {
        toast.error(result.error || "Failed to create blog");
      }
    } catch (err) {
      toast.error("An error occurred while creating the blog");
      console.error("Client-side error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => router.push("/blogs")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          aria-label="Back to blogs"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Blogs
        </button>

        <Card className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Blog Post</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Enter blog title"
                  className="mt-1"
                  aria-invalid={errors.title ? "true" : "false"}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  {...register("content")}
                  placeholder="Enter blog content"
                  className="mt-1 min-h-[200px]"
                  aria-invalid={errors.content ? "true" : "false"}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  {...register("excerpt")}
                  placeholder="Enter a short excerpt"
                  className="mt-1"
                  rows={4}
                  aria-invalid={errors.excerpt ? "true" : "false"}
                />
                {errors.excerpt && (
                  <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="authorName">Author Name</Label>
                  <Input
                    id="authorName"
                    {...register("authorName")}
                    placeholder="Enter author name"
                    className="mt-1"
                    aria-invalid={errors.authorName ? "true" : "false"}
                  />
                  {errors.authorName && (
                    <p className="text-red-500 text-sm mt-1">{errors.authorName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="authorImage">Author Image URL</Label>
                  <Input
                    id="authorImage"
                    {...register("authorImage")}
                    placeholder="Enter author image URL"
                    className="mt-1"
                    aria-invalid={errors.authorImage ? "true" : "false"}
                  />
                  {errors.authorImage && (
                    <p className="text-red-500 text-sm mt-1">{errors.authorImage.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="featuredImage">Featured Image URL</Label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <Input
                    id="featuredImage"
                    {...register("featuredImage")}
                    placeholder="Enter featured image URL"
                    className="flex-1"
                    aria-invalid={errors.featuredImage ? "true" : "false"}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="ml-2"
                    onClick={() => {
                      toast.info("Image upload functionality to be implemented");
                    }}
                    aria-label="Upload featured image"
                  >
                    <ImagePlus className="w-4 h-4" />
                  </Button>
                </div>
                {errors.featuredImage && (
                  <p className="text-red-500 text-sm mt-1">{errors.featuredImage.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Categories</Label>
                  <div className="mt-2 space-y-2">
                    {isLoadingCategories ? (
                      <p className="text-gray-500 text-sm">Loading categories...</p>
                    ) : availableCategories.length === 0 ? (
                      <p className="text-gray-500 text-sm">No categories available</p>
                    ) : (
                      availableCategories.map((category) => (
                        <label key={category._id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category._id)}
                            onChange={() => handleCategoryChange(category._id)}
                            className="rounded border-gray-300 focus:ring-blue-500"
                            aria-checked={selectedCategories.includes(category._id)}
                          />
                          <span>{category.name}</span>
                        </label>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 inline-flex items-center justify-center"
                          aria-label={`Remove tag ${tag}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex">
                    <Input
                      value={newTag}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      className="flex-1"
                      onKeyPress={(e: React.KeyboardEvent) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      aria-label="Add new tag"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="ml-2"
                      onClick={addTag}
                      aria-label="Add tag"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="readTime">Reading Time (minutes)</Label>
                <Input
                  id="readTime"
                  type="number"
                  {...register("readTime", { valueAsNumber: true })}
                  className="mt-1"
                  min={1}
                  aria-invalid={errors.readTime ? "true" : "false"}
                />
                {errors.readTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.readTime.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">SEO Settings</h3>
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    {...register("metaTitle")}
                    placeholder="Enter meta title"
                    className="mt-1"
                    aria-invalid={errors.metaTitle ? "true" : "false"}
                  />
                  {errors.metaTitle && (
                    <p className="text-red-500 text-sm mt-1">{errors.metaTitle.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    {...register("metaDescription")}
                    placeholder="Enter meta description"
                    className="mt-1"
                    rows={3}
                    aria-invalid={errors.metaDescription ? "true" : "false"}
                  />
                  {errors.metaDescription && (
                    <p className="text-red-500 text-sm mt-1">{errors.metaDescription.message}</p>
                  )}
                </div>

                <div>
                  <Label>Keywords</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword)}
                          className="ml-1 inline-flex items-center justify-center"
                          aria-label={`Remove keyword ${keyword}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex">
                    <Input
                      value={newKeyword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewKeyword(e.target.value)}
                      placeholder="Add a keyword"
                      className="flex-1"
                      onKeyPress={(e: React.KeyboardEvent) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                      aria-label="Add new keyword"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="ml-2"
                      onClick={addKeyword}
                      aria-label="Add keyword"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/blogs")}
                aria-label="Cancel and return to blogs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                aria-label={isSubmitting ? "Creating blog..." : "Create blog"}
              >
                {isSubmitting ? "Creating..." : "Create Blog"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}