'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';
import { useCartStore } from '@/store/cart-store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const totalItems = useCartStore((state) => state.totalItems());
  const [mounted, setMounted] = useState(false);
  const { auth, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-premium rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white hidden sm:block">
              Shop<span className="text-primary-400">Ease</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</Link>
            <Link href="/shop" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Shop</Link>
            <Link href="/deals" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Deals</Link>
            <Link href="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</Link>
            {auth?.role === 'admin' ? (
              <Link href="/admin" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Admin</Link>
            ) : null}
            {auth ? (
              <button onClick={logout} className="text-sm font-medium text-white bg-accent px-4 py-2 rounded-full hover:bg-accent/90 transition">Logout</button>
            ) : (
              <Link href="/login" className="text-sm font-medium text-white bg-primary-500 px-4 py-2 rounded-full hover:bg-primary-400 transition">Login</Link>
            )}
          </div>

          <div className="flex items-center space-x-5">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-300 hover:text-white transition-colors"
            >
              <Search size={22} />
            </button>

            <Link href="/cart" className="relative p-2 text-slate-300 hover:text-white transition-colors group">
              <ShoppingCart size={22} />
              {mounted && totalItems > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center bg-accent text-[10px] font-bold text-white rounded-full border-2 border-slate-900 group-hover:scale-110 transition-transform">
                  {totalItems}
                </span>
              )}
            </Link>

            <button className="md:hidden p-2 text-slate-300 hover:text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-start justify-center pt-24" onClick={closeSearch}>
          <div className="w-full max-w-2xl mx-auto px-6" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="relative">
              <div className="glass rounded-2xl border border-primary-400/50 shadow-2xl shadow-primary-500/20">
                <div className="flex items-center px-6 py-4">
                  <Search size={24} className="text-primary-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="flex-1 bg-transparent text-2xl text-white placeholder-slate-500 ml-4 outline-none"
                  />
                  <button
                    type="button"
                    onClick={closeSearch}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              <p className="text-slate-400 text-sm mt-4 text-center">Press Enter to search or Esc to cancel</p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
