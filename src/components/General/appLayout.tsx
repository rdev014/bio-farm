'use client'

import Sidebar from '@/components/dashboard/Sidebar'
import { motion } from 'framer-motion'
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext'

function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1"
      style={{
        marginLeft: isCollapsed ? '0px' : '256px',
        transition: 'margin-left 0.3s ease-in-out',
      }}
    >
      <div className="max-w-7xl mx-auto p-6 lg:p-8">{children}</div>
    </motion.main>
  )
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50/50">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  )
}
