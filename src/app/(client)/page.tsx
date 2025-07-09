import { getHomeBlogs } from "@/actions/blog";
import { getHomeProducts} from "@/actions/products";
import { Category } from "@/components/FetchCategory/FetchCategory";
import Home from "@/components/home/Home";
import { Metadata } from "next";

// Define or import the BlogPost and Category types correctly
interface SEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: { name: string; image: string };
  featuredImage: string;
  categories: Category[];
  tags: string[];
  readTime: number;
  publishedAt: string;
  updatedAt: string;
  status: string;
  seo: SEO;
}
interface Product {
  title: string;
  productId: string; // Added productId for unique identification
  description: string;
  image: string;
  price: string;
  badge: string;
  badgeColor: string;
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Arkin Organics | Natural Fertilizers for Sustainable Farming",
  description:
    "Arkin Organics delivers high-quality, eco-friendly fertilizers that enrich soil and support sustainable agriculture. Join us in cultivating a greener future with nature-powered solutions.",
};

export default async function Page() {
  const blogs = await getHomeBlogs();
  // Fetch public products for homepage (first 6 for showcase)
  const { products } = await getHomeProducts();

  const formattedBlogs: BlogPost[] = blogs.map((blog) => ({
    ...blog,
    publishedAt: blog.publishedAt || "",
    updatedAt: blog.updatedAt || "",
    categories: blog.categories.map((cat: Category) => ({
      _id: cat._id || "",
      name: cat.name || "",
      slug: cat.slug || "",
    })),
  }));

  // Map product fields for Home component
  const formattedProducts: Product[] = (products ?? []).map((product) => ({
    title: product.name || "",
    productId: product.productId || "",
    description: product.description || "",
    image:
      product.images && product.images.length > 0
        ? product.images[0]
        : "/organic.png",
    price: product.price ? `$${product.price.toFixed(2)}` : "",
    badge:
      product.stock > 0
        ? product.discount && product.discount > 0
          ? `${product.discount}% OFF`
          : "In Stock"
        : "Out of Stock",
    badgeColor:
      product.stock > 0
        ? product.discount && product.discount > 0
          ? "bg-red-500"
          : "bg-green-500"
        : "bg-gray-400",
  }));

  return <Home blogs={formattedBlogs} products={formattedProducts} />;
}
