'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Shield, Lock, Eye, Server, FileText } from 'lucide-react';

export default function PrivacyPage() {
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
                            <Shield className="w-4 h-4" />
                            Privacy Center
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-white mt-4">
                            Your Privacy <span className="gradient-text">Matters</span>
                        </h1>
                        <p className="mt-6 text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
                            At HealthDocX, we believe your health data is your most personal asset. Here is how we protect it.
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
                                <h2 className="text-2xl font-bold">1. Data Encryption</h2>
                            </div>
                            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                                All medical documents (prescriptions, lab reports, and doctor notes) are encrypted using industry-standard AES-256 encryption. Your data is encrypted both while sitting on our servers and while traveling across the internet.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-violet-600 dark:text-violet-400">
                                <Eye className="w-6 h-6" />
                                <h2 className="text-2xl font-bold">2. AI Analysis & Privacy</h2>
                            </div>
                            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                                When you upload a document, our AI (Groq Llama 4 Scout) processes the text to extract key medical insights. We do not use your personal medical data to train public AI models. The analysis is done privately to provide you with a summary and timeline of your health.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-teal-600 dark:text-teal-400">
                                <Server className="w-6 h-6" />
                                <h2 className="text-2xl font-bold">3. Data Residency</h2>
                            </div>
                            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                                HealthDocX targets the Nepali community. While we use global cloud infrastructure for high availability, we strictly control access to data. We do not sell or trade your health data with any third-party marketing companies or insurance providers.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-brand-600 dark:text-brand-400">
                                <FileText className="w-6 h-6" />
                                <h2 className="text-2xl font-bold">4. Your Rights</h2>
                            </div>
                            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                                You have the right to request a copy of your data or ask for the permanent deletion of your account at any time. Once deleted, all associated documents and extracted data are scrubbed from our systems.
                            </p>
                        </section>

                        <div className="pt-8 border-t border-surface-200 dark:border-surface-800">
                            <p className="text-sm text-surface-500 italic">
                                Last Updated: March 2, 2026. For specific questions, contact utsavkarki244@gmail.com
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
