// src/components/products/ProductsGrid.js
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function ProductsGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("/api/admin/products")
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Only brands that actually have products can be drilled into.
  const brands = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      if (p.brand && !map.has(p.brand.id)) {
        map.set(p.brand.id, { ...p.brand, count: 0 });
      }
      if (p.brand) map.get(p.brand.id).count += 1;
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  const selectedBrand = useMemo(
    () => brands.find((b) => b.id === selectedBrandId) || null,
    [brands, selectedBrandId]
  );

  const brandProducts = useMemo(
    () => (selectedBrandId ? products.filter((p) => p.brand?.id === selectedBrandId) : []),
    [products, selectedBrandId]
  );

  const brandCategories = useMemo(() => {
    const names = new Set();
    brandProducts.forEach((p) => (p.categories || []).forEach((c) => names.add(c.name)));
    return Array.from(names).sort();
  }, [brandProducts]);

  const visibleProducts = useMemo(() => {
    if (!selectedCategory) return [];
    return brandProducts.filter((p) => (p.categories || []).some((c) => c.name === selectedCategory));
  }, [brandProducts, selectedCategory]);

  const selectBrand = (id) => {
    setSelectedBrandId(id);
    setSelectedCategory(null);
  };

  const goToBrands = () => {
    setSelectedBrandId(null);
    setSelectedCategory(null);
  };

  const goToCategories = () => setSelectedCategory(null);

  if (loading) return <div className="py-20 text-center text-slate-400">Loading products...</div>;

  return (
    <section className="w-full bg-[#BFD0DF] py-12">
      <div className="w-full xl:w-[90%] mx-auto px-4">
        <div className="text-center max-w-[900px] mx-auto">
          <h2 className="text-[#2C5C8F] text-[28px] sm:text-[34px] font-semibold">
            Our Premium Products
          </h2>
          <p className="text-[#3A3A3A] text-[14px] sm:text-[16px] mt-3 leading-relaxed">
            We offer a wide portfolio of industry-leading products from trusted global brands. Choose a brand to explore the products we carry from them.
          </p>
        </div>

        {/* Breadcrumb */}
        {selectedBrand && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-[14px] font-semibold">
            <button type="button" onClick={goToBrands} className="text-[#356DA4] hover:underline">
              Brands
            </button>
            <span className="text-[#3A3A3A]/50">/</span>
            <button
              type="button"
              onClick={goToCategories}
              className={selectedCategory ? "text-[#356DA4] hover:underline" : "text-[#3A3A3A]"}
            >
              {selectedBrand.name}
            </button>
            {selectedCategory && (
              <>
                <span className="text-[#3A3A3A]/50">/</span>
                <span className="text-[#3A3A3A]">{selectedCategory}</span>
              </>
            )}
          </div>
        )}

        {/* STEP 1: Brands */}
        {!selectedBrand && (
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {brands.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => selectBrand(b.id)}
                className="group w-[180px] bg-white rounded-[18px] p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center gap-3"
              >
                <div className="relative w-full h-[64px] flex items-center justify-center">
                  {b.logoUrl ? (
                    <Image src={b.logoUrl} alt={b.name} fill className="object-contain" />
                  ) : (
                    <span className="text-[28px] font-black text-[#356DA4]/30">{b.name?.[0]}</span>
                  )}
                </div>
                <span className="text-[#2C5C8F] font-bold text-[16px] group-hover:text-[#356DA4]">
                  {b.name}
                </span>
                <span className="text-[#3A3A3A]/60 text-[12px]">{b.count} product{b.count !== 1 ? 's' : ''}</span>
              </button>
            ))}

            {brands.length === 0 && (
              <div className="w-full text-center py-10 text-[#356DA4] font-medium">
                No brands available yet.
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Categories for selected brand */}
        {selectedBrand && !selectedCategory && (
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {brandCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className="px-8 py-4 rounded-[16px] bg-white text-[#2C5C8F] font-bold text-[16px] shadow-sm hover:shadow-lg hover:bg-[#356DA4] hover:text-white transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* STEP 3: Products for selected brand + category */}
        {selectedBrand && selectedCategory && (
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
            {visibleProducts.map((p) => (
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

            {visibleProducts.length === 0 && (
              <div className="col-span-full text-center py-10 text-[#356DA4] font-medium">
                No products found in “{selectedCategory}” for {selectedBrand.name}.
              </div>
            )}
          </div>
        )}

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
    </section>
  );
}

export default ProductsGrid;
