
import TestimonialsSection from '@/components/HomeComponents/TestimonialsSection'
import Banner from '@/components/productpagecomponents/Banner'
import ProductsGrid from '@/components/products/ProductsGrid'
import React from 'react'

function page() {
  return (
    <div>
        <Banner />
        <ProductsGrid />
        <TestimonialsSection/>
    </div>
  )
}

export default page