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
