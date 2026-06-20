'use client';

import { useState } from 'react';
import type { MovementStatus } from '../../types/movements.types';
import { ImageUpload } from '@/features/products/components/ImageUpload/ImageUpload';

export interface RegisterMovementFormData {
  produto: string;
  valor: string;
  dataEntrada: string;
  comprador: string;
  descricao: string;
  fornecedor: string;
  tipo: 'Painel Solar' | 'Inversor' | 'Estrutura' | '';
  status: MovementStatus;
  imagem: File | null;
}

const INITIAL_FORM: RegisterMovementFormData = {
  produto: '',
  valor: '',
  dataEntrada: '',
  comprador: '',
  descricao: '',
  fornecedor: '',
  tipo: '',
  status: 'IN_STOCK',
  imagem: null,
};

const STATUS_OPTIONS = [
  { value: 'IN_STOCK', label: 'Em estoque' },
  { value: 'INSTALLED', label: 'Instalado' },
];

const TYPE_OPTIONS = [
  'Painel Solar',
  'Inversor',
  'Estrutura',
];

interface RegisterMovementFormProps {
  onSubmit: (data: RegisterMovementFormData) => void;
  onCancel: () => void;
}

// Reusable labelled input row
function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-36 shrink-0 text-base font-medium text-[#48505E]">
        {label}
      </span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

// Reusable text input
function TextInput({
  id,
  placeholder,
  value,
  onChange,
  type = 'text',
  step,
}: {
  id: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  step?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      step={step}
      className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 text-base text-[#48505E] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#858D9D] transition-colors focus:border-[#1366D9] focus:ring-2 focus:ring-[#1366D9]/10"
    />
  );
}

export function RegisterMovementForm({
  onSubmit,
  onCancel,
}: RegisterMovementFormProps) {
  const [form, setForm] = useState<RegisterMovementFormData>(INITIAL_FORM);

  const set = (key: keyof RegisterMovementFormData) => (value: string | File | null) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-xl font-medium text-[#383E49]">Nova Movimentação</h2>

      {/* Image upload */}
      <ImageUpload onChange={(file) => setForm((prev) => ({ ...prev, imagem: file }))} />

      {/* Fields */}
      <div className="flex flex-col gap-5 mt-2">
        <FieldRow label="Produto">
          <TextInput
            id="register-mov-produto"
            placeholder="Nome do produto"
            value={form.produto}
            onChange={set('produto')}
          />
        </FieldRow>

        <FieldRow label="Descrição">
          <TextInput
            id="register-mov-descricao"
            placeholder="Breve descrição"
            value={form.descricao}
            onChange={set('descricao')}
          />
        </FieldRow>

        <FieldRow label="Tipo">
          <select
            id="register-mov-tipo"
            value={form.tipo}
            onChange={(e) => set('tipo')(e.target.value)}
            className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 text-base text-[#48505E] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none transition-colors focus:border-[#1366D9] focus:ring-2 focus:ring-[#1366D9]/10 appearance-none"
          >
            <option value="" disabled hidden>
              Selecionar tipo do produto
            </option>
            {TYPE_OPTIONS.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </FieldRow>

        <FieldRow label="Valor">
          <TextInput
            id="register-mov-valor"
            placeholder="Ex: 250,00"
            value={form.valor}
            onChange={set('valor')}
            type="number"
            step="0.01"
          />
        </FieldRow>

        <FieldRow label="Comprador">
          <TextInput
            id="register-mov-comprador"
            placeholder="Nome do comprador"
            value={form.comprador}
            onChange={set('comprador')}
          />
        </FieldRow>

        <FieldRow label="Data de Entrada">
          <TextInput
            id="register-mov-data"
            placeholder="Data de entrada"
            value={form.dataEntrada}
            onChange={set('dataEntrada')}
            type="date"
          />
        </FieldRow>

        <FieldRow label="Fornecedor">
          <TextInput
            id="register-mov-fornecedor"
            placeholder="Nome do fornecedor"
            value={form.fornecedor}
            onChange={set('fornecedor')}
          />
        </FieldRow>

        <FieldRow label="Status">
          <select
            id="register-mov-status"
            value={form.status}
            onChange={(e) => set('status')(e.target.value)}
            className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 text-base text-[#48505E] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none transition-colors focus:border-[#1366D9] focus:ring-2 focus:ring-[#1366D9]/10 appearance-none"
          >
            {STATUS_OPTIONS.map((st) => (
              <option key={st.value} value={st.value}>
                {st.label}
              </option>
            ))}
          </select>
        </FieldRow>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4">
        <button
          type="submit"
          className="flex h-10 items-center justify-center rounded bg-[#1366D9] px-5 text-sm font-medium text-white transition-all hover:bg-[#1157B5] active:translate-y-px"
        >
          Adicionar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex h-10 items-center justify-center rounded border border-[#F0F1F3] px-5 text-base font-medium text-[#858D9D] transition-all hover:bg-gray-50 active:translate-y-px"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

