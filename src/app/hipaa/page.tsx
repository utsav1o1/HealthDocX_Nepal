'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShieldCheck, Lock, Activity, Server, Key, ClipboardCheck } from 'lucide-react';

export default function Hipaapage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-surface-50 dark:bg-surface-950 pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <span className="section-label mx-auto">
                            <ShieldCheck className="w-4 h-4" />
                            Security Standards
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-white mt-4">
                            HIPAA <span className="gradient-text">Compliance</span>
                        </h1>
                        <p className="mt-6 text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
                            How we align with international standards to keep your medical data secure.
                        </p>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8 sm:p-12 space-y-12"
                    >
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-brand-600 dark:text-brand-400">
                                <Lock className="w-6 h-6" />
                                <h2 className="text-2xl font-bold">Privacy Rule</h2>
                            </div>
                            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                                We implement strict administrative and technical safeguards to ensure the privacy of Protected Health Information (PHI). Only you have the authority to view, share, or delete your health records within HealthDocX.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-violet-600 dark:text-violet-400">
                                <Key className="w-6 h-6" />
                                <h2 className="text-2xl font-bold">Security Rule</h2>
                            </div>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { icon: Server, text: 'Secure Cloud Infrastructure' },
                                    { icon: ShieldCheck, text: 'AES-256 Data Encryption' },
                                    { icon: Lock, text: 'Strict Identity Management' },
                                    { icon: Activity, text: 'Continuous Audit Logging' },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 p-4 bg-white/50 dark:bg-surface-800/40 rounded-xl border border-surface-200 dark:border-surface-700/50">
                                        <item.icon className="w-5 h-5 text-brand-500" />
                                        <span className="text-sm font-medium text-surface-700 dark:text-surface-200">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-teal-600 dark:text-teal-400">
                                <ClipboardCheck className="w-6 h-6" />
                                <h2 className="text-2xl font-bold">Breach Notification</h2>
                            </div>
                            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                                In the unlikely event of a security incident, HealthDocX has protocols in place to notify all affected users promptly and provide guidance on steps to protect their information.
                            </p>
                        </section>

                        <div className="pt-8 border-t border-surface-200 dark:border-surface-800">
                            <p className="text-sm text-surface-500 italic text-center">
                                HealthDocX is designed with HIPAA compliance principles at its core to serve the health needs of the Nepali community securely.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
