'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Link, X, Loader2, CheckCircle2, ImageIcon } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import FormField, { inputCls } from './FormField';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
}

const BUCKET = 'content-images';
const MAX_WIDTH = 1920;
const QUALITY = 0.85;

async function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, MAX_WIDTH / img.naturalWidth);
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => {
          const name = file.name.replace(/\.[^.]+$/, '.webp');
          resolve(new File([blob!], name, { type: 'image/webp' }));
        },
        'image/webp',
        QUALITY,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };
    img.src = objectUrl;
  });
}

export default function ImageUploader({
  value,
  onChange,
  label = 'Image',
  hint,
}: ImageUploaderProps) {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [urlInput, setUrlInput] = useState(value ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  const doUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP, etc.)');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setUploadError('Image must be under 20 MB.');
      return;
    }
    setUploading(true);
    setUploadError('');
    setUploaded(false);

    setUploadProgress('Optimising image…');
    const compressed = await compressImage(file);

    setUploadProgress('Uploading…');
    const supabase = createClient();
    const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(filename, compressed, { upsert: false, contentType: 'image/webp' });

    if (error) {
      setUploadError(
        error.message.includes('Bucket not found')
          ? '⚠️ Storage bucket "content-images" not found. Please follow the storage setup instructions below.'
          : `Upload failed: ${error.message}`,
      );
      setUploading(false);
      setUploadProgress('');
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
    onChange(publicUrl);
    setUploaded(true);
    setUploading(false);
    setUploadProgress('');
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) doUpload(file);
  }, [doUpload]);

  const applyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUploadError('');
    }
  };

  return (
    <FormField
      label={label}
      hint={hint ?? (mode === 'upload' ? 'JPG, PNG, or WebP · Auto-optimised before upload' : 'Paste a full URL to an image')}
    >
      {/* Tab switcher */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-2">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-lg transition-all ${
            mode === 'upload' ? 'bg-white shadow text-[#0a1628]' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Upload size={13} /> Upload from Computer
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-lg transition-all ${
            mode === 'url' ? 'bg-white shadow text-[#0a1628]' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Link size={13} /> Use a URL
        </button>
      </div>

      {/* Current image preview (with uploading overlay) */}
      {value && (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 mb-2" style={{ aspectRatio: '16/7' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="w-full h-full object-cover" onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }} />

          {/* Upload-in-progress overlay */}
          {uploading ? (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3">
              <Loader2 size={30} className="text-[#00ABBE] animate-spin" />
              <p className="text-white text-sm font-semibold">{uploadProgress || 'Uploading…'}</p>
            </div>
          ) : (
            <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-colors group flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-xs font-bold transition-opacity flex items-center gap-1.5"
              >
                <Upload size={12} /> Change
              </button>
              <button
                type="button"
                onClick={() => { onChange(''); setUploaded(false); setUrlInput(''); }}
                className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-1.5 rounded-lg transition-opacity"
              >
                <X size={13} />
              </button>
            </div>
          )}

          {uploaded && !uploading && (
            <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full px-2.5 py-1 text-[10px] font-bold flex items-center gap-1">
              <CheckCircle2 size={11} /> Uploaded
            </div>
          )}
        </div>
      )}

      {/* Upload drop zone (shown when no image set) */}
      {mode === 'upload' && !value && (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`rounded-xl border-2 border-dashed p-8 text-center transition-all ${
            uploading
              ? 'border-[#00ABBE] bg-[#00ABBE]/5 cursor-default'
              : isDragging
              ? 'border-[#00ABBE] bg-[#00ABBE]/5 scale-[1.01] cursor-copy'
              : 'border-gray-200 hover:border-[#00ABBE]/60 hover:bg-gray-50/80 cursor-pointer'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#00ABBE]/10 flex items-center justify-center">
                <Loader2 size={24} className="text-[#00ABBE] animate-spin" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#00ABBE]">{uploadProgress || 'Uploading…'}</p>
                <p className="text-gray-400 text-xs mt-1">Please wait, do not close this panel</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-14 h-14 rounded-2xl bg-[#00ABBE]/10 flex items-center justify-center">
                <ImageIcon size={24} className="text-[#00ABBE]" />
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-sm">Drag & drop or click to browse</p>
                <p className="text-gray-400 text-xs mt-1">JPG, PNG, WebP — auto-compressed &amp; optimised</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* URL input mode */}
      {mode === 'url' && (
        <div className="flex gap-2">
          <input
            type="url"
            className={inputCls + ' flex-1'}
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyUrl()}
          />
          <button
            type="button"
            onClick={applyUrl}
            className="px-4 py-3 bg-[#0a1628] text-white text-sm font-semibold rounded-xl hover:bg-[#1a2d48] transition-colors whitespace-nowrap"
          >
            Use this
          </button>
        </div>
      )}

      {uploadError && (
        <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl p-3 mt-1 leading-relaxed">
          {uploadError}
          {uploadError.includes('storage setup') && (
            <div className="mt-2 text-gray-600">
              <strong>Setup steps:</strong>
              <ol className="list-decimal ml-4 mt-1 space-y-0.5">
                <li>Go to your Supabase Dashboard → Storage</li>
                <li>Click &quot;New bucket&quot; → name it <code className="bg-gray-100 px-1 rounded">content-images</code></li>
                <li>Enable &quot;Public bucket&quot; toggle → Save</li>
              </ol>
            </div>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) doUpload(file);
          e.target.value = '';
        }}
      />
    </FormField>
  );
}
