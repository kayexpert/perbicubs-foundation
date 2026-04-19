'use client';

import { useState, useTransition } from 'react';
import { Plus, Pencil, Trash2, Loader2, AlertCircle, BarChart3 } from 'lucide-react';
import Drawer from './Drawer';
import FormField, { inputCls } from './FormField';
import ColorPicker from './ColorPicker';
import { upsertImpactStat, deleteImpactStat } from '@/app/admin/actions';
import { useRouter } from 'next/navigation';

interface Stat {
  id?: number;
  ordering: number;
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  accent: string;
}

const BLANK: Stat = {
  ordering: 1,
  value: 0,
  suffix: '',
  prefix: '',
  label: '',
  accent: '#00ABBE',
};

interface ImpactManagerProps {
  initialStats: Stat[];
}

export default function ImpactManager({ initialStats }: ImpactManagerProps) {
  const [stats, setStats] = useState<Stat[]>(initialStats);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [form, setForm] = useState<Stat>(BLANK);
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const set = (key: keyof Stat, val: unknown) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const openCreate = () => {
    setForm({ ...BLANK, ordering: stats.length + 1 });
    setIsNew(true);
    setError('');
    setDrawerOpen(true);
  };

  const openEdit = (stat: Stat) => {
    setForm({ ...stat });
    setIsNew(false);
    setError('');
    setDrawerOpen(true);
  };

  const handleSave = () => {
    if (!form.label.trim()) { setError('Label is required.'); return; }
    if (form.value === 0) { setError('Please enter a number greater than 0.'); return; }
    setError('');
    startTransition(async () => {
      const { error: err, record } = await upsertImpactStat(form as unknown as Record<string, unknown>, isNew ? undefined : form.id);
      if (err) { setError(err); return; }
      if (record) {
        if (isNew) {
          setStats((prev) => [...prev, record as Stat]);
        } else {
          setStats((prev) => prev.map((s) => (s.id === form.id ? (record as Stat) : s)));
        }
      }
      setDrawerOpen(false);
      router.refresh();
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const { error: err } = await deleteImpactStat(id);
      if (!err) {
        setStats((prev) => prev.filter((s) => s.id !== id));
        setDeleteId(null);
        router.refresh();
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3 sm:space-y-0 sm:flex sm:items-start sm:justify-between sm:gap-4">
        <div>
          <p className="text-[#FF6B56] text-xs font-bold uppercase tracking-widest mb-1">Homepage</p>
          <h1 className="text-2xl font-bold text-[#0a1628]">Impact Numbers</h1>
          <p className="text-gray-400 text-sm mt-1.5 max-w-lg">
            These are the key statistics that appear in the &quot;Numbers That Tell Our Story&quot; section —
            things like &quot;700,000+ Books Read&quot; and &quot;17,000+ Children Reached.&quot;
          </p>
        </div>
        <div className="flex justify-end sm:justify-start flex-shrink-0">
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#FF6B56] hover:bg-[#e55a47] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-md shadow-[#FF6B56]/20"
          >
            <Plus size={16} /> Add Statistic
          </button>
        </div>
      </div>

      {/* Empty state */}
      {stats.length === 0 && (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 size={28} className="text-gray-300" />
          </div>
          <p className="font-semibold text-gray-500 mb-1">No statistics yet</p>
          <p className="text-gray-400 text-sm mb-5">Add your first impact number</p>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-[#FF6B56] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#e55a47] transition-colors"
          >
            <Plus size={15} /> Add First Statistic
          </button>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            {/* Color swatch */}
            <div
              className="w-3 h-3 rounded-full mb-4 ring-4 ring-offset-2"
              style={{ background: stat.accent, '--tw-ring-color': `${stat.accent}30` } as React.CSSProperties}
            />
            {/* Number */}
            <p className="text-3xl font-bold leading-none tabular-nums" style={{ color: stat.accent }}>
              {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
            </p>
            {/* Label */}
            <p className="text-gray-500 text-sm font-medium mt-2 leading-snug">{stat.label}</p>
            {/* Order */}
            <p className="text-gray-300 text-[10px] mt-1">Order #{stat.ordering}</p>
            {/* Actions */}
            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-50">
              <button
                onClick={() => openEdit(stat)}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs text-gray-400 hover:text-[#00ABBE] hover:bg-[#00ABBE]/5 transition-colors font-semibold"
              >
                <Pencil size={12} /> Edit
              </button>
              <button
                onClick={() => setDeleteId(stat.id!)}
                className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}

        {/* Add new card */}
        {stats.length > 0 && (
          <button
            onClick={openCreate}
            className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#FF6B56]/60 hover:bg-[#FF6B56]/3 transition-all min-h-[160px] flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-[#FF6B56]"
          >
            <div className="w-10 h-10 rounded-xl border-2 border-dashed border-current flex items-center justify-center">
              <Plus size={18} />
            </div>
            <span className="text-xs font-semibold">Add statistic</span>
          </button>
        )}
      </div>

      {/* ── Create / Edit Drawer ── */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={isNew ? 'Add New Statistic' : 'Edit Statistic'}
        subtitle={
          isNew
            ? 'Enter the number and label for this impact statistic.'
            : 'Update the details below and click "Save Changes".'
        }
        footer={
          <div className="flex items-center justify-between gap-3">
            <div>
              {error && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {error}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDrawerOpen(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isPending}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-[#FF6B56] hover:bg-[#e55a47] text-white transition-colors disabled:opacity-60"
              >
                {isPending ? <Loader2 size={14} className="animate-spin" /> : null}
                {isNew ? 'Add Statistic' : 'Save Changes'}
              </button>
            </div>
          </div>
        }
      >
        {/* Live preview */}
        <div className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-100">
          <p className="text-gray-400 text-xs mb-2 font-medium">Preview</p>
          <div
            className="text-4xl font-bold tabular-nums"
            style={{ color: form.accent || '#00ABBE' }}
          >
            {form.prefix}{form.value ? form.value.toLocaleString() : '0'}{form.suffix}
          </div>
          <p className="text-gray-500 text-sm mt-2">{form.label || 'Your label here'}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <FormField label="Prefix" hint="e.g. $ for dollar">
            <input
              className={inputCls}
              placeholder="$"
              value={form.prefix}
              maxLength={5}
              onChange={(e) => set('prefix', e.target.value)}
            />
          </FormField>
          <FormField label="Number" required>
            <input
              type="number"
              className={inputCls}
              placeholder="700000"
              value={form.value || ''}
              onChange={(e) => set('value', Number(e.target.value))}
            />
          </FormField>
          <FormField label="Suffix" hint="e.g. + for plus">
            <input
              className={inputCls}
              placeholder="+"
              value={form.suffix}
              maxLength={5}
              onChange={(e) => set('suffix', e.target.value)}
            />
          </FormField>
        </div>

        <FormField label="Label" required hint="Short description of what this number represents">
          <input
            className={inputCls}
            placeholder="Books Read"
            value={form.label}
            onChange={(e) => set('label', e.target.value)}
          />
        </FormField>

        <FormField label="Accent Colour" hint="The colour used for this number on the website">
          <ColorPicker value={form.accent} onChange={(c) => set('accent', c)} />
        </FormField>

        <FormField label="Display Order" hint="Which position this number appears in. 1 = first.">
          <input
            type="number"
            className={inputCls}
            min={1}
            value={form.ordering}
            onChange={(e) => set('ordering', Number(e.target.value))}
          />
        </FormField>
      </Drawer>

      {/* ── Delete Confirmation ── */}
      <Drawer
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title="Remove this statistic?"
        subtitle="It will be permanently removed from the impact section."
        footer={
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteId(null)}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteId !== null && handleDelete(deleteId)}
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors disabled:opacity-60"
            >
              {isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              Yes, remove it
            </button>
          </div>
        }
      >
        <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-sm text-red-700 flex items-start gap-3">
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-red-400" />
          <p>Once removed, this statistic will disappear from your homepage immediately.</p>
        </div>
      </Drawer>
    </div>
  );
}
