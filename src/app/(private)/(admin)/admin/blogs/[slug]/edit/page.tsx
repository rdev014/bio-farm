import { showBlog } from '@/actions/blog';
import { getCategories } from '@/actions/category';
import EditBlog from '@/components/createBlog/editBlog';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
  title: "Admin Panel | Edit Blog Post | Arkin Organics",
  description: "Update content for the Arkin Organics blog. Create and edit articles on organic fertilizers, sustainability, and eco-friendly farming.",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await showBlog({ slug });

  if (!post) {
    notFound();
  }

  const categories = await getCategories();

  return (
    <EditBlog
      categories={categories.filter((c): c is NonNullable<typeof c> => c !== undefined)}
      post={{
        _id: post._id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: post.featuredImage,
        readTime: post.readTime,
        tags: post.tags,
        categories: Array.isArray(post.categories) ? post.categories.map(cat => cat._id) : [],
        author: {
          name: post.author.name ?? null,
          image: post.author.image ?? null,
        },
        seo: {
          metaTitle: post.seo?.metaTitle ?? null,
          metaDescription: post.seo?.metaDescription ?? null,
          keywords: post.seo?.keywords ?? [],
        },
      }}
    />
  );
}