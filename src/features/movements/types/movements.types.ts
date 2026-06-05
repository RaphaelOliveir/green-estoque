export type MovementStatus = 'Confirmado' | 'Em atraso' | 'Devolvido' | 'Entregue';

export interface Movement {
  id: string;
  produto: string; // e.g., "Placa 1"
  valorPedido: number;
  quantidade: number;
  idPedido: string;
  dataEntrega: string; // e.g., "11/12/22"
  status: MovementStatus;
}

export interface MovementStats {
  totalPedidos: number;
  totalRecebido: {
    quantidade: number;
    valor: number;
  };
  totalRetorno: {
    quantidade: number;
    valor: number;
  };
  aCaminho: number;
}
