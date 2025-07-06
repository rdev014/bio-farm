import Product from '@/models/Product';
import connectDb from './db';
import { Product as ProductType } from '@/components/products/ProductCard';

interface GetProductsOptions {
  category?: string;
  organic?: boolean;
  seasonal?: boolean;
  featured?: boolean;
  sort?: 'price-asc' | 'price-desc' | 'rating' | 'createdAt';
  limit?: number;
  page?: number;
}

type QueryType = Partial<Pick<ProductType, 'organic' | 'seasonal'>> & {
  category?: string;
  featured?: boolean;
};

type ProductDocument = {
  _id: string;
  slug: string;
  images: string[];
  name: string;
  organic?: boolean;
  seasonal?: boolean;
  comparePrice?: number;
  price: number;
  description: string;
  farm: {
    name: string;
  };
  rating: number;
  reviews: number;
};

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

  const query: QueryType = {};
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
    const [rawProducts, total] = await Promise.all([
      Product.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .lean<ProductDocument[]>(),
      Product.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);
    const currentPage = total > 0 && rawProducts.length === 0
      ? Math.max(1, totalPages)
      : page;

    const finalRawProducts =
      rawProducts.length === 0 && total > 0
        ? await Product.find(query)
            .sort(sortQuery)
            .skip((currentPage - 1) * limit)
            .limit(limit)
            .lean<ProductDocument[]>()
        : rawProducts;

    const products: ProductType[] = finalRawProducts.map((product) => ({
      slug: product.slug,
      images: product.images,
      name: product.name,
      organic: product.organic,
      seasonal: product.seasonal,
      comparePrice: product.comparePrice,
      price: product.price,
      description: product.description,
      farm: product.farm,
      rating: product.rating,
      reviews: product.reviews
    }));

    return {
      products,
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
