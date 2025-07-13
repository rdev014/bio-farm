'use client'

import Sidebar from '@/components/dashboard/Sidebar'
import { motion } from 'framer-motion'
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext'
import { User } from '@/types'
import { Menu, Leaf } from 'lucide-react'
import Link from 'next/link'

function MobileHeader() {
  const { setIsCollapsed, isMobile } = useSidebar()

  if (!isMobile) return null

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40 md:hidden">
      <button
        onClick={() => setIsCollapsed(false)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>
      
      <Link href="/" className="flex items-center gap-2.5">
        <div className="bg-green-600 rounded-xl w-8 h-8 flex items-center justify-center text-white font-bold shadow-sm">
          <Leaf className="w-4 h-4" />
        </div>
        <span className="text-lg font-semibold text-gray-800">Arkin</span>
      </Link>
      
      <div className="w-9" /> {/* Spacer for center alignment */}
    </div>
  )
}

function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed, isMobile } = useSidebar()

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1"
      style={{
        marginLeft: isMobile ? '0px' : isCollapsed ? '72px' : '256px',
        marginTop: isMobile ? '64px' : '0px', // Add top margin for mobile header
        transition: 'margin-left 0.3s ease-in-out',
      }}
    >
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {children}
      </div>
    </motion.main>
  )
}

export default function AppLayout({
  children,
  user
}: {
  children: React.ReactNode
  user: User
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50/50">
        <MobileHeader />
        <Sidebar user={user} />
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  )
}