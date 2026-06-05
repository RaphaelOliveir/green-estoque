'use client';

import { Sidebar } from '../Sidebar/Sidebar';
import { TopBar } from '../TopBar/TopBar';
import { SalesOverviewCard } from '../SalesOverviewCard/SalesOverviewCard';
import { InventorySummaryCard } from '../InventorySummaryCard/InventorySummaryCard';
import { PurchaseOverviewCard } from '../PurchaseOverviewCard/PurchaseOverviewCard';
import { ProductSummaryCard } from '../ProductSummaryCard/ProductSummaryCard';
import { SalesPurchaseChart } from '../SalesPurchaseChart/SalesPurchaseChart';
import { OrderSummaryChart } from '../OrderSummaryChart/OrderSummaryChart';
import { TopSellingTable } from '../TopSellingTable/TopSellingTable';
import { LowStockPanel } from '../LowStockPanel/LowStockPanel';
import {
  salesOverviewData,
  purchaseOverviewData,
  inventorySummaryData,
  productSummaryData,
  topSellingProducts,
  lowStockProducts,
  chartData,
  orderChartData,
} from '../../utils/mockData';

export function DashboardPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F0F1F3]">
      {/* Sidebar */}
      <Sidebar activeItem="dashboard" />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <TopBar />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {/* Row 1: Sales overview + Inventory summary */}
          <div className="mb-5 grid grid-cols-[1fr_384px] gap-5">
            <SalesOverviewCard
              vendas={salesOverviewData.vendas}
              receita={salesOverviewData.receita}
              lucro={salesOverviewData.lucro}
              custo={salesOverviewData.custo}
            />
            <InventorySummaryCard
              emEstoque={inventorySummaryData.emEstoque}
              aReceber={inventorySummaryData.aReceber}
            />
          </div>

          {/* Row 2: Purchase overview + Product summary */}
          <div className="mb-5 grid grid-cols-[1fr_384px] gap-5">
            <PurchaseOverviewCard
              compras={purchaseOverviewData.compras}
              custo={purchaseOverviewData.custo}
              cancelados={purchaseOverviewData.cancelados}
              retorno={purchaseOverviewData.retorno}
            />
            <ProductSummaryCard
              fornecedores={productSummaryData.fornecedores}
              categorias={productSummaryData.categorias}
            />
          </div>

          {/* Row 3: Sales & Purchase chart + Order summary chart */}
          <div className="mb-5 grid grid-cols-[1fr_384px] gap-5">
            <SalesPurchaseChart data={chartData} />
            <OrderSummaryChart data={orderChartData} />
          </div>

          {/* Row 4: Top selling table + Low stock panel */}
          <div className="grid grid-cols-[1fr_384px] gap-5">
            <TopSellingTable products={topSellingProducts} />
            <LowStockPanel products={lowStockProducts} />
          </div>
        </main>
      </div>
    </div>
  );
}
