import { mockMovements, movementStats } from '../mockData';

describe('Movements mock data', () => {
  describe('movementStats', () => {
    it('should have totalPedidos as a number', () => {
      expect(typeof movementStats.totalPedidos).toBe('number');
    });

    it('should have totalRecebido with quantidade and valor', () => {
      expect(typeof movementStats.totalRecebido.quantidade).toBe('number');
      expect(typeof movementStats.totalRecebido.valor).toBe('number');
    });

    it('should have totalRetorno with quantidade and valor', () => {
      expect(typeof movementStats.totalRetorno.quantidade).toBe('number');
      expect(typeof movementStats.totalRetorno.valor).toBe('number');
    });

    it('should have aCaminho as a number', () => {
      expect(typeof movementStats.aCaminho).toBe('number');
    });

    it('totalRecebido + totalRetorno should not exceed totalPedidos', () => {
      const sum =
        movementStats.totalRecebido.quantidade + movementStats.totalRetorno.quantidade;
      expect(sum).toBeLessThanOrEqual(movementStats.totalPedidos);
    });
  });

  describe('mockMovements', () => {
    it('should be a non-empty array', () => {
      expect(Array.isArray(mockMovements)).toBe(true);
      expect(mockMovements.length).toBeGreaterThan(0);
    });

    it('each movement should have required string fields', () => {
      mockMovements.forEach((m) => {
        expect(typeof m.id).toBe('string');
        expect(typeof m.productId).toBe('string');
        expect(typeof m.produto).toBe('string');
        expect(typeof m.comprador).toBe('string');
        expect(typeof m.fornecedor).toBe('string');
        expect(typeof m.dataEntrada).toBe('string');
      });
    });

    it('each movement valor should be a positive number', () => {
      mockMovements.forEach((m) => {
        expect(typeof m.valor).toBe('number');
        expect(m.valor).toBeGreaterThan(0);
      });
    });

    it('each movement status should be IN_STOCK or INSTALLED', () => {
      mockMovements.forEach((m) => {
        expect(['IN_STOCK', 'INSTALLED']).toContain(m.status);
      });
    });

    it('each movement tipo should be a valid product type', () => {
      const validTypes = ['Painel Solar', 'Inversor', 'Estrutura'];
      mockMovements.forEach((m) => {
        expect(validTypes).toContain(m.tipo);
      });
    });

    it('all movement IDs should be unique', () => {
      const ids = mockMovements.map((m) => m.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });
});
