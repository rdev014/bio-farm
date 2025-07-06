'use client';

import React, { useState, FormEvent } from 'react';
import { createProduct, updateProduct, getProductByProductId, ActionResponse } from '@/actions/products';
import { IProduct } from '@/models/Product';
import { Category } from '@/components/FetchCategory/FetchCategory';

interface ProductFormProps {
    productId?: string;
    initialCategories: Category[];
    user_id?: string;
}

interface FormState {
    name: string;
    description: string;
    sku: string;
    category: string;
    brand: string;
    images: string[];
    price: string;
    discount: string;
    stock: string;
    isActive: string;
    tags: string[];
    weight: string;
    unit: IProduct['unit'];
    specifications: string;
    createdBy?: string;
}

interface Alert {
    type: 'success' | 'error';
    message: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ user_id, productId, initialCategories }) => {
    const [form, setForm] = useState<FormState>({
        name: '',
        description: '',
        sku: '',
        category: '',
        brand: '',
        images: [''],
        price: '',
        discount: '',
        stock: '',
        isActive: 'true',
        tags: [''],
        weight: '',
        unit: 'unit',
        specifications: '{}',
        createdBy: user_id,
    });
    const [alert, setAlert] = useState<Alert | null>(null);

    React.useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                const response = await getProductByProductId(productId);
                if (response.success && response.product) {
                    setForm({
                        name: response.product.name,
                        description: response.product.description,
                        sku: response.product.sku,
                        category: response.product.category.toString(),
                        brand: response.product.brand || '',
                        images: response.product.images.length ? response.product.images : [''],
                        price: response.product.price.toString(),
                        discount: response.product.discount?.toString() || '',
                        stock: response.product.stock.toString(),
                        isActive: response.product.isActive.toString(),
                        tags: response.product.tags.length ? response.product.tags : [''],
                        weight: response.product.weight.toString(),
                        unit: response.product.unit,
                        specifications: JSON.stringify(Object.fromEntries(response.product.specifications)),
                        createdBy: user_id,
                    });
                } else {
                    setAlert({ type: 'error', message: response.error || 'Failed to fetch product' });
                }
            };
            fetchProduct();
        }
    }, [productId,user_id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: FormState = {
            ...form,
            images: form.images.filter(img => img),
            tags: form.tags.filter(tag => tag),
        };

        let response: ActionResponse<IProduct>;
        if (productId) {
            response = await updateProduct(productId, formData);
        } else {
            response = await createProduct(formData);
        }

        if (response.success) {
            setAlert({ type: 'success', message: response.message || 'Product saved successfully' });
            if (!productId) {
                setForm({
                    name: '',
                    description: '',
                    sku: '',
                    category: '',
                    brand: '',
                    images: [''],
                    price: '',
                    discount: '',
                    stock: '',
                    isActive: 'true',
                    tags: [''],
                    weight: '',
                    unit: 'unit',
                    specifications: '{}',
                    createdBy: '',
                });
            }
        } else {
            setAlert({ type: 'error', message: response.error || 'Failed to save product' });
        }
    };

    //   const handleImageChange = (index: number, value: string) => {
    //     const newImages = [...form.images];
    //     newImages[index] = value;
    //     setForm({ ...form, images: newImages });
    //   };

    //   const addImageField = () => {
    //     setForm({ ...form, images: [...form.images, ''] });
    //   };

    //   const handleTagChange = (index: number, value: string) => {
    //     const newTags = [...form.tags];
    //     newTags[index] = value;
    //     setForm({ ...form, tags: newTags });
    //   };

    //   const addTagField = () => {
    //     setForm({ ...form, tags: [...form.tags, ''] });
    //   };

    return (
        <div className="mb-6">
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
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">SKU</label>
                        <input
                            type="text"
                            value={form.sku}
                            onChange={(e) => setForm({ ...form, sku: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Category</option>
                            {initialCategories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Brand</label>
                        <input
                            type="text"
                            value={form.brand}
                            onChange={(e) => setForm({ ...form, brand: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                        <input
                            type="number"
                            value={form.discount}
                            onChange={(e) => setForm({ ...form, discount: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="0"
                            max="100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            value={form.stock}
                            onChange={(e) => setForm({ ...form, stock: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Weight</label>
                        <input
                            type="number"
                            value={form.weight}
                            onChange={(e) => setForm({ ...form, weight: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Unit</label>
                        <select
                            value={form.unit}
                            onChange={(e) => setForm({ ...form, unit: e.target.value as IProduct['unit'] })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="unit">Unit</option>
                            <option value="g">Grams</option>
                            <option value="kg">Kilograms</option>
                            <option value="ml">Milliliters</option>
                            <option value="ltr">Liters</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Is Active</label>
                        <select
                            value={form.isActive}
                            onChange={(e) => setForm({ ...form, isActive: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Images</label>
                        {form.images.map((image, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={image}
                                    onChange={(e) => {
                                        const newImages = [...form.images];
                                        newImages[index] = e.target.value;
                                        setForm({ ...form, images: newImages });
                                    }}
                                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Image URL"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, images: [...form.images, ''] })}
                            className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                            + Add Image
                        </button>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Tags</label>
                        {form.tags.map((tag, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={tag}
                                    onChange={(e) => {
                                        const newTags = [...form.tags];
                                        newTags[index] = e.target.value;
                                        setForm({ ...form, tags: newTags });
                                    }}
                                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Tag"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, tags: [...form.tags, ''] })}
                            className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                            + Add Tag
                        </button>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Specifications (JSON)</label>
                        <textarea
                            value={form.specifications}
                            onChange={(e) => setForm({ ...form, specifications: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='{"key": "value"}'
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Created By (User ID)</label>
                        <input
                            type="text"
                            value={form.createdBy}
                            disabled
                            className="cursor-not-allowed mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        {productId ? 'Update Product' : 'Create Product'}
                    </button>
                    {productId && (
                        <button
                            type="button"
                            onClick={() => setForm({
                                name: '',
                                description: '',
                                sku: '',
                                category: '',
                                brand: '',
                                images: [''],
                                price: '',
                                discount: '',
                                stock: '',
                                isActive: 'true',
                                tags: [''],
                                weight: '',
                                unit: 'unit',
                                specifications: '{}',
                                createdBy: '',
                            })}
                            className="ml-4 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProductForm;