import { Hero } from "@/components/hero";
import { ProductGrid } from "@/components/product-grid";
import { Zap, Shield, Headphones, Award, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      
      {/* Categories Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-accent-400 font-bold uppercase tracking-widest text-xs mb-3 block flex items-center justify-center space-x-2">
              <Sparkles size={14} /> <span>Explore By Category</span> <Sparkles size={14} />
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Curated Collections
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {['Gaming & eSports', 'Creative Professional', 'Smart Home'].map((cat, i) => (
              <div key={cat} className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-2xl shadow-black/50">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800')` }}
                />
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">{cat}</h3>
                  <div className="h-[2px] w-0 group-hover:w-full bg-primary-500 transition-all duration-500 ease-out" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-black/20" id="features">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
            <div>
              <span className="text-secondary-400 font-bold uppercase tracking-widest text-xs mb-3 block">
                Top Rated Gear
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Featured Products
              </h2>
            </div>
            <button className="mt-6 md:mt-0 glass px-6 py-3 rounded-full text-white font-bold hover:bg-white/10 transition-colors flex items-center space-x-2 border border-white/10">
              <span>View All Catalog</span>
            </button>
          </div>
          
          <ProductGrid />
        </div>
      </section>

      {/* Epic Benefits Section */}
      <section className="relative py-32 border-y border-white/5 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary-600/10 rounded-[100%] blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Why Choose Us</h2>
            <p className="text-xl text-slate-400 font-light">We redefine standard e-commerce to bring you an unparalleled shopping experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-3xl glass border border-white/10 hover:border-primary-500/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary-500/30">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Hyper-Fast Delivery</h3>
              <p className="text-slate-400 leading-relaxed">Next-day shipping on all premium items across the continental US, powered by our advanced logistics network.</p>
            </div>
            
            <div className="p-8 rounded-3xl glass border border-white/10 hover:border-secondary-500/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-700 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-secondary-500/30">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Absolute Security</h3>
              <p className="text-slate-400 leading-relaxed">Military-grade AES-256 encryption secures your transactions. Your data is uncompromised.</p>
            </div>
            
            <div className="p-8 rounded-3xl glass border border-white/10 hover:border-accent-500/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-accent-500/30">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Elite Warranties</h3>
              <p className="text-slate-400 leading-relaxed">Every product comes with our signature 2-year comprehensive coverage against any defects.</p>
            </div>

            <div className="p-8 rounded-3xl glass border border-white/10 hover:border-primary-400/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary-400/30">
                <Headphones size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">24/7 Concierge Support</h3>
              <p className="text-slate-400 leading-relaxed">Instantly connect with human experts anytime you need guidance with your premium gear.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
