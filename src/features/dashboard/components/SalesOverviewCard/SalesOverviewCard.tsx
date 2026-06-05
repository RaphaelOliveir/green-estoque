'use client';

import { cn } from '@/shared/lib/utils';
import type { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  className?: string;
}

function StatCard({ icon, value, label, className }: StatCardProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div className="flex h-[30px] w-[30px] items-center justify-center">
        {icon}
      </div>
      <div className="flex items-center gap-8">
        <span className="text-base font-semibold text-[#5D6679]">{value}</span>
        <span className="text-sm font-medium text-[#667085]">{label}</span>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-[66px] w-px bg-[#F0F1F3]" />;
}

// Icons
function SalesIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="6" fill="#E8F4FE" />
      <path d="M9 17L13 13L16 16L21 11" stroke="#1570EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 11H21V13" stroke="#1570EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RevenueIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="6" fill="#E6F7EE" />
      <path d="M15 8V22M11 12H17C17 12 18.5 12 18.5 13.5C18.5 15 17 15 17 15H11M11 15H17C17 15 19 15 19 17C19 19 17 19 17 19H11" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProfitIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="6" fill="#FFF3E0" />
      <path d="M15 8L18 14H22L19 18L20.5 22L15 19L9.5 22L11 18L8 14H12L15 8Z" fill="#F79009" />
    </svg>
  );
}

function CostIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="6" fill="#FEE4E2" />
      <path d="M9 21L15 9L21 21M11.5 17H18.5" stroke="#F04438" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface SalesOverviewCardProps {
  vendas: number;
  receita: number;
  lucro: number;
  custo: number;
}

export function SalesOverviewCard({ vendas, receita, lucro, custo }: SalesOverviewCardProps) {
  const formatCurrency = (value: number) =>
    value >= 1000
      ? `R$ ${(value / 1000).toFixed(1).replace('.', ',')}k`
      : `R$ ${value}`;

  return (
    <div className="flex flex-col gap-5 rounded-lg bg-white px-4 py-5">
      <h2 className="text-xl font-medium text-[#383E49]">Visão geral - Vendas</h2>

      <div className="flex items-center justify-between gap-5">
        <StatCard icon={<SalesIcon />} value={`R$ ${vendas}`} label="Vendas" />
        <Divider />
        <StatCard icon={<RevenueIcon />} value={formatCurrency(receita)} label="Receita" />
        <Divider />
        <StatCard icon={<ProfitIcon />} value={`R$ ${lucro}`} label="Lucro" />
        <Divider />
        <StatCard icon={<CostIcon />} value={formatCurrency(custo)} label="Custo" />
      </div>
    </div>
  );
}
