'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Home,
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Boxes,
  FileText,
  Settings,
  HelpCircle,
  Menu,
  X,
  ChevronRight
} from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: <Home className="w-5 h-5" />
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    title: 'Customers',
    href: '/dashboard/customers',
    icon: <Users className="w-5 h-5" />
  },
  {
    title: 'Orders',
    href: '/dashboard/orders',
    icon: <ShoppingCart className="w-5 h-5" />
  },
  {
    title: 'Products',
    href: '/dashboard/products',
    icon: <Boxes className="w-5 h-5" />
  },
  {
    title: 'Reports',
    href: '/dashboard/reports',
    icon: <FileText className="w-5 h-5" />
  }
]

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      initial={{ width: 256 }}
      animate={{ 
        width: isCollapsed ? 70 : 256,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-screen bg-white border-r border-gray-200 py-4 flex flex-col"
    >
      {/* Header */}
      <div className="px-4 pb-4 flex items-center justify-between border-b border-gray-200">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold">BF</span>
            </motion.div>
            <span className="font-semibold text-gray-900">BioFarms</span>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
              ${item.href === '/dashboard' 
                ? 'bg-green-50 text-green-700' 
                : 'text-gray-700 hover:bg-gray-50'}`}
          >
            {item.icon}
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: isCollapsed ? 0 : 1,
                display: isCollapsed && !isHovered ? 'none' : 'block'
              }}
              className="font-medium"
            >
              {item.title}
            </motion.span>
            {isCollapsed && !isHovered && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed left-16 bg-gray-900 text-white px-3 py-1.5 rounded-md text-sm
                         invisible group-hover:visible whitespace-nowrap z-50"
              >
                {item.title}
              </motion.div>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-2 py-4 border-t border-gray-200">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ 
              opacity: isCollapsed ? 0 : 1,
              display: isCollapsed && !isHovered ? 'none' : 'block'
            }}
            className="font-medium"
          >
            Settings
          </motion.span>
        </Link>
        <Link
          href="/dashboard/help"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ 
              opacity: isCollapsed ? 0 : 1,
              display: isCollapsed && !isHovered ? 'none' : 'block'
            }}
            className="font-medium"
          >
            Help
          </motion.span>
        </Link>
      </div>
    </motion.div>
  )
}

export default Sidebar
