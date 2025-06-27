"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Edit2,
  Trash2,
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/actions/category";
import Image from "next/image";

// Mock Shadcn-like components
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col p-6 pb-4">{children}</div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-semibold text-xl text-gray-800 dark:text-white">{children}</h3>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pt-0">{children}</div>
);

const Dialog = ({
  children,
  open,
  onOpenChange,
}: { children: React.ReactNode; open: boolean; onOpenChange: (open: boolean) => void }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
        onClick={() => onOpenChange(false)}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

const DialogContent = ({
  children,
  className,
  ...props
}: { children: React.ReactNode; className?: string; onClick: (e: React.MouseEvent) => void }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 20, opacity: 0 }}
    transition={{ type: "spring", damping: 25 }}
    className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg w-full max-w-md ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pb-4">{children}</div>
);

const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{children}</h2>
);

const DialogDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{children}</p>
);

const DialogFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-end gap-3 p-6 pt-4">{children}</div>
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "destructive" | "ghost" | "success";
    size?: "default" | "sm";
    isLoading?: boolean;
  }
>(
  (
    { className, variant = "primary", size = "default", isLoading = false, children, ...props },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed";

    const variantClasses = {
      primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
      secondary: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200",
      destructive: "bg-red-600 hover:bg-red-700 text-white",
      ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
      success: "bg-green-600 hover:bg-green-700 text-white",
    };

    const sizeClasses = {
      default: "h-11 px-5 text-sm",
      sm: "h-9 px-4 text-sm",
    };

    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${isLoading ? "cursor-wait" : ""} ${className}`}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-colors ${className}`}
      {...props}
    />
  )
);
Input.displayName = "Input";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${className}`}
      {...props}
    />
  )
);
Label.displayName = "Label";

// Types
interface Category {
  _id: string;
  name: string;
  slug: string;
  author: {
    name: string;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface FetchCategoryProps {
  categories?: Category[];
  user_id?: string;
}

// Main Component
export default function FetchCategory({ categories = [], user_id }: FetchCategoryProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [categoryList, setCategoryList] = useState<Category[]>(categories);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showNotification = useCallback((type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Initialize categories
  useEffect(() => {
    const loadCategories = async () => {
      if (categories.length === 0) {
        setIsLoading(true);
        try {
          const fetchedCategories = await getCategories();
          setCategoryList(fetchedCategories.filter((cat): cat is Category => cat !== undefined));
        } catch (error) {
          showNotification("error", error instanceof Error ? error.message : "Failed to load categories.");
        } finally {
          setIsLoading(false);
          setIsInitializing(false);
        }
      } else {
        setIsInitializing(false);
      }
    };

    loadCategories();
  }, [categories, showNotification]);

  const handleCreate = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name")?.toString();

      if (!name?.trim()) {
        showNotification("error", "Category name is required.");
        return;
      }

      if (!user_id) {
        showNotification("error", "User authentication required.");
        return;
      }

      try {
        setIsLoading(true);
        const result = await createCategory(formData, user_id);
        if (result.success && result.category) {
          showNotification("success", "Category created successfully!");
          setCategoryList((prev) => [result.category!, ...prev]);
          setIsCreateDialogOpen(false);
          (e.target as HTMLFormElement).reset();
        } else {
          showNotification("error", result.error || "Failed to create category.");
        }
      } catch (error) {
        showNotification("error", error instanceof Error ? error.message : "Unexpected error.");
      } finally {
        setIsLoading(false);
      }
    },
    [showNotification, user_id]
  );

  const handleEditClick = useCallback((category: Category) => {
    setEditingCategory(category);
    setIsEditDialogOpen(true);
  }, []);

  const handleUpdate = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!editingCategory || !user_id) return;

      const formData = new FormData(e.currentTarget);
      const name = formData.get("name")?.toString();

      if (!name?.trim()) {
        showNotification("error", "Category name is required.");
        return;
      }

      try {
        setIsLoading(true);
        const result = await updateCategory(formData, user_id);
        if (result.success && result.category) {
          showNotification("success", "Category updated successfully!");
          setCategoryList((prev) =>
            prev.map((cat) => (cat._id === editingCategory._id ? result.category! : cat))
          );
          setIsEditDialogOpen(false);
        } else {
          showNotification("error", result.error || "Failed to update category.");
        }
      } catch (error) {
        showNotification("error", error instanceof Error ? error.message : "Unexpected error.");
      } finally {
        setIsLoading(false);
      }
    },
    [editingCategory, showNotification, user_id]
  );

  const handleDeleteClick = useCallback((category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!categoryToDelete || !user_id) return;

    const formData = new FormData();
    formData.append("id", categoryToDelete._id);

    try {
      setIsLoading(true);
      const result = await deleteCategory(formData, user_id);
      if (result.success) {
        showNotification("success", "Category deleted successfully!");
        setCategoryList((prev) => prev.filter((cat) => cat._id !== categoryToDelete._id));
      } else {
        showNotification("error", result.error || "Failed to delete category.");
      }
    } catch (error) {
      showNotification("error", error instanceof Error ? error.message : "Unexpected error.");
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
    }
  }, [categoryToDelete, showNotification, user_id]);

  // Sort functionality
  const [sortConfig, setSortConfig] = useState<{ key: keyof Category | "author.name"; direction: "asc" | "desc" } | null>(null);

  const requestSort = useCallback((key: keyof Category | "author.name") => {
    setSortConfig((prevSortConfig) => {
      let direction: "asc" | "desc" = "asc";
      if (prevSortConfig && prevSortConfig.key === key && prevSortConfig.direction === "asc") {
        direction = "desc";
      }
      return { key, direction };
    });
  }, []);

  const sortedCategories = useMemo(() => {
    if (!sortConfig) return categoryList;

    return [...categoryList].sort((a, b) => {
      const aValue = sortConfig.key === "author.name" 
        ? a.author.name.toLowerCase() 
        : typeof a[sortConfig.key as keyof Category] === "string"
          ? (a[sortConfig.key as keyof Category] as string).toLowerCase()
          : a[sortConfig.key as keyof Category];
      const bValue = sortConfig.key === "author.name" 
        ? b.author.name.toLowerCase() 
        : typeof b[sortConfig.key as keyof Category] === "string"
          ? (b[sortConfig.key as keyof Category] as string).toLowerCase()
          : b[sortConfig.key as keyof Category];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [categoryList, sortConfig]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl min-h-screen mt-16">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-6 right-6 z-50 p-4 pr-8 rounded-lg shadow-lg flex items-center gap-3 ${
              notification.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
            role="alert"
          >
            {notification.type === "success" ? (
              <CheckCircle className="h-5 w-5" aria-hidden="true" />
            ) : (
              <XCircle className="h-5 w-5" aria-hidden="true" />
            )}
            <span className="font-medium">{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
              aria-label="Close notification"
            >
              <XCircle className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Category Management</CardTitle>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Organize your product categories</p>
            </div>
            <Button
              type="button"
              variant="success"
              onClick={() => setIsCreateDialogOpen(true)}
              className="flex-shrink-0 w-full sm:w-auto"
              disabled={isLoading}
            >
              <PlusCircle className="mr-2 h-4 w-4" aria-hidden="true" />
              Add New Category
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("name")}
                    aria-sort={sortConfig?.key === "name" ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}
                    scope="col"
                  >
                    <div className="flex items-center gap-1">
                      Name
                      {sortConfig?.key === "name" &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUp className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="h-4 w-4" aria-hidden="true" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell"
                    scope="col"
                  >
                    Slug
                  </th>
                  <th
                    className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell cursor-pointer"
                    onClick={() => requestSort("author.name")}
                    aria-sort={sortConfig?.key === "author.name" ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}
                    scope="col"
                  >
                    <div className="flex items-center gap-1">
                      Author
                      {sortConfig?.key === "author.name" &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUp className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="h-4 w-4" aria-hidden="true" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell"
                    scope="col"
                  >
                    Created At
                  </th>
                  <th
                    className="py-3 px-6 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    scope="col"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              {isInitializing ? (
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="py-4 px-6">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      </td>
                      <td className="py-4 px-6 hidden sm:table-cell">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      </td>
                      <td className="py-4 px-6 hidden sm:table-cell">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      </td>
                      <td className="py-4 px-6 hidden md:table-cell">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : sortedCategories.length > 0 ? (
                <motion.tbody variants={containerVariants} initial="hidden" animate="show" className="divide-y divide-gray-200 dark:divide-gray-800">
                  {sortedCategories.map((category) => (
                    <motion.tr
                      key={category._id}
                      variants={itemVariants}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{category.name}</td>
                      <td className="py-4 px-6 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{category.slug}</td>
                      <td className="py-4 px-6 text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          {category.author.image && (
                            <Image
                              src={category.author.image}
                              alt={category.author.name}
                              className="h-6 w-6 rounded-full object-cover"
                              width={10}height={10}
                            />
                          )}
                          <span>{category.author.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-500 dark:text-gray-400 hidden md:table-cell">
                        {new Date(category.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(category)}
                            className="text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                            aria-label={`Edit category ${category.name}`}
                            disabled={isLoading}
                          >
                            <Edit2 className="h-4 w-4" aria-hidden="true" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(category)}
                            className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                            aria-label={`Delete category ${category.name}`}
                            disabled={isLoading}
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <AlertTriangle className="h-12 w-12 text-gray-400" aria-hidden="true" />
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900 dark:text-white">No categories found</p>
                          <p className="text-gray-500 dark:text-gray-400">Start by adding a new category above.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create Category Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent onClick={(e) => e.stopPropagation()} className="p-0">
          <form onSubmit={handleCreate}>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
              <DialogDescription>Enter the details for your new category.</DialogDescription>
            </DialogHeader>
            <div className="px-6 pb-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="create-name">Category Name</Label>
                  <Input id="create-name" name="name" placeholder="e.g., Electronics, Books" required />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setIsCreateDialogOpen(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" variant="success" isLoading={isLoading}>
                <PlusCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                Create Category
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent onClick={(e) => e.stopPropagation()} className="p-0">
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>Update your category details.</DialogDescription>
            </DialogHeader>
            <div className="px-6 pb-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-name">Name</Label>
                  <Input id="edit-name" name="name" defaultValue={editingCategory?.name} required />
                  <input type="hidden" name="id" value={editingCategory?._id} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setIsEditDialogOpen(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isLoading}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent onClick={(e) => e.stopPropagation()} className="p-0">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>Are you sure you want to delete this category? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="font-medium text-red-800 dark:text-red-200">
                {categoryToDelete?.name} will be permanently removed.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDeleteDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} isLoading={isLoading}>
              Delete Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}