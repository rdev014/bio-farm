import { showBlog } from '@/actions/blog'
import BlogPost from '@/components/blogs/BlogPost'
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await showBlog({ slug: slug })
  if (!post) notFound();
  return <BlogPost post={{
    ...post,
    publishedAt: post.publishedAt ?? null,
    updatedAt: post.updatedAt ?? null,
    author: { name: post.author.name ?? null, image: post.author.image ?? null },
    categories: Array.isArray(post.categories) ? post.categories.map((cat) => cat.name) : [],
    seo: {
      metaTitle: post.seo?.metaTitle ?? null,
      metaDescription: post.seo?.metaDescription ?? null,
      keywords: post.seo?.keywords ?? []
    }
  }} />
}