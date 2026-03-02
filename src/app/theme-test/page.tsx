'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Shield, FileText, ArrowRight, Sparkles, Globe } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ThemeTestPage() {
    // Nepal Flag Colors
    const NEPAL_CRIMSON = "#DC143C";
    const NEPAL_BLUE = "#003893";

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white dark:bg-surface-950 pt-28 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Header */}
                    <div className="relative overflow-hidden rounded-[2.5rem] p-10 sm:p-20 text-white mb-16 shadow-2xl"
                        style={{ background: `linear-gradient(135deg, ${NEPAL_CRIMSON}, ${NEPAL_BLUE})` }}>
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />

                        <div className="relative z-10 max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-widest uppercase mb-6"
                            >
                                <Globe className="w-3 h-3" />
                                Theme: Heritage Nepal 🇳🇵
                            </motion.div>
                            <h1 className="text-4xl sm:text-6xl font-black leading-tight mb-6">
                                Modern Healthcare with <span className="text-teal-300">National Pride</span>
                            </h1>
                            <p className="text-lg text-white/80 mb-10 leading-relaxed">
                                Testing the Nepal flag color palette. Crimson Red represents the bravery of our ancestors, while Royal Blue signifies peace and harmony.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-4 rounded-2xl bg-white text-surface-900 font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-xl">
                                    Primary Action
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <button className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold hover:bg-white/20 transition-all">
                                    Secondary View
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* UI Component Samples */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* Red Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-[2rem] bg-white dark:bg-surface-900 border-2 shadow-xl transition-all"
                            style={{ borderColor: `${NEPAL_CRIMSON}15` }}
                        >
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                                style={{ backgroundColor: `${NEPAL_CRIMSON}`, boxShadow: `0 10px 15px -3px ${NEPAL_CRIMSON}40` }}>
                                <Heart className="w-7 h-7 text-white" fill="white" />
                            </div>
                            <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">Crimson Alert</h3>
                            <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed mb-6">
                                This component uses the Crimson Red for high-visibility highlights. Great for urgency but must be used sparingly.
                            </p>
                            <div className="h-2 w-full bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                                <div className="h-full" style={{ width: '75%', backgroundColor: NEPAL_CRIMSON }} />
                            </div>
                        </motion.div>

                        {/* Blue Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-[2rem] bg-white dark:bg-surface-900 border-2 shadow-xl transition-all"
                            style={{ borderColor: `${NEPAL_BLUE}15` }}
                        >
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                                style={{ backgroundColor: `${NEPAL_BLUE}`, boxShadow: `0 10px 15px -3px ${NEPAL_BLUE}40` }}>
                                <Shield className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">Royal Blue Trust</h3>
                            <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed mb-6">
                                The Royal Blue provides a strong foundation of trust and stability, ideal for medical data and dashboards.
                            </p>
                            <div className="h-2 w-full bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                                <div className="h-full" style={{ width: '90%', backgroundColor: NEPAL_BLUE }} />
                            </div>
                        </motion.div>

                        {/* Mixed Gradient Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-[2rem] bg-white dark:bg-surface-900 border-2 shadow-xl transition-all relative overflow-hidden"
                            style={{ borderColor: 'transparent', backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, ${NEPAL_CRIMSON}, ${NEPAL_BLUE})`, backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' }}
                        >
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                                style={{ background: `linear-gradient(135deg, ${NEPAL_CRIMSON}, ${NEPAL_BLUE})` }}>
                                <Sparkles className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">AI Insights</h3>
                            <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed mb-6">
                                Combining both colors creates a unique gradient that represents our identity throughout the application.
                            </p>
                            <button className="text-sm font-bold flex items-center gap-2" style={{ color: NEPAL_CRIMSON }}>
                                Learn More <ArrowRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    </div>

                    {/* Form Sample */}
                    <div className="glass-card p-10 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8 text-center text-surface-900 dark:text-white">Sample Input Field</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-surface-700 dark:text-surface-300 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Utsav Karki"
                                    className="w-full px-6 py-4 rounded-2xl bg-surface-50 dark:bg-surface-800 border-2 border-transparent focus:border-blue-500 outline-none transition-all"
                                    style={{ focusColor: NEPAL_BLUE }}
                                />
                            </div>
                            <button className="w-full py-5 rounded-2xl text-white font-black text-lg shadow-2xl transition-all hover:brightness-110"
                                style={{ backgroundColor: NEPAL_CRIMSON }}>
                                Submit Record
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
