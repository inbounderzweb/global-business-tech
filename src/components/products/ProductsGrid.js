// src/components/products/ProductsGrid.js
'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function ProductsGrid() {
  const scrollerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const scrollRight = () => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  if (loading) return <div className="py-20 text-center text-slate-400">Loading products...</div>;

  return (
    <section className="w-full bg-[#BFD0DF] py-12">
      <div className="w-full xl:w-[90%] mx-auto px-4">
        <div className="text-center max-w-[900px] mx-auto">
          <h2 className="text-[#2C5C8F] text-[28px] sm:text-[34px] font-semibold">
            Our Premium Products
          </h2>
          <p className="text-[#3A3A3A] text-[14px] sm:text-[16px] mt-3 leading-relaxed">
            We offer a wide portfolio of industry-leading products from trusted global brands. Each product is carefully selected to ensure performance, durability, and seamless integration with your business infrastructure.
          </p>
        </div>

        {/* MOBILE SLIDER */}
        <div className="mt-10 relative sm:hidden">
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pl-8 pr-6"
          >
            {products.map((p) => (
              <div key={p.id} className="shrink-0 w-[280px] text-center">
                <div className="bg-white rounded-[16px] p-5 shadow-sm">
                  <div className="relative w-full h-[260px] overflow-hidden rounded-[12px] group">
                    <div className="absolute top-2 right-2 z-10 bg-gray-400/10 backdrop-blur-xl text-[#3A3A3A] text-[12px] px-3 py-1 rounded-full">
                      {p.category?.name || 'Product'}
                    </div>
                    {p.mainImage && (
                      <Link href={`/productdetail/${p.id}`}>
                        <Image
                          src={p.mainImage}
                          alt={p.name}
                          fill
                          className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                          sizes="80vw"
                        />
                      </Link>

                    )}
                  </div>
                </div>
                <Link href={`/productdetail/${p.id}`}>
                  <h3 className="mt-4 text-[#3A3A3A] text-[20px] font-semibold truncate px-2 hover:text-[#356DA4] transition-colors">
                    {p.name}
                  </h3>
                </Link>
                <Link
                  href={`/productdetail/${p.id}`}
                  className="inline-flex items-center justify-center mt-3 bg-[#356DA4] text-white px-10 py-3 rounded-full text-[18px] hover:bg-[#2d5c8b] transition font-bold shadow-lg"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-[56px] h-[56px] rounded-full bg-white shadow-md flex items-center justify-center"
          >
            <span className="text-[#356DA4] text-3xl">›</span>
          </button>
        </div>

        {/* DESKTOP GRID */}
        <div className="mt-10 hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {products.map((p) => (
            <div key={p.id} className="text-center group">
              <div className="bg-white rounded-[16px] p-5 shadow-sm w-full max-w-[270px] mx-auto transition-all hover:shadow-md hover:-translate-y-1">
                <Link href={`/productdetail/${p.id}`}>
                  <div className="relative w-full h-[220px] overflow-hidden rounded-[12px]">
                    {p.mainImage && (
                      <Image
                        src={p.mainImage}
                        alt={p.name}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width:1024px) 40vw, 25vw"
                      />
                    )}
                  </div>
                </Link>
              </div>
              <Link href={`/productdetail/${p.id}`}>
                <h3 className="mt-4 text-[#3A3A3A] text-[18px] font-bold truncate px-2 hover:text-[#356DA4] transition-colors">
                  {p.name}
                </h3>
              </Link>
              <Link
                href={`/productdetail/${p.id}`}
                className="inline-flex items-center justify-center mt-3 bg-[#356DA4] text-white px-8 py-2.5 rounded-full text-[14px] font-bold hover:bg-[#2d5c8b] transition shadow-md"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href={'/productdetails'}>
            <button
              type="button"
              className="border-2 border-[#356DA4] text-[#356DA4] px-10 py-2.5 rounded-full font-bold hover:bg-[#356DA4] hover:text-white transition-all shadow-sm"
            >
              See our full catalogue
            </button>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

export default ProductsGrid;
