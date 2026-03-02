'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DonationQR from '@/components/ui/DonationQR';
import { Heart, Globe, Server, Code, Users, Sparkles, Shield, Zap, Coffee, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function DonationPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-surface-50 dark:bg-surface-950 pt-28 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Premium Header Section */}
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 via-brand-700 to-violet-800 p-8 sm:p-16 text-white mb-16 shadow-2xl">
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-500/20 rounded-full blur-[80px]" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                            <div className="flex-1 space-y-8 text-center lg:text-left">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-widest uppercase border border-white/20"
                                >
                                    <Sparkles className="w-4 h-4 text-teal-300" />
                                    Community Project
                                </motion.div>

                                <h1 className="text-4xl sm:text-6xl font-black leading-[1.1] tracking-tight">
                                    Keeping HealthDocX <br />
                                    <span className="text-teal-300">Free For Everyone.</span>
                                </h1>

                                <p className="text-xl text-brand-100 max-w-2xl leading-relaxed font-medium">
                                    HealthDocX is a non-profit initiative dedicated to modernizing healthcare for Nepal.
                                    Your contributions power our high-speed AI analysis and secure medical vault for thousands.
                                </p>

                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                                            <Shield className="w-6 h-6 text-teal-300" />
                                        </div>
                                        <div className="text-left font-bold tracking-tight">
                                            <div className="text-xl">Secure</div>
                                            <div className="text-teal-300 text-xs uppercase tracking-wider">End-to-End</div>
                                        </div>
                                    </div>
                                    <div className="h-10 w-px bg-white/20 hidden sm:block" />
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                                            <Globe className="w-6 h-6 text-teal-300" />
                                        </div>
                                        <div className="text-left font-bold tracking-tight">
                                            <div className="text-xl">Open</div>
                                            <div className="text-teal-300 text-xs uppercase tracking-wider">For All Nepal</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-auto relative group">
                                <div className="absolute -inset-4 bg-gradient-to-br from-teal-400 to-brand-400 rounded-[3rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                                <DonationQR
                                    className="relative !max-w-md shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] !rounded-[2.5rem] border-white/20"
                                    title="Official Project Fund"
                                    description="Scan via eSewa, Khalti, or any Fonepay supported app to directly support our infrastructure costs."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Features/Transparency Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                icon: Server,
                                title: "AI & Server Costs",
                                desc: "Funding high-performance GPUs and secure database clusters for real-time analysis.",
                                color: "text-blue-500",
                                bg: "bg-blue-500/10"
                            },
                            {
                                icon: Zap,
                                title: "Continuous Devs",
                                desc: "Adding new features like Family Profiles and longitudinal health tracking every week.",
                                color: "text-amber-500",
                                bg: "bg-amber-500/10"
                            },
                            {
                                icon: Heart,
                                title: "Patient Advocacy",
                                desc: "Building tools that empower patients to take control of their medical history for free.",
                                color: "text-rose-500",
                                bg: "bg-rose-500/10"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i }}
                                viewport={{ once: true }}
                                className="glass-card p-10 group hover:-translate-y-2 transition-all duration-300 border-surface-200/50 dark:border-surface-800/50"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${item.bg} group-hover:scale-110 transition-transform`}>
                                    <item.icon className={`w-7 h-7 ${item.color}`} />
                                </div>
                                <h3 className="text-2xl font-black text-surface-900 dark:text-white mb-4 leading-tight">{item.title}</h3>
                                <p className="text-surface-500 dark:text-surface-400 leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Direct Contact / Support Footer */}
                    <div className="glass-card p-10 sm:p-16 border-dashed bg-gradient-to-br from-surface-50 to-white dark:from-surface-900/50 dark:to-surface-800/50">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1 space-y-6 text-center lg:text-left">
                                <div className="text-brand-500 font-black text-sm uppercase tracking-widest flex items-center justify-center lg:justify-start gap-2">
                                    <Coffee className="w-5 h-5" />
                                    Transparency First
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-black text-surface-900 dark:text-white tracking-tight">Have questions about <br /><span className="gradient-text">How we use your funds?</span></h2>
                                <p className="text-lg text-surface-600 dark:text-surface-400 leading-relaxed font-medium max-w-xl">
                                    We believe in radical transparency. Every cent is accounted for and directly supports the technical platform. Reach out for detailed reports or collaboration ideas.
                                </p>
                                <a href="mailto:utsavkarki244@gmail.com" className="btn-primary inline-flex items-center gap-3 py-4 px-8 mt-4 group">
                                    Contact Utsav Karki
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="p-8 rounded-[2rem] bg-white dark:bg-surface-900 border-2 border-surface-100 dark:border-surface-800 text-center min-w-[180px]">
                                    <div className="text-4xl font-black text-brand-500 mb-2">100%</div>
                                    <div className="text-xs text-surface-400 font-bold uppercase tracking-widest">Efficiency</div>
                                </div>
                                <div className="p-8 rounded-[2rem] bg-white dark:bg-surface-900 border-2 border-surface-100 dark:border-surface-800 text-center min-w-[180px]">
                                    <div className="text-4xl font-black text-teal-500 mb-2">0.0%</div>
                                    <div className="text-xs text-surface-400 font-bold uppercase tracking-widest">Admin Fees</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
