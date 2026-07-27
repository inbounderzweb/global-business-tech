import AllProductsGrid from '@/components/AllProducts/AllProductsGrid';
import TestimonialsSection from '@/components/HomeComponents/TestimonialsSection';
import Banner from '@/components/productpagecomponents/Banner';
import React from 'react';

function page() {
  return (
    <div>
      <Banner />

      <AllProductsGrid />
      <TestimonialsSection />
    </div>
  );
}

export default page;
