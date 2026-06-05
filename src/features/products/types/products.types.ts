export type Disponibilidade = 'Em estoque' | 'Sem estoque' | 'Pouco estoque';

export interface Product {
  id: string;
  nome: string;
  valorCompra: number;
  quantidade: number;
  quantidadeUnidade: string;
  valorLimite: number;
  valorLimiteUnidade: string;
  validade: string;
  disponibilidade: Disponibilidade;
}

export interface InventoryStats {
  categorias: number;
  produtos: number;
  totalVendas: number;
  poucoEstoque: number;
}
