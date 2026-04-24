import { ProductGrid } from "@/components/product-grid";

export default function ShopPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
        <div>
          <span className="text-primary-400 font-bold uppercase tracking-widest text-xs mb-2 block">
            The Collection
          </span>
          <h1 className="text-5xl font-black text-white">
            All Products
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-slate-300 focus:outline-none focus:border-primary/50 transition-colors">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Audio</option>
            <option>Accessories</option>
            <option>Furniture</option>
          </select>
          <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-slate-300 focus:outline-none focus:border-primary/50 transition-colors">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>
      </div>

      <ProductGrid />
    </div>
  );
}
