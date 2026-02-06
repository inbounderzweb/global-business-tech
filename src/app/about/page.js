import AboutIntroSection from '@/components/AboutComponents/AboutIntroSection'
import Banner from '@/components/AboutComponents/Banner'
import TechCTASection from '@/components/AboutComponents/TechCTASection'

import TestimonialsSection from '@/components/HomeComponents/TestimonialsSection'
import React from 'react'

function page() {
  return (
    <div>
      
      <Banner />
      <AboutIntroSection />
      <TechCTASection />
      <TestimonialsSection />
      
    </div>
  )
}

export default page