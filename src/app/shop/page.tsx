'use client';

import { ProductGrid } from "@/components/product-grid";
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function ShopPage() {
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("Sort: Featured");
  return (
    <div className="relative min-h-screen pb-20">

      {/* Intense Background Glows */}
      <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] bg-secondary-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      {/* Shop Header Section */}
      <div className="relative border-b border-white/5 bg-black/40 backdrop-blur-xl pt-32 pb-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between space-y-8 md:space-y-0">
            <div>
              <div className="inline-flex items-center space-x-2 py-1.5 px-3 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-xs font-bold tracking-wider uppercase mb-4">
                <Sparkles size={14} className="fill-primary-400 text-primary-400" />
                <span>The Collection</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-2xl">
                Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Armory</span>
              </h1>
              <p className="text-slate-400 mt-4 max-w-xl text-lg font-light leading-relaxed">
                Refine your setup with our hand-picked selection of top-tier gear. Tools crafted for ultimate performance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative w-full sm:w-auto group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Filter size={16} className="text-slate-400 group-hover:text-primary-400 transition-colors" />
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full sm:w-auto appearance-none bg-white/5 border border-white/10 hover:border-primary-500/50 rounded-2xl pl-12 pr-10 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all cursor-pointer backdrop-blur-md"
                >
                  <option className="bg-slate-900">All Categories</option>
                  <option className="bg-slate-900">Electronics</option>
                  <option className="bg-slate-900">Audio</option>
                  <option className="bg-slate-900">Accessories</option>
                  <option className="bg-slate-900">Furniture</option>
                </select>
              </div>

              <div className="relative w-full sm:w-auto group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <SlidersHorizontal size={16} className="text-slate-400 group-hover:text-secondary-400 transition-colors" />
                </div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full sm:w-auto appearance-none bg-white/5 border border-white/10 hover:border-secondary-500/50 rounded-2xl pl-12 pr-10 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-secondary-500/50 transition-all cursor-pointer backdrop-blur-md"
                >
                  <option className="bg-slate-900">Sort: Featured</option>
                  <option className="bg-slate-900">Price: Low to High</option>
                  <option className="bg-slate-900">Price: High to Low</option>
                  <option className="bg-slate-900">Newest Arrivals</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <ProductGrid category={category} sort={sort} />
      </div>
    </div>
  );
}
