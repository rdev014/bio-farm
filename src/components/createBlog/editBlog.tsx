"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { updateBlog } from "@/actions/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ImagePlus,
  Plus,
  X,
  Loader2,
  Save,
  Eye,
  FileText,
  Clock,
  Tags,
  Search,
  ImageIcon,
} from "lucide-react";

interface Category {
  _id: string;
  name: string;
}

interface BlogProps {
  categories: Category[];
  post: {
    _id: string;
    title: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    readTime: number;
    tags: string[];
    categories: string[];
    author: { name: string | null; image: string | null };
    seo: {
      metaTitle: string | null;
      metaDescription: string | null;
      keywords: string[];
    };
  };
}

const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(150, "Title cannot exceed 150 characters"),
  content: z.string().min(100, "Content must be at least 100 characters").transform(str => str.trim()),
  excerpt: z.string().min(50, "Excerpt must be at least 50 characters").max(300, "Excerpt cannot exceed 300 characters"),
  featuredImage: z.string().url("Please enter a valid URL"),
  readTime: z.number().min(1, "Reading time must be at least 1 minute"),
  metaTitle: z.string().max(60, "Meta title cannot exceed 60 characters").optional().or(z.literal("")),
  metaDescription: z.string().max(160, "Meta description cannot exceed 160 characters").optional().or(z.literal("")),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function EditBlog({ categories, post }: BlogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(post.categories);
  const [tags, setTags] = useState<string[]>(post.tags);
  const [newTag, setNewTag] = useState("");
  const [keywords, setKeywords] = useState<string[]>(post.seo.keywords);
  const [newKeyword, setNewKeyword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      featuredImage: post.featuredImage,
      readTime: post.readTime,
      metaTitle: post.seo.metaTitle || "",
      metaDescription: post.seo.metaDescription || "",
    },
    mode: "onChange",
  });

  const watchedTitle = watch("title");

  // Auto-generate meta title
  useEffect(() => {
    if (watchedTitle && !watch("metaTitle")) {
      setValue("metaTitle", watchedTitle.slice(0, 60));
    }
  }, [watchedTitle, setValue, watch]);


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
      setTags([...tags, trimmedTag]);
      setNewTag("");
    } else if (tags.length >= 10) {
      toast.warning("Maximum 10 tags allowed");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const addKeyword = () => {
    const trimmedKeyword = newKeyword.trim();
    if (trimmedKeyword && !keywords.includes(trimmedKeyword) && keywords.length < 15) {
      setKeywords([...keywords, trimmedKeyword]);
      setNewKeyword("");
    } else if (keywords.length >= 15) {
      toast.warning("Maximum 15 keywords allowed");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const onSubmit = async (data: BlogFormData, status: "draft" | "publish") => {
    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }

    startTransition(async () => {
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
        formData.append("status", status);
        formData.append("author", post.author.name || "");

        const result = await updateBlog(formData, post._id);

        if (result.success) {
          toast.success(status === "draft" ? "Blog saved as draft!" : "Blog published!");
          router.push("/admin/blogs");
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update blog");
        }
      } catch (err) {
        toast.error("An error occurred while updating the blog");
        console.error("Client-side error:", err);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Edit Blog Post</h1>
              <p className="text-sm text-gray-600 mt-1">Update your blog content</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-white/60">
            {isValid ? "✓ Valid" : "⚠ Issues"}
          </Badge>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">Basic Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">
                      Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      {...register("title")}
                      placeholder="Enter blog title..."
                      className="mt-1.5"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="excerpt">
                      Excerpt <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="excerpt"
                      {...register("excerpt")}
                      placeholder="Write a compelling excerpt..."
                      className="mt-1.5"
                      rows={3}
                    />
                    {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="content">
                      Content <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="content"
                      {...register("content")}
                      placeholder="Write your blog content..."
                      className="mt-1.5 min-h-[300px]"
                    />
                    {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-lg">Media</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="featuredImage">
                    Featured Image <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-1.5 flex rounded-lg border border-gray-200 bg-white overflow-hidden">
                    <Input
                      id="featuredImage"
                      {...register("featuredImage")}
                      placeholder="Enter image URL..."
                      className="flex-1 border-0 focus:ring-0"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="px-3"
                      onClick={() => toast.info("Image upload coming soon")}
                    >
                      <ImagePlus className="w-4 h-4" />
                    </Button>
                  </div>
                  {errors.featuredImage && <p className="text-red-500 text-sm mt-1">{errors.featuredImage.message}</p>}
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Search className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-lg">SEO Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      {...register("metaTitle")}
                      placeholder="SEO optimized title..."
                      className="mt-1.5"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {watch("metaTitle")?.length || 0}/60 characters
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      {...register("metaDescription")}
                      placeholder="SEO meta description..."
                      className="mt-1.5"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {watch("metaDescription")?.length || 0}/160 characters
                    </p>
                  </div>
                  <div>
                    <Label>SEO Keywords</Label>
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="bg-purple-100 text-purple-800">
                            {keyword}
                            <button
                              type="button"
                              onClick={() => removeKeyword(keyword)}
                              className="ml-1.5"
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
                      <p className="text-xs text-gray-500 mt-1">{keywords.length}/15 keywords</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Tags className="w-5 h-5 text-orange-600" />
                    <CardTitle className="text-lg">Categories & Tags</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>
                      Categories <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-2 max-h-48 overflow-y-auto">
                      {categories.map((category) => (
                        <label
                          key={category._id}
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category._id)}
                            onChange={() => handleCategoryChange(category._id)}
                            className="rounded border-gray-300 text-blue-600"
                          />
                          <span className="text-sm text-gray-700">{category.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label>Tags</Label>
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="bg-blue-50 text-blue-700">
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1.5"
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
                      <p className="text-xs text-gray-500 mt-1">{tags.length}/10 tags</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <CardTitle className="text-lg">Reading Time</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="readTime">Estimated Reading Time (minutes)</Label>
                  <Input
                    id="readTime"
                    type="number"
                    {...register("readTime", { valueAsNumber: true })}
                    className="mt-1.5"
                    min={1}
                  />
                  {errors.readTime && <p className="text-red-500 text-sm mt-1">{errors.readTime.message}</p>}
                  <p className="text-xs text-gray-500 mt-1">Auto-calculated based on content</p>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="pt-6 space-y-3">
                  <Button
                    type="button"
                    onClick={handleSubmit((data) => onSubmit(data, "draft"))}
                    variant="outline"
                    className="w-full justify-center"
                    disabled={isPending}
                  >
                    {isPending ? (
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
                    type="button"
                    onClick={handleSubmit((data) => onSubmit(data, "publish"))}
                    className="w-full justify-center bg-gradient-to-r from-blue-600 to-indigo-600"
                    disabled={isPending || !isValid || selectedCategories.length === 0}
                  >
                    {isPending ? (
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
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}