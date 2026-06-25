import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MovementsTable } from '../MovementsTable';
import type { Movement } from '@/features/movements/types/movements.types';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const sampleMovements: Movement[] = [
  {
    id: 'm1',
    productId: '1',
    produto: 'Painel Solar 340W',
    valor: 850,
    dataEntrada: '2024-01-15',
    comprador: 'João Silva',
    descricao: 'Painel monocristalino',
    fornecedor: 'SolarTech',
    tipo: 'Painel Solar',
    status: 'IN_STOCK',
  },
  {
    id: 'm2',
    productId: '2',
    produto: 'Inversor Solar 5kW',
    valor: 3200,
    dataEntrada: '2024-02-10',
    comprador: 'Maria Costa',
    descricao: 'Inversor monofásico',
    fornecedor: 'PowerInv',
    tipo: 'Inversor',
    status: 'INSTALLED',
  },
];

function renderTable(movements = sampleMovements) {
  render(<MovementsTable movements={movements} />);
}

describe('MovementsTable', () => {
  beforeEach(() => mockPush.mockReset());

  it('renders the table header title', () => {
    renderTable();
    expect(screen.getByText('Movimentações')).toBeInTheDocument();
  });

  it('renders the correct record count', () => {
    renderTable();
    // The subtitle "2 registros" appears in the table header
    expect(screen.getByText('2 registros')).toBeInTheDocument();
  });

  it('renders singular label for 1 record', () => {
    renderTable([sampleMovements[0]]);
    expect(screen.getByText('1 registro')).toBeInTheDocument();
  });

  it('renders product names', () => {
    renderTable();
    expect(screen.getByText('Painel Solar 340W')).toBeInTheDocument();
    expect(screen.getByText('Inversor Solar 5kW')).toBeInTheDocument();
  });

  it('renders supplier names', () => {
    renderTable();
    expect(screen.getByText('SolarTech')).toBeInTheDocument();
    expect(screen.getByText('PowerInv')).toBeInTheDocument();
  });

  it('renders buyer names', () => {
    renderTable();
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Costa')).toBeInTheDocument();
  });

  it('shows "Em estoque" badge for IN_STOCK status', () => {
    renderTable();
    expect(screen.getByText('Em estoque')).toBeInTheDocument();
  });

  it('shows "Instalado" badge for INSTALLED status', () => {
    renderTable();
    expect(screen.getByText('Instalado')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    renderTable();
    expect(screen.getByText('Nome do Produto')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('navigates to /movements/:id when a row is clicked', () => {
    renderTable();
    fireEvent.click(screen.getByText('Painel Solar 340W'));
    expect(mockPush).toHaveBeenCalledWith('/movements/m1');
  });

  it('navigates to the correct movement on second row click', () => {
    renderTable();
    fireEvent.click(screen.getByText('Inversor Solar 5kW'));
    expect(mockPush).toHaveBeenCalledWith('/movements/m2');
  });
});
