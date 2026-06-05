'use client';

function SuppliersIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="6" fill="#E8F4FE" />
      <path d="M10 14C10 14 10 9 15 9C20 9 20 14 20 14" stroke="#1570EF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 14H22V21H8V14Z" stroke="#1570EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15" cy="17.5" r="1.5" fill="#1570EF" />
    </svg>
  );
}

function CategoriesIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="6" fill="#FFF3E0" />
      <rect x="8" y="8" width="6" height="6" rx="1" fill="#F79009" />
      <rect x="16" y="8" width="6" height="6" rx="1" fill="#F79009" />
      <rect x="8" y="16" width="6" height="6" rx="1" fill="#F79009" />
      <rect x="16" y="16" width="6" height="6" rx="1" fill="#F79009" />
    </svg>
  );
}

interface ProductSummaryCardProps {
  fornecedores: number;
  categorias: number;
}

export function ProductSummaryCard({ fornecedores, categorias }: ProductSummaryCardProps) {
  return (
    <div className="relative flex flex-col rounded-lg bg-white p-4 pt-5">
      <h2 className="text-xl font-medium text-[#383E49]">Resumo de produtos</h2>

      <div className="mt-6 flex items-end justify-around">
        {/* Fornecedores */}
        <div className="flex flex-col items-center gap-2">
          <SuppliersIcon />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-base font-semibold text-[#5D6679]">{fornecedores}</span>
            <span className="text-sm font-medium text-[#444444]">Fornecedores</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[91px] w-px bg-[#F0F1F3]" />

        {/* Categorias */}
        <div className="flex flex-col items-center gap-2">
          <CategoriesIcon />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-base font-semibold text-[#5D6679]">{categorias}</span>
            <span className="text-sm font-medium text-[#444444]">Categorias</span>
          </div>
        </div>
      </div>
    </div>
  );
}
