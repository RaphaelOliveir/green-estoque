'use client';

import { useState } from 'react';
import { ImageUpload } from '../ImageUpload/ImageUpload';

export interface RegisterProductFormData {
  nome: string;
  idProduto: string;
  categoria: string;
  precoCompra: string;
  quantidade: string;
  validade: string;
  valorLimite: string;
  imagem: File | null;
}

const INITIAL_FORM: RegisterProductFormData = {
  nome: '',
  idProduto: '',
  categoria: '',
  precoCompra: '',
  quantidade: '',
  validade: '',
  valorLimite: '',
  imagem: null,
};

const CATEGORY_OPTIONS = [
  'Eletrônicos',
  'Alimentos',
  'Bebidas',
  'Limpeza',
  'Papelaria',
  'Ferramentas',
  'Outro',
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

        <FieldRow label="ID do produto">
          <TextInput
            id="register-product-id"
            placeholder="ID do produto"
            value={form.idProduto}
            onChange={set('idProduto')}
          />
        </FieldRow>

        <FieldRow label="Categoria">
          <select
            id="register-product-categoria"
            value={form.categoria}
            onChange={(e) => set('categoria')(e.target.value)}
            className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 text-base text-[#48505E] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none transition-colors focus:border-[#1366D9] focus:ring-2 focus:ring-[#1366D9]/10 appearance-none"
          >
            <option value="" disabled hidden>
              Selecionar categoria do produto
            </option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </FieldRow>

        <FieldRow label="Preço de compra">
          <TextInput
            id="register-product-preco"
            placeholder="Preço de compra"
            value={form.precoCompra}
            onChange={set('precoCompra')}
            type="number"
          />
        </FieldRow>

        <FieldRow label="Quantidade">
          <TextInput
            id="register-product-quantidade"
            placeholder="Quantidade"
            value={form.quantidade}
            onChange={set('quantidade')}
            type="number"
          />
        </FieldRow>

        <FieldRow label="Validade">
          <TextInput
            id="register-product-validade"
            placeholder="Digite a data de validade"
            value={form.validade}
            onChange={set('validade')}
            type="date"
          />
        </FieldRow>

        <FieldRow label="Valor limite">
          <TextInput
            id="register-product-valor-limite"
            placeholder="Limite de unidades"
            value={form.valorLimite}
            onChange={set('valorLimite')}
            type="number"
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
