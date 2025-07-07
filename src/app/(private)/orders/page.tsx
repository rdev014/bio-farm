'use client'
import React, { useState } from 'react';
import { Package, Truck, Clock, CheckCircle, XCircle, Search, Eye, MapPin, Calendar,  ShoppingBag, Plus, ArrowRight} from 'lucide-react';
import Image from 'next/image';

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  img: string;
  sku: string;
}

interface Customer {
  name: string;
  type: 'B2B' | 'B2C';
  email: string;
  phone: string;
  address: string;
}

interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled' | 'Pending';
  total: number;
  customer: Customer;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
  deliveryDate?: string;
}


const orders: Order[] = [
  {
    id: 'ORD-1001',
    date: '2025-07-02',
    status: 'Delivered',
    total: 12500,
    customer: {
      name: 'Ravi Kumar',
      type: 'B2C',
      email: 'ravi.kumar@email.com',
      phone: '+91 98765 43210',
      address: 'Sector 15, Gurgaon, Haryana'
    },
    items: [
      {
        id: '1',
        name: 'Organic Compost Premium Grade (25kg)',
        qty: 2,
        price: 5000,
        img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=150&h=150&fit=crop',
        sku: 'OCP-25KG'
      },
      {
        id: '2',
        name: 'Liquid Bio-Fertilizer (1L)',
        qty: 1,
        price: 2500,
        img: 'https://images.unsplash.com/photo-1574323043725-7b57d1c3f8c8?w=150&h=150&fit=crop',
        sku: 'LBF-1L'
      }
    ],
    shippingAddress: 'B-204, Sector 15, Gurgaon, Haryana - 122001',
    paymentMethod: 'UPI',
    trackingNumber: 'ARK123456789',
    deliveryDate: '2025-07-05'
  },
  {
    id: 'ORD-1002',
    date: '2025-06-28',
    status: 'Shipped',
    total: 2499,
    customer: {
      name: 'Ravi Kumar',
      type: 'B2C',
      email: 'ravi.kumar@email.com',
      phone: '+91 98765 43210',
      address: 'Sector 15, Gurgaon, Haryana'
    },
    items: [
      {
        id: '3',
        name: 'Neem Cake Powder Organic (5kg)',
        qty: 1,
        price: 2499,
        img: 'https://images.unsplash.com/photo-1574323043725-7b57d1c3f8c8?w=150&h=150&fit=crop',
        sku: 'NCP-5KG'
      }
    ],
    shippingAddress: 'B-204, Sector 15, Gurgaon, Haryana - 122001',
    paymentMethod: 'UPI',
    trackingNumber: 'ARK987654321'
  }
];

const statusConfig = {
  Delivered: {
    color: 'text-green-700 bg-green-50 border-green-200',
    icon: CheckCircle,
    dot: 'bg-green-500',
    message: 'Order delivered successfully'
  },
  Shipped: {
    color: 'text-blue-700 bg-blue-50 border-blue-200',
    icon: Truck,
    dot: 'bg-blue-500',
    message: 'Order is on the way'
  },
  Processing: {
    color: 'text-orange-700 bg-orange-50 border-orange-200',
    icon: Clock,
    dot: 'bg-orange-500',
    message: 'Order is being prepared'
  },
  Cancelled: {
    color: 'text-red-700 bg-red-50 border-red-200',
    icon: XCircle,
    dot: 'bg-red-500',
    message: 'Order was cancelled'
  },
  Pending: {
    color: 'text-gray-700 bg-gray-50 border-gray-200',
    icon: Package,
    dot: 'bg-gray-500',
    message: 'Order confirmation pending'
  }
};

export default function MyOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalItems = (items: OrderItem[]) => {
    return items.reduce((sum, item) => sum + item.qty, 0);
  };

  const OrderDetailsModal = ({ order, onClose }: { order: Order; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
              <p className="text-gray-600 mt-1">#{order.id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center space-x-3">
              {React.createElement(statusConfig[order.status].icon, { className: "w-6 h-6 text-green-600" })}
              <div>
                <p className="font-semibold text-green-900">{order.status}</p>
                <p className="text-sm text-green-700">{statusConfig[order.status].message}</p>
              </div>
            </div>
            {order.deliveryDate && (
              <div className="text-right">
                <p className="text-sm text-green-700">Delivered on</p>
                <p className="font-semibold text-green-900">{formatDate(order.deliveryDate)}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Order Date</p>
              <p className="font-semibold text-gray-900">{formatDate(order.date)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Payment Method</p>
              <p className="font-semibold text-gray-900">{order.paymentMethod}</p>
            </div>
          </div>

          {order.trackingNumber && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <p className="font-semibold text-blue-900">Tracking Information</p>
              </div>
              <p className="text-sm text-blue-700 font-mono">{order.trackingNumber}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-gray-600 mb-3">Shipping Address</p>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <p className="text-gray-700">{order.shippingAddress}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-3">Order Items</p>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <Image width={20} height={20}
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900">Total Amount</span>
              <span className="text-2xl font-bold text-green-600">{formatCurrency(order.total)}</span>
            </div>

            <div className="flex gap-3">
              {order.status === 'Delivered' && (
                <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 transition-colors">
                  Order Again
                </button>
              )}
              {order.trackingNumber && order.status !== 'Delivered' && (
                <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  Track Order
                </button>
              )}
              <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingBag className="w-12 h-12 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Start your organic farming journey by placing your first order. Browse our premium collection of organic fertilizers and compost.
      </p>
      <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors inline-flex items-center space-x-2">
        <Plus className="w-5 h-5" />
        <span>Start Shopping</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track your organic farming essentials</p>
        </div>

        {orders.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search your orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Orders</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Processing">Processing</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {orders.length === 0 ? (
            <EmptyState />
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">Try adjusting your search or filter</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
               const StatusIcon = statusConfig[order.status].icon;
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">#{order.id}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(order.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Package className="w-4 h-4" />
                            <span>{getTotalItems(order.items)} items</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`flex items-center space-x-2 px-3 py-2 rounded-full border ${statusConfig[order.status].color} mb-2`}>
                          <div className={`w-2 h-2 rounded-full ${statusConfig[order.status].dot}`}></div>
                          <span className="text-sm font-medium">{order.status}</span>
                          <span className="text-sm font-medium"><StatusIcon className="w-4 h-4" /></span>
                        </div>
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(order.total)}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                          <Image width={20} height={20}
                            src={item.img}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded-lg border"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{formatCurrency(item.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>

                      {order.trackingNumber && order.status !== 'Delivered' && (
                        <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-green-300 text-green-700 rounded-xl hover:bg-green-50 transition-colors font-medium">
                          <Truck className="w-4 h-4" />
                          <span>Track Order</span>
                        </button>
                      )}

                      {order.status === 'Delivered' && (
                        <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-green-300 text-green-700 rounded-xl hover:bg-green-50 transition-colors font-medium">
                          <ArrowRight className="w-4 h-4" />
                          <span>Order Again</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}