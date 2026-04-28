'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      login({ email: data.user.email, role: data.user.role });
      router.push('/');
    } catch (err) {
      setError('Failed to connect to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-24">
      <div className="max-w-5xl mx-auto grid gap-16 lg:grid-cols-[1.2fr_1fr] items-center">
        <div className="space-y-6">
          <span className="text-sm uppercase tracking-[0.35em] text-primary-300 font-bold">Secure sign in</span>
          <h1 className="text-5xl font-black text-white tracking-tight">Login before opening the site</h1>
          <p className="text-slate-400 text-lg leading-8">
            Access the website with a user or admin role. Use the credentials below for demo login.
          </p>
          <div className="space-y-2 text-sm text-slate-400">
            <p className="font-semibold text-slate-300">Demo Credentials:</p>
            <p>Admin: admin@example.com / adminpass</p>
            <p>User: user@example.com / userpass</p>
          </div>
        </div>

        <div className="glass rounded-[2rem] border border-white/10 p-10 shadow-2xl shadow-black/40">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary-500/10 text-primary-300 mb-4">
              <Lock size={28} />
            </div>
            <h2 className="text-3xl font-semibold text-white">Sign in to continue</h2>
            <p className="mt-2 text-sm text-slate-400">Login with your database account to access the site.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="block text-sm text-slate-300">
              Email address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                disabled={loading}
                placeholder="name@example.com"
                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/30 px-4 py-4 text-white outline-none transition focus:border-primary-400 disabled:opacity-50"
              />
            </label>

            <label className="block text-sm text-slate-300 relative">
              Password
              <div className="relative mt-3">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={loading}
                  placeholder="Enter your password"
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/30 px-4 py-4 pr-12 text-white outline-none transition focus:border-primary-400 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white disabled:opacity-50"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </label>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
