'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { StockOverview } from '../../types';

interface StockOverviewChartProps {
  data: StockOverview;
}

const COLORS = ['#22C55E', '#3B82F6'];

export function StockOverviewChart({ data }: StockOverviewChartProps) {
  const chartData = [
    { name: 'Em Estoque', value: data.emEstoque },
    { name: 'Instalados', value: data.instalados },
  ];

  const total = data.emEstoque + data.instalados;

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="mb-1 text-base font-semibold text-[#383E49]">Visão Geral do Estoque</h2>
      <p className="mb-4 text-xs text-[#858D9D]">Em estoque e instalados</p>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => [`${value} produtos`, '']}
            contentStyle={{ borderRadius: 8, border: '1px solid #E4E7EC', fontSize: 12 }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-xs text-[#5D6679]">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-1 flex items-center justify-center gap-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#22C55E]">{data.emEstoque}</p>
          <p className="text-xs text-[#858D9D]">Em Estoque</p>
        </div>
        <div className="h-10 w-px bg-[#F0F1F3]" />
        <div className="text-center">
          <p className="text-2xl font-bold text-[#3B82F6]">{data.instalados}</p>
          <p className="text-xs text-[#858D9D]">Instalados</p>
        </div>
        <div className="h-10 w-px bg-[#F0F1F3]" />
        <div className="text-center">
          <p className="text-2xl font-bold text-[#383E49]">{total}</p>
          <p className="text-xs text-[#858D9D]">Total</p>
        </div>
      </div>
    </div>
  );
}
