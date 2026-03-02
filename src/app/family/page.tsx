'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/providers/Providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Users,
  Plus,
  Loader2,
  UserCircle,
  Heart,
  Droplets,
  AlertTriangle,
  Edit3,
  Trash2,
  X,
  Save,
  Baby,
  User,
} from 'lucide-react';

const relationships = [
  'Spouse', 'Child', 'Parent', 'Sibling', 'Grandparent', 'Grandchild', 'Other',
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function FamilyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useLocale();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    relationship: 'Child',
    dateOfBirth: '',
    bloodGroup: '',
    allergies: '',
    notes: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/signin');
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') fetchMembers();
  }, [status]);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/family');
      const data = await res.json();
      setMembers(data.members || []);
    } catch {
      // ignore
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      ...formData,
      allergies: formData.allergies
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
    };

    try {
      if (editing) {
        const res = await fetch(`/api/family/${editing}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        setMembers((prev) => prev.map((m) => (m._id === editing ? data.member : m)));
      } else {
        const res = await fetch('/api/family', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        setMembers((prev) => [data.member, ...prev]);
      }

      resetForm();
    } catch {
      // ignore
    }
  };

  const handleEdit = (member: any) => {
    setEditing(member._id);
    setFormData({
      name: member.name,
      relationship: member.relationship,
      dateOfBirth: member.dateOfBirth || '',
      bloodGroup: member.bloodGroup || '',
      allergies: (member.allergies || []).join(', '),
      notes: member.notes || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this family member?')) return;
    setDeleting(id);
    try {
      await fetch(`/api/family/${id}`, { method: 'DELETE' });
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch {
      // ignore
    }
    setDeleting(null);
  };

  const resetForm = () => {
    setFormData({ name: '', relationship: 'Child', dateOfBirth: '', bloodGroup: '', allergies: '', notes: '' });
    setShowForm(false);
    setEditing(null);
  };

  const getRelationshipIcon = (rel: string) => {
    switch (rel.toLowerCase()) {
      case 'child':
        return Baby;
      case 'spouse':
        return Heart;
      default:
        return User;
    }
  };

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

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-brand-500/25">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
                {t.nav.family}
              </h1>
              <p className="text-surface-500 text-sm">Manage health records for your family</p>
            </div>
          </div>

          {!showForm && (
            <button onClick={() => setShowForm(true)} className="btn-primary">
              <Plus className="w-4 h-4" />
              Add Family Member
            </button>
          )}
        </motion.div>

        {/* Add/Edit Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="glass-card p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-surface-900 dark:text-white">
                    {editing ? 'Edit Family Member' : 'Add Family Member'}
                  </h2>
                  <button onClick={resetForm} className="btn-ghost p-2">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                      placeholder="e.g., Ram Karki"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Relationship *
                    </label>
                    <select
                      value={formData.relationship}
                      onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                      className="input-field"
                    >
                      {relationships.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Blood Group
                    </label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Select</option>
                      {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Allergies (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.allergies}
                      onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                      className="input-field"
                      placeholder="e.g., Penicillin, Dust"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Notes
                    </label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="input-field"
                      placeholder="Any additional notes"
                    />
                  </div>

                  <div className="sm:col-span-2 flex gap-3 mt-2">
                    <button type="button" onClick={resetForm} className="btn-secondary">
                      {t.common.cancel}
                    </button>
                    <button type="submit" className="btn-primary flex-1">
                      <Save className="w-4 h-4" />
                      {editing ? 'Update' : 'Add Member'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Members List */}
        {members.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-12 text-center">
            <UserCircle className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">No family members yet</h3>
            <p className="text-surface-500 mb-6">Add your family members to manage their health records too.</p>
            {!showForm && (
              <button onClick={() => setShowForm(true)} className="btn-primary">
                <Plus className="w-4 h-4" />
                Add First Member
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {members.map((member: any, i: number) => {
              const RelIcon = getRelationshipIcon(member.relationship);
              return (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card-hover p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/10 to-brand-500/10 flex items-center justify-center">
                      <RelIcon className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(member)} className="btn-ghost p-2 text-surface-400 hover:text-brand-500">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(member._id)}
                        disabled={deleting === member._id}
                        className="btn-ghost p-2 text-surface-400 hover:text-rose-500"
                      >
                        {deleting === member._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-surface-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-brand-500 font-medium">{member.relationship}</p>

                  <div className="mt-4 space-y-2">
                    {member.bloodGroup && (
                      <div className="flex items-center gap-2 text-sm text-surface-500">
                        <Droplets className="w-4 h-4 text-rose-400" />
                        Blood Group: {member.bloodGroup}
                      </div>
                    )}
                    {member.allergies?.length > 0 && (
                      <div className="flex items-start gap-2 text-sm text-surface-500">
                        <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
                        <span>Allergies: {member.allergies.join(', ')}</span>
                      </div>
                    )}
                    {member.dateOfBirth && (
                      <div className="flex items-center gap-2 text-sm text-surface-500">
                        <UserCircle className="w-4 h-4 text-surface-400" />
                        DOB: {member.dateOfBirth}
                      </div>
                    )}
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
