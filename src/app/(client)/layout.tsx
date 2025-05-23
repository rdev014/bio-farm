import Footer from '@/components/General/Footer'
import HeaderProvider from '@/components/General/HeaderProvider'

import React from 'react'

export default function Layout({children}:{children:React.ReactNode}) {
  return (
    <>
   <HeaderProvider/>
    {children}
    <Footer/>
    </>
  )
}
