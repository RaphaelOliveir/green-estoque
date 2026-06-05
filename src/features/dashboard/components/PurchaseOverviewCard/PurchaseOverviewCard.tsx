'use client';

function PurchaseIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="6" fill="#E8F4FE" />
      <path d="M8 9H10L12.5 18H19.5L22 12H12.5" stroke="#1570EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="13" cy="21" r="1" fill="#1570EF" />
      <circle cx="19" cy="21" r="1" fill="#1570EF" />
    </svg>
  );
}

function CostIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="6" fill="#FEE4E2" />
      <path d="M15 8V22M11 12H17C17 12 18.5 12 18.5 13.5C18.5 15 17 15 17 15H11" stroke="#F04438" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CancelIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="6" fill="#FFF3E0" />
      <circle cx="15" cy="15" r="6" stroke="#F79009" strokeWidth="1.5" />
      <path d="M12 12L18 18M18 12L12 18" stroke="#F79009" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="6" fill="#E6F7EE" />
      <path d="M9 12H20M9 12L12 9M9 12L12 15" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 18H10M21 18L18 15M21 18L18 21" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Divider() {
  return <div className="h-[66px] w-px bg-[#F0F1F3]" />;
}

interface PurchaseOverviewCardProps {
  compras: number;
  custo: number;
  cancelados: number;
  retorno: number;
}

export function PurchaseOverviewCard({ compras, custo, cancelados, retorno }: PurchaseOverviewCardProps) {
  const formatCurrency = (value: number) =>
    value >= 1000
      ? `R$ ${(value / 1000).toFixed(1).replace('.', ',')}k`
      : `R$ ${value}`;

  return (
    <div className="flex flex-col gap-5 rounded-lg bg-white px-4 py-5">
      <h2 className="text-xl font-medium text-[#383E49]">Visão geral - Compras</h2>

      <div className="flex items-center justify-between gap-5">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-[30px] w-[30px] items-center justify-center"><PurchaseIcon /></div>
          <div className="flex items-center gap-8">
            <span className="text-base font-semibold text-[#5D6679]">{compras}</span>
            <span className="text-sm font-medium text-[#667085]">Compras</span>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-[30px] w-[30px] items-center justify-center"><CostIcon /></div>
          <div className="flex items-center gap-8">
            <span className="text-base font-semibold text-[#5D6679]">{formatCurrency(custo)}</span>
            <span className="text-sm font-medium text-[#667085]">Custo</span>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-[30px] w-[30px] items-center justify-center"><CancelIcon /></div>
          <div className="flex items-center gap-5">
            <span className="text-base font-semibold text-[#5D6679]">{cancelados}</span>
            <span className="text-sm font-medium text-[#667085]">Cancelados</span>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-[30px] w-[30px] items-center justify-center"><ReturnIcon /></div>
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-[#5D6679]">{formatCurrency(retorno)}</span>
            <span className="text-sm font-medium text-[#667085]">Retorno</span>
          </div>
        </div>
      </div>
    </div>
  );
}
