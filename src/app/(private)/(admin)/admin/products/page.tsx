'use server';

import { getProducts } from '@/actions/products';
import { getCategories } from '@/actions/category';
import ProductsClient from '@/components/dashboard/products/ProductsClient';
import { getSession } from '@/lib/getSession';
import { Category } from '@/components/FetchCategory/FetchCategory';

export default async function ProductsPage() {
  const session = await getSession();
  const user = session?.user;
  const initialPage = 1;
  const limit = 10;

  const [rawCategoriesData, response] = await Promise.all([
    getCategories(),
    getProducts(initialPage, limit),
  ]);

  const categories: Category[] = rawCategoriesData.filter(
    (c): c is Category => c !== undefined && typeof c._id === 'string'
  );

  const products = response.success && Array.isArray(response.products) ? response.products : [];
  const total = response.message?.match(/(\d+) total/)?.[1]
    ? parseInt(response.message.match(/(\d+) total/)![1])
    : 0;

  return (
    <ProductsClient
      user_id={user?.id}
      initialProducts={products}
      initialTotal={total}
      initialCategories={categories}
      limit={limit}
    />
  );
}