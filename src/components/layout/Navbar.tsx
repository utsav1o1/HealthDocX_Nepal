'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/providers/Providers';
import {
  Menu,
  X,
  Heart,
  LayoutDashboard,
  Upload,
  FileText,
  Clock,
  Users,
  LogOut,
  LogIn,
  Globe,
  ChevronDown,
} from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { locale, setLocale, t } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = session
    ? [
      { href: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
      { href: '/upload', label: t.nav.upload, icon: Upload },
      { href: '/documents', label: t.nav.documents, icon: FileText },
      { href: '/timeline', label: t.nav.timeline, icon: Clock },
      { href: '/family', label: t.nav.family, icon: Users },
      { href: '/donation', label: 'Donation', icon: Heart },
    ]
    : [
      { href: '/', label: t.nav.home, icon: Heart },
      { href: '/about', label: t.nav.about, icon: FileText },
      { href: '/contact', label: 'Contact', icon: Globe },
    ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-white/80 dark:bg-surface-950/80 backdrop-blur-2xl shadow-lg shadow-black/[0.04] border-b border-surface-200/50 dark:border-surface-800/50'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href={session ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow duration-300"
                  style={{ background: 'linear-gradient(135deg, #4f46e5, #8b5cf6, #14b8a6)' }}>
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-teal-400 rounded-full border-2 border-white dark:border-surface-950 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-surface-900 dark:text-white">
                  Health<span className="gradient-text">DocX</span>
                </span>
                <span className="text-[10px] font-medium text-surface-400 -mt-1 tracking-widest uppercase">
                  v3.0
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800/50'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-brand-50 dark:bg-brand-500/10 rounded-xl -z-10 border border-brand-200/50 dark:border-brand-500/20"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="btn-ghost flex items-center gap-1.5 text-xs sm:text-sm"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">{locale === 'en' ? 'EN' : 'NE'}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-36 glass-card p-1.5 z-50"
                    >
                      <button
                        onClick={() => { setLocale('en'); setLangOpen(false); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${locale === 'en'
                          ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium'
                          : 'hover:bg-surface-100 dark:hover:bg-surface-800'
                          }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => { setLocale('ne'); setLangOpen(false); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${locale === 'ne'
                          ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium'
                          : 'hover:bg-surface-100 dark:hover:bg-surface-800'
                          }`}
                      >
                        नेपाली
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Auth buttons */}
              {session ? (
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-100 dark:bg-surface-800/50">
                    <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
                      {session.user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300 max-w-[100px] truncate">
                      {session.user?.name}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="btn-ghost text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link href="/signin" className="btn-ghost">
                    <LogIn className="w-4 h-4" />
                    {t.nav.signin}
                  </Link>
                  <Link href="/signup" className="btn-primary text-xs sm:text-sm">
                    {t.nav.signup}
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden btn-ghost p-2"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-surface-900 shadow-2xl p-6 pt-24">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                        ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400'
                        : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  );
                })}

                <div className="my-3 border-t border-surface-200 dark:border-surface-700" />

                {session ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold">
                        {session.user?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-900 dark:text-white">{session.user?.name}</p>
                        <p className="text-xs text-surface-500">{session.user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
                    >
                      <LogOut className="w-5 h-5" />
                      {t.nav.signout}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                    >
                      <LogIn className="w-5 h-5" />
                      {t.nav.signin}
                    </Link>
                    <Link href="/signup" className="btn-primary mt-2">
                      {t.nav.signup}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 sm:h-20" />
    </>
  );
}
