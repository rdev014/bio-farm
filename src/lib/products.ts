import Product, { IProduct } from '@/models/ProductSchema';
import connectDb from './db';

export async function getProducts(options: {
  category?: string;
  organic?: boolean;
  seasonal?: boolean;
  featured?: boolean;
  sort?: string;
  limit?: number;
  page?: number;
}) {
  await connectDb();
  const { category, organic, seasonal, featured, sort = 'createdAt', limit = 8, page = 1 } = options;
  
  const query: any = {};
  if (category) query.category = category;
  if (organic !== undefined) query.organic = organic;
  if (seasonal !== undefined) query.seasonal = seasonal;
  if (featured !== undefined) query.featured = featured;

  const sortQuery: any = {};
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
  }  const skip = (page - 1) * limit;
  
  try {
    // Execute the query and get total count
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .lean() as unknown as Promise<IProduct[]>,
      Product.countDocuments(query)
    ]);

    console.log(`Retrieved ${products.length} products out of ${total} total`);

    // If we have no products but there should be some, we might be on an invalid page
    if (products.length === 0 && total > 0) {
      // Recalculate the last valid page
      const lastValidPage = Math.max(1, Math.ceil(total / limit));
      const newSkip = (lastValidPage - 1) * limit;
      
      // Fetch products from the last valid page
      const fallbackProducts = await Product.find(query)
        .sort(sortQuery)
        .skip(newSkip)
        .limit(limit)
        .lean() as unknown as IProduct[];

      return {
        products: fallbackProducts,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          current: lastValidPage
        }
      };
    }

    return {
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
