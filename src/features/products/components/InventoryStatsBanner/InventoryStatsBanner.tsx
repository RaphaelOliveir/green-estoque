import type { InventoryStats } from '../../types/products.types';

interface InventoryStatsBannerProps {
  stats: InventoryStats;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
}

export function InventoryStatsBanner({ stats }: InventoryStatsBannerProps) {
  return (
    <div className="rounded-lg bg-white px-4 py-5">
      {/* Title */}
      <p className="mb-5 text-xl font-medium text-[#383E49]">Inventário</p>

      {/* Subtitle */}
      <p className="mb-4 text-sm text-[#858D9D]">Últimos 7 dias</p>

      {/* Stats grid with dividers */}
      <div className="grid grid-cols-4 divide-x divide-[#D0D3D9]">
        {/* Categorias */}
        <div className="pr-6">
          <p className="text-base font-semibold text-[#1570EF]">Categorias</p>
          <p className="mt-3 text-base font-semibold text-[#5D6679]">
            {stats.categorias}
          </p>
        </div>

        {/* Produtos */}
        <div className="px-6">
          <p className="text-base font-semibold text-[#E19133]">Produtos</p>
          <p className="mt-3 text-base font-semibold text-[#5D6679]">
            {stats.produtos}
          </p>
        </div>

        {/* Total de vendas */}
        <div className="px-6">
          <p className="text-base font-semibold text-[#845EBC]">
            Total de vendas
          </p>
          <p className="mt-3 text-base font-semibold text-[#5D6679]">
            {formatCurrency(stats.totalVendas)}
          </p>
        </div>

        {/* Pouco estoque */}
        <div className="pl-6">
          <p className="text-base font-semibold text-[#F36960]">
            Pouco estoque
          </p>
          <p className="mt-3 text-base font-semibold text-[#5D6679]">
            {stats.poucoEstoque}
          </p>
        </div>
      </div>
    </div>
  );
}
