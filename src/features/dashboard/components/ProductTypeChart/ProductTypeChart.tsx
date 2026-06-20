'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ProductTypeBreakdown } from '../../types';

interface ProductTypeChartProps {
  data: ProductTypeBreakdown;
}

const COLORS = ['#F59E0B', '#8B5CF6', '#06B6D4'];

export function ProductTypeChart({ data }: ProductTypeChartProps) {
  const chartData = [
    { name: 'Painel Solar', value: data.painelSolar },
    { name: 'Inversor', value: data.inversor },
    { name: 'Estrutura', value: data.estrutura },
  ];

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="mb-1 text-base font-semibold text-[#383E49]">Tipos de Produto</h2>
      <p className="mb-4 text-xs text-[#858D9D]">Distribuição por categoria</p>
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
      <div className="mt-1 flex items-center justify-center gap-4">
        {chartData.map((item, i) => (
          <div key={item.name} className="text-center">
            <p className="text-xl font-bold" style={{ color: COLORS[i] }}>
              {item.value}
            </p>
            <p className="text-xs text-[#858D9D]">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
