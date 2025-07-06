'use client';

import React, { useState, FormEvent } from 'react';
import { getProducts, deleteProduct, toggleProductStatus } from '@/actions/products';
import ProductForm from '@/components/dashboard/products/ProductForm';
import { IProduct } from '@/models/Product';
import { Category } from '@/components/FetchCategory/FetchCategory';




interface Alert {
  type: 'success' | 'error';
  message: string;
}

interface ProductsClientProps {
  initialProducts: IProduct[];
  initialTotal: number;
  initialCategories: Category[];
  limit: number;
  user_id?: string;
}

const ProductsClient: React.FC<ProductsClientProps> = ({ user_id, initialProducts, initialTotal, initialCategories, limit }) => {
  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
  const [alert, setAlert] = useState<Alert | null>(null);

  const totalPages = Math.ceil(total / limit);

  const fetchProducts = async () => {
    const response = await getProducts(page, limit, search, category, isActive);
    if (response.success && response.products) {
      setProducts(response.products);
      setTotal(response.message?.match(/(\d+) total/)?.[1] ? parseInt(response.message.match(/(\d+) total/)![1]) : 0);
      setAlert({ type: 'success', message: response.message || 'Products fetched successfully' });
    } else {
      setAlert({ type: 'error', message: response.error || 'Failed to fetch products' });
    }
  };

  const handleFilterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    await fetchProducts();
  };

  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    await fetchProducts();
  };

  const handleDelete = async (productId: string) => {
    const response = await deleteProduct(productId);
    if (response.success) {
      setAlert({ type: 'success', message: response.message || 'Product deleted successfully' });
      await fetchProducts();
    } else {
      setAlert({ type: 'error', message: response.error || 'Failed to delete product' });
    }
  };

  const handleToggleStatus = async (productId: string) => {
    const response = await toggleProductStatus(productId);
    if (response.success) {
      setAlert({ type: 'success', message: response.message || 'Product status toggled successfully' });
      await fetchProducts();
    } else {
      setAlert({ type: 'error', message: response.error || 'Failed to toggle product status' });
    }
  };

  return (
    <div>
      {/* Custom Alert */}
      {alert && (
        <div
          className={`p-4 rounded-md mb-4 ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
        >
          {alert.message}
          <button
            onClick={() => setAlert(null)}
            className="ml-4 text-sm font-medium underline"
          >
            Close
          </button>
        </div>
      )}

      {/* Filter Section */}
      <form onSubmit={handleFilterSubmit} className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {initialCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          value={isActive === undefined ? '' : isActive.toString()}
          onChange={(e) => setIsActive(e.target.value === '' ? undefined : e.target.value === 'true')}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Filter
        </button>
      </form>

      {/* Product Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.productId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.productId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.isActive ? 'Active' : 'Inactive'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <ProductForm initialCategories={initialCategories.filter((c): c is NonNullable<typeof c> => c !== undefined)} productId={product.productId} />
                    <button
                      onClick={() => handleDelete(product.productId)}
                      className="text-red-600 hover:text-red-800 ml-4"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleToggleStatus(product.productId)}
                      className="text-blue-600 hover:text-blue-800 ml-4"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <div>
          Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} products
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 border rounded-md ${page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className={`px-4 py-2 border rounded-md ${page >= totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Create Product Form */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Product</h2>
        <ProductForm user_id={user_id} initialCategories={initialCategories.filter((c): c is NonNullable<typeof c> => c !== undefined)} />
      </div>
    </div>
  );
};

export default ProductsClient;