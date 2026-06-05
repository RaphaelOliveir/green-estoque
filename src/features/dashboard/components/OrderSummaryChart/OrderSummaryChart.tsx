'use client';

import type { OrderChartDataPoint } from '../../types';

interface OrderSummaryChartProps {
  data: OrderChartDataPoint[];
}

export function OrderSummaryChart({ data }: OrderSummaryChartProps) {
  const maxValue = 4000;
  const chartHeight = 182;
  const chartWidth = 316;
  const yLabels = [4000, 3000, 2000, 1000];
  const xLabels = data.map((d) => d.month);

  const getY = (value: number) => chartHeight - (value / maxValue) * chartHeight;

  const pedidosPoints = data.map((d, i) => {
    const x = (i / (data.length - 1)) * chartWidth;
    const y = getY(d.pedidos);
    return `${x},${y}`;
  });

  const entreguesPoints = data.map((d, i) => {
    const x = (i / (data.length - 1)) * chartWidth;
    const y = getY(d.entregues);
    return `${x},${y}`;
  });

  // Create area fill paths
  const pedidosPath =
    `M ${pedidosPoints[0]} ` +
    pedidosPoints.slice(1).map((p) => `L ${p}`).join(' ') +
    ` L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

  const entreguesPath =
    `M ${entreguesPoints[0]} ` +
    entreguesPoints.slice(1).map((p) => `L ${p}`).join(' ') +
    ` L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

  return (
    <div className="flex flex-col rounded-[10px] bg-white p-4">
      <h2 className="text-xl font-medium text-[#383E49]">Resumo de pedidos</h2>

      <div className="mt-4 flex gap-2">
        {/* Y-axis */}
        <div className="flex flex-col justify-between pb-6 text-right">
          {yLabels.map((label) => (
            <span key={label} className="text-[12px] leading-[18px] text-[#858D9D]">
              {label}
            </span>
          ))}
          <span className="text-[12px] leading-[18px] text-[#858D9D]">0</span>
        </div>

        {/* Chart */}
        <div className="flex-1">
          <svg
            width="100%"
            height={chartHeight + 30}
            viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="pedidos-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(223, 155, 45, 0.13)" />
                <stop offset="100%" stopColor="rgba(197, 166, 116, 0.13)" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1={0}
                y1={(i / 4) * chartHeight}
                x2={chartWidth}
                y2={(i / 4) * chartHeight}
                stroke="#D0D3D9"
                strokeWidth="1"
              />
            ))}

            {/* Entregues area fill */}
            <path d={entreguesPath} fill="rgba(182, 211, 250, 0.3)" />

            {/* Pedidos area fill */}
            <path d={pedidosPath} fill="url(#pedidos-area)" />

            {/* Entregues line */}
            <polyline
              points={entreguesPoints.join(' ')}
              fill="none"
              stroke="#B6D3FA"
              strokeWidth="2"
            />

            {/* Pedidos line */}
            <polyline
              points={pedidosPoints.join(' ')}
              fill="none"
              stroke="#DBA362"
              strokeWidth="2"
            />

            {/* X-axis labels */}
            {data.map((d, i) => (
              <text
                key={d.month}
                x={(i / (data.length - 1)) * chartWidth}
                y={chartHeight + 18}
                textAnchor="middle"
                fontSize="12"
                fill="#858D9D"
              >
                {d.month}
              </text>
            ))}
          </svg>

          {/* Legend */}
          <div className="mt-2 flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="h-[15px] w-[15px] rounded-full bg-[#DBA362]" />
              <span className="text-xs text-[#667085]">Pedido</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-[15px] w-[15px] rounded-full bg-[#B6D3FA]" />
              <span className="text-xs text-[#667085]">Entregue</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
