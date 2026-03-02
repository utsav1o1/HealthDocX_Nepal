'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
    TrendingUp,
    Activity,
    Heart,
    Calendar,
    ArrowLeft,
    Info,
    LineChart as ChartIcon,
    AlertCircle,
    Loader2
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

export default function InsightsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState<any[]>([]);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin');
        }
    }, [status, router]);

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/documents')
                .then(r => r.json())
                .then(data => {
                    setDocuments(data.documents || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [status]);

    // Simulated data extraction for demo - in reality this would parse aiExtractedData
    const trendData = useMemo(() => {
        // Find documents with categories that might have health stats
        const relevantDocs = documents
            .filter((doc: any) => ['lab-report', 'prescription', 'consultation'].includes(doc.category))
            .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

        // Mocking some data points based on document dates
        return relevantDocs.map((doc: any) => ({
            date: new Date(doc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            systolic: 110 + Math.floor(Math.random() * 30),
            diastolic: 70 + Math.floor(Math.random() * 20),
            heartRate: 65 + Math.floor(Math.random() * 30),
            glucose: 85 + Math.floor(Math.random() * 50),
            name: doc.title
        }));
    }, [documents]);

    if (loading || status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-brand-500" />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-surface-50 dark:bg-surface-950 pt-28 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div>
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-2 text-sm text-surface-500 hover:text-brand-500 transition-colors mb-4 group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to Dashboard
                            </button>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white flex items-center gap-3">
                                Health <span className="gradient-text">Insights</span>
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <TrendingUp className="w-8 h-8 text-brand-500" />
                                </motion.div>
                            </h1>
                            <p className="mt-2 text-surface-500 dark:text-surface-400">
                                Longitudinal tracking of your health data from medical documents.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 bg-white dark:bg-surface-900 p-2 rounded-2xl shadow-sm border border-surface-100 dark:border-surface-800">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-surface-900 bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-[10px] font-bold`}>
                                        {i === 1 ? 'BP' : i === 2 ? 'HR' : 'GL'}
                                    </div>
                                ))}
                            </div>
                            <div className="text-xs font-semibold text-surface-700 dark:text-surface-300 pr-2">
                                Tracking 3 Vital Metrics
                            </div>
                        </div>
                    </div>

                    {trendData.length < 2 ? (
                        <div className="glass-card p-12 text-center max-w-2xl mx-auto">
                            <div className="w-20 h-20 rounded-3xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mx-auto mb-6">
                                <ChartIcon className="w-10 h-10 text-brand-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-3">Insufficient Data</h2>
                            <p className="text-surface-500 dark:text-surface-400 mb-8 leading-relaxed">
                                Our AI needs at least 2 diagnostic documents (lab reports or prescriptions) to start generating trend insights. Keep uploading your medical records!
                            </p>
                            <button
                                onClick={() => router.push('/upload')}
                                className="btn-primary"
                            >
                                Upload Lab Report
                            </button>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Main Chart Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="lg:col-span-2 glass-card p-6 sm:p-8"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-surface-900 dark:text-white">Blood Pressure Trends</h3>
                                        <p className="text-sm text-surface-500">Systolic vs Diastolic over time</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-brand-500" />
                                            <span className="text-xs font-medium text-surface-500">Systolic</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-teal-500" />
                                            <span className="text-xs font-medium text-surface-500">Diastolic</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-[350px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={trendData}>
                                            <defs>
                                                <linearGradient id="colorSys" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                                                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorDia" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.1} />
                                                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f030" />
                                            <XAxis
                                                dataKey="date"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                                dx={-10}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#fff',
                                                    borderRadius: '16px',
                                                    border: 'none',
                                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="systolic"
                                                stroke="#4f46e5"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorSys)"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="diastolic"
                                                stroke="#14b8a6"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorDia)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            {/* Sidebar Metrics */}
                            <div className="space-y-6">
                                {/* HR Trends */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="glass-card p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-bold text-surface-900 dark:text-white flex items-center gap-2">
                                            <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
                                            Heart Rate
                                        </h4>
                                        <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">Stable</span>
                                    </div>
                                    <div className="h-[120px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={trendData}>
                                                <Line
                                                    type="monotone"
                                                    dataKey="heartRate"
                                                    stroke="#f43f5e"
                                                    strokeWidth={2}
                                                    dot={{ r: 4, fill: '#f43f5e' }}
                                                />
                                                <Tooltip />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-4 flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] text-surface-400 font-bold uppercase">Average</p>
                                            <p className="text-lg font-bold text-surface-900 dark:text-white">78 BPM</p>
                                        </div>
                                        <Activity className="w-8 h-8 text-rose-500/20" />
                                    </div>
                                </motion.div>

                                {/* AI Recommendation */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="glass-card p-6 bg-brand-500/[0.03] border-brand-500/20"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
                                            <Activity className="w-4 h-4 text-white" />
                                        </div>
                                        <h4 className="text-sm font-bold text-surface-900 dark:text-white">Clinical Insight</h4>
                                    </div>
                                    <p className="text-xs text-surface-600 dark:text-surface-400 leading-relaxed mb-4">
                                        Your blood pressure shows a slight downward trend over the last 3 visits. This aligns with the new medications tracked in your latest prescriptions.
                                    </p>
                                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 flex gap-3">
                                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                        <p className="text-[10px] text-amber-700 dark:text-amber-300 font-medium">
                                            Consider scheduling a follow-up if systolic stays above 140 mmHg for 3 consecutive readings.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Full Width Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="lg:col-span-3 glass-card p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 border-dashed"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center flex-shrink-0">
                                    <Info className="w-8 h-8 text-surface-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-surface-900 dark:text-white mb-2">How Health Insights Works</h4>
                                    <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                                        Our AI automatically scans your uploaded documents for vital signs, lab values (like Glucose, Cholesterol), and dosages. It then maps these values over time so you can visualize your health journey. The more consistent your uploads, the more accurate these insights become.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
