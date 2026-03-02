'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from '@/providers/Providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Brain,
  Cloud,
  FolderKanban,
  Users,
  Clock,
  Download,
  Upload,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Heart,
  MapPin,
  Activity,
  Lock,
  Star,
  TrendingUp,
  FileText,
} from 'lucide-react';

const featureIcons = [Brain, Cloud, FolderKanban, Users, Clock, Download];

const statsData = [
  { value: '30M+', label: 'Nepalis Who Need This', icon: Users },
  { value: '95%', label: 'Paper-based Records in Nepal', icon: FileText },
  { value: 'AI', label: 'Powered Analysis', icon: Brain },
  { value: '100%', label: 'Secure & Private', icon: Shield },
];

export default function LandingPage() {
  const { t } = useLocale();

  return (
    <>
      <Navbar />

      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center mesh-bg">
        {/* Background decorations */}
        <div className="floating-orb w-[700px] h-[700px] bg-brand-400 -top-60 -right-60" />
        <div className="floating-orb w-[500px] h-[500px] bg-teal-400 bottom-0 -left-40" style={{ animationDelay: '2s' }} />
        <div className="floating-orb w-[300px] h-[300px] bg-violet-400 top-1/3 left-1/3" style={{ animationDelay: '4s' }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Nepal badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap items-center gap-3 mb-8"
              >
                <span className="section-label">
                  <MapPin className="w-3.5 h-3.5" />
                  Built for Nepal
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/20 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <Sparkles className="w-3 h-3" />
                  AI-Powered
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-surface-900 dark:text-white leading-[1.08]">
                {t.landing.heroTitle.split('\n').map((line, i) => (
                  <span key={i}>
                    {i === 1 ? <span className="gradient-text">{line}</span> : line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-surface-500 dark:text-surface-400 leading-relaxed max-w-xl">
                {t.landing.heroSubtitle}
              </p>

              {/* Nepal context note */}
              <div className="mt-5 flex items-start gap-2.5 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-500/20">
                <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                  In Nepal, over 95% of health records are paper-based and easily lost. HealthDocX changes that — for free.
                </p>
              </div>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="btn-primary text-base px-8 py-4">
                  {t.landing.heroCta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/about" className="btn-secondary text-base px-8 py-4">
                  Our Story
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-white dark:border-surface-900 flex items-center justify-center text-xs font-bold text-white shadow-sm"
                      style={{ background: ['#4f46e5', '#14b8a6', '#8b5cf6', '#f59e0b'][i] }}
                    >
                      {['A', 'B', 'R', 'S'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-surface-500 mt-0.5">Trusted by patients & families across Nepal</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main card */}
                <div className="glass-card p-8 relative z-10 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/25 will-change-transform"
                      style={{ background: 'linear-gradient(135deg, #4f46e5, #8b5cf6, #14b8a6)' }}>
                      <Heart className="w-6 h-6 text-white" fill="white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-surface-900 dark:text-white">Medical Record</h3>
                      <p className="text-sm text-surface-500">AI Analysis Complete ✓</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Secured</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { icon: CheckCircle2, color: 'emerald', label: 'Diagnosis', value: 'Routine check-up — All clear' },
                      { icon: Zap, color: 'brand', label: 'Prescribed Medication', value: 'Vitamin D 1000 IU — Daily' },
                      { icon: Shield, color: 'violet', label: 'Next Follow-up', value: 'B.P. check in 3 months' },
                      { icon: Activity, color: 'teal', label: 'Blood Pressure', value: '118/76 mmHg — Normal' },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      const colors: Record<string, string> = {
                        emerald: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50 dark:border-emerald-500/20 text-emerald-500',
                        brand: 'bg-brand-50 dark:bg-brand-500/10 border-brand-200/50 dark:border-brand-500/20 text-brand-500',
                        violet: 'bg-violet-50 dark:bg-violet-500/10 border-violet-200/50 dark:border-violet-500/20 text-violet-500',
                        teal: 'bg-teal-50 dark:bg-teal-500/10 border-teal-200/50 dark:border-teal-500/20 text-teal-500',
                      };
                      const textColors: Record<string, string> = {
                        emerald: 'text-emerald-700 dark:text-emerald-300',
                        brand: 'text-brand-700 dark:text-brand-300',
                        violet: 'text-violet-700 dark:text-violet-300',
                        teal: 'text-teal-700 dark:text-teal-300',
                      };
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className={`p-3.5 rounded-xl border ${colors[item.color].split(' ').slice(0, 4).join(' ')}`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${colors[item.color].split(' ').slice(4).join(' ')}`} />
                            <span className={`text-xs font-semibold ${textColors[item.color]}`}>{item.label}</span>
                          </div>
                          <p className={`text-xs mt-1 ml-6 ${textColors[item.color]} opacity-80`}>{item.value}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-5 -right-6 glass-card px-4 py-2.5 flex items-center gap-2 z-20 shadow-xl"
                >
                  <Brain className="w-4 h-4 text-brand-500" />
                  <span className="text-sm font-semibold text-surface-700 dark:text-surface-300">AI Analyzed</span>
                </motion.div>

                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-5 -left-6 glass-card px-4 py-2.5 flex items-center gap-2 z-20 shadow-xl"
                >
                  <Lock className="w-4 h-4 text-teal-500" />
                  <span className="text-sm font-semibold text-surface-700 dark:text-surface-300">End-to-End Encrypted</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="relative py-12 sm:py-16 border-y border-surface-200/60 dark:border-surface-800/40 bg-white/60 dark:bg-surface-900/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {statsData.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #4f46e540, #14b8a640)' }}>
                    <Icon className="w-6 h-6 text-brand-500" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold gradient-text">{stat.value}</div>
                  <div className="text-sm text-surface-500 mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="relative section-padding">
        <div className="floating-orb w-[500px] h-[500px] bg-violet-400 top-0 -left-60" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="section-label mx-auto">
              <Sparkles className="w-3.5 h-3.5" />
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-surface-900 dark:text-white">
              {t.landing.featuresTitle}
            </h2>
            <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto leading-relaxed">
              A complete ecosystem for managing your medical records — designed for how Nepal actually works.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {t.landing.features.map((feature, i) => {
              const Icon = featureIcons[i] || Brain;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-card-hover p-8 group"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 will-change-transform"
                    style={{ background: 'linear-gradient(135deg, #4f46e518, #14b8a618)' }}>
                    <Icon className="w-7 h-7 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-surface-500 dark:text-surface-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="relative section-padding bg-gradient-to-b from-surface-50 to-white dark:from-surface-950 dark:to-surface-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="section-label mx-auto">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-surface-900 dark:text-white">
              {t.landing.howItWorksTitle}
            </h2>
            <p className="mt-4 text-lg text-surface-500 max-w-xl mx-auto">
              From paper to digital in seconds — no tech skills needed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 relative">
            <div className="hidden md:block absolute top-20 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-brand-500/20 via-teal-500/50 to-brand-500/20" />

            {t.landing.steps.map((step, i) => {
              const icons = [Upload, Sparkles, CheckCircle2];
              const Icon = icons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center relative"
                >
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl shadow-brand-500/20 will-change-transform"
                      style={{ background: 'linear-gradient(135deg, #4f46e5, #8b5cf6, #14b8a6)' }}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-surface-900 border-2 border-brand-500 flex items-center justify-center text-sm font-bold text-brand-500 shadow-md">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-surface-500 dark:text-surface-400 max-w-xs mx-auto leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== NEPAL CONTEXT SECTION ========== */}
      <section className="relative section-padding overflow-hidden">
        <div className="floating-orb w-[400px] h-[400px] bg-teal-400 -bottom-20 -right-20" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label">
                <MapPin className="w-3.5 h-3.5" />
                Why Nepal Needs This
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white mb-6">
                Healthcare in Nepal is{' '}
                <span className="gradient-text">still paper-based</span>
              </h2>
              <p className="text-lg text-surface-500 dark:text-surface-400 leading-relaxed mb-6">
                Most Nepali citizens receive prescriptions, lab reports, and discharge summaries on paper — which get lost, damaged by monsoons, or forgotten at home when visiting a new doctor.
              </p>
              <p className="text-lg text-surface-500 dark:text-surface-400 leading-relaxed mb-8">
                HealthDocX was built by a Nepali developer to solve this exact problem — a simple, AI-powered vault for your entire health history.
              </p>
              <Link href="/about" className="btn-primary">
                Read Our Full Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {[
                { icon: TrendingUp, title: 'Growing Healthcare Needs', desc: 'Nepal\'s population increasingly visits multiple hospitals but has no centralized health history.' },
                { icon: MapPin, title: 'Remote Area Access', desc: 'Patients traveling from hills to Kathmandu often arrive with no prior records, forcing repeated tests.' },
                { icon: Shield, title: 'Data Security', desc: 'Your health data stays yours — no hospital, no third party, no government without your consent.' },
                { icon: Users, title: 'Family Health Management', desc: 'Manage records for your parents, spouse, and children all under one account — critical in Nepal\'s joint family culture.' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="glass-card p-5"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: 'linear-gradient(135deg, #4f46e520, #14b8a620)' }}>
                      <Icon className="w-5 h-5 text-brand-500" />
                    </div>
                    <h4 className="text-sm font-bold text-surface-900 dark:text-white mb-1.5">{item.title}</h4>
                    <p className="text-xs text-surface-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="relative section-padding overflow-hidden">
        <div className="floating-orb w-[500px] h-[500px] bg-brand-400 -top-20 -right-20" />
        <div className="floating-orb w-[300px] h-[300px] bg-teal-400 -bottom-20 -left-20" />

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 sm:p-16 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(238,242,255,0.7))' }}
          >
            <div className="w-16 h-16 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl shadow-brand-500/25"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #8b5cf6, #14b8a6)' }}>
              <Heart className="w-8 h-8 text-white" fill="white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-surface-900 dark:text-white mb-6">
              Start organizing your{' '}
              <span className="gradient-text">health records today</span>
            </h2>
            <p className="text-lg text-surface-500 mb-8 max-w-2xl mx-auto">
              Join thousands of families across Nepal who trust HealthDocX to keep their medical documents safe, organized, and AI-analyzed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="btn-primary text-base px-10 py-4">
                Get Started — It&apos;s Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/about" className="btn-secondary text-base px-10 py-4">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
