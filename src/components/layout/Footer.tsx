'use client';

import Link from 'next/link';
import { Heart, MapPin, Mail, Github, Twitter } from 'lucide-react';
import { useLocale } from '@/providers/Providers';

export default function Footer() {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-surface-200/50 dark:border-surface-800/50 bg-white/60 dark:bg-surface-950/60 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #8b5cf6, #14b8a6)' }}>
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-lg font-bold text-surface-900 dark:text-white">
                Health<span className="gradient-text">DocX</span>
              </span>
            </Link>
            <p className="text-sm text-surface-500 dark:text-surface-400 max-w-xs leading-relaxed mb-4">
              AI-powered medical document management — built by Nepalis, for Nepalis. Securely store and understand your health records.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-surface-400">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span>Proudly made in Nepal 🇳🇵</span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4 uppercase tracking-wider">
              Product
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: t.nav.about },
                { href: '/signin', label: t.nav.signin },
                { href: '/signup', label: t.nav.signup },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-surface-500 hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* For Patients links */}
          <div>
            <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4 uppercase tracking-wider">
              For Patients
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { href: '/dashboard', label: 'Dashboard' },
                { href: '/upload', label: 'Upload Documents' },
                { href: '/timeline', label: 'Health Timeline' },
                { href: '/family', label: 'Family Profiles' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-surface-500 hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4 uppercase tracking-wider">
              Contact & Legal
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                href="/about#contact"
                className="flex items-center gap-2 text-sm text-surface-500 hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-200"
              >
                <Mail className="w-3.5 h-3.5" />
                Contact Us
              </Link>
              {[
                'Privacy Policy',
                'Terms of Service',
                'HIPAA Compliance',
              ].map((item) => (
                <span key={item} className="text-sm text-surface-400 cursor-default">{item}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-surface-200/50 dark:border-surface-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-400">
            &copy; {currentYear} HealthDocX. All rights reserved.
          </p>
          <p className="text-xs text-surface-400 flex items-center gap-1">
            Made with{' '}
            <Heart className="w-3 h-3 text-rose-400 inline" fill="currentColor" />{' '}
            in Nepal, for better healthcare
          </p>
        </div>
      </div>
    </footer>
  );
}
