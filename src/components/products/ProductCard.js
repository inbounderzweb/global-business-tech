// src/components/products/ProductCard.js
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product, size = 'default' }) {
  const isCompact = size === 'compact';

  return (
    <div className="text-center group">
      <div className={`bg-white rounded-[16px] p-5 shadow-sm w-full ${isCompact ? 'max-w-[270px] mx-auto' : ''} transition-all hover:shadow-md hover:-translate-y-1`}>
        <Link href={`/productdetail/${product.id}`}>
          <div className={`relative w-full ${isCompact ? 'h-[220px]' : 'h-[260px]'} overflow-hidden rounded-[12px]`}>
            {product.brand?.name && (
              <div className="absolute top-2 right-2 z-10 bg-gray-400/20 backdrop-blur-xl text-[#3A3A3A] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {product.brand.name}
              </div>
            )}
            {product.mainImage && (
              <Image
                src={product.mainImage}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width:1024px) 40vw, 25vw"
              />
            )}
          </div>
        </Link>
      </div>
      <Link href={`/productdetail/${product.id}`}>
        <h3 className="mt-4 text-[#3A3A3A] text-[18px] font-bold truncate px-2 hover:text-[#356DA4] transition-colors">
          {product.name}
        </h3>
      </Link>
      <Link
        href={`/productdetail/${product.id}`}
        className="inline-flex items-center justify-center mt-3 bg-[#356DA4] text-white px-8 py-2.5 rounded-full text-[14px] font-bold hover:bg-[#2d5c8b] transition shadow-md"
      >
        View Details
      </Link>
    </div>
  );
}
