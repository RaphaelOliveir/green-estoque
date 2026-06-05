'use client';

import { useState } from 'react';

export interface RegisterMovementFormData {
  produto: string;
  idPedido: string;
  valorPedido: string;
  quantidade: string;
  dataEntrega: string;
  status: string;
}

const INITIAL_FORM: RegisterMovementFormData = {
  produto: '',
  idPedido: '',
  valorPedido: '',
  quantidade: '',
  dataEntrega: '',
  status: 'Confirmado',
};

const STATUS_OPTIONS = [
  'Confirmado',
  'Em atraso',
  'Devolvido',
  'Entregue',
  'Retornado',
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

export function RegisterMovementForm({
  onSubmit,
  onCancel,
}: RegisterMovementFormProps) {
  const [form, setForm] = useState<RegisterMovementFormData>(INITIAL_FORM);

  const set = (key: keyof RegisterMovementFormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-xl font-medium text-[#383E49]">Novo pedido</h2>

      {/* Fields */}
      <div className="flex flex-col gap-5 mt-2">
        <FieldRow label="Produto">
          <TextInput
            id="register-mov-produto"
            placeholder="Nome ou código do produto"
            value={form.produto}
            onChange={set('produto')}
          />
        </FieldRow>

        <FieldRow label="ID do pedido">
          <TextInput
            id="register-mov-id"
            placeholder="Ex: 7535"
            value={form.idPedido}
            onChange={set('idPedido')}
          />
        </FieldRow>

        <FieldRow label="Valor do pedido">
          <TextInput
            id="register-mov-valor"
            placeholder="Ex: 250,00"
            value={form.valorPedido}
            onChange={set('valorPedido')}
            type="number"
            step="0.01"
          />
        </FieldRow>

        <FieldRow label="Quantidade">
          <TextInput
            id="register-mov-quantidade"
            placeholder="Quantidade"
            value={form.quantidade}
            onChange={set('quantidade')}
            type="number"
          />
        </FieldRow>

        <FieldRow label="Data de entrega">
          <TextInput
            id="register-mov-data"
            placeholder="Data de entrega"
            value={form.dataEntrega}
            onChange={set('dataEntrega')}
            type="date"
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
              <option key={st} value={st}>
                {st}
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
