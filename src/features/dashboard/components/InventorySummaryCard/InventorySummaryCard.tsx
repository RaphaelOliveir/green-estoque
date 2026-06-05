'use client';

function QuantityIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="6" fill="#E8F4FE" />
      <path d="M21 8H9C8.44772 8 8 8.44772 8 9V21C8 21.5523 8.44772 22 9 22H21C21.5523 22 22 21.5523 22 21V9C22 8.44772 21.5523 8 21 8Z" stroke="#1570EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12H18M12 15H18M12 18H15" stroke="#1570EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OnTheWayIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="6" fill="#E6F7EE" />
      <rect x="8" y="10" width="10" height="8" rx="1" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 13H21L23 16V18H18V13Z" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="11" cy="19.5" r="1.5" fill="#12B76A" />
      <circle cx="20.5" cy="19.5" r="1.5" fill="#12B76A" />
    </svg>
  );
}

interface InventorySummaryCardProps {
  emEstoque: number;
  aReceber: number;
}

export function InventorySummaryCard({ emEstoque, aReceber }: InventorySummaryCardProps) {
  return (
    <div className="relative flex flex-col rounded-lg bg-white p-4 pt-5">
      <h2 className="text-xl font-medium text-[#383E49]">Resumo de inventário</h2>

      <div className="mt-6 flex items-end justify-around">
        {/* Em estoque */}
        <div className="flex flex-col items-center gap-2">
          <QuantityIcon />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-base font-semibold text-[#5D6679]">{emEstoque}</span>
            <span className="text-sm font-medium text-[#444444]">Em estoque</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[91px] w-px bg-[#F0F1F3]" />

        {/* A receber */}
        <div className="flex flex-col items-center gap-2">
          <OnTheWayIcon />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-base font-semibold text-[#5D6679]">{aReceber}</span>
            <span className="text-sm font-medium text-[#444444]">A receber</span>
          </div>
        </div>
      </div>
    </div>
  );
}
