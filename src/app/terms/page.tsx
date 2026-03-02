'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FileText, AlertCircle, Scale, UserCheck, HelpCircle } from 'lucide-react';

export default function TermsPage() {
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
                            <Scale className="w-4 h-4" />
                            Legal Terms
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-white mt-4">
                            Terms of <span className="gradient-text">Service</span>
                        </h1>
                        <p className="mt-6 text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
                            Please read these terms carefully before using the HealthDocX platform.
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
                                <AlertCircle className="w-6 h-6" />
                                <h2 className="text-2xl font-bold">1. Medical Disclaimer</h2>
                            </div>
                            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl">
                                <p className="text-amber-800 dark:text-amber-200 font-medium">
                                    IMPORTANT: HealthDocX is NOT a medical provider. The AI summaries and extracted data are for informational purposes only and do not constitute medical advice, diagnosis, or treatment. Always seek the advice of a qualified physician with any questions regarding a medical condition.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-violet-600 dark:text-violet-400">
                                <UserCheck className="w-6 h-6" />
                                <h2 className="text-2xl font-bold">2. Use of Service</h2>
                            </div>
                            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                                You must be at least 18 years old or under parental supervision to use this service. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-teal-600 dark:text-teal-400">
                                <FileText className="w-6 h-6" />
                                <h2 className="text-2xl font-bold">3. Acceptable Use</h2>
                            </div>
                            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                                You agree not to upload fraudulent documents, impersonate healthcare professionals, or use the service for any illegal activities. We reserve the right to suspend accounts that violate these guidelines.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-brand-600 dark:text-brand-400">
                                <HelpCircle className="w-6 h-6" />
                                <h2 className="text-2xl font-bold">4. Limitation of Liability</h2>
                            </div>
                            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                                HealthDocX and its creators shall not be liable for any errors in AI extraction or for any decisions made based on the information provided by the platform. The service is provided &quot;as is&quot; without warranties of any kind.
                            </p>
                        </section>

                        <div className="pt-8 border-t border-surface-200 dark:border-surface-800">
                            <p className="text-sm text-surface-500 italic">
                                Last Updated: March 2, 2026. For legal inquiries, contact legal@healthdocx.com.np
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
