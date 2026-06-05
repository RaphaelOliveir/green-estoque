import type {
  SalesOverview,
  PurchaseOverview,
  InventorySummary,
  ProductSummary,
  TopSellingProduct,
  LowStockProduct,
  ChartDataPoint,
  OrderChartDataPoint,
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
  { id: '1', nome: 'Placa 1', quantidadeVendida: 30, quantidadeRestante: 12, preco: 2500 },
  { id: '2', nome: 'Placa 2', quantidadeVendida: 21, quantidadeRestante: 15, preco: 2742 },
  { id: '3', nome: 'Placa 3', quantidadeVendida: 19, quantidadeRestante: 17, preco: 3569.12 },
];

export const lowStockProducts: LowStockProduct[] = [
  { id: '1', nome: 'Painel Solar 340W', quantidadeRestante: 10, status: 'Baixo' },
  { id: '2', nome: 'Kit De Painel Solar', quantidadeRestante: 15, status: 'Baixo' },
  { id: '3', nome: 'Inversor Solar 5kW', quantidadeRestante: 8, status: 'Baixo' },
];

export const chartData: ChartDataPoint[] = [
  { month: 'Jan', compras: 35000, vendas: 45000 },
  { month: 'Fev', compras: 42000, vendas: 38000 },
  { month: 'Mar', compras: 38000, vendas: 50000 },
  { month: 'Abr', compras: 50000, vendas: 42000 },
  { month: 'Mai', compras: 45000, vendas: 55000 },
  { month: 'Jun', compras: 30000, vendas: 48000 },
  { month: 'Jul', compras: 55000, vendas: 40000 },
  { month: 'Ago', compras: 48000, vendas: 52000 },
  { month: 'Set', compras: 40000, vendas: 35000 },
  { month: 'Out', compras: 52000, vendas: 58000 },
];

export const orderChartData: OrderChartDataPoint[] = [
  { month: 'Jan', pedidos: 2500, entregues: 3200 },
  { month: 'Fev', pedidos: 3000, entregues: 2800 },
  { month: 'Mar', pedidos: 2200, entregues: 3500 },
  { month: 'Abr', pedidos: 3800, entregues: 2600 },
  { month: 'Mai', pedidos: 3200, entregues: 3900 },
];
