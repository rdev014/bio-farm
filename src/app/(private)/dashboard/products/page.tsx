'use client'
import React, { useState, useEffect, useMemo, useCallback, JSX } from 'react';
import {
  Search, SlidersHorizontal, ChevronLeft, ChevronRight,
  Package, Tag, CheckCircle, XCircle, Info, ArrowUp, ArrowDown,
  Warehouse, PlusCircle, PencilLine, Eye, Trash2, X, CalendarDays,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Type Definitions ---
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Discontinued';
  addedDate: string; // Format: "Mon, Jan 1, 2023"
  lastUpdated: string; // Format: "Mon, Jan 1, 2023"
}

type ProductSortKey = 'id' | 'name' | 'price' | 'stock' | 'addedDate' | 'lastUpdated';
type SortDirection = 'asc' | 'desc';
type FormMode = 'add' | 'edit' | 'view';

// --- Helper Functions (re-used from previous iteration) ---
const getProductStatusBadge = (status: Product['status']): string => {
  switch (status) {
    case 'In Stock': return 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200';
    case 'Low Stock': return 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200';
    case 'Out of Stock': return 'bg-red-100 text-red-800 ring-1 ring-inset ring-red-200';
    case 'Discontinued': return 'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200';
    default: return 'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200';
  }
};

const getProductStatusIcon = (status: Product['status']): JSX.Element | null => {
  const iconProps = { size: 16, className: "mr-1" };
  switch (status) {
    case 'In Stock': return <CheckCircle {...iconProps} />;
    case 'Low Stock': return <Info {...iconProps} />;
    case 'Out of Stock': return <XCircle {...iconProps} />;
    case 'Discontinued': return <Package {...iconProps} />;
    default: return null;
  }
};

const generateRandomProducts = (count: number): Product[] => {
  const categories = ['Electronics', 'Books', 'Home & Kitchen', 'Apparel', 'Sports & Outdoors', 'Beauty'];
  const productNames = {
    'Electronics': ['Wireless Earbuds', 'Smart Watch', 'Portable Speaker', 'Gaming Mouse', 'USB-C Hub'],
    'Books': ['Sci-Fi Novel', 'Cookbook', 'Self-Help Guide', 'Fantasy Epic', 'History Textbook'],
    'Home & Kitchen': ['Blender', 'Coffee Maker', 'Air Fryer', 'Smart Light Bulb', 'Weighted Blanket'],
    'Apparel': ['T-Shirt', 'Hoodie', 'Running Shoes', 'Denim Jeans', 'Winter Jacket'],
    'Sports & Outdoors': ['Yoga Mat', 'Water Bottle', 'Resistance Bands', 'Hiking Backpack', 'Camping Tent'],
    'Beauty': ['Face Serum', 'Moisturizer', 'Shampoo', 'Lipstick', 'Perfume']
  };


  return Array.from({ length: count }, (_, i) => {
    const category = categories[Math.floor(Math.random() * categories.length)] as keyof typeof productNames;
    const name = productNames[category][Math.floor(Math.random() * productNames[category].length)];
    const price = parseFloat((Math.random() * 900 + 10).toFixed(2));
    const stock = Math.floor(Math.random() * 200);

    let status: Product['status'];
    if (stock === 0) {
      status = 'Out of Stock';
    } else if (stock < 10) {
      status = 'Low Stock';
    } else {
      status = 'In Stock';
    }
    if (Math.random() < 0.05) {
      status = 'Discontinued';
    }

    const addedDate = new Date();
    addedDate.setDate(addedDate.getDate() - Math.floor(Math.random() * 365 * 2));
    const lastUpdated = new Date(addedDate.getTime());
    lastUpdated.setDate(lastUpdated.getDate() + Math.floor(Math.random() * 90));

    return {
      id: `PROD-${2000 + i}`,
      name,
      category,
      price,
      stock,
      sku: `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status,
      addedDate: addedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      lastUpdated: lastUpdated.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    };
  });
};

const PRODUCTS_PER_PAGE = 10;

// --- ProductForm Component (New) ---
interface ProductFormProps {
  product?: Product | null; // Null for add, Product for edit/view
  mode: FormMode;
  onClose: () => void;
  onSubmit: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, mode, onClose, onSubmit }) => {
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const isAddMode = mode === 'add';

  const [formData, setFormData] = useState<Partial<Product>>(product || {});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(product || {}); // Reset form data when product prop changes (e.g., switching from view to edit)
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (formData.stock === undefined || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) newErrors.stock = 'Valid stock is required';
    if (!formData.sku) newErrors.sku = 'SKU is required';
    // Status is typically derived or set by system, not always user input directly
    // Added/LastUpdated dates are system generated

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const submittedProduct: Product = {
        ...formData,
        id: formData.id || `PROD-${Date.now()}`, // Generate new ID for add mode
        addedDate: formData.addedDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        lastUpdated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        status: formData.status || 'In Stock' // Default status if not set or derived
      } as Product; // Type assertion as we know all required fields will be present after validation/defaulting
      onSubmit(submittedProduct);
      onClose(); // Close the drawer after submission
    }
  };

  const categories = ['Electronics', 'Books', 'Home & Kitchen', 'Apparel', 'Sports & Outdoors', 'Beauty', 'Other'];



  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="fixed inset-y-0 right-0 w-full md:w-1/2 lg:w-1/3 bg-white shadow-2xl p-6 flex flex-col z-50 overflow-y-auto border-l border-slate-200"
    >
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          {isAddMode ? 'Add New Product' : isEditMode ? 'Edit Product' : 'Product Details'}
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-grow space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            disabled={isViewMode}
            className={`w-full p-2.5 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 ${isViewMode ? 'bg-slate-50 text-slate-600' : 'bg-white text-slate-900'} ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category || ''}
            onChange={handleChange}
            disabled={isViewMode}
            className={`w-full p-2.5 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 ${isViewMode ? 'bg-slate-50 text-slate-600' : 'bg-white text-slate-900'} ${errors.category ? 'border-red-500' : 'border-slate-300'}`}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-1">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price || ''}
            onChange={handleChange}
            disabled={isViewMode}
            step="0.01"
            className={`w-full p-2.5 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 ${isViewMode ? 'bg-slate-50 text-slate-600' : 'bg-white text-slate-900'} ${errors.price ? 'border-red-500' : 'border-slate-300'}`}
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock || 0}
            onChange={handleChange}
            disabled={isViewMode}
            className={`w-full p-2.5 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 ${isViewMode ? 'bg-slate-50 text-slate-600' : 'bg-white text-slate-900'} ${errors.stock ? 'border-red-500' : 'border-slate-300'}`}
          />
          {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
        </div>

        <div>
          <label htmlFor="sku" className="block text-sm font-medium text-slate-700 mb-1">SKU</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku || ''}
            onChange={handleChange}
            disabled={isViewMode}
            className={`w-full p-2.5 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 ${isViewMode ? 'bg-slate-50 text-slate-600' : 'bg-white text-slate-900'} ${errors.sku ? 'border-red-500' : 'border-slate-300'}`}
          />
          {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku}</p>}
        </div>

        {isViewMode && product && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Product Status</label>
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${getProductStatusBadge(product.status)}`}>
                {getProductStatusIcon(product.status)}{product.status}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Added Date</label>
              <p className="flex items-center gap-1 text-slate-700">
                <CalendarDays size={16} className="text-slate-400" /> {product.addedDate}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Updated</label>
              <p className="flex items-center gap-1 text-slate-700">
                <CalendarDays size={16} className="text-slate-400" /> {product.lastUpdated}
              </p>
            </div>
          </>
        )}

        {!isViewMode && (
          <div className="pt-4 border-t border-slate-200 mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium shadow-md"
            >
              {isAddMode ? 'Add Product' : 'Save Changes'}
            </button>
          </div>
        )}
        {isViewMode && (
          <div className="pt-4 border-t border-slate-200 mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onSubmit(product as Product)} // Triggering edit mode transition
              className="px-5 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium shadow-md"
            >
              <PencilLine size={18} className="inline-block mr-2" /> Edit Product
            </button>
          </div>
        )}
      </form>
    </motion.div>
  );
};


// --- ProductPage Component ---
const ProductPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string | 'All'>('All');
  const [filterAvailability, setFilterAvailability] = useState<Product['status'] | 'All'>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<{ key: ProductSortKey | null; direction: SortDirection | null }>({ key: null, direction: null });

  // Drawer/Modal State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formMode, setFormMode] = useState<FormMode>('add'); // 'add', 'edit', 'view'

  // Simulate API call to fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setAllProducts(generateRandomProducts(50));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Memoized filtered and sorted products
  const filteredAndSortedProducts = useMemo(() => {
    let tempProducts = [...allProducts];

    if (searchTerm) {
      tempProducts = tempProducts.filter(product =>
        product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'All') {
      tempProducts = tempProducts.filter(product => product.category === filterCategory);
    }

    if (filterAvailability !== 'All') {
      tempProducts = tempProducts.filter(product => product.status === filterAvailability);
    }

    if (sortConfig.key) {
      tempProducts.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (sortConfig.key === 'addedDate' || sortConfig.key === 'lastUpdated') {
          const dateA = new Date(aValue as string);
          const dateB = new Date(bValue as string);
          return sortConfig.direction === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        }
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }

    return tempProducts;
  }, [allProducts, searchTerm, filterCategory, filterAvailability, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [filteredAndSortedProducts, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [totalPages]);

  const handleSort = useCallback((key: ProductSortKey) => {
    setSortConfig(prevConfig => {
      let direction: SortDirection = 'asc';
      if (prevConfig.key === key && prevConfig.direction === 'asc') {
        direction = 'desc';
      } else if (prevConfig.key === key && prevConfig.direction === 'desc') {
        return { key: null, direction: null };
      }
      return { key, direction };
    });
    setCurrentPage(1);
  }, []);

  const getSortIcon = (key: ProductSortKey) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    allProducts.forEach(p => categories.add(p.category));
    return ['All', ...Array.from(categories).sort()];
  }, [allProducts]);

  // --- New Handlers for Drawer/Form Interactions ---
  const handleAddProductClick = () => {
    setSelectedProduct(null); // No product selected for add mode
    setFormMode('add');
    setIsDrawerOpen(true);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormMode('view');
    setIsDrawerOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormMode('edit');
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  const handleSubmitProduct = (productData: Product) => {
    if (formMode === 'add') {
      setAllProducts(prev => [productData, ...prev]);
      // In a real app, send to API, then update state or refetch
      console.log('Added product:', productData);
      // Show toast: "Product added successfully!"
    } else if (formMode === 'edit') {
      setAllProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
      // In a real app, send update to API
      console.log('Updated product:', productData);
      // Show toast: "Product updated successfully!"
    } else if (formMode === 'view') {
        // This is a special case: If onSubmit is called from view mode, it means user clicked "Edit Product" button in the form
        setFormMode('edit');
        // The form data itself might not change unless it was an actual submission
        // We re-render the form in edit mode
        console.log('Transitioning to edit mode for product:', productData.id);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm(`Are you sure you want to delete product ${productId}? This action cannot be undone.`)) {
      setAllProducts(prev => prev.filter(p => p.id !== productId));
      // In a real app, send delete request to API
      console.log('Deleted product:', productId);
      // Show toast: "Product deleted successfully!"
    }
  };

  // --- Loading State UI ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ ease: "linear", duration: 1, repeat: Infinity }}
          className="rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"
        ></motion.div>
        <p className="mt-6 text-lg font-medium text-slate-600">Loading products, please wait...</p>
      </div>
    );
  }

  // --- Main Component Render ---
  return (
    <div className="flex-1 flex flex-col bg-slate-50 p-4 sm:p-6 lg:p-8">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg mb-6 flex flex-col md:flex-row md:items-center justify-between border border-slate-200"
      >
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4 md:mb-0">Product Management</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute h-5 w-5 text-slate-400 top-1/2 -translate-y-1/2 left-4" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search products (name, ID, SKU, category...)"
              className="bg-slate-100 text-slate-800 rounded-full pl-12 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Search products"
            />
          </div>
          <div className="relative flex-shrink-0 min-w-[150px]">
            <SlidersHorizontal className="absolute h-5 w-5 text-slate-400 top-1/2 -translate-y-1/2 left-4" aria-hidden="true" />
            <select
              className="bg-slate-100 text-slate-800 rounded-full pl-12 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none w-full text-sm"
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter by product category"
            >
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} aria-hidden="true" />
          </div>
          <div className="relative flex-shrink-0 min-w-[180px]">
            <SlidersHorizontal className="absolute h-5 w-5 text-slate-400 top-1/2 -translate-y-1/2 left-4" aria-hidden="true" />
            <select
              className="bg-slate-100 text-slate-800 rounded-full pl-12 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none w-full text-sm"
              value={filterAvailability}
              onChange={(e) => {
                setFilterAvailability(e.target.value as Product['status'] | 'All');
                setCurrentPage(1);
              }}
              aria-label="Filter by product availability"
            >
              <option value="All">All Availability</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Discontinued">Discontinued</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} aria-hidden="true" />
          </div>
          <button
            onClick={handleAddProductClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors shadow-md text-sm"
            aria-label="Add new product"
          >
            <PlusCircle size={20} /> Add New Product
          </button>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg overflow-x-auto min-h-[60vh] flex flex-col"
      >
        {filteredAndSortedProducts.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center py-20 text-slate-500">
            <Info size={48} className="text-slate-300 mb-4" />
            <p className="text-xl font-semibold mb-2">No products found</p>
            <p className="text-center max-w-md">
              It seems there are no products matching your current search or filter criteria.
              Please try adjusting your search term or selecting different filters.
            </p>
            {(searchTerm || filterCategory !== 'All' || filterAvailability !== 'All') && (
              <button
                onClick={() => { setSearchTerm(''); setFilterCategory('All'); setFilterAvailability('All'); setCurrentPage(1); }}
                className="mt-6 px-6 py-2 rounded-full bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors shadow-md"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="relative overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-sm text-left text-slate-700">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-semibold rounded-tl-lg cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('id')}>
                      <div className="flex items-center gap-1">
                        Product ID {getSortIcon('id')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('name')}>
                      <div className="flex items-center gap-1">
                        Product Name {getSortIcon('name')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold">Category</th>
                    <th scope="col" className="px-6 py-3 font-semibold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('price')}>
                      <div className="flex items-center gap-1">
                        Price {getSortIcon('price')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('stock')}>
                      <div className="flex items-center gap-1">
                        Stock {getSortIcon('stock')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold">Status</th>
                    <th scope="col" className="px-6 py-3 font-semibold">SKU</th>
                    <th scope="col" className="px-6 py-3 font-semibold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('addedDate')}>
                      <div className="flex items-center gap-1">
                        Added Date {getSortIcon('addedDate')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold rounded-tr-lg text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map(product => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      className="bg-white border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-semibold text-purple-600 hover:text-purple-800 cursor-pointer" onClick={() => handleViewProduct(product)}>{product.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{product.name}</td>
                      <td className="px-6 py-4 text-slate-600">
                        <div className="flex items-center gap-1">
                          <Tag size={14} className="text-slate-400" aria-hidden="true" />
                          {product.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        <div className="flex items-center gap-1">
                          <Warehouse size={14} className="text-slate-400" aria-hidden="true" />
                          {product.stock} units
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getProductStatusBadge(product.status)}`}>
                          {getProductStatusIcon(product.status)}{product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-mono text-xs">{product.sku}</td>
                      <td className="px-6 py-4 text-slate-600 text-xs">
                        {product.addedDate}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => handleViewProduct(product)}
                                className="text-slate-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                title={`View details for ${product.name}`}
                                aria-label={`View details for ${product.name}`}
                            >
                                <Eye size={20} />
                            </button>
                            <button
                                onClick={() => handleEditProduct(product)}
                                className="text-slate-500 hover:text-green-700 p-2 rounded-full hover:bg-green-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                                title={`Edit ${product.name}`}
                                aria-label={`Edit ${product.name}`}
                            >
                                <PencilLine size={20} />
                            </button>
                            <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-slate-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                                title={`Delete ${product.name}`}
                                aria-label={`Delete ${product.name}`}
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </motion.div>

      {/* Pagination */}
      {filteredAndSortedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-lg mt-6"
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} /> Previous
          </button>
          <div className="text-sm text-slate-700 my-3 sm:my-0">
            Page <span className="font-bold text-slate-900">{currentPage}</span> of <span className="font-bold text-slate-900">{totalPages}</span>
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
            aria-label="Next page"
          >
            Next <ChevronRight size={20} />
          </button>
        </motion.div>
      )}

      {/* Drawer for Add/Edit/View Product */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDrawer}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              aria-hidden="true"
            />
            <ProductForm
              product={selectedProduct}
              mode={formMode}
              onClose={handleCloseDrawer}
              onSubmit={handleSubmitProduct}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;