'use client';

import Image from 'next/image';
import { Star, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cart-store';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="group glass rounded-3xl overflow-hidden hover:border-primary/50 transition-all flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden">
        
        {/**
          * Use a fallback for invalid or missing image URLs.
          * Next.js Image throws on invalid external URLs.
          */}
          
        <Image
          src={
            product.image && product.image.trim() && /^(https?:\/\/)/i.test(product.image)
              ? product.image
              : product.image && product.image.trim().startsWith('/')
              ? product.image.trim()
              : '/image/gaming.jpg'
          }
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/20">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(product.rating) ? "fill-yellow-500 text-yellow-500" : "text-slate-600"}
            />
          ))}
          <span className="text-xs text-slate-400 ml-1">({product.rating})</span>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-primary-400 transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-black text-white">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={() => addItem({ ...product, quantity: 1 })}
            className="w-10 h-10 bg-white/10 hover:bg-gradient-premium rounded-xl flex items-center justify-center text-white transition-all transform active:scale-95"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
