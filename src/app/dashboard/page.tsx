'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from '@/providers/Providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { formatDate, getCategoryColor } from '@/lib/utils';
import {
  FileText,
  Upload,
  Clock,
  Users,
  TrendingUp,
  ArrowRight,
  Loader2,
  Pill,
  FlaskConical,
  Scan,
  Shield,
  Syringe,
  Stethoscope,
  Scissors,
  File,
  FolderKanban,
  Sparkles,
  Activity,
  CheckCircle2,
  AlertCircle,
  Heart,
  Plus,
  Search,
  Bell,
} from 'lucide-react';

const categoryIcons: Record<string, any> = {
  prescription: Pill,
  'lab-report': FlaskConical,
  imaging: Scan,
  'discharge-summary': FileText,
  insurance: Shield,
  vaccination: Syringe,
  consultation: Stethoscope,
  surgery: Scissors,
  other: File,
};

const quickActionLinks = [
  { href: '/upload', icon: Upload, label: 'Upload Document', desc: 'Add a new record', gradient: 'from-brand-500 to-violet-500' },
  { href: '/documents', icon: FileText, label: 'All Documents', desc: 'Browse your vault', gradient: 'from-teal-500 to-emerald-500' },
  { href: '/timeline', icon: Clock, label: 'Health Timeline', desc: 'View your journey', gradient: 'from-violet-500 to-purple-500' },
  { href: '/family', icon: Users, label: 'Family Profiles', desc: 'Manage members', gradient: 'from-amber-500 to-orange-500' },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useLocale();
  const [documents, setDocuments] = useState<any[]>([]);
  const [familyCount, setFamilyCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      Promise.all([
        fetch('/api/documents?limit=10').then((r) => r.json()),
        fetch('/api/family').then((r) => r.json()),
      ]).then(([docsData, familyData]) => {
        setDocuments(docsData.documents || []);
        setFamilyCount(familyData.members?.length || 0);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [status]);

  const categories = useMemo(() => documents.reduce((acc: Record<string, number>, doc: any) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {}), [documents]);

  const recentDocs = documents.slice(0, 6);

  const weekDocs = useMemo(() => documents.filter((d: any) => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(d.createdAt) > weekAgo;
  }), [documents]);

  const healthScore = useMemo(() => {
    if (documents.length === 0) return 0;
    const base = Math.min(documents.length * 10, 60);
    const catBonus = Math.min(Object.keys(categories).length * 8, 25);
    const familyBonus = Math.min(familyCount * 5, 15);
    return Math.min(base + catBonus + familyBonus, 100);
  }, [documents, categories, familyCount]);

  if (status === 'loading' || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #8b5cf6, #14b8a6)' }}>
              <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
            <p className="text-surface-500 font-medium">{t.common.loading}</p>
          </div>
        </div>
      </>
    );
  }

  if (!session) return null;

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #8b5cf6)' }}>
                {session.user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">
                  {t.dashboard.welcome},{' '}
                  <span className="gradient-text">{session.user?.name?.split(' ')[0]}</span>
                </h1>
                <p className="text-sm text-surface-500">Here&apos;s your health record overview</p>
              </div>
            </div>
          </div>
          <Link href="/upload" className="btn-primary self-start sm:self-auto">
            <Plus className="w-4 h-4" />
            Upload Document
          </Link>
        </motion.div>

        {/* ===== STATS GRID ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {[
            {
              label: t.dashboard.totalDocuments,
              value: documents.length,
              icon: FileText,
              gradient: 'from-brand-500 to-violet-500',
              shadow: 'shadow-brand-500/20',
              trend: `+${weekDocs.length} this week`,
              trendUp: true,
            },
            {
              label: t.dashboard.categories,
              value: Object.keys(categories).length,
              icon: FolderKanban,
              gradient: 'from-teal-500 to-emerald-500',
              shadow: 'shadow-teal-500/20',
              trend: 'Document types',
              trendUp: null,
            },
            {
              label: t.dashboard.familyMembers,
              value: familyCount,
              icon: Users,
              gradient: 'from-violet-500 to-purple-500',
              shadow: 'shadow-violet-500/20',
              trend: 'Under your account',
              trendUp: null,
            },
            {
              label: t.dashboard.recentUploads,
              value: weekDocs.length,
              icon: TrendingUp,
              gradient: 'from-amber-500 to-orange-500',
              shadow: 'shadow-amber-500/20',
              trend: 'Last 7 days',
              trendUp: null,
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="stat-card group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg ${stat.shadow} group-hover:shadow-xl transition-shadow`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  {stat.trendUp !== null && (
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      ↑
                    </span>
                  )}
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-xs sm:text-sm font-medium text-surface-600 dark:text-surface-400">{stat.label}</p>
                <p className="text-xs text-surface-400 mt-0.5">{stat.trend}</p>
                {/* Shimmer decoration */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-br ${stat.gradient} pointer-events-none`}
                  style={{ opacity: '0.03' }} />
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* ===== RECENT DOCUMENTS ===== */}
          <div className="lg:col-span-2 space-y-5">

            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search your documents..."
                className="input-field pl-10"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white">
                  {t.dashboard.recentDocuments}
                </h2>
                <Link
                  href="/documents"
                  className="btn-ghost text-brand-500 hover:text-brand-600 text-sm"
                >
                  {t.dashboard.viewAll}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {recentDocs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-10 sm:p-14 text-center"
                >
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'linear-gradient(135deg, #4f46e520, #14b8a620)' }}>
                    <FileText className="w-10 h-10 text-brand-400" />
                  </div>
                  <h3 className="text-lg font-bold text-surface-800 dark:text-surface-200 mb-2">No documents yet</h3>
                  <p className="text-surface-500 mb-6 max-w-xs mx-auto">{t.dashboard.noDocuments}</p>
                  <Link href="/upload" className="btn-primary">
                    <Upload className="w-4 h-4" />
                    Upload First Document
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-2.5">
                  {recentDocs.map((doc: any, i: number) => {
                    const CatIcon = categoryIcons[doc.category] || File;
                    return (
                      <motion.div
                        key={doc._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="glass-card-hover p-4 sm:p-5 flex items-center gap-4 cursor-pointer"
                      >
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${getCategoryColor(doc.category)}`}>
                          <CatIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-surface-900 dark:text-white truncate">
                            {doc.title}
                          </h3>
                          <p className="text-xs text-surface-500 mt-0.5">
                            {doc.hospital || doc.category} &middot; {formatDate(doc.date)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${getCategoryColor(doc.category)}`}>
                            {doc.category.replace('-', ' ')}
                          </span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ===== SIDEBAR ===== */}
          <div className="space-y-5">
            {/* Health Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-surface-900 dark:text-white">Record Completeness</h3>
                <Activity className="w-4 h-4 text-brand-500" />
              </div>
              <div className="flex items-end gap-3 mb-3">
                <span className="text-4xl font-extrabold gradient-text">{healthScore}</span>
                <span className="text-lg font-medium text-surface-400 mb-1">/100</span>
              </div>
              <div className="progress-bar mb-3">
                <motion.div
                  className="progress-fill"
                  initial={{ width: '0%' }}
                  animate={{ width: `${healthScore}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className="text-xs text-surface-500">
                {healthScore < 30 ? '🔴 Upload more documents to improve your profile' :
                  healthScore < 60 ? '🟡 Good start — add more categories to complete your profile' :
                    '🟢 Great job! Your health records are well organized'}
              </p>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="glass-card p-6"
            >
              <h3 className="text-base font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-500" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {quickActionLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="p-3.5 rounded-xl border border-surface-200 dark:border-surface-700/50 bg-white/60 dark:bg-surface-800/40 hover:border-brand-300 dark:hover:border-brand-700 hover:-translate-y-0.5 transition-all duration-200 group"
                    >
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-2 group-hover:shadow-md transition-shadow`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-xs font-bold text-surface-800 dark:text-surface-200 leading-tight">{item.label}</p>
                      <p className="text-[10px] text-surface-400 mt-0.5">{item.desc}</p>
                    </Link>
                  );
                })}
              </div>
            </motion.div>

            {/* AI Insight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
              style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.05), rgba(20,184,166,0.05))' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #4f46e5, #14b8a6)' }}>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-surface-900 dark:text-white">AI Insight</h3>
              </div>
              {documents.length > 0 ? (
                <p className="text-xs text-surface-600 dark:text-surface-400 leading-relaxed">
                  You have <strong>{documents.length} documents</strong> across <strong>{Object.keys(categories).length} categories</strong>.
                  {weekDocs.length > 0 ? ` You uploaded ${weekDocs.length} document${weekDocs.length > 1 ? 's' : ''} this week.` : ' Keep adding records to build a complete health profile.'}
                </p>
              ) : (
                <p className="text-xs text-surface-600 dark:text-surface-400 leading-relaxed">
                  Upload your first medical document to get AI-powered insights about your health records.
                </p>
              )}
              {documents.length > 0 && (
                <Link href="/documents" className="mt-3 text-xs font-semibold text-brand-500 hover:text-brand-600 flex items-center gap-1">
                  View Analysis <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </motion.div>

            {/* Categories */}
            {Object.keys(categories).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="glass-card p-6"
              >
                <h3 className="text-base font-bold text-surface-900 dark:text-white mb-4">
                  {t.dashboard.categories}
                </h3>
                <div className="space-y-2.5">
                  {Object.entries(categories).map(([cat, count]) => {
                    const CatIcon = categoryIcons[cat] || File;
                    const pct = Math.round(((count as number) / documents.length) * 100);
                    return (
                      <div key={cat}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${getCategoryColor(cat)}`}>
                              <CatIcon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-medium text-surface-700 dark:text-surface-300 capitalize">
                              {cat.replace('-', ' ')}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-surface-900 dark:text-white">
                            {count as number}
                          </span>
                        </div>
                        <div className="progress-bar">
                          <motion.div
                            className="progress-fill"
                            initial={{ width: '0%' }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
