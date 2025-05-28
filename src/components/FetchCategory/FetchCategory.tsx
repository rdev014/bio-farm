"use client";

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/actions/category";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Edit2,
  Trash2,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export default function FetchCategory({ categories }: { categories: Category[] }) {
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [categoryList, setCategoryList] = useState<Category[]>(categories);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const refreshCategories = async () => {
    setLoading(true);
    const updated = await getCategories();
    setCategoryList(updated);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await createCategory(formData);

    if (result.success) {
      showNotification("success", "Category created successfully");
      (e.target as HTMLFormElement).reset();
      await refreshCategories();
    } else {
      showNotification("error", result.error || "Failed to create category");
    }
  };

  const handleUpdate = async (id: string) => {
    const formData = new FormData();
    formData.append("name", editName);
    formData.append("id", id);

    const result = await updateCategory(formData);

    if (result.success) {
      showNotification("success", "Category updated successfully");
      setEditingId(null);
      await refreshCategories();
    } else {
      showNotification("error", result.error || "Failed to update category");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    const formData = new FormData();
    formData.append("id", id);

    const result = await deleteCategory(formData);

    if (result.success) {
      showNotification("success", "Category deleted successfully");
      await refreshCategories();
    } else {
      showNotification("error", result.error || "Failed to delete category");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-center gap-2 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {notification.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <XCircle size={20} />
          )}
          {notification.message}
        </motion.div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Category Management</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Create Category Form */}
          <form onSubmit={handleCreate} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                name="name"
                placeholder="Enter category name"
                required
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <PlusCircle size={20} />
                Add Category
              </button>
            </div>
          </form>

          {/* Categories Table */}
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="animate-spin" size={32} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Slug</th>
                    <th className="text-left py-3 px-4">Created At</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryList.map((category) => (
                    <tr key={category._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        {editingId === category._id ? (
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-2 py-1 border rounded"
                          />
                        ) : (
                          category.name
                        )}
                      </td>
                      <td className="py-3 px-4">{category.slug}</td>
                      <td className="py-3 px-4">
                        {new Date(category.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {editingId === category._id ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleUpdate(category._id)}
                              className="p-2 text-green-600 hover:text-green-700"
                            >
                              <CheckCircle size={20} />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-2 text-red-600 hover:text-red-700"
                            >
                              <XCircle size={20} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingId(category._id);
                                setEditName(category.name);
                              }}
                              className="p-2 text-blue-600 hover:text-blue-700"
                            >
                              <Edit2 size={20} />
                            </button>
                            <button
                              onClick={() => handleDelete(category._id)}
                              className="p-2 text-red-600 hover:text-red-700"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {categoryList.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No categories found
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
