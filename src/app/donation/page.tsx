'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DonationQR from '@/components/ui/DonationQR';
import { Heart, Globe, Server, Code, Users } from 'lucide-react';

export default function DonationPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-10">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-violet-700 p-8 sm:p-12 text-white shadow-2xl">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-widest uppercase"
                        >
                            Our Mission
                        </motion.div>
                        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                            Keep HealthDocX <span className="text-teal-300">Free & Forever</span>
                        </h1>
                        <p className="text-lg text-brand-100 max-w-xl">
                            HealthDocX is a passion project built to modernize healthcare for every Nepali. Your support helps cover high-performance server costs and AI processing.
                        </p>
                    </div>
                    <div className="w-full md:w-auto">
                        <DonationQR className="!max-w-xs shadow-2xl" />
                    </div>
                </div>
            </div>

            {/* Why Support Section */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    {
                        icon: Server,
                        title: "Server & GPU Costs",
                        desc: "High-speed AI processing (Groq) and secure cloud storage require monthly maintenance funds.",
                        color: "text-blue-500",
                        bg: "bg-blue-50 dark:bg-blue-500/10"
                    },
                    {
                        icon: Code,
                        title: "Ongoing Innovation",
                        desc: "We are constantly building new features like family sharing and advanced health analytics.",
                        color: "text-purple-500",
                        bg: "bg-purple-50 dark:bg-purple-500/10"
                    },
                    {
                        icon: Globe,
                        title: "100% Free for Nepal",
                        desc: "Our goal is to keep the platform ad-free and free of cost for all individual patients across Nepal.",
                        color: "text-teal-500",
                        bg: "bg-teal-50 dark:bg-teal-500/10"
                    }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="glass-card p-6 flex flex-col items-center text-center space-y-4"
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.bg}`}>
                            <item.icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <h3 className="text-lg font-bold text-surface-900 dark:text-white">{item.title}</h3>
                        <p className="text-sm text-surface-500 leading-relaxed">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Transparency Section */}
            <div className="glass-card p-8 sm:p-10 border-dashed">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2 text-rose-500 font-bold text-sm uppercase tracking-wider">
                            <Heart className="w-4 h-4" fill="currentColor" />
                            Transparency
                        </div>
                        <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Your Contribution Matters</h2>
                        <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                            Every single rupee donated goes directly towards infrastructure costs. As the project grows, we aim to partner with health NGOs in Nepal to reach remote areas.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-center p-4 rounded-2xl bg-surface-50 dark:bg-surface-900 border border-surface-100 dark:border-surface-800">
                            <div className="text-2xl font-bold text-brand-500">100%</div>
                            <div className="text-[10px] text-surface-400 font-bold uppercase">Dedicated</div>
                        </div>
                        <div className="text-center p-4 rounded-2xl bg-surface-50 dark:bg-surface-900 border border-surface-100 dark:border-surface-800">
                            <div className="text-2xl font-bold text-teal-500">0.0%</div>
                            <div className="text-[10px] text-surface-400 font-bold uppercase">Profit</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
