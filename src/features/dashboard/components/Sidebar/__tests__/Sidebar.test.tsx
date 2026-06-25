import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from '../Sidebar';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('Sidebar', () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it('renders main navigation items', () => {
    render(<Sidebar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Produtos')).toBeInTheDocument();
    expect(screen.getByText('Movimentações')).toBeInTheDocument();
  });

  it('renders brand name', () => {
    render(<Sidebar />);
    expect(screen.getByText('GREEN ESTOQUE')).toBeInTheDocument();
  });

  it('renders bottom-nav items (Configurações, Sair)', () => {
    render(<Sidebar />);
    expect(screen.getByText('Configurações')).toBeInTheDocument();
    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  it('navigates to /dashboard when Dashboard item is clicked', () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByText('Dashboard'));
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('navigates to /products when Produtos item is clicked', () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByText('Produtos'));
    expect(mockPush).toHaveBeenCalledWith('/products');
  });

  it('navigates to /movements when Movimentações item is clicked', () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByText('Movimentações'));
    expect(mockPush).toHaveBeenCalledWith('/movements');
  });

  it('clears token and navigates to "/" when Sair is clicked', () => {
    localStorage.setItem('token', 'some-token');
    render(<Sidebar />);
    fireEvent.click(screen.getByText('Sair'));
    expect(localStorage.getItem('token')).toBeNull();
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('renders inside an <aside> element', () => {
    const { container } = render(<Sidebar />);
    expect(container.querySelector('aside')).toBeInTheDocument();
  });
});
