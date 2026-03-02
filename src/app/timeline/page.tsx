'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLocale } from '@/providers/Providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { formatDate, getCategoryColor } from '@/lib/utils';
import {
  Clock,
  Loader2,
  Calendar,
  Pill,
  FlaskConical,
  Scan,
  FileText,
  Shield,
  Syringe,
  Stethoscope,
  Scissors,
  File,
} from 'lucide-react';

const categoryIcons: Record<string, any> = {
  prescription: Pill,
  'lab-report': FlaskConical,
  imaging: Scan,
  'discharge-summary': FileText,
  insurance: Shield,
  vaccination: Syringe,
  consultation: Stethoscope,
  surgery: Scissors,
  other: File,
};

export default function TimelinePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useLocale();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/signin');
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/documents?limit=100')
        .then((r) => r.json())
        .then((data) => {
          setDocuments(data.documents || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status]);

  if (status === 'loading' || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
        </div>
      </>
    );
  }

  // Group documents by month/year
  const grouped = documents.reduce((acc: Record<string, any[]>, doc: any) => {
    const d = new Date(doc.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(doc);
    return acc;
  }, {});

  const sortedKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-brand-500/25">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
              Health Timeline
            </h1>
          </div>
          <p className="text-surface-500 ml-[52px]">Your complete health journey over time</p>
        </motion.div>

        {documents.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Clock className="w-12 h-12 text-surface-300 mx-auto mb-4" />
            <p className="text-surface-500">No documents yet. Upload your first document to start building your health timeline.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-500 via-teal-500 to-purple-500 opacity-20" />

            {sortedKeys.map((monthKey, mi) => {
              const d = new Date(monthKey + '-01');
              const monthLabel = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

              return (
                <motion.div
                  key={monthKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: mi * 0.1 }}
                  className="mb-10 relative"
                >
                  {/* Month marker */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-brand-500/20 relative z-10">
                      <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white">
                      {monthLabel}
                    </h2>
                    <span className="text-sm text-surface-400">
                      {grouped[monthKey].length} record{grouped[monthKey].length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Documents in this month */}
                  <div className="ml-6 sm:ml-8 pl-8 sm:pl-10 border-l-2 border-surface-200 dark:border-surface-700 space-y-3">
                    {grouped[monthKey].map((doc: any, di: number) => {
                      const CatIcon = categoryIcons[doc.category] || File;
                      return (
                        <motion.div
                          key={doc._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: mi * 0.1 + di * 0.05 }}
                          className="glass-card-hover p-4 sm:p-5 relative"
                        >
                          {/* Connector dot */}
                          <div className="absolute -left-[calc(2rem+5px)] sm:-left-[calc(2.5rem+5px)] top-6 w-2.5 h-2.5 rounded-full bg-brand-500 border-2 border-white dark:border-surface-900" />

                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getCategoryColor(doc.category)}`}>
                              <CatIcon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-sm font-semibold text-surface-900 dark:text-white">
                                  {doc.title}
                                </h3>
                                <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium ${getCategoryColor(doc.category)}`}>
                                  {doc.category.replace('-', ' ')}
                                </span>
                              </div>
                              <p className="text-xs text-surface-500 mt-1">
                                {doc.hospital || 'Unknown'} &middot; {formatDate(doc.date)}
                                {doc.familyMemberName && (
                                  <span className="text-purple-500"> &middot; {doc.familyMemberName}</span>
                                )}
                              </p>
                              {doc.aiExtractedData?.summary && (
                                <p className="text-xs text-surface-400 mt-2 line-clamp-2">
                                  {doc.aiExtractedData.summary}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
