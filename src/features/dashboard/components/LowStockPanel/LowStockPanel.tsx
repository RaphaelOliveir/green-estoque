'use client';

import type { LowStockProduct } from '../../types';
import { cn } from '@/shared/lib/utils';

interface LowStockPanelProps {
  products: LowStockProduct[];
}

function SolarPanelPlaceholder({ index }: { index: number }) {
  const colors = [
    { bg: '#1E40AF', accent: '#3B82F6' },
    { bg: '#065F46', accent: '#10B981' },
    { bg: '#7C3AED', accent: '#A78BFA' },
  ];
  const color = colors[index % colors.length];

  return (
    <div
      className="flex h-[70px] w-[60px] items-center justify-center rounded"
      style={{ backgroundColor: color.bg }}
    >
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="2" y="2" width="32" height="32" rx="2" fill={color.accent} opacity="0.3" />
        <path d="M6 18H30M6 12H30M6 24H30M18 6V30" stroke={color.accent} strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export function LowStockPanel({ products }: LowStockPanelProps) {
  return (
    <div className="flex flex-col rounded-[10px] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5">
        <h2 className="text-xl font-medium text-[#383E49]">Em baixa no estoque</h2>
        <button
          type="button"
          className="text-sm text-[#0F50AA] hover:underline transition-all"
        >
          Ver tudo
        </button>
      </div>

      {/* Product list */}
      <div className="flex flex-col gap-0 divide-y divide-[#F0F1F3] px-4 pb-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center justify-between gap-6 py-4 hover:bg-gray-50 -mx-4 px-4 transition-colors"
          >
            {/* Product image */}
            <SolarPanelPlaceholder index={index} />

            {/* Product info */}
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-base font-semibold text-[#383E49]">{product.nome}</span>
              <span className="text-sm text-[#667085]">
                Quantidade restante : {product.quantidadeRestante}
              </span>
            </div>

            {/* Badge */}
            <div
              className={cn(
                'rounded-full px-3 py-0.5 text-xs font-medium',
                product.status === 'Baixo'
                  ? 'bg-[#FEECEB] text-[#AA3028]'
                  : 'bg-red-100 text-red-800',
              )}
            >
              {product.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
