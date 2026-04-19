interface FormFieldProps {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export default function FormField({ label, hint, required, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-400 text-xs ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-gray-400 leading-snug">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-500 leading-snug flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

// ─── Shared input/textarea/select class helpers ───────────────
export const inputCls =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#00ABBE] focus:ring-2 focus:ring-[#00ABBE]/15 transition';

export const textareaCls =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#00ABBE] focus:ring-2 focus:ring-[#00ABBE]/15 transition resize-none';

export const selectCls =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-white focus:outline-none focus:border-[#00ABBE] focus:ring-2 focus:ring-[#00ABBE]/15 transition appearance-none cursor-pointer';
