import type { MovementStats } from '../../types/movements.types';

interface MovementsStatsBannerProps {
  stats: MovementStats;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
}

export function MovementsStatsBanner({ stats }: MovementsStatsBannerProps) {
  return (
    <div className="flex h-[188px] w-full flex-col justify-center rounded-lg bg-white px-4">
      <h2 className="mb-6 text-xl font-medium text-[#383E49]">Movimentações</h2>

      <div className="flex items-start">
        {/* Total de pedidos */}
        <div className="flex w-[160px] flex-col gap-3">
          <span className="text-base font-semibold text-[#1570EF]">
            Total de pedidos
          </span>
          <span className="text-base font-semibold text-[#5D6679]">
            {stats.totalPedidos}
          </span>
        </div>

        <div className="mx-4 h-[99px] w-[1px] bg-[#F0F1F3]" />

        {/* Total recebido */}
        <div className="flex w-[240px] flex-col gap-3 px-4">
          <span className="text-base font-semibold text-[#E19133]">
            Total recebido
          </span>
          <div className="flex items-center gap-6">
            <span className="text-base font-semibold text-[#5D6679]">
              {stats.totalRecebido.quantidade}
            </span>
            <span className="text-base font-semibold text-[#5D6679]">
              {formatCurrency(stats.totalRecebido.valor)}
            </span>
          </div>
        </div>

        <div className="mx-4 h-[99px] w-[1px] bg-[#F0F1F3]" />

        {/* Total de retorno */}
        <div className="flex w-[240px] flex-col gap-3 px-4">
          <span className="text-base font-semibold text-[#845EBC]">
            Total de retorno
          </span>
          <div className="flex items-center gap-6">
            <span className="text-base font-semibold text-[#5D6679]">
              {stats.totalRetorno.quantidade}
            </span>
            <span className="text-base font-semibold text-[#5D6679]">
              {formatCurrency(stats.totalRetorno.valor)}
            </span>
          </div>
        </div>

        <div className="mx-4 h-[99px] w-[1px] bg-[#F0F1F3]" />

        {/* A caminho */}
        <div className="flex w-[160px] flex-col gap-3 px-4">
          <span className="text-base font-semibold text-[#F36960]">
            A caminho
          </span>
          <span className="text-base font-semibold text-[#5D6679]">
            {stats.aCaminho}
          </span>
        </div>
      </div>
    </div>
  );
}
