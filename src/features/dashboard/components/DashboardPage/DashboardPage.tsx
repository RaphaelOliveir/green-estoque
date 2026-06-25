'use client';

import { Sidebar } from '../Sidebar/Sidebar';
import { TopBar } from '../TopBar/TopBar';
import { StockOverviewChart } from '../StockOverviewChart/StockOverviewChart';
import { ProductTypeChart } from '../ProductTypeChart/ProductTypeChart';
import { StockMovementsBarChart } from '../StockMovementsBarChart/StockMovementsBarChart';
import { TopSellingTable } from '../TopSellingTable/TopSellingTable';
import { 
  useGetOverviewQuery, 
  useGetStockByTypeQuery, 
  useGetTimelineQuery, 
  useGetBestSellingQuery 
} from '@/shared/api/apiSlice';

export function DashboardPage() {
  const { data: overviewData, isLoading: isLoadingOverview } = useGetOverviewQuery();
  const { data: stockByTypeData, isLoading: isLoadingStockByType } = useGetStockByTypeQuery();
  const { data: timelineData, isLoading: isLoadingTimeline } = useGetTimelineQuery({ period: 'monthly' });
  const { data: bestSellingData, isLoading: isLoadingBestSelling } = useGetBestSellingQuery();

  const isLoading = isLoadingOverview || isLoadingStockByType || isLoadingTimeline || isLoadingBestSelling;

  // Map backend responses to frontend props
  const stockOverview = overviewData ? {
    emEstoque: overviewData.inStock || 0,
    instalados: overviewData.installed || 0,
  } : { emEstoque: 0, instalados: 0 };

  const productTypeBreakdown = stockByTypeData ? {
    painelSolar: stockByTypeData.solarPanel || 0,
    inversor: stockByTypeData.inverter || 0,
    estrutura: stockByTypeData.structure || 0,
  } : { painelSolar: 0, inversor: 0, estrutura: 0 };

  // Map timeline array, handling backend format.
  // Backend returns: { periodLabel, inStock, installed }
  const stockMovement = Array.isArray(timelineData) ? timelineData.map(item => ({
    month: item.periodLabel || '',
    entradas: item.inStock || 0,
    saidas: item.installed || 0,
  })) : [];

  // Map best selling. Backend returns a single object: { productId, count, product: { ... } }
  // We need to pass an array to the TopSellingTable
  const topSelling = bestSellingData && bestSellingData.product ? [{
    id: bestSellingData.productId ?? '',
    nome: bestSellingData.product.name ?? '',
    quantidadeVendida: bestSellingData.count ?? 0,
    fornecedor: bestSellingData.product.vendor ?? '',
    preco: bestSellingData.product.cost ?? 0,
  }] : [];

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
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <span className="text-[#858D9D]">Carregando dashboard...</span>
            </div>
          ) : (
            <>
              {/* Row 1: Stock Overview + Product Type breakdown */}
              <div className="mb-5 grid grid-cols-2 gap-5">
                <StockOverviewChart data={stockOverview} />
                <ProductTypeChart data={productTypeBreakdown} />
              </div>

              {/* Row 2: Stock Movements bar chart (full width) */}
              <div className="mb-5">
                <StockMovementsBarChart data={stockMovement} />
              </div>

              {/* Row 3: Best sellers table (full width) */}
              <div>
                <TopSellingTable products={topSelling} />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

