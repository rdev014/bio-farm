import Product from '@/models/ProductSchema';
import connectDb from './db';
import { Document } from 'mongoose';

interface ProductType extends Document {
  category?: string;
  organic?: boolean;
  seasonal?: boolean;
  featured?: boolean;
  price?: number;
  rating?: number;
  createdAt?: Date;
}

interface GetProductsOptions {
  category?: string;
  organic?: boolean;
  seasonal?: boolean;
  featured?: boolean;
  sort?: 'price-asc' | 'price-desc' | 'rating' | string;
  limit?: number;
  page?: number;
}

export async function getProducts(options: GetProductsOptions) {
  await connectDb();

  const {
    category,
    organic,
    seasonal,
    featured,
    sort = 'createdAt',
    limit = 8,
    page = 1
  } = options;

  const query: Partial<Pick<ProductType, 'category' | 'organic' | 'seasonal' | 'featured'>> = {};
  if (category) query.category = category;
  if (organic !== undefined) query.organic = organic;
  if (seasonal !== undefined) query.seasonal = seasonal;
  if (featured !== undefined) query.featured = featured;

  const sortQuery: Record<string, 1 | -1> = {};
  switch (sort) {
    case 'price-asc':
      sortQuery.price = 1;
      break;
    case 'price-desc':
      sortQuery.price = -1;
      break;
    case 'rating':
      sortQuery.rating = -1;
      break;
    default:
      sortQuery[sort] = -1;
  }

  const skip = (page - 1) * limit;

  try {
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .lean<ProductType[]>(),
      Product.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);
    const currentPage = total > 0 && products.length === 0
      ? Math.max(1, totalPages)
      : page;

    const finalProducts = products.length === 0 && total > 0
      ? await Product.find(query)
          .sort(sortQuery)
          .skip((currentPage - 1) * limit)
          .limit(limit)
          .lean<ProductType[]>()
      : products;

    return {
      products: finalProducts,
      pagination: {
        total,
        pages: totalPages,
        current: currentPage
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}
