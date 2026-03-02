'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from '@/providers/Providers';
import Navbar from '@/components/layout/Navbar';
import { Heart, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, QrCode } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { t } = useLocale();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-12">
        <div className="floating-orb w-[600px] h-[600px] bg-brand-400/20 -top-60 -right-40" />
        <div className="floating-orb w-[500px] h-[500px] bg-teal-400/10 -bottom-40 -left-40" />

        <div className="relative w-full max-w-5xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

          {/* Donation Info - Shown as a 'Support the Project' message */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-md hidden lg:block"
          >
            <div className="glass-card p-8 border-brand-500/20 bg-brand-500/[0.02]">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-brand-500" fill="currentColor" />
              </div>
              <h2 className="text-3xl font-extrabold text-surface-900 dark:text-white mb-4">
                Keep HealthDocX <span className="gradient-text">Growing</span>
              </h2>
              <p className="text-surface-600 dark:text-surface-400 mb-8 leading-relaxed">
                We are a non-profit passion project. Your support helps us provide high-speed AI analysis and secure storage for thousands of Nepalis.
              </p>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-surface-900/50 border border-surface-100 dark:border-surface-800">
                <div className="w-16 h-16 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-surface-300" />
                </div>
                <div>
                  <div className="text-sm font-bold text-surface-900 dark:text-white uppercase tracking-wider">Project Fund</div>
                  <div className="text-xs text-surface-500 mt-0.5">Scan to support via eSewa / Khalti</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sign In Form */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="glass-card p-8 sm:p-10 shadow-2xl shadow-brand-500/10 border-brand-500/10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-bg shadow-lg shadow-brand-500/25 mb-4 hover:scale-110 transition-transform cursor-pointer">
                  <Heart className="w-7 h-7 text-white" fill="white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">
                  Welcome Back
                </h1>
                <p className="text-surface-500 mt-2">Sign in to your HealthDocX account</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-sm text-rose-600 dark:text-rose-400"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field pl-11"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field pl-11 pr-11"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3.5 group"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {t.nav.signin}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-surface-500 mt-8">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-brand-500 hover:text-brand-600 font-semibold transition-colors">
                  {t.nav.signup}
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
