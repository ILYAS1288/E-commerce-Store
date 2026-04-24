'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Intense Background Blobs for depth */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary-600/30 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary-600/30 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-accent-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center space-x-2 py-2 px-4 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-sm font-bold tracking-wider uppercase mb-8 backdrop-blur-md"
            >
              <Star size={16} className="fill-primary-400" />
              <span>The #1 Premium Tech Store</span>
            </motion.div>
            
            <h1 className="text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tight">
              Unleash <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-300 to-accent-400 drop-shadow-lg">
                Your Setup
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-300 mb-10 leading-relaxed max-w-xl font-light">
              Elevate your workspace with carefully curated premium gear. Unmatched quality, breathtaking design, and raw power.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-2xl shadow-2xl shadow-primary-500/30 hover:scale-105 hover:shadow-primary-500/50 transition-all duration-300 flex items-center justify-center space-x-3 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative text-lg">Shop The Collection</span>
                <ArrowRight size={24} className="relative group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="#features"
                className="w-full sm:w-auto px-10 py-5 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-colors flex items-center justify-center space-x-3 group border border-white/10 hover:border-white/20"
              >
                <span className="text-lg">Explore Features</span>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-12 flex items-center space-x-8 text-slate-400">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/5">
                  <span className="text-white font-bold">10k+</span>
                </div>
                <span className="text-sm font-medium">Happy<br/>Customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/5">
                  <span className="text-white font-bold">4.9</span>
                </div>
                <span className="text-sm font-medium">Average<br/>Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Floating Image Composition */}
          <div className="relative h-[600px] hidden lg:block perspective-1000">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 preserve-3d"
            >
              {/* Main Center Image */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[450px] rounded-3xl overflow-hidden shadow-2xl glass border border-white/20 z-20"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <Image 
                  src="https://images.unsplash.com/photo-1598550476439-6847785fce66?auto=format&fit=crop&q=80&w=800" 
                  alt="Premium Gaming Chair" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold w-fit mb-2">Featured</div>
                  <div className="text-white font-bold text-xl drop-shadow-md">AeroStream Chair</div>
                  <div className="text-primary-300 font-bold">$499.99</div>
                </div>
              </motion.div>

              {/* Top Right Floating Image */}
              <motion.div 
                className="absolute top-[10%] right-[5%] w-56 h-56 rounded-3xl overflow-hidden shadow-2xl glass border border-white/20 z-10"
                animate={{ y: [10, -10, 10], rotate: [2, -2, 2] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="absolute inset-0 bg-black/20 z-10" />
                <Image 
                  src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800" 
                  alt="4K Monitor" 
                  fill 
                  className="object-cover"
                />
              </motion.div>

              {/* Bottom Left Floating Image */}
              <motion.div 
                className="absolute bottom-[15%] left-[5%] w-64 h-48 rounded-3xl overflow-hidden shadow-2xl glass border border-white/20 z-30"
                animate={{ y: [-15, 15, -15], rotate: [-3, 3, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <div className="absolute inset-0 bg-black/20 z-10" />
                <Image 
                  src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800" 
                  alt="Mechanical Keyboard" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute bottom-4 right-4 z-20 flex bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
                  <ShoppingBag size={16} className="text-white" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
