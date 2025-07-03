
import { getSession } from '@/lib/getSession';
import {
  Search,
  Bell,
  ChevronDown,
  Package,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  ShoppingCart,
  Truck,
  Award,
  FileText,
  Phone,
  Shield,
  RefreshCw,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const session = await getSession();
  const userol = session?.user;
  const user = {
    name: userol?.name ?? 'Guest',
    email: userol?.email ?? 'invalid',
    accountType: userol?.role ?? 'no',
    avatar: userol?.image ?? 'https://images.unsplash.com/photo-1494790108755-2616b332c1db?w=40&h=40&fit=crop&crop=face',
    memberSince: '2023',
    nextDelivery: 'July 15, 2025'
  }


  // Customer's recent orders
  const recentOrders = [
    {
      id: 'ORD-2847',
      date: '2025-07-01',
      status: 'delivered',
      items: 3,
      total: '$2,450.00',
      products: ['Premium Organic Compost', 'Bio-Active Fertilizer', 'Soil Conditioner'],
      deliveryDate: '2025-07-03'
    },
    {
      id: 'ORD-2846',
      date: '2025-06-28',
      status: 'shipped',
      items: 2,
      total: '$1,875.00',
      products: ['Liquid Fertilizer', 'Growth Booster'],
      deliveryDate: '2025-07-05'
    },
    {
      id: 'ORD-2845',
      date: '2025-06-25',
      status: 'processing',
      items: 1,
      total: '$895.00',
      products: ['Organic Mulch'],
      deliveryDate: '2025-07-08'
    }
  ];

  // Quick reorder items
  const quickReorderItems = [
    {
      id: 'P001',
      name: 'Premium Organic Compost',
      price: '$49.99',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
      lastOrdered: '2025-07-01',
      inStock: true
    },
    {
      id: 'P002',
      name: 'Bio-Active Liquid Fertilizer',
      price: '$39.99',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
      lastOrdered: '2025-06-28',
      inStock: true
    },
    {
      id: 'P003',
      name: 'Soil Conditioner Mix',
      price: '$32.99',
      image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=300&h=200&fit=crop',
      lastOrdered: '2025-06-15',
      inStock: false
    }
  ];

  // Recommended products
  const recommendations = [
    {
      id: 'R001',
      name: 'Advanced Root Stimulator',
      price: '$45.99',
      originalPrice: '$52.99',
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=300&h=200&fit=crop',
      rating: 4.8,
      reviews: 234,
      badge: 'New',
      savings: 13
    },
    {
      id: 'R002',
      name: 'Organic Pest Control',
      price: '$28.99',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=300&h=200&fit=crop',
      rating: 4.9,
      reviews: 189,
      badge: 'Popular',
      savings: 0
    },
    {
      id: 'R003',
      name: 'Premium Seed Starter',
      price: '$35.99',
      originalPrice: '$41.99',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=300&h=200&fit=crop',
      rating: 4.7,
      reviews: 156,
      badge: 'Sale',
      savings: 14
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">


            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products, fertilizers, solutions..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Link href={'/notifications'} className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6" />
              </Link>

              <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">4</span>
                </span>
              </button>

              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <Image width={400} height={400}
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full border-2 border-gray-200"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.accountType}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-3xl font-semibold mb-2">Welcome back, {user.name.split(' ')[0]}!</h2>
                  <p className="text-green-100 text-lg mb-6">Your organic farming journey continues. Let&apos;s grow something amazing together.</p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-green-300" />
                      <span className="text-sm font-medium">Member since {user.memberSince}</span>
                    </div>

                  </div>
                </div>
           
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 text-left group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Track Orders</h3>
                <p className="text-sm text-gray-500">View order status</p>
              </div>
            </div>
          </button>

          <button className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 text-left group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Reorder</h3>
                <p className="text-sm text-gray-500">Quick reorder</p>
              </div>
            </div>
          </button>

          <button className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 text-left group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Get Support</h3>
                <p className="text-sm text-gray-500">Expert help</p>
              </div>
            </div>
          </button>

          <button className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 text-left group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Invoices</h3>
                <p className="text-sm text-gray-500">Download bills</p>
              </div>
            </div>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Orders & Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{order.id}</h4>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{order.total}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{order.items} items • {order.products.join(', ')}</span>
                        <span className="flex items-center">
                          <Truck className="w-4 h-4 mr-1" />
                          Delivery: {order.deliveryDate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Reorder */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Quick Reorder</h3>
                <p className="text-sm text-gray-500 mt-1">Reorder your frequently purchased items</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickReorderItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <Image width={400} height={400}
                        src={item.image}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">Last ordered: {item.lastOrdered}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">{item.price}</span>
                        <button
                          disabled={!item.inStock}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${item.inStock
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                          {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Account Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Loyalty Points</span>
                  <span className="font-semibold text-gray-900">1122</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Points Value</span>
                  <span className="font-semibold text-green-600">$3333</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Next Delivery</span>
                  <span className="font-semibold text-gray-900">{user.nextDelivery}</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Redeem Points
                  </button>
                </div>
              </div>
            </div>

            {/* Recommended Products */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recommended for You</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recommendations.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex space-x-3">
                        <Image width={400} height={400}
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                            {product.badge && (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.badge === 'New' ? 'bg-blue-100 text-blue-800' :
                                product.badge === 'Popular' ? 'bg-green-100 text-green-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">({product.reviews})</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-900">{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                              )}
                              {product.savings > 0 && (
                                <span className="text-xs text-green-600 font-medium">Save {product.savings}%</span>
                              )}
                            </div>
                          </div>
                          <button className="w-full mt-2 bg-green-600 text-white py-1.5 rounded-lg hover:bg-green-700 transition-colors text-sm">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Need Help?</h3>
                  <p className="text-sm text-gray-600">Expert support available</p>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full bg-white text-green-600 py-2 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium border border-green-200">
                  Chat with Expert
                </button>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  Call Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

;