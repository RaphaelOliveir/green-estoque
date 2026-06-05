import type { Movement, MovementStatus } from '../../types/movements.types';

interface MovementsTableProps {
  movements: Movement[];
  onAddPedido?: () => void;
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="#5D6679" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1V15M1 8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const TABLE_HEADERS = [
  { key: 'produto', label: 'Produto' },
  { key: 'valorPedido', label: 'Valor do pedido' },
  { key: 'quantidade', label: 'Quantidade' },
  { key: 'idPedido', label: 'ID do pedido' },
  { key: 'dataEntrega', label: 'Data de entrega' },
  { key: 'status', label: 'Status' },
];

const statusConfig: Record<string, string> = {
  'Confirmado': '#1570EF',
  'Em atraso': '#F79009',
  'Devolvido': '#667085',
  'Entregue': '#12B76A',
  'Retornado': '#667085',
};

export function MovementsTable({ movements, onAddPedido }: MovementsTableProps) {
  return (
    <div className="rounded-lg bg-white">
      {/* Table Header Row */}
      <div className="flex items-center justify-between border-b border-[#D0D3D9] px-4 py-5">
        <h2 className="text-xl font-medium text-[#383E49]">Pedidos</h2>

        <div className="flex items-center gap-3">
          {/* Add Pedido */}
          <button
            type="button"
            onClick={onAddPedido}
            className="flex h-10 items-center gap-2 rounded bg-[#1366D9] px-4 text-sm font-medium text-white transition-all hover:bg-[#1157B5] active:translate-y-px"
          >
            <PlusIcon />
            Adicionar Pedido
          </button>

          {/* Filters */}
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded border border-[#D0D3D9] px-4 text-sm font-medium text-[#5D6679] shadow-sm transition-all hover:bg-gray-50 active:translate-y-px"
          >
            <FiltersIcon />
            Filtros
          </button>

          {/* Export */}
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded border border-[#D0D3D9] px-4 text-sm font-medium text-[#5D6679] shadow-sm transition-all hover:bg-gray-50 active:translate-y-px"
          >
            Exportar
          </button>
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-[1.5fr_1.5fr_1fr_1.5fr_1.5fr_1.5fr] border-b border-[#D0D3D9] px-4 py-3">
        {TABLE_HEADERS.map((col) => (
          <span key={col.key} className="text-sm font-medium text-[#667085]">
            {col.label}
          </span>
        ))}
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-[#D0D3D9]">
        {movements.map((mov) => (
          <div
            key={mov.id}
            className="grid grid-cols-[1.5fr_1.5fr_1fr_1.5fr_1.5fr_1.5fr] items-center px-4 py-[14px] transition-colors hover:bg-[#F9FAFB]"
          >
            <span className="text-sm font-medium text-[#48505E]">{mov.produto}</span>
            <span className="text-sm font-medium text-[#48505E]">
              {formatCurrency(mov.valorPedido)}
            </span>
            <span className="text-sm font-medium text-[#48505E]">{mov.quantidade}</span>
            <span className="text-sm font-medium text-[#48505E]">{mov.idPedido}</span>
            <span className="text-sm font-medium text-[#48505E]">{mov.dataEntrega}</span>
            <span
              className="text-sm font-medium"
              style={{ color: statusConfig[mov.status] || '#667085' }}
            >
              {mov.status}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between border-t border-[#D0D3D9] px-4 py-4">
        <span className="text-sm text-[#667085]">
          Mostrando {movements.length} de {movements.length} pedidos
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            className="flex h-8 w-8 items-center justify-center rounded border border-[#D0D3D9] text-sm text-[#667085] disabled:opacity-40"
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
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
