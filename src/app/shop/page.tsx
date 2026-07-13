'use client';

import { Suspense, useState } from 'react';
import { ProductGrid } from "@/components/product-grid";
import { SearchHeader } from "@/components/search-header";
import { useSearchParams } from 'next/navigation';

function ShopContent() {
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("Sort: Featured");
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  return (
    <div className="relative min-h-screen pb-20">
      {/* Intense Background Glows */}
      <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] bg-secondary-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <SearchHeader 
        category={category} 
        sort={sort} 
        onCategoryChange={setCategory} 
        onSortChange={setSort} 
      />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <ProductGrid category={category} sort={sort} search={search} />
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ShopContent />
    </Suspense>
  );
}
