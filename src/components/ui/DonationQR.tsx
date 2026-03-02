'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, QrCode, ExternalLink } from 'lucide-react';

interface DonationQRProps {
    title?: string;
    description?: string;
    className?: string;
}

export default function DonationQR({
    title = "Support HealthDocX",
    description = "Help us keep this project free and online for all Nepalis.",
    className = ""
}: DonationQRProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className={`glass-card p-8 text-center max-w-sm mx-auto ${className}`}
        >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-brand-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-500/20">
                <Heart className="w-8 h-8 text-white" fill="white" />
            </div>

            <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-surface-500 dark:text-surface-400 mb-8 leading-relaxed">
                {description}
            </p>

            <div className="relative group bg-white p-4 rounded-2xl border-2 border-surface-100 dark:border-surface-800 mb-8 overflow-hidden">
                <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                {/* Placeholder QR - In a real app this would be a real payment QR */}
                <div className="aspect-square bg-surface-50 dark:bg-surface-900 rounded-lg flex items-center justify-center border border-surface-100 dark:border-surface-800">
                    <QrCode className="w-32 h-32 text-surface-300 dark:text-surface-700" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-brand-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <Coffee className="w-3.5 h-3.5" />
                            Scan for eSewa / Khalti
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <button className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Download QR Code
                </button>
                <p className="text-[10px] text-surface-400 uppercase tracking-widest font-bold">
                    100% of funds go to server costs
                </p>
            </div>
        </motion.div>
    );
}
