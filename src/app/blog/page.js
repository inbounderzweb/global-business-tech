import BlogBanner from '@/components/Blog/BlogBanner';
import BlogGrid from '@/components/Blog/BlogGrid';
import React from 'react';

function page() {
  return (
    <div className="section-wrapper">
      <BlogBanner />
      <BlogGrid />
    </div>
  );
}

export default page;
