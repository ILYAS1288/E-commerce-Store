'use client';

import { useCartStore } from '@/store/cart-store';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) return null;

  const processOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          totalAmount: totalPrice(),
          userEmail: formData.email,
          customerName: formData.name,
          customerPhone: formData.phone,
          shippingAddress: formData.address
        })
      });

      if (res.ok) {
        setSuccess(true);
        setIsCheckingOut(false);
        clearCart();
      } else {
        alert("Failed to process order.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckoutClick = () => {
    setIsCheckingOut(true);
  };
  if (success) {
    return (
      <div className="container mx-auto px-6 py-20 text-center min-h-screen flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-8 text-green-400">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-5xl font-black text-white mb-4">Order Confirmed!</h1>
        <p className="text-xl text-slate-400 mb-10 max-w-md mx-auto">
          Thank you for choosing ShopEase. Your premium gear is being prepared for shipment.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-premium text-white font-bold rounded-2xl hover:scale-105 transition-transform"
        >
          <span>Continue Shopping</span>
          <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      // Empty cart state with a call-to-action to explore products
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
// Checkout form state
  if (isCheckingOut) {
    return (
      <div className="container mx-auto px-6 py-12 pb-32 max-w-2xl">
        <button
          onClick={() => setIsCheckingOut(false)}
          className="flex items-center space-x-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Cart</span>
        </button>

        <h1 className="text-4xl font-black text-white mb-2">Shipping Details</h1>
        <p className="text-slate-400 mb-8">Please enter your information to complete the order.</p>

        <form onSubmit={processOrder} className="glass rounded-3xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Full Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
              placeholder="John Doe"
            />
          </div>
          {/* Email Address */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Email Address</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
              placeholder="john@example.com"
            />
          </div>
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Phone Number</label>
            <input
              required
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
              placeholder="+1 (555) 123-4567"
            />
          </div>
            {/* Delivery Address */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Delivery Address</label>
            <textarea
              required
              rows={3}
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors resize-none"
              placeholder="123 Premium Street, Tech City, TC 90210"
            />
          </div>
 
          <div className="h-px bg-white/10 my-4" />

          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-white">Total Amount</span>
            <span className="text-2xl font-black text-glow text-primary-400">${totalPrice().toFixed(2)}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-premium text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2 disabled:opacity-50 disabled:scale-100"
          >
            <span>{loading ? 'Processing Order...' : 'Complete Purchase'}</span>
            {!loading && <CheckCircle2 size={20} />}
          </button>
        </form>
      </div>
    );
  }

  
  return (
    // Main cart page with list of items and order summary
    <div className="container mx-auto px-6 py-12 pb-32">
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
        // Order summary sidebar

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

            <button
              onClick={handleCheckoutClick}
              disabled={loading}
              className="w-full py-4 bg-gradient-premium text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2 disabled:opacity-50 disabled:scale-100"
            >
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
