'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Heart,
  Target,
  Eye,
  MapPin,
  AlertTriangle,
  Users,
  FileText,
  Lightbulb,
  Shield,
  Globe,
  ArrowRight,
  Mail,
  MessageSquare,
  Phone,
  CheckCircle2,
} from 'lucide-react';

const challenges = [
  {
    icon: FileText,
    title: 'Paper Records Everywhere',
    desc: 'Over 95% of medical records in Nepal are paper-based — prescriptions stuffed in bags, lab reports piled in drawers, easily damaged, lost, or forgotten.',
  },
  {
    icon: AlertTriangle,
    title: 'Disconnected Hospitals',
    desc: 'Nepal\'s hospitals don\'t share patient data. Visiting a new doctor means starting from scratch, repeating expensive tests, and re-explaining your full history.',
  },
  {
    icon: MapPin,
    title: 'Remote & Rural Gap',
    desc: 'Millions of Nepalis in hilly and remote regions travel to Kathmandu or Pokhara for specialist care — arriving with no medical history, leading to misdiagnosis.',
  },
  {
    icon: Users,
    title: 'Joint Family Complexity',
    desc: 'You manage health not just for yourself, but for parents, in-laws, and children. Without a central system, critical information gets lost across family members.',
  },
];

const values = [
  {
    icon: Shield,
    title: 'Privacy First',
    color: 'brand',
    desc: 'Your health data is yours alone. We never sell, share, or misuse your information — ever. End-to-end encryption keeps your records protected.',
  },
  {
    icon: Globe,
    title: 'Accessibility',
    color: 'teal',
    desc: 'Available in Nepali and English. Designed to work on low-end devices with slower internet — because Nepal\'s connectivity shouldn\'t limit your healthcare.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation for Nepal',
    color: 'violet',
    desc: 'We leverage AI not as a buzzword but as a practical tool — understanding medical documents written by Nepali doctors, in Nepali context.',
  },
];

const impactStats = [
  { value: '30M+', label: 'Nepalis who lack digital health records' },
  { value: '7,753', label: 'VDCs across Nepal with limited healthcare' },
  { value: '80%', label: 'Patients who lose at least one medical record yearly' },
  { value: '1', label: 'Platform solving this — HealthDocX' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden mesh-bg">
        <div className="floating-orb w-[500px] h-[500px] bg-brand-400 -top-40 -right-40" />
        <div className="floating-orb w-[400px] h-[400px] bg-teal-400 bottom-0 -left-40" style={{ animationDelay: '3s' }} />

        <div className="relative max-w-7xl mx-auto section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label mx-auto">
              <Heart className="w-3.5 h-3.5" fill="currentColor" />
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-surface-900 dark:text-white leading-tight">
              Built in Nepal,{' '}
              <span className="gradient-text">for Nepal</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-surface-500 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed">
              HealthDocX was created because a Nepali developer got tired of watching their family struggle with lost prescriptions, repeated tests, and disconnected healthcare. This is the tool they wished existed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== IMPACT STATS ========== */}
      <section className="relative py-10 sm:py-12 border-y border-surface-200/60 dark:border-surface-800/40 bg-white/60 dark:bg-surface-900/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {impactStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-extrabold gradient-text">{stat.value}</div>
                <div className="text-sm text-surface-500 mt-1 max-w-[180px] mx-auto">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHY WE BUILT THIS ========== */}
      <section className="relative section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label">
                <MapPin className="w-3.5 h-3.5" />
                The Problem
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white mb-6">
                Nepal&apos;s healthcare system{' '}
                <span className="gradient-text">runs on paper</span>
              </h2>
              <div className="space-y-4 text-surface-600 dark:text-surface-400 leading-relaxed">
                <p>
                  Every year, millions of Nepali families make the difficult trip to Kathmandu or Pokhara seeking specialized medical care. They bring what they can — a crumpled prescription from a district hospital, a lab report that got wet in the monsoon, or nothing at all because the documents were lost.
                </p>
                <p>
                  Doctors at central hospitals are forced to start from scratch. Tests are repeated. History is rewritten from memory. Mistakes happen. Time and money are wasted.
                </p>
                <p className="font-medium text-surface-800 dark:text-surface-200">
                  This is not a technology problem. It&apos;s a systems problem — and technology can fix it.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {challenges.map((item, i) => {
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
                    <h4 className="text-sm font-bold text-surface-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-xs text-surface-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== MISSION & VISION ========== */}
      <section className="relative section-padding bg-gradient-to-b from-surface-50 to-white dark:from-surface-950 dark:to-surface-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card-hover p-8 sm:p-10"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, #4f46e520, #4f46e510)' }}>
                <Target className="w-7 h-7 text-brand-500" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-surface-500 dark:text-surface-400 leading-relaxed text-lg">
                To give every Nepali citizen — regardless of where they live — the ability to securely store, access, and share their complete medical history. No more lost records. No more repeated tests. No more starting over.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card-hover p-8 sm:p-10"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, #14b8a620, #14b8a610)' }}>
                <Eye className="w-7 h-7 text-teal-500" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-4">
                Our Vision
              </h2>
              <p className="text-surface-500 dark:text-surface-400 leading-relaxed text-lg">
                A Nepal where every patient walks into any hospital with their full medical history on their phone. Where AI bridges the language and literacy gap. Where no Nepali ever has to say &quot;I don&apos;t remember what medicine I was prescribed.&quot;
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white">
              What We Stand For
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              const gradients: Record<string, string> = {
                brand: 'linear-gradient(135deg, #4f46e5, #8b5cf6)',
                teal: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                violet: 'linear-gradient(135deg, #8b5cf6, #4f46e5)',
              };
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card-hover p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                    style={{ background: gradients[value.color] }}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-surface-500 dark:text-surface-400 leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== WHAT WE'RE DOING ========== */}
      <section className="relative section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-12"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(238,242,255,0.7) 100%)' }}
          >
            <span className="section-label">
              <Lightbulb className="w-3.5 h-3.5" />
              The Solution
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white mb-6">
              Simple, Secure, and{' '}
              <span className="gradient-text">Built for Real Life</span>
            </h2>
            <div className="space-y-4">
              {[
                'Take a photo or upload a PDF of any medical document — from any hospital in Nepal.',
                'Our AI (powered by Google Gemini) reads, understands, and categorizes it instantly — even handwritten Nepali prescriptions.',
                'Your records are stored securely in the cloud — accessible from your phone, anywhere in Nepal or abroad.',
                'Share your complete health history with any doctor in seconds — no printing, no carrying, no repeating.',
                'Manage your whole family\'s records under one account — critical for Nepal\'s joint family households.',
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #4f46e5, #14b8a6)' }}>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-surface-600 dark:text-surface-400 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/signup" className="btn-primary">
                Try HealthDocX Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== CONTACT US ========== */}
      <section className="relative section-padding bg-gradient-to-b from-surface-50 to-white dark:from-surface-950 dark:to-surface-900" id="contact">
        <div className="floating-orb w-[400px] h-[400px] bg-violet-400 -bottom-20 -right-20" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="section-label mx-auto">
              <MessageSquare className="w-3.5 h-3.5" />
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white">
              Contact Us
            </h2>
            <p className="mt-4 text-lg text-surface-500 max-w-xl mx-auto">
              Have a question, suggestion, or partnership idea? We&apos;d love to hear from you — especially from healthcare providers across Nepal.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              {[
                {
                  icon: Mail,
                  title: 'Email Us',
                  value: 'utsavkarki244@gmail.com',
                  sub: 'We respond within 24 hours',
                },
                {
                  icon: MapPin,
                  title: 'Based In',
                  value: 'Kathmandu, Nepal',
                  sub: 'Proudly Nepali 🇳🇵',
                },
                {
                  icon: Phone,
                  title: 'For Partnerships',
                  value: '+977 9800000000',
                  sub: 'Healthcare & NGO inquiries',
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="glass-card p-5 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #4f46e520, #14b8a620)' }}>
                      <Icon className="w-5 h-5 text-brand-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-surface-900 dark:text-white">{item.title}</h4>
                      <p className="text-sm text-surface-700 dark:text-surface-300 mt-0.5">{item.value}</p>
                      <p className="text-xs text-surface-400 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 glass-card p-6 sm:p-8"
            >
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Ram Bahadur"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="ram@example.com"
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us more about your question or feedback..."
                    className="input-field resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full sm:w-auto px-8 py-3.5">
                  <Mail className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
