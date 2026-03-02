'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/providers/Providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { formatDate, getCategoryColor } from '@/lib/utils';
import {
  Search,
  Filter,
  FileText,
  Trash2,
  ExternalLink,
  Loader2,
  Pill,
  FlaskConical,
  Scan,
  Shield,
  Syringe,
  Stethoscope,
  Scissors,
  File,
  Brain,
  ChevronDown,
  ChevronUp,
  Download,
  Building2,
  FolderHeart,
  LayoutList,
  FolderOpen,
  FolderClosed,
  Upload,
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

const categoryOptions = ['all', 'prescription', 'lab-report', 'imaging', 'discharge-summary', 'insurance', 'vaccination', 'consultation', 'surgery', 'other'];

type ViewMode = 'list' | 'hospital' | 'health-issue';

function DocCard({ doc, isExpanded, onToggle, onDelete, deleting }: {
  doc: any; isExpanded: boolean; onToggle: () => void; onDelete: () => void; deleting: boolean;
}) {
  const CatIcon = categoryIcons[doc.category] || File;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -80 }}
      className="glass-card overflow-hidden"
    >
      <div
        className="p-4 sm:p-5 flex items-center gap-4 cursor-pointer hover:bg-surface-50/80 dark:hover:bg-surface-800/30 transition-colors"
        onClick={onToggle}
      >
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${getCategoryColor(doc.category)}`}>
          <CatIcon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-surface-900 dark:text-white truncate">{doc.title}</h3>
          <p className="text-xs text-surface-500 mt-0.5">
            {doc.hospital || 'Unknown Hospital'} · {doc.doctor || 'Unknown'} · {formatDate(doc.date)}
            {doc.familyMemberName && <span className="ml-1.5 text-violet-500">({doc.familyMemberName})</span>}
          </p>
        </div>
        <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${getCategoryColor(doc.category)}`}>
          {doc.category.replace('-', ' ')}
        </span>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} className="btn-ghost p-2 text-surface-400 hover:text-brand-500">
            <ExternalLink className="w-4 h-4" />
          </a>
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} disabled={deleting}
            className="btn-ghost p-2 text-surface-400 hover:text-rose-500">
            {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          </button>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-surface-400" /> : <ChevronDown className="w-4 h-4 text-surface-400" />}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && doc.aiExtractedData && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-5 pb-5 pt-2 border-t border-surface-100 dark:border-surface-800">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-4 h-4 text-brand-500" />
                <span className="text-sm font-semibold text-surface-700 dark:text-surface-300">AI Analysis</span>
              </div>
              {doc.aiExtractedData.summary && (
                <p className="text-sm text-surface-600 dark:text-surface-400 mb-3 leading-relaxed">{doc.aiExtractedData.summary}</p>
              )}
              <div className="grid sm:grid-cols-2 gap-3">
                {doc.aiExtractedData.diagnosis?.length > 0 && (
                  <div className="text-xs">
                    <span className="font-semibold text-violet-600 dark:text-violet-400">Diagnosis: </span>
                    <span className="text-surface-600 dark:text-surface-400">{doc.aiExtractedData.diagnosis.join(', ')}</span>
                  </div>
                )}
                {doc.aiExtractedData.medications?.length > 0 && (
                  <div className="text-xs">
                    <span className="font-semibold text-teal-600 dark:text-teal-400">Medications: </span>
                    <span className="text-surface-600 dark:text-surface-400">{doc.aiExtractedData.medications.join(', ')}</span>
                  </div>
                )}
                {doc.aiExtractedData.keyFindings?.length > 0 && (
                  <div className="text-xs">
                    <span className="font-semibold text-amber-600 dark:text-amber-400">Key Findings: </span>
                    <span className="text-surface-600 dark:text-surface-400">{doc.aiExtractedData.keyFindings.join(', ')}</span>
                  </div>
                )}
                {doc.aiExtractedData.recommendations?.length > 0 && (
                  <div className="text-xs">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Recommendations: </span>
                    <span className="text-surface-600 dark:text-surface-400">{doc.aiExtractedData.recommendations.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FolderGroup({ title, count, icon: Icon, gradient, children, defaultOpen = false }: {
  title: string; count: number; icon: any; gradient: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 sm:p-5 flex items-center gap-4 hover:bg-surface-50/50 dark:hover:bg-surface-800/20 transition-colors"
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${gradient} shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-sm font-bold text-surface-900 dark:text-white">{title}</h3>
          <p className="text-xs text-surface-500 mt-0.5">{count} document{count !== 1 ? 's' : ''}</p>
        </div>
        {open
          ? <FolderOpen className="w-5 h-5 text-brand-400 flex-shrink-0" />
          : <FolderClosed className="w-5 h-5 text-surface-400 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-4 pb-4 pt-1 border-t border-surface-100 dark:border-surface-800 space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DocumentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useLocale();

  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/signin');
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') fetchDocuments();
  }, [status, categoryFilter]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '200' });
      if (categoryFilter !== 'all') params.set('category', categoryFilter);
      if (search) params.set('search', search);
      const res = await fetch(`/api/documents?${params}`);
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch { setDocuments([]); }
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); fetchDocuments(); };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this document?')) return;
    setDeleting(id);
    try {
      await fetch(`/api/documents/${id}`, { method: 'DELETE' });
      setDocuments((prev) => prev.filter((d) => d._id !== id));
    } catch { /* ignore */ }
    setDeleting(null);
  };

  const handleExportPdf = async () => {
    const { jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('HealthDocX - Medical Records', 14, 22);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);
    const rows = documents.map((d: any) => [d.title, d.category, d.hospital || '-', d.doctor || '-', formatDate(d.date), d.aiExtractedData?.summary?.substring(0, 60) || '-']);
    autoTable(doc, { head: [['Title', 'Category', 'Hospital', 'Doctor', 'Date', 'AI Summary']], body: rows, startY: 36, styles: { fontSize: 8 }, headStyles: { fillColor: [79, 70, 229] } });
    doc.save('healthdocx-records.pdf');
  };

  // Group by hospital
  const byHospital = useMemo(() => {
    const map: Record<string, any[]> = {};
    documents.forEach((d) => {
      const h = d.hospital?.trim() || 'Unknown Hospital';
      if (!map[h]) map[h] = [];
      map[h].push(d);
    });
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length);
  }, [documents]);

  // Group by health issue (AI diagnosis → body system inference)
  const byHealthIssue = useMemo(() => {
    const systemKeywords: Record<string, string[]> = {
      'Chest / Respiratory': ['chest', 'lung', 'pulmonary', 'bronchi', 'asthma', 'copd', 'pneumonia', 'respiratory', 'cough'],
      'Heart / Cardiac': ['heart', 'cardiac', 'cardio', 'ecg', 'ekg', 'hypertension', 'blood pressure', 'cholesterol', 'lipid'],
      'Diabetes / Metabolic': ['diabetes', 'blood sugar', 'glucose', 'hba1c', 'insulin', 'thyroid', 'metabolic'],
      'Bone / Orthopedic': ['bone', 'fracture', 'orthopedic', 'joint', 'spine', 'osteo', 'arthritis', 'x-ray'],
      'Digestive / GI': ['digestive', 'gastro', 'stomach', 'liver', 'kidney', 'urine', 'renal', 'intestine', 'bowel', 'abdom'],
      'Neuro / Brain': ['neuro', 'brain', 'headache', 'migraine', 'seizure', 'stroke', 'vertigo', 'mri'],
      'Eyes / ENT': ['eye', 'vision', 'ear', 'nose', 'throat', 'ent', 'sinus'],
      'Skin / Dermatology': ['skin', 'rash', 'derma', 'allerg'],
      'Mental Health': ['mental', 'depression', 'anxiety', 'psychiatric', 'stress'],
      'Women\'s Health': ['gynae', 'gynecolog', 'obstet', 'pregnancy', 'menstrual', 'uterus', 'ovary'],
    };

    const map: Record<string, any[]> = {};
    documents.forEach((d) => {
      const text = [
        d.title,
        d.category,
        ...(d.aiExtractedData?.diagnosis || []),
        ...(d.aiExtractedData?.keyFindings || []),
        d.aiExtractedData?.summary || '',
      ].join(' ').toLowerCase();

      let matched = false;
      for (const [system, keywords] of Object.entries(systemKeywords)) {
        if (keywords.some((kw) => text.includes(kw))) {
          if (!map[system]) map[system] = [];
          map[system].push(d);
          matched = true;
          break; // put in first-matched category only
        }
      }
      if (!matched) {
        if (!map['General / Other']) map['General / Other'] = [];
        map['General / Other'].push(d);
      }
    });

    return Object.entries(map).sort((a, b) => b[1].length - a[1].length);
  }, [documents]);

  const healthIssueGradients: Record<string, string> = {
    'Chest / Respiratory': 'from-sky-500 to-blue-600',
    'Heart / Cardiac': 'from-rose-500 to-pink-600',
    'Diabetes / Metabolic': 'from-amber-500 to-orange-500',
    'Bone / Orthopedic': 'from-stone-500 to-gray-600',
    'Digestive / GI': 'from-lime-500 to-green-600',
    'Neuro / Brain': 'from-violet-500 to-purple-600',
    'Eyes / ENT': 'from-cyan-500 to-teal-500',
    'Skin / Dermatology': 'from-orange-400 to-rose-400',
    'Mental Health': 'from-indigo-400 to-violet-500',
    "Women's Health": 'from-pink-400 to-rose-500',
    'General / Other': 'from-surface-400 to-surface-600',
  };

  if (status === 'loading') return (
    <><Navbar /><div className="min-h-[80vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div></>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">{t.documents.title}</h1>
            <p className="text-surface-500 mt-1">{documents.length} documents in your vault</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleExportPdf} className="btn-secondary" disabled={documents.length === 0}>
              <Download className="w-4 h-4" />{t.documents.export}
            </button>
            <Link href="/upload" className="btn-primary">
              <Upload className="w-4 h-4" />Upload
            </Link>
          </div>
        </motion.div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 p-1 bg-surface-100 dark:bg-surface-800/60 rounded-xl w-fit mb-6">
          {([
            { mode: 'list' as ViewMode, icon: LayoutList, label: 'All Documents' },
            { mode: 'hospital' as ViewMode, icon: Building2, label: 'By Hospital' },
            { mode: 'health-issue' as ViewMode, icon: FolderHeart, label: 'By Health Issue' },
          ] as const).map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${viewMode === mode
                  ? 'bg-white dark:bg-surface-700 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Filters (only visible in list mode) */}
        {viewMode === 'list' && (
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-11" placeholder={t.documents.search} />
            </form>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
                className="input-field pl-11 pr-10 w-full sm:w-48">
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>{cat === 'all' ? t.documents.all : cat.replace('-', ' ')}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-brand-500 mx-auto mb-4" />
            <p className="text-surface-500">{t.common.loading}</p>
          </div>
        ) : documents.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-14 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'linear-gradient(135deg, #4f46e520, #14b8a620)' }}>
              <FileText className="w-8 h-8 text-brand-400" />
            </div>
            <p className="text-surface-500 mb-5">{t.documents.noResults}</p>
            <Link href="/upload" className="btn-primary inline-flex"><Upload className="w-4 h-4" />Upload First</Link>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {/* ── LIST VIEW ── */}
            {viewMode === 'list' && (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                <AnimatePresence>
                  {documents.map((doc: any, i) => (
                    <motion.div key={doc._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
                      <DocCard
                        doc={doc}
                        isExpanded={expandedId === doc._id}
                        onToggle={() => setExpandedId(expandedId === doc._id ? null : doc._id)}
                        onDelete={() => handleDelete(doc._id)}
                        deleting={deleting === doc._id}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── HOSPITAL VIEW ── */}
            {viewMode === 'hospital' && (
              <motion.div key="hospital" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <p className="text-sm text-surface-500 mb-2">
                  {byHospital.length} hospital{byHospital.length !== 1 ? 's' : ''} — click a folder to expand
                </p>
                {byHospital.map(([hospital, docs], i) => (
                  <motion.div key={hospital} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <FolderGroup
                      title={hospital}
                      count={docs.length}
                      icon={Building2}
                      gradient="from-brand-500 to-violet-500"
                      defaultOpen={i === 0}
                    >
                      {docs.map((doc: any) => (
                        <DocCard
                          key={doc._id}
                          doc={doc}
                          isExpanded={expandedId === doc._id}
                          onToggle={() => setExpandedId(expandedId === doc._id ? null : doc._id)}
                          onDelete={() => handleDelete(doc._id)}
                          deleting={deleting === doc._id}
                        />
                      ))}
                    </FolderGroup>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* ── HEALTH ISSUE VIEW ── */}
            {viewMode === 'health-issue' && (
              <motion.div key="health-issue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <p className="text-sm text-surface-500 mb-2">
                  Documents are automatically grouped by health area using AI analysis
                </p>
                {byHealthIssue.map(([issue, docs], i) => (
                  <motion.div key={issue} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <FolderGroup
                      title={issue}
                      count={docs.length}
                      icon={FolderHeart}
                      gradient={healthIssueGradients[issue] || 'from-brand-500 to-teal-500'}
                      defaultOpen={i === 0}
                    >
                      {docs.map((doc: any) => (
                        <DocCard
                          key={doc._id}
                          doc={doc}
                          isExpanded={expandedId === doc._id}
                          onToggle={() => setExpandedId(expandedId === doc._id ? null : doc._id)}
                          onDelete={() => handleDelete(doc._id)}
                          deleting={deleting === doc._id}
                        />
                      ))}
                    </FolderGroup>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
      <Footer />
    </>
  );
}
