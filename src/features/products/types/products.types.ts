export type ProductType = 'Painel Solar' | 'Inversor' | 'Estrutura';
export type ProductStatus = 'IN_STOCK' | 'INSTALLED';

export interface Product {
  id: string;
  nome: string;
  descricao?: string;
  tipo: ProductType;
  valor: number;
  comprador: string;
  imagem?: string;
  dataCompra: string;
  dataEntrada: string;
  fornecedor: string;
  status: ProductStatus;
}

export interface InventoryStats {
  categorias: number;
  produtos: number;
  totalVendas: number;
  poucoEstoque: number;
}

