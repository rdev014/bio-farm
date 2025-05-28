"use server";

import { connectDb } from "@/lib/db";
import { Blog } from "@/models/blogSchema";
import { revalidatePath } from "next/cache";

const create = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const featuredImage = formData.get("featuredImage") as string;
  const categories = formData.get("categories") as string;
  const tags = formData.get("tags") as string;

  if (
    !title ||
    !content ||
    !excerpt ||
    !featuredImage ||
    !categories ||
    !tags
  ) {
    throw new Error("All fields Are Required");
  }
  await connectDb();
  const existingBlogs = await Blog.findOne({ title });
  if (existingBlogs) {
    throw new Error("Blog is Already Exist");
  }
  const blogData = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    excerpt:formData.get("excerpt") as string,
    featuredImage : formData.get("featuredImage") as string,
    categories : formData.get("categories") as string,
    tags : formData.get("tags") as string,
  };
  const savedBlog = await Blog.create(blogData);
  revalidatePath('/');
  return {
    success:true,
    slug:savedBlog.slug,
  }
};
export default create;