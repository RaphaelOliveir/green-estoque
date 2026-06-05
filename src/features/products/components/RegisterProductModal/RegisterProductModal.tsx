'use client';

import { useEffect } from 'react';
import { RegisterProductForm } from '../RegisterProductForm/RegisterProductForm';
import type { RegisterProductFormData } from '../RegisterProductForm/RegisterProductForm';

interface RegisterProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RegisterProductFormData) => void;
}

export function RegisterProductModal({
  isOpen,
  onClose,
  onSubmit,
}: RegisterProductModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (data: RegisterProductFormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    /* Overlay */
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cadastrar novo produto"
      className="fixed inset-0 z-50 flex items-start justify-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#D0D3D9]/70"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="relative z-10 mt-[122px] w-[500px] max-h-[calc(100vh-160px)] overflow-y-auto rounded-lg bg-white p-7 shadow-xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#858D9D] hover:bg-gray-100 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <RegisterProductForm onSubmit={handleSubmit} onCancel={onClose} />
      </div>
    </div>
  );
}
