import {
  salesOverviewData,
  purchaseOverviewData,
  inventorySummaryData,
  productSummaryData,
  topSellingProducts,
  lowStockProducts,
  chartData,
  orderChartData,
  stockOverviewData,
  productTypeBreakdownData,
  stockMovementData,
} from '../mockData';

describe('Dashboard mock data', () => {
  describe('salesOverviewData', () => {
    it('should have all required fields as numbers', () => {
      expect(typeof salesOverviewData.vendas).toBe('number');
      expect(typeof salesOverviewData.receita).toBe('number');
      expect(typeof salesOverviewData.lucro).toBe('number');
      expect(typeof salesOverviewData.custo).toBe('number');
    });

    it('custo + lucro should equal receita', () => {
      expect(salesOverviewData.custo + salesOverviewData.lucro).toBe(salesOverviewData.receita);
    });
  });

  describe('purchaseOverviewData', () => {
    it('should have all required fields as numbers', () => {
      expect(typeof purchaseOverviewData.compras).toBe('number');
      expect(typeof purchaseOverviewData.custo).toBe('number');
      expect(typeof purchaseOverviewData.cancelados).toBe('number');
      expect(typeof purchaseOverviewData.retorno).toBe('number');
    });
  });

  describe('inventorySummaryData', () => {
    it('should have emEstoque and aReceber as numbers', () => {
      expect(typeof inventorySummaryData.emEstoque).toBe('number');
      expect(typeof inventorySummaryData.aReceber).toBe('number');
    });
  });

  describe('productSummaryData', () => {
    it('should have fornecedores and categorias as numbers', () => {
      expect(typeof productSummaryData.fornecedores).toBe('number');
      expect(typeof productSummaryData.categorias).toBe('number');
    });
  });

  describe('topSellingProducts', () => {
    it('should be a non-empty array', () => {
      expect(Array.isArray(topSellingProducts)).toBe(true);
      expect(topSellingProducts.length).toBeGreaterThan(0);
    });

    it('each item should have required fields', () => {
      topSellingProducts.forEach((p) => {
        expect(p).toHaveProperty('id');
        expect(p).toHaveProperty('nome');
        expect(typeof p.quantidadeVendida).toBe('number');
        expect(typeof p.preco).toBe('number');
      });
    });
  });

  describe('lowStockProducts', () => {
    it('should be a non-empty array', () => {
      expect(Array.isArray(lowStockProducts)).toBe(true);
      expect(lowStockProducts.length).toBeGreaterThan(0);
    });

    it('each item status should be Baixo or Crítico', () => {
      lowStockProducts.forEach((p) => {
        expect(['Baixo', 'Crítico']).toContain(p.status);
      });
    });
  });

  describe('chartData', () => {
    it('should have entries with month, compras, vendas', () => {
      chartData.forEach((d) => {
        expect(typeof d.month).toBe('string');
        expect(typeof d.compras).toBe('number');
        expect(typeof d.vendas).toBe('number');
      });
    });
  });

  describe('orderChartData', () => {
    it('should have entries with month, pedidos, entregues', () => {
      orderChartData.forEach((d) => {
        expect(typeof d.month).toBe('string');
        expect(typeof d.pedidos).toBe('number');
        expect(typeof d.entregues).toBe('number');
      });
    });
  });

  describe('stockOverviewData', () => {
    it('should have emEstoque and instalados as numbers', () => {
      expect(typeof stockOverviewData.emEstoque).toBe('number');
      expect(typeof stockOverviewData.instalados).toBe('number');
    });
  });

  describe('productTypeBreakdownData', () => {
    it('should have painelSolar, inversor, estrutura as numbers', () => {
      expect(typeof productTypeBreakdownData.painelSolar).toBe('number');
      expect(typeof productTypeBreakdownData.inversor).toBe('number');
      expect(typeof productTypeBreakdownData.estrutura).toBe('number');
    });
  });

  describe('stockMovementData', () => {
    it('should have entries with month, entradas, saidas', () => {
      stockMovementData.forEach((d) => {
        expect(typeof d.month).toBe('string');
        expect(typeof d.entradas).toBe('number');
        expect(typeof d.saidas).toBe('number');
      });
    });

    it('should cover 6 months of data', () => {
      expect(stockMovementData).toHaveLength(6);
    });
  });
});
