'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { StockMovementDataPoint } from '../../types';

interface StockMovementsBarChartProps {
  data: StockMovementDataPoint[];
}

export function StockMovementsBarChart({ data }: StockMovementsBarChartProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#383E49]">Movimentações de Estoque</h2>
          <p className="text-xs text-[#858D9D]">Entradas e saídas mensais</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="30%" barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F3" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#858D9D' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#858D9D' }}
          />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: '1px solid #E4E7EC', fontSize: 12 }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-xs text-[#5D6679]">
                {value === 'entradas' ? 'Entradas' : 'Saídas'}
              </span>
            )}
          />
          <Bar dataKey="entradas" name="entradas" fill="#22C55E" radius={[4, 4, 0, 0]} />
          <Bar dataKey="saidas" name="saidas" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
