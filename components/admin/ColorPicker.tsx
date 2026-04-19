interface ColorPickerProps {
  value: string;
  onChange: (val: string) => void;
}

const COLORS = [
  { label: 'Teal (Primary)',  hex: '#00ABBE' },
  { label: 'Coral (Accent)',  hex: '#FF6B56' },
  { label: 'Navy (Dark)',     hex: '#0a1628' },
  { label: 'Purple',          hex: '#6366f1' },
  { label: 'Green',           hex: '#10b981' },
  { label: 'Orange',          hex: '#f59e0b' },
];

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLORS.map((c) => (
        <button
          key={c.hex}
          type="button"
          title={c.label}
          onClick={() => onChange(c.hex)}
          className={`w-9 h-9 rounded-xl transition-all ${
            value === c.hex ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-105'
          }`}
          style={{ background: c.hex }}
        />
      ))}
      {/* Custom color input */}
      <div className="flex items-center gap-1.5">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-9 h-9 rounded-xl border border-gray-200 cursor-pointer p-0.5"
          title="Custom color"
        />
        <span className="text-xs text-gray-400 font-mono">{value}</span>
      </div>
    </div>
  );
}
