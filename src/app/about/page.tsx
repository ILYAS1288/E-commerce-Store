'use client';

import { motion } from 'framer-motion';
import { Target, Shield, Users, Zap, Globe, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const values = [
    {
      icon: <Target size={32} />,
      title: "Unyielding Quality",
      description: "We don't settle for 'good enough'. Every product in our catalog undergoes rigorous testing. If it's not premium, it doesn't make the cut.",
      color: "from-primary-500 to-primary-700"
    },
    {
      icon: <Shield size={32} />,
      title: "Absolute Trust",
      description: "Your security and satisfaction are our primary directives. We provide transparent pricing, military-grade encryption, and ironclad warranties.",
      color: "from-secondary-500 to-secondary-700"
    },
    {
      icon: <Users size={32} />,
      title: "Community First",
      description: "We are gamers, creators, and professionals. We build for our own kind, ensuring our support and services cater exactly to your needs.",
      color: "from-accent-500 to-accent-700"
    }
  ];

  return (
    <div className="relative min-h-screen pb-24 overflow-hidden">
      {/* Intense Background Effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-secondary-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[0%] right-[10%] w-[500px] h-[500px] bg-accent-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center space-x-2 py-2 px-4 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-bold tracking-wider uppercase mb-8 backdrop-blur-md">
              <Globe size={16} className="text-secondary-400" />
              <span>Our Story</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
              Redefining <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-300 to-primary-500 drop-shadow-xl">
                E-Commerce
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 leading-relaxed font-light mb-8">
              Born from a frustration with mediocre marketplaces, ShopEase was founded in 2026 to create an uncompromising standard for premium gear selection. We eliminate the noise so you only see the absolute best.
            </p>

            <div className="flex items-center space-x-8">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-white">50+</span>
                <span className="text-primary-400 uppercase tracking-widest text-xs font-bold mt-1">Premium Brands</span>
              </div>
              <div className="w-[1px] h-12 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-4xl font-black text-white">2M+</span>
                <span className="text-secondary-400 uppercase tracking-widest text-xs font-bold mt-1">Orders Shipped</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 relative h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-secondary-500/20 rounded-[3rem] blur-2xl" />
            <div className="relative h-full w-full rounded-[3rem] overflow-hidden glass border border-white/20 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
                alt="ShopEase Team Headquarters" 
                fill 
                className="object-cover mix-blend-overlay opacity-80 scale-105 hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <h3 className="text-3xl font-black text-white mb-2">The Nexus</h3>
                <p className="text-slate-300">Our global staging ground in San Francisco.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 relative z-10 border-y border-white/5 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Core Directives</h2>
            <p className="text-xl font-light text-slate-400">The unshakeable pillars of our operation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <motion.div 
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${val.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg`}>
                  {val.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                  {val.title}
                </h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Founders */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div>
              <span className="text-accent-400 font-bold uppercase tracking-widest text-xs mb-3 block flex items-center space-x-2">
                <Sparkles size={14} /> <span>Leadership</span>
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Meet The Architects</h2>
            </div>
            <p className="mt-6 md:mt-0 max-w-sm text-slate-400 font-light">
              We assembled industry veterans who actually use the products they sell.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Founder 1 */}
            <div className="group relative rounded-3xl overflow-hidden glass border border-white/10 h-96">
              <Image 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600" 
                alt="Marcus Chen - CEO" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-xl font-bold text-white">Marcus Chen</h4>
                <p className="text-primary-400 font-bold tracking-wider text-sm uppercase">CEO & Founder</p>
              </div>
            </div>

            {/* Founder 2 */}
            <div className="group relative rounded-3xl overflow-hidden glass border border-white/10 h-96 mt-0 lg:mt-12">
              <Image 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" 
                alt="Sarah Jenkins - CPO" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-xl font-bold text-white">Sarah Jenkins</h4>
                <p className="text-secondary-400 font-bold tracking-wider text-sm uppercase">Head of Product</p>
              </div>
            </div>

            {/* Founder 3 */}
            <div className="group relative rounded-3xl overflow-hidden glass border border-white/10 h-96">
              <Image 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600" 
                alt="David Park - CTO" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-xl font-bold text-white">David Park</h4>
                <p className="text-accent-400 font-bold tracking-wider text-sm uppercase">CTO</p>
              </div>
            </div>

            {/* Join Us CTA */}
            <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-900 to-black border border-primary-500/30 h-96 mt-0 lg:mt-12 flex flex-col items-center justify-center p-8 text-center hover:border-primary-500 transition-colors cursor-pointer shadow-2xl hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]">
              <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mb-6 text-primary-400 group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">Join the Elite</h4>
              <p className="text-slate-400 pb-6">We're always looking for top-tier talent.</p>
              <button className="px-6 py-2 rounded-full border border-white/20 text-white font-bold hover:bg-white text-sm hover:text-black transition-colors">
                View Careers
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
