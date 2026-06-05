import type { Movement, MovementStats } from '../types/movements.types';

export const movementStats: MovementStats = {
  totalPedidos: 37,
  totalRecebido: {
    quantidade: 32,
    valor: 25000,
  },
  totalRetorno: {
    quantidade: 5,
    valor: 2500,
  },
  aCaminho: 12,
};

export const mockMovements: Movement[] = [
  { id: '1', produto: 'Placa 1', valorPedido: 250, quantidade: 43, idPedido: '7535', dataEntrega: '11/12/22', status: 'Em atraso' },
  { id: '2', produto: 'Placa 2', valorPedido: 250, quantidade: 22, idPedido: '5724', dataEntrega: '11/12/22', status: 'Confirmado' },
  { id: '3', produto: 'Placa 3', valorPedido: 500, quantidade: 36, idPedido: '2775', dataEntrega: '11/12/22', status: 'Devolvido' },
  { id: '4', produto: 'Placa 4', valorPedido: 250, quantidade: 14, idPedido: '2275', dataEntrega: '11/12/22', status: 'Entregue' },
  { id: '5', produto: 'Placa 5', valorPedido: 1500, quantidade: 5, idPedido: '2427', dataEntrega: '11/12/22', status: 'Retornado' as any }, // Assuming Retornado is similar to Devolvido from figma data
  { id: '6', produto: 'Placa 6', valorPedido: 1500, quantidade: 10, idPedido: '2578', dataEntrega: '11/12/22', status: 'Entregue' },
  { id: '7', produto: 'Placa 7', valorPedido: 500, quantidade: 23, idPedido: '2757', dataEntrega: '11/12/22', status: 'Em atraso' },
  { id: '8', produto: 'Placa 8', valorPedido: 1500, quantidade: 43, idPedido: '3757', dataEntrega: '11/12/22', status: 'Entregue' },
];
