import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setCredentials } from '@/features/auth/authSlice';
import { ProductsTable } from '../ProductsTable';
import type { Product } from '@/features/products/types/products.types';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const sampleProducts: Product[] = [
  {
    id: 'p1',
    nome: 'Painel Solar 340W',
    tipo: 'Painel Solar',
    valor: 850,
    comprador: 'João Silva',
    dataCompra: '2024-01-10',
    dataEntrada: '2024-01-15',
    fornecedor: 'SolarTech',
    status: 'IN_STOCK',
  },
  {
    id: 'p2',
    nome: 'Inversor Solar 5kW',
    tipo: 'Inversor',
    valor: 3200,
    comprador: 'Maria Costa',
    dataCompra: '2024-02-05',
    dataEntrada: '2024-02-10',
    fornecedor: 'PowerInv',
    status: 'IN_STOCK',
  },
];

function makeStore(role?: string) {
  const store = configureStore({ reducer: { auth: authReducer } });
  if (role) {
    store.dispatch(
      setCredentials({
        user: { id: '1', name: 'User', email: 'u@e.com', role },
        access_token: 'tok',
      })
    );
  }
  return store;
}

function renderTable(products = sampleProducts, role?: string, onAddProduct = jest.fn()) {
  const store = makeStore(role);
  render(
    <Provider store={store}>
      <ProductsTable products={products} onAddProduct={onAddProduct} />
    </Provider>
  );
  return { store };
}

describe('ProductsTable', () => {
  beforeEach(() => mockPush.mockReset());

  it('renders product names', () => {
    renderTable();
    expect(screen.getByText('Painel Solar 340W')).toBeInTheDocument();
    expect(screen.getByText('Inversor Solar 5kW')).toBeInTheDocument();
  });

  it('renders formatted currency values', () => {
    renderTable();
    // R$ 850,00 formatted with pt-BR locale
    expect(screen.getByText(/850/)).toBeInTheDocument();
  });

  it('renders supplier names', () => {
    renderTable();
    expect(screen.getByText('SolarTech')).toBeInTheDocument();
    expect(screen.getByText('PowerInv')).toBeInTheDocument();
  });

  it('shows product count in the header', () => {
    renderTable();
    expect(screen.getByText(/2 produtos cadastrados/i)).toBeInTheDocument();
  });

  it('shows singular label for 1 product', () => {
    renderTable([sampleProducts[0]]);
    expect(screen.getByText(/1 produto cadastrado/i)).toBeInTheDocument();
  });

  it('shows "Adicionar Produto" button for ENGINEERING role', () => {
    renderTable(sampleProducts, 'ENGINEERING');
    expect(screen.getByRole('button', { name: /adicionar produto/i })).toBeInTheDocument();
  });

  it('hides "Adicionar Produto" button for FINANCE role', () => {
    renderTable(sampleProducts, 'FINANCE');
    expect(screen.queryByRole('button', { name: /adicionar produto/i })).not.toBeInTheDocument();
  });

  it('hides "Adicionar Produto" button when not logged in', () => {
    renderTable(sampleProducts);
    expect(screen.queryByRole('button', { name: /adicionar produto/i })).not.toBeInTheDocument();
  });

  it('calls onAddProduct when the add button is clicked', () => {
    const onAdd = jest.fn();
    renderTable(sampleProducts, 'ENGINEERING', onAdd);
    fireEvent.click(screen.getByRole('button', { name: /adicionar produto/i }));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('navigates to /products/:id when a row is clicked', () => {
    renderTable(sampleProducts, 'ENGINEERING');
    fireEvent.click(screen.getByText('Painel Solar 340W'));
    expect(mockPush).toHaveBeenCalledWith('/products/p1');
  });

  it('renders column headers', () => {
    renderTable();
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();
    expect(screen.getByText('Fornecedor')).toBeInTheDocument();
  });
});
