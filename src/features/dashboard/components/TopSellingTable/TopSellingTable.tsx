'use client';

import type { TopSellingProduct } from '../../types';

interface TopSellingTableProps {
  products: TopSellingProduct[];
}

export function TopSellingTable({ products }: TopSellingTableProps) {
  const formatCurrency = (value: number) =>
    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="rounded-[10px] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5">
        <h2 className="text-xl font-medium text-[#383E49]">Mais vendidos</h2>
        <button
          type="button"
          className="text-sm text-[#0F50AA] hover:underline transition-all"
        >
          Ver tudo
        </button>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#F0F1F3]" />

      {/* Table header */}
      <div className="grid grid-cols-4 px-4 py-3">
        <span className="text-sm font-medium text-[#5D6679]">Nome</span>
        <span className="text-sm font-medium text-[#5D6679]">Quantidade vendida</span>
        <span className="text-sm font-medium text-[#5D6679]">Quantidade restante</span>
        <span className="text-sm font-medium text-[#5D6679]">Preço</span>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#F0F1F3]" />

      {/* Table rows */}
      {products.map((product, index) => (
        <div key={product.id}>
          <div className="grid grid-cols-4 px-4 py-5 hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium text-[#666666]">{product.nome}</span>
            <span className="text-sm font-medium text-[#666666]">{product.quantidadeVendida}</span>
            <span className="text-sm font-medium text-[#666666]">{product.quantidadeRestante}</span>
            <span className="text-sm font-medium text-[#666666]">{formatCurrency(product.preco)}</span>
          </div>
          {index < products.length - 1 && <div className="h-px w-full bg-[#F0F1F3]" />}
        </div>
      ))}
    </div>
  );
}
