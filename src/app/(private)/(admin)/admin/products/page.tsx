'use server';

import { getProducts, ActionResponse } from '@/actions/products';
import { getCategories } from '@/actions/category';
import ProductsClient from '@/components/dashboard/products/ProductsClient';
import { IProduct } from '@/models/Product';
import { getSession } from '@/lib/getSession';


export default async function ProductsPage() {
  const session = await getSession();
  const user = session?.user;
  const initialPage = 1;
  const limit = 10;
  const response: ActionResponse<IProduct> = await getProducts(initialPage, limit);
  const products = response.success && response.products ? response.products : [];
  const total = response.message?.match(/(\d+) total/)?.[1] ? parseInt(response.message.match(/(\d+) total/)![1]) : 0;

  const categories = await getCategories();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Management</h1>
      <ProductsClient user_id={user?.id} initialProducts={products} initialTotal={total} initialCategories={categories.filter((c): c is NonNullable<typeof c> => c !== undefined)} limit={limit} />
    </div>
  );
}