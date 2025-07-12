import Footer from '@/components/General/Footer'
import HeaderProvider from '@/components/General/Header/HeaderProvider'
import { Toaster } from '@/components/ui/sonner'

import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderProvider />
      <div className='py-16'>
        {children}
        <Toaster position="top-right" richColors />
      </div>
      <Footer />
    </>
  )
}
