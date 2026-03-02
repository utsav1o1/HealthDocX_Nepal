'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/providers/Providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Upload,
  FileImage,
  FileText,
  X,
  Loader2,
  CheckCircle2,
  Brain,
  ArrowRight,
  Sparkles,
  AlertCircle,
  PenLine,
  Wand2,
  Edit3,
  RefreshCw,
} from 'lucide-react';
import type { DocumentCategory } from '@/types';

const categories: { value: DocumentCategory; label: string }[] = [
  { value: 'prescription', label: 'Prescription' },
  { value: 'lab-report', label: 'Lab Report' },
  { value: 'imaging', label: 'Imaging / X-Ray' },
  { value: 'discharge-summary', label: 'Discharge Summary' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'vaccination', label: 'Vaccination' },
  { value: 'consultation', label: 'Consultation' },
  { value: 'surgery', label: 'Surgery' },
  { value: 'other', label: 'Other' },
];

type Step = 'upload' | 'mode' | 'ai-loading' | 'ai-confirm' | 'manual' | 'saving' | 'done';

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useLocale();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Form fields (used for both AI-filled + manual)
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DocumentCategory>('other');
  const [hospital, setHospital] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [familyMembers, setFamilyMembers] = useState<any[]>([]);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState('');

  // Flow
  const [step, setStep] = useState<Step>('upload');
  const [uploadedDocId, setUploadedDocId] = useState('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [aiRaw, setAiRaw] = useState<any>(null);
  const [aiResult, setAiResult] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/signin');
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/family')
        .then((r) => r.json())
        .then((data) => setFamilyMembers(data.members || []))
        .catch(() => { });
    }
  }, [status]);

  // ── Drag & Drop ─────────────────────────────────────────────
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const processFile = (f: File) => {
    if (f.size > 10 * 1024 * 1024) { setError('File size exceeds 10MB limit'); return; }
    setFile(f);
    setTitle(f.name.replace(/\.[^/.]+$/, ''));
    setDate(new Date().toISOString().split('T')[0]);
    setError('');
    if (f.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
    setStep('mode');
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) processFile(f);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
  };

  // ── Step 1: Upload file to server (without AI) ───────────────
  const uploadFileOnly = async (): Promise<{ docId: string; fileUrl: string } | null> => {
    if (!file) return null;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('category', category);
      formData.append('hospital', hospital);
      formData.append('doctor', doctor);
      formData.append('date', date);
      if (selectedFamilyMember) {
        const member = familyMembers.find((m) => m._id === selectedFamilyMember);
        formData.append('familyMemberId', selectedFamilyMember);
        formData.append('familyMemberName', member?.name || '');
      }
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Upload failed'); setUploading(false); return null; }
      setUploading(false);
      return { docId: data.document._id, fileUrl: data.fileUrl };
    } catch (err: any) {
      setError(err.message || 'Upload failed');
      setUploading(false);
      return null;
    }
  };

  // ── AI Mode: upload → run AI → show prefilled form ───────────
  const handleAiMode = async () => {
    setStep('ai-loading');
    const uploaded = await uploadFileOnly();
    if (!uploaded) { setStep('mode'); return; }
    setUploadedDocId(uploaded.docId);
    setUploadedFileUrl(uploaded.fileUrl);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId: uploaded.docId, fileUrl: uploaded.fileUrl }),
      });
      const data = await res.json();
      const ai = data.aiData || {};
      setAiRaw(ai);

      // Pre-fill form with AI values
      if (ai.hospitalName) setHospital(ai.hospitalName);
      if (ai.doctorName) setDoctor(ai.doctorName);
      if (ai.dateOfVisit) setDate(ai.dateOfVisit);

      // Try to infer category from AI diagnosis/procedures
      const text = JSON.stringify(ai).toLowerCase();
      if (text.includes('prescription') || text.includes('medication')) setCategory('prescription');
      else if (text.includes('lab') || text.includes('blood') || text.includes('urine')) setCategory('lab-report');
      else if (text.includes('x-ray') || text.includes('mri') || text.includes('ct') || text.includes('scan') || text.includes('imaging')) setCategory('imaging');
      else if (text.includes('discharge') || text.includes('admission')) setCategory('discharge-summary');
      else if (text.includes('vaccination') || text.includes('vaccine')) setCategory('vaccination');
      else if (text.includes('surgery') || text.includes('operation')) setCategory('surgery');
      else if (text.includes('consultation') || text.includes('consult')) setCategory('consultation');

      // Try to infer a better title
      if (ai.diagnosis?.length > 0) {
        setTitle(`${ai.diagnosis[0]} Report`);
      }
      setAiResult(ai);
      setStep('ai-confirm');
    } catch {
      setAiResult(null);
      setStep('ai-confirm');
    }
  };

  // ── Manual Mode: upload file then show blank form ─────────────
  const handleManualMode = async () => {
    setStep('manual');
    const uploaded = await uploadFileOnly();
    if (!uploaded) { setStep('mode'); return; }
    setUploadedDocId(uploaded.docId);
    setUploadedFileUrl(uploaded.fileUrl);
  };

  // ── Save: update doc with confirmed form data + run AI ────────
  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      // Update the document with confirmed metadata
      await fetch(`/api/documents/${uploadedDocId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, hospital, doctor, date }),
      });
      setSaving(false);
      setStep('done');
    } catch (err: any) {
      setError(err.message || 'Save failed');
      setSaving(false);
    }
  };

  // ── Re-run AI from confirm screen ────────────────────────────
  const handleRerunAi = async () => {
    setStep('ai-loading');
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId: uploadedDocId, fileUrl: uploadedFileUrl }),
      });
      const data = await res.json();
      setAiResult(data.aiData || null);
      if (data.aiData?.hospitalName) setHospital(data.aiData.hospitalName);
      if (data.aiData?.doctorName) setDoctor(data.aiData.doctorName);
      if (data.aiData?.dateOfVisit) setDate(data.aiData.dateOfVisit);
    } catch { /* ignore */ }
    setStep('ai-confirm');
  };

  const resetAll = () => {
    setFile(null); setPreview(null); setAiResult(null); setAiRaw(null);
    setTitle(''); setCategory('other'); setHospital(''); setDoctor(''); setDate('');
    setUploadedDocId(''); setUploadedFileUrl('');
    setStep('upload'); setError('');
  };

  const STEPS = ['Upload', 'Details', 'AI Analysis', 'Done'];
  const stepIndex = { upload: 0, mode: 1, 'ai-loading': 2, 'ai-confirm': 2, manual: 1, saving: 2, done: 3 }[step];

  if (status === 'loading') return (
    <><Navbar /><div className="min-h-[80vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div></>
  );

  // ── FORM used for both manual and AI-confirm ──────────────────
  const MetadataForm = ({ isAi }: { isAi: boolean }) => (
    <div className="grid sm:grid-cols-2 gap-5">
      {/* Title */}
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
          Document Title {isAi && <span className="text-xs font-normal text-brand-500 ml-1">✦ AI suggested</span>}
        </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" placeholder="e.g., Blood Test Results" />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
          Category {isAi && aiRaw && <span className="text-xs font-normal text-brand-500 ml-1">✦ AI suggested</span>}
        </label>
        <select value={category} onChange={(e) => setCategory(e.target.value as DocumentCategory)} className="input-field">
          {categories.map((cat) => (<option key={cat.value} value={cat.value}>{cat.label}</option>))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
          Date {isAi && aiRaw?.dateOfVisit && <span className="text-xs font-normal text-brand-500 ml-1">✦ AI read from document</span>}
        </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" />
      </div>

      {/* Hospital */}
      <div>
        <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
          Hospital / Clinic {isAi && aiRaw?.hospitalName && <span className="text-xs font-normal text-brand-500 ml-1">✦ AI detected</span>}
        </label>
        <input type="text" value={hospital} onChange={(e) => setHospital(e.target.value)} className="input-field" placeholder="e.g., Nepal Medical College" />
      </div>

      {/* Doctor */}
      <div>
        <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
          Doctor {isAi && aiRaw?.doctorName && <span className="text-xs font-normal text-brand-500 ml-1">✦ AI detected</span>}
        </label>
        <input type="text" value={doctor} onChange={(e) => setDoctor(e.target.value)} className="input-field" placeholder="e.g., Dr. Sharma" />
      </div>

      {/* Family member */}
      {familyMembers.length > 0 && (
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">Family Member (optional)</label>
          <select value={selectedFamilyMember} onChange={(e) => setSelectedFamilyMember(e.target.value)} className="input-field">
            <option value="">Myself</option>
            {familyMembers.map((m: any) => (<option key={m._id} value={m._id}>{m.name} ({m.relationship})</option>))}
          </select>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-1">{t.upload.title}</h1>
          <p className="text-surface-500 mb-8">Upload your medical document — let AI fill the details or do it yourself</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 mb-8">
          {STEPS.map((s, i) => {
            const isActive = i <= stepIndex;
            const isDone = i < stepIndex;
            return (
              <div key={s} className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300 ${isDone ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' :
                    isActive ? 'text-white shadow-lg shadow-brand-500/25' : 'bg-surface-100 dark:bg-surface-800 text-surface-400'
                  }`}
                  style={isActive && !isDone ? { background: 'linear-gradient(135deg, #4f46e5, #14b8a6)' } : {}}>
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                {i < 3 && (
                  <div className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${i < stepIndex ? 'bg-brand-500' : 'bg-surface-200 dark:bg-surface-700'}`} />
                )}
              </div>
            );
          })}
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
            <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* ══ STEP 1: FILE DROP ══ */}
          {step === 'upload' && (
            <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div
                onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                className={`relative glass-card p-12 sm:p-16 text-center cursor-pointer transition-all duration-300 border-2 border-dashed ${dragActive ? 'border-brand-500 scale-[1.02]' : 'border-surface-300 dark:border-surface-600 hover:border-brand-400 dark:hover:border-brand-500'
                  }`}
              >
                <input type="file" onChange={handleFileSelect} accept="image/*,.pdf" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'linear-gradient(135deg, #4f46e520, #14b8a620)' }}>
                  <Upload className="w-10 h-10 text-brand-500" />
                </div>
                <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">{t.upload.dragDrop}</h3>
                <p className="text-surface-500 mb-4">{t.upload.or}</p>
                <span className="btn-primary inline-flex">{t.upload.browse}</span>
                <p className="text-xs text-surface-400 mt-4">{t.upload.supportedFormats}</p>
              </div>
            </motion.div>
          )}

          {/* ══ STEP 2: CHOOSE MODE ══ */}
          {step === 'mode' && (
            <motion.div key="mode" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {/* File preview header */}
              <div className="glass-card p-4 sm:p-5 flex items-center gap-4 mb-6">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-14 h-14 rounded-xl object-cover" />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
                    {file?.type.includes('pdf') ? <FileText className="w-7 h-7 text-rose-500" /> : <FileImage className="w-7 h-7 text-brand-500" />}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">{file?.name}</p>
                  <p className="text-xs text-surface-500 mt-0.5">{((file?.size || 0) / 1024 / 1024).toFixed(2)} MB — Ready to process</p>
                </div>
                <button onClick={resetAll} className="btn-ghost p-2 text-surface-400 hover:text-rose-500"><X className="w-4 h-4" /></button>
              </div>

              <p className="text-center text-lg font-bold text-surface-900 dark:text-white mb-2">How would you like to fill in the details?</p>
              <p className="text-center text-surface-500 text-sm mb-8">AI can read your document and auto-fill the information, or you can type it yourself.</p>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* AI Auto-fill */}
                <motion.button
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAiMode}
                  className="glass-card p-7 text-left group hover:border-brand-300 dark:hover:border-brand-600 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-shadow"
                    style={{ background: 'linear-gradient(135deg, #4f46e5, #8b5cf6, #14b8a6)' }}>
                    <Wand2 className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">
                    Let AI Fill It In
                    <span className="ml-2 badge-brand text-[10px] px-2 py-0.5">Recommended</span>
                  </h3>
                  <p className="text-sm text-surface-500 leading-relaxed">
                    AI reads your document and automatically extracts the title, hospital, doctor, date, and category. You can review and edit before saving.
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-brand-600 dark:text-brand-400 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Powered by Google Gemini AI
                  </div>
                </motion.button>

                {/* Manual */}
                <motion.button
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleManualMode}
                  className="glass-card p-7 text-left group hover:border-surface-300 dark:hover:border-surface-600 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-surface-100 dark:bg-surface-800 group-hover:bg-surface-200 dark:group-hover:bg-surface-700 transition-colors">
                    <PenLine className="w-7 h-7 text-surface-600 dark:text-surface-400" />
                  </div>
                  <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">Fill in Manually</h3>
                  <p className="text-sm text-surface-500 leading-relaxed">
                    Type the document details yourself — title, category, hospital, doctor, and date. Full control, instant save.
                  </p>
                  <div className="mt-4 text-xs text-surface-400 font-medium">Faster for simple documents</div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ══ AI LOADING ══ */}
          {step === 'ai-loading' && (
            <motion.div key="ai-loading" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="glass-card p-12 sm:p-16 text-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-brand-500/30"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #8b5cf6, #14b8a6)' }}>
                <Brain className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-3">
                {uploading ? 'Uploading your document...' : 'AI is reading your document...'}
              </h2>
              <p className="text-surface-500 max-w-md mx-auto">
                {uploading ? 'Securely uploading to the cloud.' : 'Extracting hospital, doctor, date, and medical information. This usually takes 10–20 seconds.'}
              </p>
              <div className="mt-8 flex items-center justify-center gap-2">
                {[0, 150, 300].map((delay) => (
                  <div key={delay} className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            </motion.div>
          )}

          {/* ══ AI CONFIRM: review AI suggestions + edit ══ */}
          {step === 'ai-confirm' && (
            <motion.div key="ai-confirm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="glass-card p-5 sm:p-8 mb-5">
                {/* AI summary banner */}
                {aiResult && (
                  <div className="mb-6 p-4 rounded-xl border flex items-start gap-3"
                    style={{ background: 'linear-gradient(135deg, #4f46e508, #14b8a608)', borderColor: '#4f46e530' }}>
                    <Sparkles className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-brand-700 dark:text-brand-300 mb-1">AI Analysis Complete</p>
                      <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">{aiResult.summary}</p>
                      {aiResult.diagnosis?.length > 0 && (
                        <p className="text-xs text-surface-500 mt-2">
                          <span className="font-semibold">Diagnosis:</span> {aiResult.diagnosis.join(', ')}
                        </p>
                      )}
                      {aiResult.medications?.length > 0 && (
                        <p className="text-xs text-surface-500">
                          <span className="font-semibold">Medications:</span> {aiResult.medications.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mb-5">
                  <Edit3 className="w-4 h-4 text-surface-400" />
                  <p className="text-sm font-semibold text-surface-700 dark:text-surface-300">
                    Review the AI-filled details below and edit anything that looks wrong
                  </p>
                </div>

                <MetadataForm isAi={true} />

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button onClick={() => setStep('mode')} className="btn-secondary">← Back</button>
                  <button onClick={handleRerunAi} className="btn-secondary">
                    <RefreshCw className="w-4 h-4" />
                    Re-run AI
                  </button>
                  <button onClick={handleSave} disabled={saving || !title} className="btn-primary flex-1">
                    {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><CheckCircle2 className="w-4 h-4" />Confirm & Save</>}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══ MANUAL FORM ══ */}
          {step === 'manual' && (
            <motion.div key="manual" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="glass-card p-5 sm:p-8">
                {uploading ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-brand-500 mx-auto mb-3" />
                    <p className="text-surface-500 text-sm">Uploading file...</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-6">
                      <PenLine className="w-4 h-4 text-surface-400" />
                      <p className="text-sm font-semibold text-surface-700 dark:text-surface-300">Enter the document details manually</p>
                    </div>
                    <MetadataForm isAi={false} />
                    <div className="flex gap-3 mt-8">
                      <button onClick={() => setStep('mode')} className="btn-secondary">← Back</button>
                      <button onClick={handleSave} disabled={saving || !title} className="btn-primary flex-1">
                        {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><CheckCircle2 className="w-4 h-4" />Save Document</>}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* ══ DONE ══ */}
          {step === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <div className="glass-card p-10 sm:p-14 text-center mb-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.4, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </motion.div>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Document Saved!</h2>
                <p className="text-surface-500 mb-1">{title}</p>
                <p className="text-xs text-surface-400">{hospital && `${hospital} · `}{doctor && `${doctor} · `}{date}</p>

                {aiResult && (
                  <div className="mt-6 p-4 rounded-xl text-left space-y-2"
                    style={{ background: 'linear-gradient(135deg, #4f46e508, #14b8a608)', border: '1px solid #4f46e530' }}>
                    <p className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> AI Summary
                    </p>
                    <p className="text-xs text-surface-500 leading-relaxed">{aiResult.summary}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button onClick={resetAll} className="btn-secondary flex-1">Upload Another</button>
                <Link href="/documents" className="btn-primary flex-1">
                  View Documents <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}
