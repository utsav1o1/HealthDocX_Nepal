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

            <div className="relative group bg-white p-6 rounded-[2rem] border-2 border-surface-100 dark:border-surface-800 shadow-inner group mb-8 overflow-hidden">
                <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* QR Code Holder - The user should place the QR image in public/donation-qr.png */}
                <div className="aspect-square bg-white rounded-2xl flex items-center justify-center border border-surface-100 dark:border-surface-800 p-2 relative">
                    <img
                        src="/donation-qr.png"
                        alt="Nabil Bank QR Code"
                        className="w-full h-full object-contain rounded-xl"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                    />
                    <div className="hidden flex-col items-center justify-center text-surface-300 dark:text-surface-700">
                        <QrCode className="w-40 h-40 mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-surface-400">QR Image Missing</span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-brand-500/10 backdrop-blur-[2px] rounded-2xl">
                        <span className="bg-brand-500 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg scale-90 group-hover:scale-100 transition-transform">
                            <Coffee className="w-4 h-4 text-teal-300" />
                            Official Project Fund
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
