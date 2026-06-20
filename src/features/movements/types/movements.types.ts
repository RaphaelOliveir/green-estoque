export type MovementStatus = 'IN_STOCK' | 'INSTALLED';

export interface Movement {
  id: string;
  productId: string;
  produto: string;
  valor: number;
  dataEntrada: string;
  comprador: string;
  descricao?: string;
  imagem?: string;
  fornecedor: string;
  tipo: 'Painel Solar' | 'Inversor' | 'Estrutura';
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

