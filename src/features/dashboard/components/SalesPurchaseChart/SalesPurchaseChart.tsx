'use client';

import type { ChartDataPoint } from '../../types';

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="16" height="16" rx="2" stroke="#5D6679" strokeWidth="1.5" />
      <path d="M2 8H18" stroke="#5D6679" strokeWidth="1.5" />
      <path d="M6 1V5M14 1V5" stroke="#5D6679" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface SalesPurchaseChartProps {
  data: ChartDataPoint[];
}

export function SalesPurchaseChart({ data }: SalesPurchaseChartProps) {
  const maxValue = 60000;
  const chartHeight = 198;
  const chartWidth = 542;
  const barGroupWidth = chartWidth / data.length;
  const barWidth = 12;
  const gap = 4;

  const getBarHeight = (value: number) => (value / maxValue) * chartHeight;

  const yLabels = [60000, 50000, 40000, 30000, 20000, 10000];

  return (
    <div className="relative rounded-[10px] bg-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between px-2 pb-4">
        <h2 className="text-xl font-medium text-[#383E49]">Vendas &amp; Compras</h2>
        <button
          type="button"
          className="flex items-center gap-2 rounded border border-[#D0D3D9] px-4 py-1.5 text-sm font-medium text-[#5D6679] shadow-sm hover:bg-gray-50 transition-colors"
        >
          <CalendarIcon />
          Semanal
        </button>
      </div>

      {/* Chart area */}
      <div className="flex gap-2 pl-2">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between pb-6 text-right">
          {yLabels.map((label) => (
            <span key={label} className="text-[12px] leading-[18px] text-[#667085]">
              {(label / 1000).toFixed(0)},000
            </span>
          ))}
        </div>

        {/* Chart */}
        <div className="flex-1">
          <svg
            width="100%"
            height={chartHeight + 40}
            viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid lines */}
            {yLabels.map((label, i) => (
              <line
                key={label}
                x1={0}
                y1={(i / (yLabels.length - 1)) * chartHeight}
                x2={chartWidth}
                y2={(i / (yLabels.length - 1)) * chartHeight}
                stroke="#D0D3D9"
                strokeWidth="1"
              />
            ))}

            {/* Bars */}
            {data.map((d, i) => {
              const x = i * barGroupWidth + barGroupWidth / 2 - barWidth - gap / 2;
              const comprasHeight = getBarHeight(d.compras);
              const vendasHeight = getBarHeight(d.vendas);

              return (
                <g key={d.month}>
                  {/* Compras bar - gradient purple-blue */}
                  <defs>
                    <linearGradient id={`compras-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#817AF3" />
                      <stop offset="48%" stopColor="#74B0FA" />
                      <stop offset="100%" stopColor="#79D0F1" />
                    </linearGradient>
                    <linearGradient id={`vendas-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#46A46C" />
                      <stop offset="48%" stopColor="#51CC5D" />
                      <stop offset="100%" stopColor="#57DA65" />
                    </linearGradient>
                  </defs>
                  <rect
                    x={x}
                    y={chartHeight - comprasHeight}
                    width={barWidth}
                    height={comprasHeight}
                    fill={`url(#compras-${i})`}
                    rx={2}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                  {/* Vendas bar - gradient green */}
                  <rect
                    x={x + barWidth + gap}
                    y={chartHeight - vendasHeight}
                    width={barWidth}
                    height={vendasHeight}
                    fill={`url(#vendas-${i})`}
                    rx={2}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                  {/* Month label */}
                  <text
                    x={i * barGroupWidth + barGroupWidth / 2}
                    y={chartHeight + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#858D9D"
                  >
                    {d.month}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="mt-2 flex items-center gap-10 pl-4">
            <div className="flex items-center gap-2">
              <div
                className="h-[15px] w-[15px] rounded-full"
                style={{ background: 'linear-gradient(180deg, #817AF3 0%, #74B0FA 48%, #79D0F1 100%)' }}
              />
              <span className="text-xs text-[#667085]">Compras</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-[15px] w-[15px] rounded-full"
                style={{ background: 'linear-gradient(180deg, #46A46C 0%, #51CC5D 48%, #57DA65 100%)' }}
              />
              <span className="text-xs text-[#667085]">Vendas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
