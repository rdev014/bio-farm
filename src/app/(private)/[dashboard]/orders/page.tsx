'use client'
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import {
  Search, SlidersHorizontal, ChevronLeft, ChevronRight, MoreHorizontal,
  PackageCheck, Clock, XCircle, Truck, Info, CalendarDays, DollarSign,
  ChevronDown, ArrowUp, ArrowDown // Added for sorting
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Type Definitions ---
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  items: OrderItem[];
}

type SortKey = 'id' | 'customerName' | 'orderDate' | 'totalAmount' | 'status';
type SortDirection = 'asc' | 'desc';

// --- Helper Functions ---

/**
 * Provides Tailwind CSS classes for status badges based on the status type.
 * @param status - The order or payment status.
 * @returns A string of Tailwind CSS classes.
 */
const getStatusBadge = (status: Order['status'] | Order['paymentStatus']): string => {
  switch (status) {
    case 'Delivered':
    case 'Paid':
      return 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200';
    case 'Processing':
    case 'Pending':
      return 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200';
    case 'Shipped':
      return 'bg-blue-100 text-blue-800 ring-1 ring-inset ring-blue-200';
    case 'Cancelled':
    case 'Refunded':
      return 'bg-red-100 text-red-800 ring-1 ring-inset ring-red-200';
    default:
      return 'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200';
  }
};

const getStatusIcon = (status: Order['status']): JSX.Element | null => {
  const iconProps = { size: 16, className: "mr-1" };
  switch (status) {
    case 'Delivered': return <PackageCheck {...iconProps} />;
    case 'Pending': return <Clock {...iconProps} />;
    case 'Processing': return <Info {...iconProps} />;
    case 'Shipped': return <Truck {...iconProps} />;
    case 'Cancelled': return <XCircle {...iconProps} />;
    case 'Refunded': return <DollarSign {...iconProps} />; // Using DollarSign for refunded
    default: return null;
  }
};

/**
 * Generates a specified number of random order data for demonstration.
 * @param count - The number of orders to generate.
 * @returns An array of Order objects.
 */
const generateRandomOrders = (count: number): Order[] => {
  const statuses: Order['status'][] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];
  const paymentStatuses: Order['paymentStatus'][] = ['Paid', 'Pending', 'Refunded'];
  const customers = [
    { name: 'Alice Smith', email: 'alice@example.com' },
    { name: 'Bob Johnson', email: 'bob@example.com' },
    { name: 'Charlie Brown', email: 'charlie@example.com' },
    { name: 'Diana Prince', email: 'diana@example.com' },
    { name: 'Ethan Hunt', email: 'ethan@example.com' },
    { name: 'Fiona Apple', email: 'fiona@example.com' },
    { name: 'George Lucas', email: 'george@example.com' },
    { name: 'Hannah Montana', email: 'hannah@example.com' },
    { name: 'Ivy League', email: 'ivy@example.com' },
    { name: 'Jack Sparrow', email: 'jack@example.com' },
  ];
  const products = ['Laptop Pro', 'Wireless Mouse', 'Mechanical Keyboard', 'Webcam HD', 'Monitor UltraWide', 'USB-C Hub', 'Ergonomic Chair', 'Noise-Cancelling Headphones'];

  return Array.from({ length: count }, (_, i) => {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const numItems = Math.floor(Math.random() * 3) + 1;
    const items = Array.from({ length: numItems }, () => {
      const productName = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1; // 1 to 3 items
      const price = parseFloat((Math.random() * 480 + 20).toFixed(2)); // $20.00 - $500.00
      return { name: productName, quantity, price };
    });
    const totalAmount = parseFloat(items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2));

    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 60)); // Orders within last 60 days
    randomDate.setHours(Math.floor(Math.random() * 24));
    randomDate.setMinutes(Math.floor(Math.random() * 60));

    return {
      id: `ORD-${10000 + i}`,
      customerName: customer.name,
      customerEmail: customer.email,
      orderDate: randomDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      totalAmount: totalAmount,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
      items: items,
    };
  });
};

const ORDERS_PER_PAGE = 10;

// --- OrderPage Component ---
const OrderPage: React.FC = () => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<Order['status'] | 'All'>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey | null; direction: SortDirection | null }>({ key: null, direction: null });

  // Simulate API call to fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        setAllOrders(generateRandomOrders(50)); // Generate 50 random orders
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        // Handle error, maybe show a toast notification
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Memoized filtered and sorted orders
  const filteredAndSortedOrders = useMemo(() => {
    let tempOrders = [...allOrders]; // Create a mutable copy

    // 1. Filter
    if (searchTerm) {
      tempOrders = tempOrders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'All') {
      tempOrders = tempOrders.filter(order => order.status === filterStatus);
    }

    // 2. Sort
    if (sortConfig.key) {
      tempOrders.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        // Fallback for other types or if types mismatch, though unlikely with defined keys
        return 0;
      });
    }

    return tempOrders;
  }, [allOrders, searchTerm, filterStatus, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedOrders.length / ORDERS_PER_PAGE);

  // Memoized current page orders
  const currentOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    const endIndex = startIndex + ORDERS_PER_PAGE;
    return filteredAndSortedOrders.slice(startIndex, endIndex);
  }, [filteredAndSortedOrders, currentPage]);

  // Handle page changes, resetting scroll to top for better UX
  const handlePageChange = useCallback((page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
    }
  }, [totalPages]);

  // Handle sorting clicks
  const handleSort = useCallback((key: SortKey) => {
    setSortConfig(prevConfig => {
      let direction: SortDirection = 'asc';
      if (prevConfig.key === key && prevConfig.direction === 'asc') {
        direction = 'desc';
      } else if (prevConfig.key === key && prevConfig.direction === 'desc') {
        // Reset sort if clicked third time, or cycle through 'asc', 'desc', null
        return { key: null, direction: null };
      }
      return { key, direction };
    });
    setCurrentPage(1); // Reset to first page on sort
  }, []);

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return null; // No icon if not currently sorted by this key
    }
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  // --- Loading State UI ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ ease: "linear", duration: 1, repeat: Infinity }}
          className="rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"
        ></motion.div>
        <p className="mt-6 text-lg font-medium text-slate-600">Loading orders, please wait...</p>
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
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4 md:mb-0">Order Management</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute h-5 w-5 text-slate-400 top-1/2 -translate-y-1/2 left-4" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search orders (ID, customer name/email)..."
              className="bg-slate-100 text-slate-800 rounded-full pl-12 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              aria-label="Search orders"
            />
          </div>
          <div className="relative flex-shrink-0 min-w-[180px]">
            <SlidersHorizontal className="absolute h-5 w-5 text-slate-400 top-1/2 -translate-y-1/2 left-4" aria-hidden="true" />
            <select
              className="bg-slate-100 text-slate-800 rounded-full pl-12 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none w-full text-sm"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value as Order['status'] | 'All');
                setCurrentPage(1); // Reset to first page on filter change
              }}
              aria-label="Filter by order status"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Refunded">Refunded</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} aria-hidden="true" />
          </div>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg overflow-x-auto min-h-[60vh] flex flex-col"
      >
        {filteredAndSortedOrders.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center py-20 text-slate-500">
            <Info size={48} className="text-slate-300 mb-4" />
            <p className="text-xl font-semibold mb-2">No orders found</p>
            <p className="text-center max-w-md">
              It seems there are no orders matching your current search or filter criteria.
              Please try adjusting your search term or selecting a different status filter.
            </p>
            {(searchTerm || filterStatus !== 'All') && (
              <button
                onClick={() => { setSearchTerm(''); setFilterStatus('All'); setCurrentPage(1); }}
                className="mt-6 px-6 py-2 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors shadow-md"
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
                        Order ID {getSortIcon('id')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('customerName')}>
                      <div className="flex items-center gap-1">
                        Customer {getSortIcon('customerName')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('orderDate')}>
                      <div className="flex items-center gap-1">
                        Date {getSortIcon('orderDate')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('totalAmount')}>
                      <div className="flex items-center gap-1">
                        Amount {getSortIcon('totalAmount')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold">Status</th>
                    <th scope="col" className="px-6 py-3 font-semibold">Payment</th>
                    <th scope="col" className="px-6 py-3 font-semibold rounded-tr-lg text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map(order => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      className="bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{order.customerName}</div>
                        <div className="text-xs text-slate-500">{order.customerEmail}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <div className="flex items-center gap-1">
                          <CalendarDays size={14} className="text-slate-400" aria-hidden="true" />
                          {order.orderDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} className="text-slate-500" aria-hidden="true" />
                          {order.totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                          {getStatusIcon(order.status)}{order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusBadge(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="text-slate-500 hover:text-slate-900 p-2 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title={`More options for order ${order.id}`}
                          aria-label={`More options for order ${order.id}`}
                        >
                          <MoreHorizontal size={20} />
                        </button>
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
      {filteredAndSortedOrders.length > 0 && (
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
    </div>
  );
};

export default OrderPage;