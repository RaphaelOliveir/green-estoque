import { mockProducts, inventoryStats } from '../mockData';

describe('Products mock data', () => {
  describe('inventoryStats', () => {
    it('should have all fields as numbers', () => {
      expect(typeof inventoryStats.categorias).toBe('number');
      expect(typeof inventoryStats.produtos).toBe('number');
      expect(typeof inventoryStats.totalVendas).toBe('number');
      expect(typeof inventoryStats.poucoEstoque).toBe('number');
    });

    it('poucoEstoque should be less than or equal to produtos', () => {
      expect(inventoryStats.poucoEstoque).toBeLessThanOrEqual(inventoryStats.produtos);
    });
  });

  describe('mockProducts', () => {
    it('should be a non-empty array', () => {
      expect(Array.isArray(mockProducts)).toBe(true);
      expect(mockProducts.length).toBeGreaterThan(0);
    });

    it('each product should have required string fields', () => {
      mockProducts.forEach((p) => {
        expect(typeof p.id).toBe('string');
        expect(typeof p.nome).toBe('string');
        expect(typeof p.tipo).toBe('string');
        expect(typeof p.comprador).toBe('string');
        expect(typeof p.fornecedor).toBe('string');
        expect(typeof p.dataCompra).toBe('string');
        expect(typeof p.dataEntrada).toBe('string');
      });
    });

    it('each product valor should be a positive number', () => {
      mockProducts.forEach((p) => {
        expect(typeof p.valor).toBe('number');
        expect(p.valor).toBeGreaterThan(0);
      });
    });

    it('each product status should be IN_STOCK or INSTALLED', () => {
      mockProducts.forEach((p) => {
        expect(['IN_STOCK', 'INSTALLED']).toContain(p.status);
      });
    });

    it('each product tipo should be a valid product type', () => {
      const validTypes = ['Painel Solar', 'Inversor', 'Estrutura'];
      mockProducts.forEach((p) => {
        expect(validTypes).toContain(p.tipo);
      });
    });

    it('all product IDs should be unique', () => {
      const ids = mockProducts.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('mockProducts count should match inventoryStats.produtos', () => {
      expect(mockProducts.length).toBe(inventoryStats.produtos);
    });
  });
});
