'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Loader2, AlertCircle, Users } from 'lucide-react';
import Drawer from './Drawer';
import FormField, { inputCls } from './FormField';
import ImageUploader from './ImageUploader';
import { upsertTeamMember, deleteTeamMember } from '@/app/admin/actions';
import { useRouter } from 'next/navigation';

export interface TeamMember {
  id?: number;
  name: string;
  role: string;
  image: string;
  ordering: number;
}

const BLANK: TeamMember = {
  name: '',
  role: '',
  image: '',
  ordering: 1,
};

interface TeamManagerProps {
  initialMembers: TeamMember[];
}

export default function TeamManager({ initialMembers }: TeamManagerProps) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [form, setForm] = useState<TeamMember>(BLANK);
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const set = (key: keyof TeamMember, val: unknown) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const openCreate = () => {
    setForm({ ...BLANK, ordering: members.length + 1 });
    setIsNew(true);
    setError('');
    setDrawerOpen(true);
  };

  const openEdit = (member: TeamMember) => {
    setForm({ ...member });
    setIsNew(false);
    setError('');
    setDrawerOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) { setError('Name is required.'); return; }
    if (!form.role.trim()) { setError('Role / title is required.'); return; }
    setError('');
    startTransition(async () => {
      const { error: err, record } = await upsertTeamMember(
        form as unknown as Record<string, unknown>,
        isNew ? undefined : form.id,
      );
      if (err) { setError(err); return; }
      if (record) {
        if (isNew) {
          setMembers((prev) => [...prev, record as TeamMember]);
        } else {
          setMembers((prev) => prev.map((m) => (m.id === form.id ? (record as TeamMember) : m)));
        }
      }
      setDrawerOpen(false);
      router.refresh();
    });
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    startTransition(async () => {
      await deleteTeamMember(id);
      setMembers((prev) => prev.filter((m) => m.id !== id));
      setDeleteId(null);
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1628]">Team Members</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage the team cards shown on the About and Our Solution pages.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#0a1628] hover:bg-[#1a2d48] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors"
        >
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* ── Member grid ── */}
      {members.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="w-16 h-16 bg-[#00ABBE]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users size={28} className="text-[#00ABBE]" />
          </div>
          <p className="font-semibold text-gray-700 mb-1">No team members yet</p>
          <p className="text-gray-400 text-sm mb-5">Add your first team member to get started.</p>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-[#00ABBE] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#009aab] transition-colors"
          >
            <Plus size={15} /> Add Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...members].sort((a, b) => a.ordering - b.ordering).map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group"
            >
              {/* Photo */}
              <div className="relative h-52 bg-gray-100">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized={!member.image.includes('supabase')}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00ABBE] to-[#0a1628] flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Info + actions */}
              <div className="px-4 py-3.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-[#0a1628] text-sm leading-snug truncate">{member.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5 truncate">{member.role}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => openEdit(member)}
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-[#00ABBE]/10 hover:text-[#00ABBE] text-gray-500 flex items-center justify-center transition-colors"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => member.id && handleDelete(member.id)}
                    disabled={deleteId === member.id}
                    className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deleteId === member.id
                      ? <Loader2 size={14} className="animate-spin" />
                      : <Trash2 size={14} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Drawer ── */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={isNew ? 'Add Team Member' : 'Edit Team Member'}
      >
        <div className="space-y-5">
          {error && (
            <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
              <AlertCircle size={15} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <ImageUploader
            label="Photo"
            hint="Portrait photo — square or 3:4 ratio works best"
            value={form.image}
            onChange={(url) => set('image', url)}
          />

          <FormField label="Full Name">
            <input
              type="text"
              className={inputCls}
              placeholder="e.g. Kweku Andoh"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
            />
          </FormField>

          <FormField label="Role / Title">
            <input
              type="text"
              className={inputCls}
              placeholder="e.g. Executive Director & Founder"
              value={form.role}
              onChange={(e) => set('role', e.target.value)}
            />
          </FormField>

          <FormField label="Display Order" hint="Lower numbers appear first">
            <input
              type="number"
              min={1}
              className={inputCls}
              value={form.ordering}
              onChange={(e) => set('ordering', Number(e.target.value))}
            />
          </FormField>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0a1628] hover:bg-[#1a2d48] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors"
            >
              {isPending ? <Loader2 size={16} className="animate-spin" /> : null}
              {isPending ? 'Saving…' : isNew ? 'Add Member' : 'Save Changes'}
            </button>
            <button
              onClick={() => setDrawerOpen(false)}
              className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
