import React from 'react';
import { render, screen } from '@testing-library/react';
import { TopBar } from '../TopBar';

describe('TopBar', () => {
  it('renders the search placeholder text', () => {
    render(<TopBar />);
    expect(screen.getByText(/buscar produto/i)).toBeInTheDocument();
  });

  it('renders the notification bell button', () => {
    render(<TopBar />);
    expect(screen.getByRole('button', { name: /notificações/i })).toBeInTheDocument();
  });

  it('renders the user avatar / profile button', () => {
    render(<TopBar />);
    expect(screen.getByRole('button', { name: /perfil do usuário/i })).toBeInTheDocument();
  });

  it('renders inside a <header> element', () => {
    const { container } = render(<TopBar />);
    expect(container.querySelector('header')).toBeInTheDocument();
  });
});
