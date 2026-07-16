'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  ArrowUp, 
  Mail, 
  Check, 
  Send,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSubscribed(true);
    setEmail('');
    
    // Reset subscription status after 5 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative w-full bg-slate-950 border-t border-slate-900 overflow-hidden">
      {/* Premium glow effect at the top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-premium" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Trust Badges Bar */}
      <div className="border-b border-slate-900 bg-slate-950/40">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800/60">
            <div className="flex flex-col items-center justify-center p-4 group">
              <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Truck size={24} />
              </div>
              <h4 className="text-white font-semibold mb-1">Hyper-Fast Shipping</h4>
              <p className="text-slate-400 text-sm max-w-xs">Free shipping on all premium orders over $150</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 group">
              <div className="w-12 h-12 rounded-2xl bg-secondary-500/10 flex items-center justify-center text-secondary-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <RotateCcw size={24} />
              </div>
              <h4 className="text-white font-semibold mb-1">30-Day Elite Return</h4>
              <p className="text-slate-400 text-sm max-w-xs">Hassle-free return policy with prepaid shipping labels</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 group">
              <div className="w-12 h-12 rounded-2xl bg-accent-500/10 flex items-center justify-center text-accent-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield size={24} />
              </div>
              <h4 className="text-white font-semibold mb-1">2-Year Elite Warranty</h4>
              <p className="text-slate-400 text-sm max-w-xs">Comprehensive coverage against any hardware defects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-premium rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Shop<span className="text-primary-400">Ease</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              ShopEase is the ultimate storefront for gaming gear, smart home automation, and creative professional equipment. Elevate your setup today.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {[
                { 
                  name: 'Twitter', 
                  href: 'https://twitter.com', 
                  color: 'hover:text-sky-400 hover:border-sky-400/40 hover:shadow-sky-400/10',
                  svg: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )
                },
                { 
                  name: 'Instagram', 
                  href: 'https://instagram.com', 
                  color: 'hover:text-pink-500 hover:border-pink-500/40 hover:shadow-pink-500/10',
                  svg: (
                    <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )
                },
                { 
                  name: 'YouTube', 
                  href: 'https://youtube.com', 
                  color: 'hover:text-red-500 hover:border-red-500/40 hover:shadow-red-500/10',
                  svg: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.5 12 3.5 12 3.5s-7.524 0-9.388.555a3.003 3.003 0 0 0-2.11 2.108C0 8.029 0 12 0 12s0 3.971.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.476 20.5 12 20.5 12 20.5s7.524 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.971 24 12 24 12s0-3.971-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )
                },
                { 
                  name: 'GitHub', 
                  href: 'https://github.com', 
                  color: 'hover:text-slate-300 hover:border-slate-300/40 hover:shadow-slate-300/10',
                  svg: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  )
                },
                { 
                  name: 'LinkedIn', 
                  href: 'https://linkedin.com', 
                  color: 'hover:text-blue-500 hover:border-blue-500/40 hover:shadow-blue-500/10',
                  svg: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )
                },
              ].map((social, index) => {
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:scale-110 hover:shadow-lg transition-all duration-300 ${social.color}`}
                  >
                    {social.svg}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Shop */}
            <div className="flex flex-col space-y-4">
              <h5 className="text-white font-semibold tracking-wider text-sm uppercase">Shop</h5>
              <ul className="flex flex-col space-y-2 text-sm">
                <li><Link href="/shop?category=gaming" className="text-slate-400 hover:text-white transition-colors">Gaming & eSports</Link></li>
                <li><Link href="/shop?category=creative" className="text-slate-400 hover:text-white transition-colors">Creative Professional</Link></li>
                <li><Link href="/shop?category=smarthome" className="text-slate-400 hover:text-white transition-colors">Smart Home</Link></li>
                <li><Link href="/deals" className="text-slate-400 hover:text-white transition-colors">Hot Deals</Link></li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div className="flex flex-col space-y-4">
              <h5 className="text-white font-semibold tracking-wider text-sm uppercase">Company</h5>
              <ul className="flex flex-col space-y-2 text-sm">
                <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About Us</Link></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Store Locator</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Press Kit</a></li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div className="flex flex-col space-y-4 col-span-2 sm:col-span-1">
              <h5 className="text-white font-semibold tracking-wider text-sm uppercase">Support</h5>
              <ul className="flex flex-col space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Help Center</a></li>
                <li><Link href="/cart" className="text-slate-400 hover:text-white transition-colors">Track Order</Link></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Shipping & Delivery</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Returns & Refunds</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h5 className="text-white font-semibold tracking-wider text-sm uppercase">Newsletter</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Subscribe to receive updates, access to exclusive deals, and early tech releases.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-2 relative">
              {subscribed ? (
                <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-xl transition-all duration-300">
                  <Check size={18} className="animate-bounce" />
                  <span className="text-sm font-medium">Successfully subscribed!</span>
                </div>
              ) : (
                <div className="relative flex items-center">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-2 p-2 rounded-lg bg-gradient-premium text-white hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary-500/20"
                  >
                    <Send size={14} />
                  </button>
                </div>
              )}
              {error && (
                <p className="text-red-400 text-xs mt-1 transition-all">{error}</p>
              )}
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright, Payments, Scroll-To-Top */}
      <div className="border-t border-slate-900 bg-slate-950">
        <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Copyright & Legal links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <p className="text-slate-500 text-xs">
              &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
            </p>
            <div className="hidden sm:flex items-center space-x-4 text-xs text-slate-500">
              <span className="w-1 h-1 bg-slate-800 rounded-full" />
              <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
              <span className="w-1 h-1 bg-slate-800 rounded-full" />
              <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            </div>
          </div>

          {/* Payments & Scroll to Top */}
          <div className="flex items-center gap-6">
            {/* Mini visual representation of payment methods */}
            <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Visa</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">MC</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">AMEX</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">PayPal</span>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850 hover:border-slate-700 flex items-center justify-center transition-all duration-300"
            >
              <ArrowUp size={18} />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
