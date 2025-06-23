'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useSidebar } from '@/contexts/SidebarContext'
import {
  Home,
  LayoutDashboard,
  Users,
  ShoppingCart,
  Boxes,
  Settings,
  HelpCircle,
  Menu,
  ChevronLeft,
  User,
} from 'lucide-react'
import Link from 'next/link'


interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { title: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
  { title: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { title: 'Customers', href: '/dashboard/customers', icon: <Users className="w-5 h-5" /> },
  { title: 'Orders', href: '/orders', icon: <ShoppingCart className="w-5 h-5" /> },
  { title: 'Products', href: '/dashboard/products', icon: <Boxes className="w-5 h-5" /> },
  { title: 'Profile', href: '/profile', icon: <User className="w-5 h-5" /> },
]

const Sidebar = () => {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed } = useSidebar()

  return (
    <motion.aside
      initial={{ width: isCollapsed ? 72 : 256 }}
      animate={{ width: isCollapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed inset-y-0 left-0 z-50 h-screen bg-white border-r border-gray-200 shadow-md flex flex-col"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center gap-2.5">
                <div className="bg-green-600 rounded-xl w-9 h-9 flex items-center justify-center text-white font-bold shadow-sm">
                  A
                </div>
                <span className="text-lg font-semibold text-gray-800">Arkin</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 active:bg-gray-200"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <Menu className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-green-50 text-green-700 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={`min-w-[24px] ${isActive ? 'text-green-600' : ''}`}>{item.icon}</div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="truncate"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-100 space-y-1.5 bg-gray-50/50">
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200
            ${pathname === '/dashboard/settings' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
        >
          <Settings className="w-5 h-5" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="truncate"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <Link
          href="/help"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200
            ${pathname === '/help' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
        >
          <HelpCircle className="w-5 h-5" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="truncate"
              >
                Help
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        
      </div>
    </motion.aside>
  )
}

export default Sidebar