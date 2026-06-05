'use client';

import type { Product } from '../../types/products.types';
import { DisponibilidadeBadge } from '../DisponibilidadeBadge/DisponibilidadeBadge';

interface ProductsTableProps {
  products: Product[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
}

// Filter/Export icons
function FiltersIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
        stroke="#5D6679"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1V15M1 8H15"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TABLE_HEADERS = [
  { key: 'nome', label: 'Produtos' },
  { key: 'valorCompra', label: 'Valor de compra' },
  { key: 'quantidade', label: 'Quantidade' },
  { key: 'valorLimite', label: 'Valor limite' },
  { key: 'validade', label: 'Validade' },
  { key: 'disponibilidade', label: 'Disponibilidade' },
];

export function ProductsTable({ products }: ProductsTableProps) {
  return (
    <div className="rounded-lg bg-white">
      {/* Table Header Row */}
      <div className="flex items-center justify-between border-b border-[#D0D3D9] px-4 py-5">
        <h2 className="text-xl font-medium text-[#383E49]">Produtos</h2>

        <div className="flex items-center gap-3">
          {/* Add Product */}
          <button
            type="button"
            id="btn-adicionar-produto"
            className="flex h-10 items-center gap-2 rounded bg-[#1366D9] px-4 text-sm font-medium text-white transition-all hover:bg-[#1157B5] active:translate-y-px"
          >
            <PlusIcon />
            Adicionar Produto
          </button>

          {/* Filters */}
          <button
            type="button"
            id="btn-filtros"
            className="flex h-10 items-center gap-2 rounded border border-[#D0D3D9] px-4 text-sm font-medium text-[#5D6679] shadow-sm transition-all hover:bg-gray-50 active:translate-y-px"
          >
            <FiltersIcon />
            Filtros
          </button>

          {/* Export */}
          <button
            type="button"
            id="btn-exportar"
            className="flex h-10 items-center gap-2 rounded border border-[#D0D3D9] px-4 text-sm font-medium text-[#5D6679] shadow-sm transition-all hover:bg-gray-50 active:translate-y-px"
          >
            Exportar
          </button>
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1.5fr_1.5fr] border-b border-[#D0D3D9] px-4 py-3">
        {TABLE_HEADERS.map((col) => (
          <span key={col.key} className="text-sm font-medium text-[#667085]">
            {col.label}
          </span>
        ))}
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-[#D0D3D9]">
        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1.5fr_1.5fr] items-center px-4 py-[14px] transition-colors hover:bg-[#F9FAFB]"
          >
            <span className="text-sm font-medium text-[#48505E]">
              {product.nome}
            </span>
            <span className="text-sm font-medium text-[#48505E]">
              {formatCurrency(product.valorCompra)}
            </span>
            <span className="text-sm font-medium text-[#48505E]">
              {product.quantidade} {product.quantidadeUnidade}
            </span>
            <span className="text-sm font-medium text-[#48505E]">
              {product.valorLimite} {product.valorLimiteUnidade}
            </span>
            <span className="text-sm font-medium text-[#48505E]">
              {product.validade}
            </span>
            <DisponibilidadeBadge status={product.disponibilidade} />
          </div>
        ))}
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between border-t border-[#D0D3D9] px-4 py-4">
        <span className="text-sm text-[#667085]">
          Mostrando {products.length} de {products.length} produtos
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            className="flex h-8 w-8 items-center justify-center rounded border border-[#D0D3D9] text-sm text-[#667085] disabled:opacity-40"
            aria-label="Página anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded bg-[#1366D9] text-sm font-medium text-white"
          >
            1
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded border border-[#D0D3D9] text-sm text-[#667085] hover:bg-gray-50"
            aria-label="Próxima página"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
