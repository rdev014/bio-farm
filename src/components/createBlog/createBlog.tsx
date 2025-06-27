"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { createBlog } from "@/actions/blog";
import { getCategories } from "@/actions/category";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  ImagePlus, 
  Plus, 
  X, 
  Loader2, 
  Save,
  Eye,
  FileText,
  User,
  Clock,
  Tags,
  Search
} from "lucide-react";
import { Category } from "@/components/FetchCategory/FetchCategory";

interface BlogProps {
  categories?: Category[];
  user_id?: string;
}


const blogSchema = z.object({
  title: z.string()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title cannot exceed 150 characters"),
  content: z.string()
    .min(100, "Content must be at least 100 characters")
    .transform(str => str.trim()),
  excerpt: z.string()
    .min(50, "Excerpt must be at least 50 characters")
    .max(300, "Excerpt cannot exceed 300 characters"),
  featuredImage: z.string()
    .url("Please enter a valid URL"),
  readTime: z.number()
    .min(1, "Reading time must be at least 1 minute"),
  metaTitle: z.string()
    .max(60, "Meta title cannot exceed 60 characters")
    .optional()
    .or(z.literal("")),
  metaDescription: z.string()
    .max(160, "Meta description cannot exceed 160 characters")
    .optional()
    .or(z.literal("")),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function CreateBlog({categories = [],user_id}: BlogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  setAvailableCategories(categories)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [saveAction, setSaveAction] = useState<"draft" | "publish">("draft");
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      featuredImage: "",
      readTime: 1,
      metaTitle: "",
      metaDescription: "",
    },
    mode: "onChange"
  });

  const watchedTitle = watch("title");
  const watchedContent = watch("content");

  // Auto-generate meta title from title
  useEffect(() => {
    if (watchedTitle && !watch("metaTitle")) {
      setValue("metaTitle", watchedTitle.slice(0, 60));
    }
  }, [watchedTitle, setValue, watch]);

  // Auto-calculate read time based on content
  useEffect(() => {
    if (watchedContent) {
      const wordsPerMinute = 200;
      const wordCount = watchedContent.split(/\s+/).length;
      const estimatedReadTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
      setValue("readTime", estimatedReadTime);
    }
  }, [watchedContent, setValue]);

// useEffect(() => {
//   async function fetchCategories() {
//     try {
//       setIsLoadingCategories(true);
//       const categories = await getCategories();
//       if (Array.isArray(categories)) {
//         // Filter out undefined or invalid entries
//         setAvailableCategories(categories.filter((category): category is Category => !!category));
//       } else {
//         throw new Error("Invalid categories data");
//       }
//     } catch (error) {
//       toast.error(`Failed to load categories: ${error instanceof Error ? error.message : "Unknown error"}`);
//       setAvailableCategories([]);
//     } finally {
//       setIsLoadingCategories(false);
//     }
//   }
//   fetchCategories();
// }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const addTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 10) {
      setTags((prev) => [...prev, trimmedTag]);
      setNewTag("");
    } else if (tags.length >= 10) {
      toast.warning("Maximum 10 tags allowed");
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const addKeyword = () => {
    const trimmedKeyword = newKeyword.trim();
    if (trimmedKeyword && !keywords.includes(trimmedKeyword) && keywords.length < 15) {
      setKeywords((prev) => [...prev, trimmedKeyword]);
      setNewKeyword("");
    } else if (keywords.length >= 15) {
      toast.warning("Maximum 15 keywords allowed");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const onSubmit = async (data: BlogFormData) => {
    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        
        // Add all form data
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            formData.append(key, value.toString());
          }
        });
        
        formData.append("categories", JSON.stringify(selectedCategories));
        formData.append("tags", JSON.stringify(tags));
        formData.append("keywords", JSON.stringify(keywords));
        formData.append("status", saveAction);

        const result = await createBlog(formData, user_id ?? "");
        
        if (result?.success) {
          toast.success(
            saveAction === "draft" 
              ? "Blog saved as draft successfully!" 
              : "Blog published successfully!"
          );
          router.push("/blogs");
          router.refresh();
        } else {
          toast.error(result?.error || "Failed to create blog");
        }
      } catch (err) {
        toast.error("An error occurred while creating the blog");
        console.error("Client-side error:", err);
      }
    });
  };

  const handleSaveAsDraft = () => {
    setSaveAction("draft");
  };

  const handlePublish = () => {
    setSaveAction("publish");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/blogs")}
              className="hover:bg-white/60"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>
              <p className="text-sm text-gray-600 mt-1">Share your thoughts with the world</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-white/60">
              {isValid ? "✓ Valid" : "⚠ Issues"}
            </Badge>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">Basic Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium">
                      Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      {...register("title")}
                      placeholder="Enter an engaging blog title..."
                      className="mt-1.5 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="excerpt" className="text-sm font-medium">
                      Excerpt <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="excerpt"
                      {...register("excerpt")}
                      placeholder="Write a compelling excerpt that summarizes your post..."
                      className="mt-1.5 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      rows={3}
                    />
                    {errors.excerpt && (
                      <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="content" className="text-sm font-medium">
                      Content <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="content"
                      {...register("content")}
                      placeholder="Write your blog content here..."
                      className="mt-1.5 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[300px]"
                    />
                    {errors.content && (
                      <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Media & Author */}
              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-lg">Media & Author</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="featuredImage" className="text-sm font-medium">
                      Featured Image <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-1.5 flex rounded-lg border border-gray-200 bg-white overflow-hidden">
                      <Input
                        id="featuredImage"
                        {...register("featuredImage")}
                        placeholder="Enter featured image URL..."
                        className="flex-1 border-0 focus:ring-0"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="px-3"
                        onClick={() => toast.info("Image upload functionality coming soon")}
                      >
                        <ImagePlus className="w-4 h-4" />
                      </Button>
                    </div>
                    {errors.featuredImage && (
                      <p className="text-red-500 text-sm mt-1">{errors.featuredImage.message}</p>
                    )}
                  </div>

                </CardContent>
              </Card>

              {/* SEO Settings */}
              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <Search className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-lg">SEO Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle" className="text-sm font-medium">
                      Meta Title
                    </Label>
                    <Input
                      id="metaTitle"
                      {...register("metaTitle")}
                      placeholder="SEO optimized title..."
                      className="mt-1.5 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {watch("metaTitle")?.length || 0}/60 characters
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="metaDescription" className="text-sm font-medium">
                      Meta Description
                    </Label>
                    <Textarea
                      id="metaDescription"
                      {...register("metaDescription")}
                      placeholder="SEO meta description..."
                      className="mt-1.5 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {watch("metaDescription")?.length || 0}/160 characters
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">SEO Keywords</Label>
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="bg-purple-100 text-purple-800">
                            {keyword}
                            <button
                              type="button"
                              onClick={() => removeKeyword(keyword)}
                              className="ml-1.5 hover:text-purple-900"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newKeyword}
                          onChange={(e) => setNewKeyword(e.target.value)}
                          placeholder="Add SEO keyword..."
                          className="flex-1 bg-white border-gray-200"
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addKeyword}
                          disabled={keywords.length >= 15}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {keywords.length}/15 keywords
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Categories & Tags */}
              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <Tags className="w-5 h-5 text-orange-600" />
                    <CardTitle className="text-lg">Categories & Tags</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Categories <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-2">
                      {isLoadingCategories ? (
                        <div className="flex items-center space-x-2 py-4">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <p className="text-gray-500 text-sm">Loading categories...</p>
                        </div>
                      ) : availableCategories.length === 0 ? (
                        <p className="text-gray-500 text-sm py-4">No categories available</p>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {availableCategories.map((category) => (
                            <label
                              key={category._id}
                              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(category._id)}
                                onChange={() => handleCategoryChange(category._id)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">{category.name}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-sm font-medium">Tags</Label>
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1.5 hover:text-blue-900"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add tag..."
                          className="flex-1 bg-white border-gray-200"
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addTag}
                          disabled={tags.length >= 10}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {tags.length}/10 tags
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reading Time */}
              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <CardTitle className="text-lg">Reading Time</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="readTime" className="text-sm font-medium">
                      Estimated Reading Time (minutes)
                    </Label>
                    <Input
                      id="readTime"
                      type="number"
                      {...register("readTime", { valueAsNumber: true })}
                      className="mt-1.5 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      min={1}
                    />
                    {errors.readTime && (
                      <p className="text-red-500 text-sm mt-1">{errors.readTime.message}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Auto-calculated based on content length
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button
                      type="submit"
                      onClick={handleSaveAsDraft}
                      variant="outline"
                      className="w-full justify-center"
                      disabled={isPending}
                    >
                      {isPending && saveAction === "draft" ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving Draft...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save as Draft
                        </>
                      )}
                    </Button>
                    
                    <Button
                      type="submit"
                      onClick={handlePublish}
                      className="w-full justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      disabled={isPending || !isValid || selectedCategories.length === 0}
                    >
                      {isPending && saveAction === "publish" ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Publish Blog
                        </>
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full justify-center"
                      onClick={() => router.push("/blogs")}
                      disabled={isPending}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}