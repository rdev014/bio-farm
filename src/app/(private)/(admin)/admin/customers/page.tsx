'use client'
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import {
  Search, SlidersHorizontal, ChevronLeft, ChevronRight, MoreHorizontal,
  UserCheck, UserPlus, UserX, Mail, Phone, MapPin, ArrowUp, ArrowDown,
  ChevronDown,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Type Definitions ---
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  customerType: 'New' | 'Active' | 'Churned' | 'VIP';
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
}

type CustomerSortKey = 'id' | 'name' | 'joinedDate' | 'totalOrders' | 'totalSpent';
type SortDirection = 'asc' | 'desc';

// --- Helper Functions ---

const getCustomerTypeBadge = (type: Customer['customerType']): string => {
  switch (type) {
    case 'Active':
      return 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200';
    case 'New':
      return 'bg-blue-100 text-blue-800 ring-1 ring-inset ring-blue-200';
    case 'VIP':
      return 'bg-purple-100 text-purple-800 ring-1 ring-inset ring-purple-200';
    case 'Churned':
      return 'bg-red-100 text-red-800 ring-1 ring-inset ring-red-200';
    default:
      return 'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200';
  }
};


const getCustomerTypeIcon = (type: Customer['customerType']): JSX.Element | null => {
  const iconProps = { size: 16, className: "mr-1" };
  switch (type) {
    case 'Active': return <UserCheck {...iconProps} />;
    case 'New': return <UserPlus {...iconProps} />;
    case 'VIP': return <UserCheck {...iconProps} />; // VIP can also use UserCheck or a star icon
    case 'Churned': return <UserX {...iconProps} />;
    default: return null;
  }
};


const generateRandomCustomers = (count: number): Customer[] => {
  const customerTypes: Customer['customerType'][] = ['New', 'Active', 'Churned', 'VIP'];
  const names = [
    'Emma Stone', 'Liam Hemsworth', 'Olivia Wilde', 'Noah Centineo', 'Ava Gardner',
    'Sophia Loren', 'Jackson Wang', 'Isabella Rossellini', 'Lucas Hedges', 'Mia Goth'
  ];
  const domains = ['example.com', 'mail.com', 'web.dev', 'corp.com'];
  const addresses = [
    '123 Main St, Anytown, USA', '456 Oak Ave, Somewhere, CA', '789 Pine Ln, Metropolis, NY',
    '101 Maple Dr, Gotham, TX', '202 Birch Rd, Star City, FL'
  ];

  return Array.from({ length: count }, (_, i) => {
    const name = names[Math.floor(Math.random() * names.length)];
    const email = `${name.toLowerCase().replace(/\s/g, '.')}${i + 1}@${domains[Math.floor(Math.random() * domains.length)]}`;
    const phone = `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
    const address = addresses[Math.floor(Math.random() * addresses.length)];
    const customerType = customerTypes[Math.floor(Math.random() * customerTypes.length)];
    const totalOrders = Math.floor(Math.random() * 50);
    const totalSpent = parseFloat((Math.random() * 5000 + 50).toFixed(2));

    const joinedDate = new Date();
    joinedDate.setDate(joinedDate.getDate() - Math.floor(Math.random() * 365 * 3)); // Joined within last 3 years
    joinedDate.setHours(Math.floor(Math.random() * 24));
    joinedDate.setMinutes(Math.floor(Math.random() * 60));

    return {
      id: `CUST-${1000 + i}`,
      name,
      email,
      phone,
      address,
      customerType,
      totalOrders,
      totalSpent,
      joinedDate: joinedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    };
  });
};

const CUSTOMERS_PER_PAGE = 10;

// --- CustomerPage Component ---
const CustomerPage: React.FC = () => {
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<Customer['customerType'] | 'All'>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<{ key: CustomerSortKey | null; direction: SortDirection | null }>({ key: null, direction: null });

  // Simulate API call to fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        setAllCustomers(generateRandomCustomers(50)); // Generate 50 random customers
      } catch (error) {
        console.error("Failed to fetch customers:", error);
        // Implement robust error handling (e.g., toast notification, error message in UI)
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  // Memoized filtered and sorted customers
  const filteredAndSortedCustomers = useMemo(() => {
    let tempCustomers = [...allCustomers];

    // 1. Filter
    if (searchTerm) {
      tempCustomers = tempCustomers.filter(customer =>
        customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'All') {
      tempCustomers = tempCustomers.filter(customer => customer.customerType === filterType);
    }

    // 2. Sort
    if (sortConfig.key) {
      tempCustomers.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }

    return tempCustomers;
  }, [allCustomers, searchTerm, filterType, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedCustomers.length / CUSTOMERS_PER_PAGE);

  // Memoized current page customers
  const currentCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * CUSTOMERS_PER_PAGE;
    const endIndex = startIndex + CUSTOMERS_PER_PAGE;
    return filteredAndSortedCustomers.slice(startIndex, endIndex);
  }, [filteredAndSortedCustomers, currentPage]);

  // Handle page changes, resetting scroll to top
  const handlePageChange = useCallback((page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [totalPages]);

  // Handle sorting clicks
  const handleSort = useCallback((key: CustomerSortKey) => {
    setSortConfig(prevConfig => {
      let direction: SortDirection = 'asc';
      if (prevConfig.key === key && prevConfig.direction === 'asc') {
        direction = 'desc';
      } else if (prevConfig.key === key && prevConfig.direction === 'desc') {
        return { key: null, direction: null }; // Cycle to no sort
      }
      return { key, direction };
    });
    setCurrentPage(1); // Reset to first page on sort
  }, []);

  const getSortIcon = (key: CustomerSortKey) => {
    if (sortConfig.key !== key) {
      return null;
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
          className="rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500"
        ></motion.div>
        <p className="mt-6 text-lg font-medium text-slate-600">Loading customers, please wait...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto flex-1 flex flex-col bg-slate-50 p-4 sm:p-6 lg:p-8">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg mb-6 flex flex-col md:flex-row md:items-center justify-between border border-slate-200"
      >
        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight mb-4 md:mb-0">Customer Management</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute h-5 w-5 text-slate-400 top-1/2 -translate-y-1/2 left-4" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search customers (ID, name, email, phone...)"
              className="bg-slate-100 text-slate-800 rounded-full pl-12 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Search customers"
            />
          </div>
          <div className="relative flex-shrink-0 min-w-[180px]">
            <SlidersHorizontal className="absolute h-5 w-5 text-slate-400 top-1/2 -translate-y-1/2 left-4" aria-hidden="true" />
            <select
              className="bg-slate-100 text-slate-800 rounded-full pl-12 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none w-full text-sm"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value as Customer['customerType'] | 'All');
                setCurrentPage(1);
              }}
              aria-label="Filter by customer type"
            >
              <option value="All">All Types</option>
              <option value="New">New</option>
              <option value="Active">Active</option>
              <option value="VIP">VIP</option>
              <option value="Churned">Churned</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} aria-hidden="true" />
          </div>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white  rounded-2xl border border-slate-200 shadow-lg overflow-x-auto min-h-[60vh] flex flex-col"
      >
        {filteredAndSortedCustomers.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center py-20 text-slate-500">
            <Info size={48} className="text-slate-300 mb-4" />
            <p className="text-xl font-semibold mb-2">No customers found</p>
            <p className="text-center max-w-md">
              It seems there are no customers matching your current search or filter criteria.
              Please try adjusting your search term or selecting a different type filter.
            </p>
            {(searchTerm || filterType !== 'All') && (
              <button
                onClick={() => { setSearchTerm(''); setFilterType('All'); setCurrentPage(1); }}
                className="mt-6 px-6 py-2 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors shadow-md"
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
                        Customer ID {getSortIcon('id')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('name')}>
                      <div className="flex items-center gap-1">
                        Name {getSortIcon('name')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold">Contact</th>
                    <th scope="col" className="px-6 py-3 font-semibold">Address</th>
                    <th scope="col" className="px-6 py-3 font-semibold">Type</th>
                    <th scope="col" className="px-6 py-3 font-semibold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('totalOrders')}>
                      <div className="flex items-center gap-1">
                        Orders {getSortIcon('totalOrders')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('totalSpent')}>
                      <div className="flex items-center gap-1">
                        Spent {getSortIcon('totalSpent')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('joinedDate')}>
                      <div className="flex items-center gap-1">
                        Joined {getSortIcon('joinedDate')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold rounded-tr-lg text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map(customer => (
                    <motion.tr
                      key={customer.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      className="bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-emerald-600 hover:text-emerald-800 cursor-pointer">{customer.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{customer.name}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <div className="flex items-center gap-1 mb-1 text-xs">
                          <Mail size={14} className="text-slate-400" aria-hidden="true" />
                          <span className="truncate">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Phone size={14} className="text-slate-400" aria-hidden="true" />
                          {customer.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-xs">
                        <div className="flex items-start gap-1">
                          <MapPin size={14} className="text-slate-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          {customer.address}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getCustomerTypeBadge(customer.customerType)}`}>
                          {getCustomerTypeIcon(customer.customerType)}{customer.customerType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-medium">{customer.totalOrders}</td>
                      <td className="px-6 py-4 text-slate-800 font-semibold">
                        {customer.totalSpent.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-xs">
                        {customer.joinedDate}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="text-slate-500 hover:text-slate-900 p-2 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          title={`More options for customer ${customer.name}`}
                          aria-label={`More options for customer ${customer.name}`}
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
      {filteredAndSortedCustomers.length > 0 && (
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

export default CustomerPage;