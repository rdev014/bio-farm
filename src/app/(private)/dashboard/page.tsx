'use client'


import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  BarChart
} from 'lucide-react'

type StatCard = {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  trend: 'up' | 'down'
}

const stats: StatCard[] = [
  {
    title: 'Total Revenue',
    value: '$54,239',
    change: 12.5,
    icon: <DollarSign className="w-5 h-5" />,
    trend: 'up'
  },
  {
    title: 'Active Customers',
    value: '2,845',
    change: 8.2,
    icon: <Users className="w-5 h-5" />,
    trend: 'up'
  },
  {
    title: 'Total Orders',
    value: '1,234',
    change: 3.2,
    icon: <ShoppingBag className="w-5 h-5" />,
    trend: 'down'
  },
  {
    title: 'Growth Rate',
    value: '18.5%',
    change: 4.1,
    icon: <TrendingUp className="w-5 h-5" />,
    trend: 'up'
  }
]

const recentActivity = [
  {
    id: 1,
    action: 'New order placed',
    description: 'Order #12345 - Organic vegetables bundle',
    timestamp: '2 minutes ago',
    icon: <ShoppingBag className="w-4 h-4" />
  },
  {
    id: 2,
    action: 'Customer signup',
    description: 'New customer: John Smith',
    timestamp: '15 minutes ago',
    icon: <Users className="w-4 h-4" />
  },
  {
    id: 3,
    action: 'Revenue milestone',
    description: 'Monthly target achieved',
    timestamp: '1 hour ago',
    icon: <DollarSign className="w-4 h-4" />
  }
]

export default function DashboardPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1 text-sm lg:text-base">Welcome back! Here&apos;s what&apos;s happening with your farm today.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 
                   transition-colors flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center"
        >
          <BarChart className="w-4 h-4" />
          View Reports
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-5 lg:p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg ${
                stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                {stat.change}%
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-5 lg:p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-5 lg:p-6">
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{activity.action}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{activity.description}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.timestamp}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white cursor-pointer"
        >
          <Activity className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Track Farm Performance</h3>
          <p className="text-green-100 text-sm">Monitor your farm&apos;s metrics and analytics in real-time.</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white cursor-pointer"
        >
          <Users className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Manage Customers</h3>
          <p className="text-blue-100 text-sm">View and manage your customer relationships.</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white cursor-pointer"
        >
          <ShoppingBag className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Process Orders</h3>
          <p className="text-purple-100 text-sm">Handle and track customer orders efficiently.</p>
        </motion.div>
      </div>
    </div>
  )
}