
import { getSession } from '@/lib/getSession';
import {
  Bell,
  Package,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  ShoppingCart,
  Truck,
  Award,
  Shield,
  ChevronRight,
  Sprout,
  Heart,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
  items: number;
  products: string[];
  deliveryDate: string;
}

interface QuickItem {
  id: string;
  name: string;
  image: string;
  lastOrdered: string;
  price: string;
  inStock: boolean;
}

interface Recommendation {
  id: string;
  name: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
  price: string;
  originalPrice?: string;
  savings?: number;
}
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




  // Update variable declarations
  const recentOrders: Order[] = [];
  const quickItems: QuickItem[] = [];
  const recommendations: Recommendation[] = [];

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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 float-right z-20 w-full  rounded-xl mb-2">
        <div className="max-w-7xl mx-auto pl-6 pr-2 ">
          <div className="flex items-center justify-end h-16">


          
            {/* User Actions */}
            <div className="flex items-center justify-end  space-x-4">
              <Link href={'/notifications'} className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6" />
              </Link>

              <Link href='/cart' className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                <ShoppingCart className="w-6 h-6" />
                {/* <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">4</span>
                </span> */}
              </Link>

              <Link href='/profile' className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <Image width={40} height={40}
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full border-2 border-gray-200"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.accountType}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
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
          <Link href={'/orders'} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 text-left group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Track Orders</h3>
                <p className="text-sm text-gray-500">View order status</p>
              </div>
            </div>
          </Link>

          <Link href={'/farms'} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 text-left group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Sprout className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Farms</h3>
                <p className="text-sm text-gray-500">Quick view</p>
              </div>
            </div>
          </Link>

          <Link href={'/our-products'} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 text-left group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Our Products</h3>
                <p className="text-sm text-gray-500">View products</p>
              </div>
            </div>
          </Link>

          <Link href={'/wishlist'} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 text-left group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Wishlist</h3>
                <p className="text-sm text-gray-500">View favorites</p>
              </div>
            </div>
          </Link>
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
                  <Link href={'/orders'} className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
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
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>
                            {order.items} items • {order.products.join(", ")}
                          </span>
                          <span className="flex items-center">
                            <Truck className="w-4 h-4 mr-1" />
                            Delivery: {order.deliveryDate}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      <Package className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">No recent orders found</p>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Quick Reorder */}
            {quickItems.length > 0 &&
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Order</h3>
                  <p className="text-sm text-gray-500 mt-1">Order our latest purchased items</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickItems.map((item) => (
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
              </div>}


          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Account Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Name</span>
                  <span className="font-semibold text-gray-900">{user.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email</span>
                  <span className="font-semibold text-green-600">{user.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Account Type</span>
                  <span className="font-semibold text-gray-900">{user.accountType}</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/profile"
                    className="block w-full bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>

              </div>
            </div>

            {/* Recommended Products */}
            {recommendations.length > 0 && <div className="bg-white rounded-xl border border-gray-200">
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
                              {product.savings && product.savings > 0 && (
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
            </div>}


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