// src/components/products/CategoryPageClient.js
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import RequestQuoteModal from './RequestQuoteModal';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function CategoryPageClient({ slug, categoryName }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState({ products: [], total: 0, facets: { brands: [], platforms: [], certifications: [] } });
  const [loading, setLoading] = useState(true);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');

  const q = searchParams.get('q') || '';
  const sort = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const brandIds = useMemo(() => searchParams.getAll('brand'), [searchParams]);
  const platforms = useMemo(() => searchParams.getAll('platform'), [searchParams]);
  const certifications = useMemo(() => searchParams.getAll('certification'), [searchParams]);
  const pageSize = 12;

  const updateParams = useCallback((updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.delete(key);
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value) {
        params.set(key, value);
      }
    });
    if (!('page' in updates)) params.delete('page');
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const toggleFilter = (key, value, current) => {
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    updateParams({ [key]: next });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== q) updateParams({ q: searchInput });
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('category', slug);
    if (q) params.set('q', q);
    params.set('sort', sort);
    params.set('page', String(page));
    params.set('pageSize', String(pageSize));
    brandIds.forEach((id) => params.append('brand', id));
    platforms.forEach((p) => params.append('platform', p));
    certifications.forEach((c) => params.append('certification', c));

    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((result) => {
        setData({
          products: result.products || [],
          total: result.total || 0,
          facets: result.facets || { brands: [], platforms: [], certifications: [] },
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, q, sort, page, brandIds.join(','), platforms.join(','), certifications.join(',')]);

  const totalPages = Math.max(1, Math.ceil(data.total / pageSize));

  return (
    <section className="w-full bg-[#EEF3F8] py-12">
      <div className="w-full xl:w-[90%] mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Filters sidebar */}
        <aside className="lg:col-span-1 space-y-6 h-fit bg-white rounded-[24px] p-6 shadow-sm">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3">Search</h3>
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={`Search ${categoryName}...`}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {data.facets.brands.length > 0 && (
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3">Brand</h3>
              <div className="space-y-2">
                {data.facets.brands.map((b) => (
                  <label key={b.id} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={brandIds.includes(String(b.id))}
                      onChange={() => toggleFilter('brand', String(b.id), brandIds)}
                      className="h-4 w-4 rounded border-slate-300 text-[#356DA4] focus:ring-[#356DA4]"
                    />
                    {b.name}
                  </label>
                ))}
              </div>
            </div>
          )}

          {data.facets.platforms.length > 0 && (
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3">Platform</h3>
              <div className="space-y-2">
                {data.facets.platforms.map((p) => (
                  <label key={p} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={platforms.includes(p)}
                      onChange={() => toggleFilter('platform', p, platforms)}
                      className="h-4 w-4 rounded border-slate-300 text-[#356DA4] focus:ring-[#356DA4]"
                    />
                    {p}
                  </label>
                ))}
              </div>
            </div>
          )}

          {data.facets.certifications.length > 0 && (
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3">Certification</h3>
              <div className="space-y-2">
                {data.facets.certifications.map((c) => (
                  <label key={c} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={certifications.includes(c)}
                      onChange={() => toggleFilter('certification', c, certifications)}
                      className="h-4 w-4 rounded border-slate-300 text-[#356DA4] focus:ring-[#356DA4]"
                    />
                    {c}
                  </label>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setQuoteOpen(true)}
            className="w-full inline-flex items-center justify-center bg-[#356DA4] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#2d5c8b] transition shadow-md"
          >
            Request a Quote
          </button>
        </aside>

        {/* Product grid */}
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <p className="text-sm text-slate-500 font-medium">{data.total} product{data.total !== 1 ? 's' : ''} found</p>
            <select
              value={sort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-blue-500"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-400">Loading products...</div>
          ) : data.products.length === 0 ? (
            <div className="py-20 text-center text-slate-400">No products match your filters yet.</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {data.products.map((p) => (
                <ProductCard key={p.id} product={p} size="compact" />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => updateParams({ page: String(p) })}
                  className={`h-10 w-10 rounded-full text-sm font-bold transition ${p === page ? 'bg-[#356DA4] text-white' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <RequestQuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} context={categoryName} />
    </section>
  );
}
