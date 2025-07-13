'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useSidebar } from '@/contexts/SidebarContext'
import {
  Home,
  LayoutDashboard,
  ShoppingCart,
  Boxes,
  Settings,
  HelpCircle,
  Menu,
  ChevronLeft,
  User,
  LayoutGrid,
  Leaf,
  Sprout,
  Newspaper,
  Sparkles,
  ListOrdered,
  Heart,
  Package,
} from 'lucide-react'
import Link from 'next/link'
import { User as UserType } from '@/types'
import { ReactNode, useEffect, useState } from 'react'

interface NavItem {
  title: string
  href: string
  icon: ReactNode
}

const navItems: NavItem[] = [
  { title: 'Home', href: '/home', icon: <Home className="w-5 h-5" /> },
  { title: 'Products', href: '/our-products', icon: <Package className="w-5 h-5" /> },
  { title: 'Wishlist', href: '/wishlist', icon: <Heart className="w-5 h-5" /> },
  { title: 'Cart', href: '/cart', icon: <ShoppingCart className="w-5 h-5" /> },
  { title: 'Farms', href: '/farms', icon: <Sprout className="w-5 h-5" /> },
  { title: 'Orders', href: '/orders', icon: <ListOrdered className="w-5 h-5" /> },
  { title: 'Profile', href: '/profile', icon: <User className="w-5 h-5" /> },
]

const adminNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { title: 'Manage Orders', href: '/admin/orders', icon: <ShoppingCart className="w-5 h-5" /> },
  { title: 'Manage Products', href: '/admin/products', icon: <Boxes className="w-5 h-5" /> },
  { title: 'Manage Blogs', href: '/admin/blogs', icon: <Newspaper className="w-5 h-5" /> },
  { title: 'Manage Categories', href: '/admin/category', icon: <Sparkles className="w-5 h-5" /> },
  { title: 'Admin', href: '/admin', icon: <LayoutGrid className="w-5 h-5" /> },
]

const Sidebar = ({ user }: { user: UserType }) => {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed } = useSidebar()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Auto-collapse on mobile
      if (mobile) {
        setIsCollapsed(true)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsCollapsed])

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href
    return (
      <Link
        key={item.title}
        href={item.href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          isActive 
            ? 'bg-green-50 text-green-700 shadow-sm' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
        aria-current={isActive ? 'page' : undefined}
        onClick={() => {
          // Close sidebar on mobile after clicking a link
          if (isMobile) {
            setIsCollapsed(true)
          }
        }}
      >
        <div className={`min-w-[24px] ${isActive ? 'text-green-600' : ''}`}>
          {item.icon}
        </div>
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
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && !isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isCollapsed && isMobile ? -300 : 0,
          width: isCollapsed && !isMobile ? 72 : 256
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed inset-y-0 left-0 ${isMobile ? 'z-50' : 'z-40'} h-screen bg-white border-r border-gray-200 shadow-md flex flex-col ${
          isMobile && isCollapsed ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
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
                    <Leaf />
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
          {navItems.map(renderNavItem)}
          
          {user.role === 'admin' && (
            <div className="border bg-gray-50 p-1 rounded-xl space-y-1.5 mt-4">
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.h2
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-2 text-sm font-medium text-gray-700"
                  >
                    Admin
                  </motion.h2>
                )}
              </AnimatePresence>
              {adminNavItems.map(renderNavItem)}
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-gray-100 space-y-1.5 bg-gray-50/50">
          {renderNavItem({ 
            title: 'Settings', 
            href: '/profile/settings', 
            icon: <Settings className="w-5 h-5" /> 
          })}
          {renderNavItem({ 
            title: 'Help', 
            href: '/help', 
            icon: <HelpCircle className="w-5 h-5" /> 
          })}
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar