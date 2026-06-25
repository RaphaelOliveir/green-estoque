'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import type { Product } from '../../types/products.types';

interface ProductsTableProps {
  products: Product[];
  onAddProduct?: () => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDate(date: string) {
  if (!date) return '—';
  try {
    const dateStr = date.split('T')[0];
    const parts = dateStr.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
    return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(d);
  } catch {
    return date;
  }
}



function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1V15M1 8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TABLE_HEADERS = [
  { key: 'nome', label: 'Nome' },
  { key: 'valor', label: 'Valor' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'dataEntrada', label: 'Data de Entrada' },
  { key: 'dataCompra', label: 'Data de Compra' },
  { key: 'fornecedor', label: 'Fornecedor' },
];

const typeBadgeColors: Record<string, string> = {
  'Painel Solar': '#F59E0B',
  'Inversor': '#8B5CF6',
  'Estrutura': '#06B6D4',
};

export function ProductsTable({ products, onAddProduct }: ProductsTableProps) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const isEngineering = user?.role === 'ENGINEERING';

  return (
    <div className="rounded-xl bg-white shadow-sm">
      {/* Table Header Row */}
      <div className="flex items-center justify-between border-b border-[#F0F1F3] px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-[#383E49]">Produtos</h2>
          <p className="text-xs text-[#858D9D]">{products.length} produto{products.length !== 1 ? 's' : ''} cadastrado{products.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Add Product */}
          {isEngineering && (
            <button
              type="button"
              id="btn-adicionar-produto"
              onClick={onAddProduct}
              className="flex h-9 items-center gap-2 rounded-lg bg-[#1366D9] px-4 text-sm font-medium text-white transition-all hover:bg-[#1157B5] active:translate-y-px"
            >
              <PlusIcon />
              Adicionar Produto
            </button>
          )}
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-[2fr_1fr_1.2fr_1.3fr_1.3fr_1.3fr] border-b border-[#F0F1F3] px-5 py-3">
        {TABLE_HEADERS.map((col) => (
          <span key={col.key} className="text-xs font-semibold uppercase tracking-wide text-[#858D9D]">
            {col.label}
          </span>
        ))}
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-[#F0F1F3]">
        {products.map((product: any) => (
          <div
            key={product.id}
            onClick={() => router.push(`/products/${product.id}`)}
            className="grid cursor-pointer grid-cols-[2fr_1fr_1.2fr_1.3fr_1.3fr_1.3fr] items-center px-5 py-[14px] transition-colors hover:bg-[#F9FAFB]"
          >
            <span className="text-sm font-medium text-[#48505E]">{product.name || product.nome}</span>
            <span className="text-sm font-medium text-[#48505E]">
              {formatCurrency(product.cost ?? product.valor)}
            </span>
            <span>
              <span
                className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                style={{ 
                  backgroundColor: 
                    product.type === 'SOLAR_PANEL' || product.tipo === 'Painel Solar' ? '#F59E0B' :
                    product.type === 'INVERTER' || product.tipo === 'Inversor' ? '#8B5CF6' :
                    product.type === 'STRUCTURE' || product.tipo === 'Estrutura' ? '#06B6D4' : '#6B7280'
                }}
              >
                {product.type === 'SOLAR_PANEL' ? 'Painel Solar' : product.type === 'INVERTER' ? 'Inversor' : product.type === 'STRUCTURE' ? 'Estrutura' : product.tipo}
              </span>
            </span>
            <span className="text-sm text-[#48505E]">{formatDate(product.entryStockDate || product.dataEntrada)}</span>
            <span className="text-sm text-[#48505E]">{formatDate(product.purchaseDate || product.dataCompra)}</span>
            <span className="text-sm text-[#48505E]">{product.vendor || product.fornecedor}</span>
          </div>
        ))}
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between border-t border-[#F0F1F3] px-5 py-4">
        <span className="text-sm text-[#858D9D]">
          Mostrando {products.length} de {products.length} produtos
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D0D3D9] text-sm text-[#667085] disabled:opacity-40"
            aria-label="Página anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1366D9] text-sm font-medium text-white"
          >
            1
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D0D3D9] text-sm text-[#667085] hover:bg-gray-50"
            aria-label="Próxima página"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
