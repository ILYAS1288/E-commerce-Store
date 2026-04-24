'use client';

import { useCartStore } from '@/store/cart-store';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="w-24 h-24 glass rounded-3xl flex items-center justify-center mx-auto mb-8 text-slate-600">
          <ShoppingBag size={48} />
        </div>
        <h1 className="text-4xl font-black text-white mb-4">Your cart is empty</h1>
        <p className="text-slate-400 mb-10 max-w-md mx-auto">
          Explore our premium collection and find something extraordinary.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-premium text-white font-bold rounded-2xl hover:scale-105 transition-transform"
        >
          <ArrowLeft size={20} />
          <span>Back to Shop</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-black text-white mb-12 flex items-center space-x-4">
        <span>Shopping Cart</span>
        <span className="text-xl font-medium text-slate-500">({items.length} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="glass rounded-3xl p-6 flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6">
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                <p className="text-primary-400 font-bold text-lg mb-4">${item.price.toFixed(2)}</p>
                
                <div className="flex items-center justify-center sm:justify-start space-x-4">
                  <div className="flex items-center glass rounded-xl px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-slate-400 hover:text-white transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold text-white text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-slate-400 hover:text-white transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <p className="text-2xl font-black text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="glass rounded-3xl p-8 sticky top-32">
            <h2 className="text-2xl font-bold text-white mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className="text-green-400 font-medium">Free</span>
              </div>
              <div className="h-px bg-white/10 my-4" />
              <div className="flex justify-between text-xl font-bold text-white">
                <span>Total</span>
                <span className="text-glow text-primary-400">${totalPrice().toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full py-4 bg-gradient-premium text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2">
              <span>Checkout Now</span>
              <ArrowRight size={20} />
            </button>
            
            <Link
              href="/shop"
              className="w-full mt-4 py-4 text-center text-slate-400 hover:text-white font-medium transition-colors block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline ArrowRight since it was missing from imports above but used in the component
function ArrowRight({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  );
}
