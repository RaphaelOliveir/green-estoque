export interface SalesOverview {
  vendas: number;
  receita: number;
  lucro: number;
  custo: number;
}

export interface PurchaseOverview {
  compras: number;
  custo: number;
  cancelados: number;
  retorno: number;
}

export interface InventorySummary {
  emEstoque: number;
  aReceber: number;
}

export interface ProductSummary {
  fornecedores: number;
  categorias: number;
}

export interface TopSellingProduct {
  id: string;
  nome: string;
  quantidadeVendida: number;
  quantidadeRestante: number;
  preco: number;
}

export interface LowStockProduct {
  id: string;
  nome: string;
  quantidadeRestante: number;
  status: 'Baixo' | 'Crítico';
  imageUrl?: string;
}

export interface ChartDataPoint {
  month: string;
  compras: number;
  vendas: number;
}

export interface OrderChartDataPoint {
  month: string;
  pedidos: number;
  entregues: number;
}
