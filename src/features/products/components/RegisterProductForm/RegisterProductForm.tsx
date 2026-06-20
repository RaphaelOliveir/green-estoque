'use client';

import { useState } from 'react';
import { ImageUpload } from '../ImageUpload/ImageUpload';
import type { ProductType } from '../../types/products.types';

export interface RegisterProductFormData {
  nome: string;
  descricao: string;
  tipo: ProductType | '';
  valor: string;
  comprador: string;
  dataCompra: string;
  dataEntrada: string;
  fornecedor: string;
  imagem: File | null;
}

const INITIAL_FORM: RegisterProductFormData = {
  nome: '',
  descricao: '',
  tipo: '',
  valor: '',
  comprador: '',
  dataCompra: '',
  dataEntrada: '',
  fornecedor: '',
  imagem: null,
};

const TYPE_OPTIONS: ProductType[] = [
  'Painel Solar',
  'Inversor',
  'Estrutura',
];

interface RegisterProductFormProps {
  onSubmit: (data: RegisterProductFormData) => void;
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
}: {
  id: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 text-base text-[#48505E] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#858D9D] transition-colors focus:border-[#1366D9] focus:ring-2 focus:ring-[#1366D9]/10"
    />
  );
}

export function RegisterProductForm({
  onSubmit,
  onCancel,
}: RegisterProductFormProps) {
  const [form, setForm] = useState<RegisterProductFormData>(INITIAL_FORM);

  const set = (key: keyof RegisterProductFormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-xl font-medium text-[#383E49]">Novo produto</h2>

      {/* Image upload */}
      <ImageUpload onChange={(file) => setForm((prev) => ({ ...prev, imagem: file }))} />

      {/* Fields */}
      <div className="flex flex-col gap-5">
        <FieldRow label="Nome">
          <TextInput
            id="register-product-nome"
            placeholder="Nome do produto"
            value={form.nome}
            onChange={set('nome')}
          />
        </FieldRow>

        <FieldRow label="Descrição (opcional)">
          <TextInput
            id="register-product-descricao"
            placeholder="Breve descrição"
            value={form.descricao}
            onChange={set('descricao')}
          />
        </FieldRow>

        <FieldRow label="Tipo">
          <select
            id="register-product-tipo"
            value={form.tipo}
            onChange={(e) => set('tipo')(e.target.value as ProductType)}
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
            id="register-product-valor"
            placeholder="Valor"
            value={form.valor}
            onChange={set('valor')}
            type="number"
          />
        </FieldRow>

        <FieldRow label="Comprador">
          <TextInput
            id="register-product-comprador"
            placeholder="Nome do comprador"
            value={form.comprador}
            onChange={set('comprador')}
          />
        </FieldRow>

        <FieldRow label="Data de Compra">
          <TextInput
            id="register-product-datacompra"
            placeholder="Data da compra"
            value={form.dataCompra}
            onChange={set('dataCompra')}
            type="date"
          />
        </FieldRow>

        <FieldRow label="Fornecedor">
          <TextInput
            id="register-product-fornecedor"
            placeholder="Nome do fornecedor"
            value={form.fornecedor}
            onChange={set('fornecedor')}
          />
        </FieldRow>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          id="btn-adicionar-produto-submit"
          className="flex h-10 items-center justify-center rounded bg-[#1366D9] px-5 text-sm font-medium text-white transition-all hover:bg-[#1157B5] active:translate-y-px"
        >
          Adicionar
        </button>
        <button
          type="button"
          id="btn-cancelar-produto"
          onClick={onCancel}
          className="flex h-10 items-center justify-center rounded border border-[#F0F1F3] px-5 text-base font-medium text-[#858D9D] transition-all hover:bg-gray-50 active:translate-y-px"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
