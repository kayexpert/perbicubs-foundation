'use client';

import { useState, useTransition } from 'react';
import { Trash2, Pencil, Plus, X, Save, Loader2, GripVertical } from 'lucide-react';

// ─── Generic field definition ─────────────────────────────────
export interface FieldDef {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'number' | 'url';
  placeholder?: string;
  required?: boolean;
}

interface CrudTableProps<T extends Record<string, unknown>> {
  tableName: string;
  records: T[];
  fields: FieldDef[];
  displayColumns: (keyof T)[];
  columnLabels?: Partial<Record<keyof T, string>>;
  onSave: (data: Partial<T>, id?: number) => Promise<{ error?: string }>;
  onDelete: (id: number) => Promise<{ error?: string }>;
  title: string;
  description?: string;
}

export default function CrudTable<T extends Record<string, unknown>>({
  records,
  fields,
  displayColumns,
  columnLabels,
  onSave,
  onDelete,
  title,
  description,
}: CrudTableProps<T>) {
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState<Partial<T> & { id?: number } | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const openNew = () => {
    const empty: Partial<T> = {};
    fields.forEach((f) => { (empty as Record<string, unknown>)[f.key] = f.type === 'number' ? 0 : ''; });
    setEditing(empty);
    setIsNew(true);
    setError('');
  };

  const openEdit = (record: T) => {
    setEditing({ ...record });
    setIsNew(false);
    setError('');
  };

  const closeModal = () => { setEditing(null); setError(''); };

  const handleSave = () => {
    if (!editing) return;
    startTransition(async () => {
      const result = await onSave(editing, isNew ? undefined : (editing.id as number));
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(isNew ? 'Record created!' : 'Record updated!');
        setTimeout(() => setSuccess(''), 2500);
        closeModal();
      }
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const result = await onDelete(id);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess('Record deleted.');
        setTimeout(() => setSuccess(''), 2500);
        setDeleteId(null);
      }
    });
  };

  const setValue = (key: string, value: unknown) => {
    setEditing((prev) => prev ? { ...prev, [key]: value } : prev);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1628]">{title}</h1>
          {description && <p className="text-gray-500 text-sm mt-1">{description}</p>}
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-[#00ABBE] hover:bg-[#0097a6] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shrink-0"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {/* Toast */}
      {success && (
        <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-medium">
          ✓ {success}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {records.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-lg font-medium mb-1">No records yet</p>
            <p className="text-sm">Click &quot;Add New&quot; to create your first record.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide w-8" />
                  {displayColumns.map((col) => (
                    <th key={String(col)} className="py-3.5 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      {columnLabels?.[col] ?? String(col)}
                    </th>
                  ))}
                  <th className="py-3.5 px-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, i) => (
                  <tr key={String(record.id ?? i)} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-4 text-gray-300">
                      <GripVertical size={15} />
                    </td>
                    {displayColumns.map((col) => (
                      <td key={String(col)} className="py-3 px-4 text-gray-700 max-w-[240px]">
                        <span className="truncate block" title={String(record[col] ?? '')}>
                          {String(record[col] ?? '—')}
                        </span>
                      </td>
                    ))}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(record)}
                          className="p-1.5 rounded-lg hover:bg-[#00ABBE]/10 text-[#00ABBE] transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteId(record.id as number)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Edit / Create Modal ── */}
      {editing !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="font-bold text-[#0a1628] text-lg">{isNew ? 'New Record' : 'Edit Record'}</h2>
              <button onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Fields */}
            <div className="px-6 py-5 flex flex-col gap-4">
              {error && (
                <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>
              )}
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    {field.label}{field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      rows={4}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#00ABBE] focus:ring-2 focus:ring-[#00ABBE]/20 transition resize-none"
                      placeholder={field.placeholder}
                      value={String((editing as Record<string, unknown>)[field.key] ?? '')}
                      onChange={(e) => setValue(field.key, e.target.value)}
                    />
                  ) : (
                    <input
                      type={field.type ?? 'text'}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#00ABBE] focus:ring-2 focus:ring-[#00ABBE]/20 transition"
                      placeholder={field.placeholder}
                      value={String((editing as Record<string, unknown>)[field.key] ?? '')}
                      onChange={(e) =>
                        setValue(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={closeModal} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isPending}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#00ABBE] hover:bg-[#0097a6] text-white transition-colors disabled:opacity-60"
              >
                {isPending ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                {isNew ? 'Create' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h2 className="font-bold text-[#0a1628] text-lg mb-2">Delete Record</h2>
            <p className="text-gray-500 text-sm mb-6">Are you sure you want to delete this record? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={isPending}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-red-500 hover:bg-red-600 text-white transition-colors disabled:opacity-60"
              >
                {isPending ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
