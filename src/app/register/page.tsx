'use client';

import { useState } from 'react';
import { useRouter, Link } from 'next/navigation';
import { UserPlus, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
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
          <span className="text-sm uppercase tracking-[0.35em] text-primary-300 font-bold">Create account</span>
          <h1 className="text-5xl font-black text-white tracking-tight">Join ShopEase today</h1>
          <p className="text-slate-400 text-lg leading-8">
            Create your account to start shopping and enjoy exclusive deals and fast checkout.
          </p>
          <div className="space-y-2 text-sm text-slate-400">
            <p className="font-semibold text-slate-300">Already have an account?</p>
            <Link href="/login" className="text-primary-400 hover:text-primary-300 flex items-center gap-2">
              <ArrowLeft size={16} />
              Sign in instead
            </Link>
          </div>
        </div>

        <div className="glass rounded-[2rem] border border-white/10 p-10 shadow-2xl shadow-black/40">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary-500/10 text-primary-300 mb-4">
              <UserPlus size={28} />
            </div>
            <h2 className="text-3xl font-semibold text-white">Create your account</h2>
            <p className="mt-2 text-sm text-slate-400">Fill in your details to get started.</p>
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
                  placeholder="Create a password"
                  minLength={6}
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

            <label className="block text-sm text-slate-300 relative">
              Confirm Password
              <div className="relative mt-3">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  disabled={loading}
                  placeholder="Confirm your password"
                  minLength={6}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/30 px-4 py-4 pr-12 text-white outline-none transition focus:border-primary-400 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white disabled:opacity-50"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </label>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
