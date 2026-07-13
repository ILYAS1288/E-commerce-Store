'use client';

import { motion } from 'framer-motion';
import { Tag, Timer, Flame, ArrowRight, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function DealsPage() {
  const deals = [
    {
      id: 1,
      title: "UltraVision 4K OLED Monitor",
      originalPrice: 899.99,
      salePrice: 649.99,
      discount: "28% OFF",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
      endsIn: "04:21:45",
      stock: "Low Stock",
      hot: true
    },

    {
      id: 2,
      title: "SonicWave Wireless ANC",
      originalPrice: 349.99,
      salePrice: 199.99,
      discount: "43% OFF",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
      endsIn: "12:44:10",
      stock: "In Stock"
    },
    {
      id: 3,
      title: "AeroStream Gaming Chair",
      originalPrice: 499.99,
      salePrice: 389.99,
      discount: "22% OFF",
      image: "/image/gaming.jpg",
      endsIn: "08:15:30",
      stock: "Only 3 Left",
      hot: true
    },
    {
      id: 4,
      title: "Lumina RGB Mechanical Keyboard",
      originalPrice: 159.99,
      salePrice: 99.99,
      discount: "38% OFF",
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800",
      endsIn: "23:59:59",
      stock: "In Stock"
    }
  ];

  return (
    <div className="relative min-h-screen pb-24 overflow-hidden">
      {/* Intense Background Effects */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-accent-600/20 to-transparent pointer-events-none" />
      <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] bg-accent-600/30 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-primary-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-secondary-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      {/* Hero Header */}
      <div className="relative pt-32 pb-16 text-center z-10 px-6 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center space-x-2 py-2 px-4 rounded-full bg-accent-500/10 border border-accent-500/30 text-accent-400 text-sm font-bold tracking-wider uppercase mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(244,63,94,0.3)]">
            <Flame size={16} className="fill-accent-400 text-accent-400 animate-pulse" />
            <span>Black Friday Early Access</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight drop-shadow-2xl mb-6">
            Cyber
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-primary-300 to-secondary-400 px-4">
              Deals
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl font-light leading-relaxed mb-10">
            Unbeatable prices on the most premium setups. Once the timer hits zero, these offers are gone forever. Lock in your upgrades now.
          </p>

          <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-white">12</span>
              <span className="text-slate-400 text-xs uppercase font-bold tracking-widest">Hours</span>
            </div>
            <span className="text-3xl font-black text-accent-500 animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-white">44</span>
              <span className="text-slate-400 text-xs uppercase font-bold tracking-widest">Mins</span>
            </div>
            <span className="text-3xl font-black text-accent-500 animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-accent-400">10</span>
              <span className="text-slate-400 text-xs uppercase font-bold tracking-widest">Secs</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Deals Grid */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-black/40 backdrop-blur-md rounded-[2.5rem] p-6 lg:p-8 border border-white/10 overflow-hidden hover:border-accent-500/50 transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(244,63,94,0.15)] flex flex-col lg:flex-row gap-8 items-center"
            >
              {/* Image Section */}
              <div className="relative w-full lg:w-1/2 h-[300px] lg:h-[350px] rounded-3xl overflow-hidden glass shadow-2xl skew-x-0 group-hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                  <div className="px-3 py-1 bg-accent-500 text-white font-bold text-sm rounded-full tracking-wider shadow-[0_0_15px_rgba(244,63,94,0.5)]">
                    {deal.discount}
                  </div>
                  {deal.hot && (
                    <div className="flex items-center space-x-1 px-3 py-1 bg-amber-500 text-black font-bold text-sm rounded-full tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                      <Flame size={14} className="fill-black" />
                      <span>HOT</span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 z-20 hidden lg:flex items-center space-x-2 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 border border-white/10">
                  <Timer size={14} className="text-secondary-400" />
                  <span className="text-white text-xs font-bold tracking-wider">Ends in {deal.endsIn}</span>
                </div>
              </div>

              {/* Content Section */}
              
              <div className="w-full lg:w-1/2 flex flex-col justify-center h-full">
                <div className="flex items-center justify-between mb-4 lg:hidden">
                  <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 border border-white/10">
                    <Timer size={14} className="text-secondary-400" />
                    <span className="text-white text-xs font-bold tracking-wider">{deal.endsIn}</span>
                  </div>
                  <span className="text-accent-400 text-xs font-bold uppercase tracking-widest">{deal.stock}</span>
                </div>

                <span className="hidden lg:block text-accent-400 text-xs font-bold uppercase tracking-widest mb-3">{deal.stock}</span>

                <h2 className="text-3xl font-black text-white mb-4 leading-tight group-hover:text-primary-300 transition-colors">
                  {deal.title}
                </h2>

                <div className="flex items-end space-x-4 mb-8">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                    ${deal.salePrice}
                  </span>
                  <span className="text-xl font-bold text-slate-500 line-through pb-1">
                    ${deal.originalPrice}
                  </span>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 px-6 py-4 bg-gradient-to-r from-accent-600 to-accent-800 hover:from-accent-500 hover:to-accent-700 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] transition-all flex items-center justify-center space-x-2 group/btn">
                    <ShoppingCart size={20} />
                    <span>Claim Deal</span>
                  </button>
                  <Link
                    href="/shop"
                    className="px-6 py-4 glass border border-white/10 rounded-2xl text-white font-bold flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
