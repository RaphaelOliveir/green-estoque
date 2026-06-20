'use client';

import type { TopSellingProduct } from '../../types';

interface TopSellingTableProps {
  products: TopSellingProduct[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
}

export function TopSellingTable({ products }: TopSellingTableProps) {
  return (
    <div className="rounded-xl bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-[#383E49]">Mais Vendidos</h2>
          <p className="text-xs text-[#858D9D]">Produtos com maior saída</p>
        </div>
        <button
          type="button"
          className="text-sm font-medium text-[#1366D9] hover:underline transition-all"
        >
          Ver tudo
        </button>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#F0F1F3]" />

      {/* Table header */}
      <div className="grid grid-cols-4 px-5 py-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#858D9D]">Produto</span>
        <span className="text-xs font-semibold uppercase tracking-wide text-[#858D9D]">Vendidos</span>
        <span className="text-xs font-semibold uppercase tracking-wide text-[#858D9D]">Fornecedor</span>
        <span className="text-xs font-semibold uppercase tracking-wide text-[#858D9D]">Preço Unit.</span>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#F0F1F3]" />

      {/* Table rows */}
      {products.map((product, index) => (
        <div key={product.id}>
          <div className="grid grid-cols-4 items-center px-5 py-4 hover:bg-[#F9FAFB] transition-colors">
            <span className="text-sm font-medium text-[#48505E]">{product.nome}</span>
            <span className="text-sm font-semibold text-[#22C55E]">{product.quantidadeVendida}</span>
            <span className="text-sm font-medium text-[#48505E]">{product.fornecedor}</span>
            <span className="text-sm font-medium text-[#48505E]">{formatCurrency(product.preco)}</span>
          </div>
          {index < products.length - 1 && <div className="h-px w-full bg-[#F0F1F3]" />}
        </div>
      ))}
    </div>
  );
}
