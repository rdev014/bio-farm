import Footer from '@/components/General/Footer'
import Header from '@/components/General/Header'
import React from 'react'

export default function Layout({children}:{children:React.ReactNode}) {
  return (
    <>
    <Header/>
    {children}
    <Footer/>
    </>
  )
}
