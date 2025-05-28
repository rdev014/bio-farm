import { getCategories } from '@/actions/category'
import FetchCategory from '@/components/FetchCategory/FetchCategory'
import React from 'react'

export default async function page() {
    const categories = await getCategories()
    console.log(categories);
    
  return (
    <div>
      <FetchCategory categories={categories}/>
    </div>
  )
}
