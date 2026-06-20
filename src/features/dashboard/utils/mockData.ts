import type {
  SalesOverview,
  PurchaseOverview,
  InventorySummary,
  ProductSummary,
  TopSellingProduct,
  LowStockProduct,
  ChartDataPoint,
  OrderChartDataPoint,
  StockOverview,
  ProductTypeBreakdown,
  StockMovementDataPoint,
} from '../types';

export const salesOverviewData: SalesOverview = {
  vendas: 832,
  receita: 18300,
  lucro: 868,
  custo: 17432,
};

export const purchaseOverviewData: PurchaseOverview = {
  compras: 82,
  custo: 13573,
  cancelados: 5,
  retorno: 17432,
};

export const inventorySummaryData: InventorySummary = {
  emEstoque: 868,
  aReceber: 200,
};

export const productSummaryData: ProductSummary = {
  fornecedores: 31,
  categorias: 21,
};

export const topSellingProducts: TopSellingProduct[] = [
  { id: '1', nome: 'Painel Solar 340W', quantidadeVendida: 30, fornecedor: 'SolarTech', preco: 850 },
  { id: '2', nome: 'Inversor Solar 5kW', quantidadeVendida: 21, fornecedor: 'PowerInv', preco: 3200 },
  { id: '3', nome: 'Estrutura Alumínio', quantidadeVendida: 15, fornecedor: 'EstruturaPro', preco: 420 },
  { id: '4', nome: 'Painel Solar 400W', quantidadeVendida: 12, fornecedor: 'SolarTech', preco: 1100 },
  { id: '5', nome: 'Inversor Micro 250W', quantidadeVendida: 9, fornecedor: 'PowerInv', preco: 780 },
];

export const lowStockProducts: LowStockProduct[] = [
  { id: '1', nome: 'Painel Solar 340W', quantidadeRestante: 10, status: 'Baixo' },
  { id: '2', nome: 'Estrutura Metálica Solo', quantidadeRestante: 5, status: 'Crítico' },
  { id: '3', nome: 'Inversor Solar 5kW', quantidadeRestante: 8, status: 'Baixo' },
];

export const chartData: ChartDataPoint[] = [
  { month: 'Jan', compras: 35000, vendas: 45000 },
  { month: 'Fev', compras: 42000, vendas: 38000 },
  { month: 'Mar', compras: 38000, vendas: 50000 },
  { month: 'Abr', compras: 50000, vendas: 42000 },
  { month: 'Mai', compras: 45000, vendas: 55000 },
  { month: 'Jun', compras: 30000, vendas: 48000 },
];

export const orderChartData: OrderChartDataPoint[] = [
  { month: 'Jan', pedidos: 25, entregues: 20 },
  { month: 'Fev', pedidos: 30, entregues: 28 },
  { month: 'Mar', pedidos: 22, entregues: 35 },
  { month: 'Abr', pedidos: 38, entregues: 26 },
  { month: 'Mai', pedidos: 32, entregues: 39 },
];

// New dashboard data
export const stockOverviewData: StockOverview = {
  emEstoque: 8,
  instalados: 2,
};

export const productTypeBreakdownData: ProductTypeBreakdown = {
  painelSolar: 5,
  inversor: 3,
  estrutura: 2,
};

export const stockMovementData: StockMovementDataPoint[] = [
  { month: 'Jan', entradas: 15, saidas: 8 },
  { month: 'Fev', entradas: 20, saidas: 12 },
  { month: 'Mar', entradas: 18, saidas: 10 },
  { month: 'Abr', entradas: 25, saidas: 15 },
  { month: 'Mai', entradas: 22, saidas: 18 },
  { month: 'Jun', entradas: 30, saidas: 20 },
];
