'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
    Mail,
    MapPin,
    Phone,
    MessageSquare,
    Heart,
    Send,
    Clock,
    Users,
} from 'lucide-react';

const contactCards = [
    {
        icon: Mail,
        title: 'Email Us',
        value: 'utsavkarki244@gmail.com',
        sub: 'We reply within 24 hours',
    },
    {
        icon: MapPin,
        title: 'Based In',
        value: 'Kathmandu, Nepal',
        sub: 'Baneshwor, Kathmandu 44600',
    },
    {
        icon: Phone,
        title: 'Phone',
        value: '+977 9869602478',
        sub: 'Mon – Fri, 9 AM – 6 PM (NST)',
    },
    {
        icon: Clock,
        title: 'Support Hours',
        value: 'Sunday – Friday',
        sub: '9:00 AM – 6:00 PM Nepal Time',
    },
];

const faqs = [
    {
        q: 'Is HealthDocX free to use?',
        a: 'Yes — HealthDocX is completely free for individual patients. We believe every Nepali should have access to their health records.',
    },
    {
        q: 'Can I use HealthDocX for my family?',
        a: 'Absolutely. You can create separate profiles for your parents, spouse, children, and any family member under one account.',
    },
    {
        q: 'Is my health data safe?',
        a: 'Yes. All your data is encrypted and stored securely in the cloud. We never share or sell your information to anyone.',
    },
    {
        q: 'Do you support Nepali language documents?',
        a: 'Yes — our AI supports both Nepali and English medical documents, including handwritten prescriptions.',
    },
];

export default function ContactPage() {
    return (
        <>
            <Navbar />

            {/* Hero */}
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
                            <MessageSquare className="w-3.5 h-3.5" />
                            Contact Us
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-white">
                            We&apos;d love to{' '}
                            <span className="gradient-text">hear from you</span>
                        </h1>
                        <p className="mt-6 text-lg text-surface-500 dark:text-surface-400 max-w-2xl mx-auto leading-relaxed">
                            Have a question, suggestion, or want to partner with us to bring digital health records to Nepal? Get in touch.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="relative py-10 sm:py-12 border-y border-surface-200/60 dark:border-surface-800/40 bg-white/60 dark:bg-surface-900/40 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {contactCards.map((card, i) => {
                            const Icon = card.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="glass-card p-5 text-center"
                                >
                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3"
                                        style={{ background: 'linear-gradient(135deg, #4f46e520, #14b8a620)' }}>
                                        <Icon className="w-5 h-5 text-brand-500" />
                                    </div>
                                    <h4 className="text-sm font-bold text-surface-900 dark:text-white">{card.title}</h4>
                                    <p className="text-sm text-surface-700 dark:text-surface-300 mt-1">{card.value}</p>
                                    <p className="text-xs text-surface-400 mt-0.5">{card.sub}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Main Contact Form */}
            <section className="relative section-padding">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-5 gap-10">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -32 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-3"
                        >
                            <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-2">Send a Message</h2>
                            <p className="text-surface-500 mb-8">We&apos;re here to help — reach out anytime.</p>

                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                                            Full Name <span className="text-rose-500">*</span>
                                        </label>
                                        <input type="text" placeholder="Ram Bahadur Sharma" className="input-field" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                                            Email Address <span className="text-rose-500">*</span>
                                        </label>
                                        <input type="email" placeholder="ram@example.com" className="input-field" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                                        Phone Number (Optional)
                                    </label>
                                    <input type="tel" placeholder="+977 98XXXXXXXX" className="input-field" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                                        Type of Inquiry <span className="text-rose-500">*</span>
                                    </label>
                                    <select className="input-field" required>
                                        <option value="">Select inquiry type</option>
                                        <option value="general">General Question</option>
                                        <option value="support">Technical Support</option>
                                        <option value="partnership">Hospital / NGO Partnership</option>
                                        <option value="feedback">Product Feedback</option>
                                        <option value="media">Media / Press</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                                        Message <span className="text-rose-500">*</span>
                                    </label>
                                    <textarea
                                        rows={6}
                                        placeholder="Tell us how we can help you..."
                                        className="input-field resize-none"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn-primary px-8 py-3.5">
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </button>
                            </form>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: 32 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                            className="lg:col-span-2 space-y-6"
                        >
                            {/* Partnership CTA */}
                            <div className="glass-card p-6"
                                style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.06), rgba(20,184,166,0.06))' }}>
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                                    style={{ background: 'linear-gradient(135deg, #4f46e5, #14b8a6)' }}>
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">Hospital & NGO Partnerships</h3>
                                <p className="text-sm text-surface-500 leading-relaxed mb-4">
                                    Are you a hospital, clinic, or NGO in Nepal? We&apos;d love to partner with you to bring digital health records to more Nepalis.
                                </p>
                                <a href="mailto:partnerships@healthdocx.com.np" className="btn-secondary text-sm">
                                    <Mail className="w-4 h-4" />
                                    Email Partnerships Team
                                </a>
                            </div>

                            {/* FAQ */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-surface-900 dark:text-white">Common Questions</h3>
                                {faqs.map((faq, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.05 * i }}
                                        className="glass-card p-4"
                                    >
                                        <h4 className="text-sm font-bold text-surface-900 dark:text-white mb-1.5">{faq.q}</h4>
                                        <p className="text-xs text-surface-500 leading-relaxed">{faq.a}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Nepal pride footer banner */}
            <section className="relative py-10 overflow-hidden">
                <div className="floating-orb w-[300px] h-[300px] bg-brand-400 -top-20 -right-10" />
                <div className="max-w-4xl mx-auto px-4 text-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-8"
                        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(238,242,255,0.7))' }}
                    >
                        <Heart className="w-8 h-8 text-rose-400 mx-auto mb-3" fill="currentColor" />
                        <h2 className="text-2xl font-extrabold text-surface-900 dark:text-white mb-3">
                            Built with love for Nepal 🇳🇵
                        </h2>
                        <p className="text-surface-500 max-w-lg mx-auto leading-relaxed text-sm">
                            HealthDocX is a passion project born out of a real need — to modernize how Nepalis interact with their healthcare. We welcome feedback from patients, doctors, and health workers across Nepal.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </>
    );
}
