'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Briefcase, BarChart3, Users, Package, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';

const stats = [
  { label: 'Total sales', value: '$24.8K', icon: BarChart3, accent: 'from-primary-500 to-secondary-500' },
  { label: 'Active users', value: '1.2K', icon: Users, accent: 'from-secondary-500 to-accent-500' },
  { label: 'Open orders', value: '87', icon: Package, accent: 'from-accent-500 to-primary-500' },
  { label: 'Secure reports', value: '24', icon: ShieldCheck, accent: 'from-primary-400 to-primary-600' },
];
 
export default function AdminPage() {
  const { auth, initialized, logout } = useAuth();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('0');
  const [formStatus, setFormStatus] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!initialized) return;
    if (!auth) {
      router.replace('/login');
      return;
    }
    if (auth.role !== 'admin') {
      router.replace('/');
      return;
    }
    setReady(true);
  }, [auth, initialized, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setFormStatus('');

    if (!name || !description || !price || !image || !category) {
      setFormError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          image,
          category,
          countInStock: Number(countInStock),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setFormError(result.error || 'Unable to add product.');
        return;
      }

      setFormStatus('Product added successfully.');
      setName('');
      setDescription('');
      setPrice('');
      setImage('');
      setCategory('');
      setCountInStock('0');
    } catch (error) {
      console.error('Product submit error:', error);
      setFormError('Failed to add product. Try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center text-white">
        <p className="text-lg">Checking admin access...</p>
      </div>
    );
  }

  return (
      
    <div className="container mx-auto px-6 py-24">
      <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-sm uppercase tracking-[0.35em] text-primary-300 font-bold">Admin dashboard</span>
          <h1 className="mt-3 text-5xl font-black text-white tracking-tight">Manage the store with confidence</h1>
          <p className="mt-4 max-w-2xl text-slate-400 leading-8">
            Review orders, manage inventory, and monitor site performance from one control center.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10">
            Back to storefront
          </Link>
          <button onClick={logout} className="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-400">
            Sign out
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-12">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="glass rounded-[2rem] p-8 border border-white/10 shadow-2xl shadow-black/20">
              <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${item.accent} text-white shadow-xl`}>
                <Icon size={24} />
              </div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{item.label}</p>
              <p className="mt-4 text-4xl font-black text-white">{item.value}</p>
            </div>
          );
        })}
      </div>

      <section className="glass rounded-[2rem] border border-white/10 p-8 shadow-2xl shadow-black/20 mb-12">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Add a new product</h2>
            <p className="mt-2 text-sm text-slate-400">Enter product details below to add inventory directly from the admin dashboard.</p>
          </div>
          <span className="rounded-full bg-slate-950/50 px-4 py-2 text-sm text-slate-300">Admin only</span>
        </div>

        <form className="grid gap-6 lg:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">
              Product name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-primary-400"
                placeholder="Wireless headphones"
                required
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              Description
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="mt-2 w-full min-h-[140px] rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-primary-400"
                placeholder="A premium wireless headset with noise cancellation and 30h battery life."
                required
              />
            </label>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">
              Price ($)
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-primary-400"
                placeholder="199.99"
                required
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              Image URL
              <input
                value={image}
                onChange={(event) => setImage(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-primary-400"
                placeholder="https://example.com/product.jpg"
                required
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              Category
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-primary-400"
                placeholder="Audio"
                required
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              Stock quantity
              <input
                type="number"
                min="0"
                value={countInStock}
                onChange={(event) => setCountInStock(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-primary-400"
                required
              />
            </label>

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Adding product...' : 'Add product'}
              </button>
              {formStatus ? <p className="text-sm text-emerald-400">{formStatus}</p> : null}
              {formError ? <p className="text-sm text-rose-400">{formError}</p> : null}
            </div>
          </div>
        </form>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="glass rounded-[2rem] border border-white/10 p-8 shadow-2xl shadow-black/20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Recent Activity</h2>
              <p className="text-sm text-slate-400">Latest orders and product updates at a glance.</p>
            </div>
            <button className="rounded-full bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition">View all</button>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Order #5241 placed', detail: 'High-end headset shipped to Milan', time: '15 min ago' },
              { title: 'New product added', detail: 'Gaming laptop updated in inventory', time: '1 hr ago' },
              { title: 'User support ticket', detail: 'Payment issue reported by customer', time: '2 hr ago' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
                  </div>
                  <p className="text-sm text-slate-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="glass rounded-[2rem] border border-white/10 p-8 shadow-2xl shadow-black/20">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white">Quick actions</h2>
            <p className="mt-2 text-sm text-slate-400">Jump to management tools for faster updates.</p>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Products', description: 'Edit catalog, update stock levels, and upload new images.', icon: Briefcase },
              { title: 'Orders', description: 'Track fulfillment and review open customer requests.', icon: Package },
              { title: 'User access', description: 'Manage admin roles and support staff permissions.', icon: Users },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.title} className="w-full rounded-3xl border border-white/10 bg-slate-950/40 p-5 text-left transition hover:border-primary-400 hover:bg-slate-900">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/5 text-primary-300">
                      <Icon size={20} />
                    </span>
                    <div>
                      <p className="text-base font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
