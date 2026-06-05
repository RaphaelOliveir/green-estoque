'use client';

import { useState, useRef } from 'react';

interface ImageUploadProps {
  onChange?: (file: File | null) => void;
}

export function ImageUpload({ onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0] ?? null;
    handleFile(file);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Preview box */}
      <button
        type="button"
        aria-label="Selecionar imagem do produto"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={[
          'flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border transition-colors',
          isDragging
            ? 'border-[#1366D9] bg-blue-50'
            : 'border-[#9D9D9D] bg-white hover:border-[#1366D9]',
        ].join(' ')}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Preview do produto" className="h-full w-full object-cover" />
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#9D9D9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 8L12 3L7 8" stroke="#9D9D9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 3V15" stroke="#9D9D9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Instructions */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-[#858D9D]">Arraste a imagem</p>
        <p className="text-sm text-[#858D9D]">ou</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-sm text-[#448DF2] hover:underline text-left"
        >
          Buscar imagem
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
