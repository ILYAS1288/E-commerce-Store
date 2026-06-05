'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from './product-card';

interface ProductGridProps {
  category?: string;
  sort?: string;
}

export const ProductGrid = ({ category = "All Categories", sort = "Sort: Featured" }: ProductGridProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      // Simple skeleton loaders for better UX during data fetching
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass h-[400px] rounded-3xl animate-pulse" />
        ))}
      </div>
    );
  }

  let filteredProducts = [...products];

  if (category && category !== "All Categories") {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (sort === "Price: Low to High") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "Price: High to Low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === "Newest Arrivals") {
    filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">No products found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
