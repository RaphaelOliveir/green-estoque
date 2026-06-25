import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../authSlice';
import { LoginForm } from '../LoginForm';

// Mock the RTK Query mutation hook
const mockLoginMutation = jest.fn();
jest.mock('@/shared/api/apiSlice', () => ({
  useLoginMutation: () => [mockLoginMutation, { isLoading: false }],
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

function makeStore() {
  return configureStore({ reducer: { auth: authReducer } });
}

function renderLoginForm() {
  const store = makeStore();
  render(
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
  return { store };
}

describe('LoginForm', () => {
  beforeEach(() => {
    mockLoginMutation.mockReset();
    mockPush.mockReset();
  });

  it('renders email and password inputs', () => {
    renderLoginForm();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  it('renders the Entrar button', () => {
    renderLoginForm();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('renders a link to the register page', () => {
    renderLoginForm();
    expect(screen.getByRole('link', { name: /cadastre-se/i })).toHaveAttribute('href', '/register');
  });

  it('shows validation error when submitting with empty fields', async () => {
    renderLoginForm();
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
    expect(await screen.findByText(/preencha todos os campos/i)).toBeInTheDocument();
  });

  it('does NOT call loginMutation when fields are empty', () => {
    renderLoginForm();
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
    expect(mockLoginMutation).not.toHaveBeenCalled();
  });

  it('calls loginMutation with email and password on valid submit', async () => {
    const fakeResponse = {
      access_token: 'token123',
      user: { id: '1', name: 'João', email: 'joao@test.com', role: 'ENGINEERING' },
    };
    mockLoginMutation.mockReturnValue({ unwrap: () => Promise.resolve(fakeResponse) });

    renderLoginForm();

    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'joao@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'senha123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(mockLoginMutation).toHaveBeenCalledWith({
        email: 'joao@test.com',
        password: 'senha123',
      });
    });
  });

  it('navigates to /dashboard after successful login', async () => {
    const fakeResponse = {
      access_token: 'token123',
      user: { id: '1', name: 'João', email: 'joao@test.com', role: 'ENGINEERING' },
    };
    mockLoginMutation.mockReturnValue({ unwrap: () => Promise.resolve(fakeResponse) });

    renderLoginForm();

    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'joao@test.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'senha123' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('shows an error message when the login API returns an error', async () => {
    mockLoginMutation.mockReturnValue({
      unwrap: () => Promise.reject({ data: { message: 'Credenciais inválidas' } }),
    });

    renderLoginForm();

    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'wrong@test.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(await screen.findByText('Credenciais inválidas')).toBeInTheDocument();
  });
});
