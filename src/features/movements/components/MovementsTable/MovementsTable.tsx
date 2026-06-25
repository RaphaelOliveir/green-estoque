'use client';

import { useRouter } from 'next/navigation';
import type { Movement } from '../../types/movements.types';

interface MovementsTableProps {
  movements: Movement[];
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



const TABLE_HEADERS = [
  { key: 'produto', label: 'Nome do Produto' },
  { key: 'valor', label: 'Valor' },
  { key: 'dataEntrada', label: 'Data de Entrada' },
  { key: 'comprador', label: 'Comprador' },
  { key: 'fornecedor', label: 'Fornecedor' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'status', label: 'Status' },
];

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  IN_STOCK: { bg: '#ECFDF3', text: '#027A48', label: 'Em estoque' },
  INSTALLED: { bg: '#EFF8FF', text: '#175CD3', label: 'Instalado' },
};

const typeBadgeColors: Record<string, string> = {
  'Painel Solar': '#F59E0B',
  'Inversor': '#8B5CF6',
  'Estrutura': '#06B6D4',
};

export function MovementsTable({ movements }: MovementsTableProps) {
  const router = useRouter();

  return (
    <div className="rounded-xl bg-white shadow-sm">
      {/* Table Header Row */}
      <div className="flex items-center justify-between border-b border-[#F0F1F3] px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-[#383E49]">Movimentações</h2>
          <p className="text-xs text-[#858D9D]">{movements.length} registro{movements.length !== 1 ? 's' : ''}</p>
        </div>


      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-[1.5fr_1fr_1.2fr_1.2fr_1.2fr_1fr_1fr] border-b border-[#F0F1F3] px-5 py-3">
        {TABLE_HEADERS.map((col) => (
          <span key={col.key} className="text-xs font-semibold uppercase tracking-wide text-[#858D9D]">
            {col.label}
          </span>
        ))}
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-[#F0F1F3]">
        {movements.map((mov: any) => {
          const statusStyle = statusConfig[mov.status] || { bg: '#F1F2F4', text: '#5D6679', label: mov.status === 'EM_ESTOQUE' ? 'Em estoque' : mov.status === 'INSTALADO' ? 'Instalado' : mov.status };
          
          return (
            <div
              key={mov.id}
              onClick={() => router.push(`/movements/${mov.id}`)}
              className="grid cursor-pointer grid-cols-[1.5fr_1fr_1.2fr_1.2fr_1.2fr_1fr_1fr] items-center px-5 py-[14px] transition-colors hover:bg-[#F9FAFB]"
            >
              <span className="text-sm font-medium text-[#48505E] truncate pr-2">{mov.name || mov.produto}</span>
              <span className="text-sm font-medium text-[#48505E]">{formatCurrency(mov.cost ?? mov.valor)}</span>
              <span className="text-sm text-[#48505E]">{formatDate(mov.entryStockDate || mov.dataEntrada)}</span>
              <span className="text-sm text-[#48505E] truncate pr-2">{mov.customer || mov.comprador || '—'}</span>
              <span className="text-sm text-[#48505E] truncate pr-2">{mov.vendor || mov.fornecedor}</span>
              <span>
                <span
                  className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                  style={{ 
                    backgroundColor: 
                      mov.type === 'SOLAR_PANEL' || mov.tipo === 'Painel Solar' ? '#F59E0B' :
                      mov.type === 'INVERTER' || mov.tipo === 'Inversor' ? '#8B5CF6' :
                      mov.type === 'STRUCTURE' || mov.tipo === 'Estrutura' ? '#06B6D4' : '#6B7280'
                  }}
                >
                  {mov.type === 'SOLAR_PANEL' ? 'Painel Solar' : mov.type === 'INVERTER' ? 'Inversor' : mov.type === 'STRUCTURE' ? 'Estrutura' : mov.tipo}
                </span>
              </span>
              <span>
                <span
                  className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                >
                  {statusStyle.label}
                </span>
              </span>
            </div>
          );
        })}
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between border-t border-[#F0F1F3] px-5 py-4">
        <span className="text-sm text-[#858D9D]">
          Mostrando {movements.length} de {movements.length} registros
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D0D3D9] text-sm text-[#667085] disabled:opacity-40"
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
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

