import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import { RegisterForm } from '../RegisterForm';

const mockRegisterMutation = jest.fn();
const mockLoginMutation = jest.fn();

jest.mock('@/shared/api/apiSlice', () => ({
  useRegisterUserMutation: () => [mockRegisterMutation, { isLoading: false }],
  useLoginMutation: () => [mockLoginMutation, { isLoading: false }],
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

function makeStore() {
  return configureStore({ reducer: { auth: authReducer } });
}

function renderRegisterForm() {
  const store = makeStore();
  render(
    <Provider store={store}>
      <RegisterForm />
    </Provider>
  );
  return { store };
}

describe('RegisterForm', () => {
  beforeEach(() => {
    mockRegisterMutation.mockReset();
    mockLoginMutation.mockReset();
    mockPush.mockReset();
  });

  it('renders name, email, password inputs and role select', () => {
    renderRegisterForm();
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/papel do usuário/i)).toBeInTheDocument();
  });

  it('renders the Cadastrar button', () => {
    renderRegisterForm();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  it('renders a link back to the login page', () => {
    renderRegisterForm();
    expect(screen.getByRole('link', { name: /faça login/i })).toHaveAttribute('href', '/');
  });

  it('role select defaults to ENGINEERING', () => {
    renderRegisterForm();
    const select = screen.getByLabelText(/papel do usuário/i) as HTMLSelectElement;
    expect(select.value).toBe('ENGINEERING');
  });

  it('role select has Engenharia and Financeiro options', () => {
    renderRegisterForm();
    expect(screen.getByRole('option', { name: /engenharia/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /financeiro/i })).toBeInTheDocument();
  });

  it('shows validation error when submitting with empty fields', async () => {
    renderRegisterForm();
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));
    expect(await screen.findByText(/preencha todos os campos/i)).toBeInTheDocument();
  });

  it('does NOT call registerMutation when fields are empty', () => {
    renderRegisterForm();
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));
    expect(mockRegisterMutation).not.toHaveBeenCalled();
  });

  it('calls registerMutation and loginMutation on valid submit', async () => {
    mockRegisterMutation.mockReturnValue({ unwrap: () => Promise.resolve({}) });
    const loginResponse = {
      access_token: 'tok',
      user: { id: '1', name: 'Ana', email: 'ana@e.com', role: 'ENGINEERING' },
    };
    mockLoginMutation.mockReturnValue({ unwrap: () => Promise.resolve(loginResponse) });

    renderRegisterForm();

    fireEvent.change(screen.getByLabelText(/nome completo/i), { target: { value: 'Ana Lima' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'ana@e.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'senha1234' } });
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(mockRegisterMutation).toHaveBeenCalledWith({
        name: 'Ana Lima',
        email: 'ana@e.com',
        password: 'senha1234',
        role: 'ENGINEERING',
      });
    });

    await waitFor(() => {
      expect(mockLoginMutation).toHaveBeenCalledWith({ email: 'ana@e.com', password: 'senha1234' });
    });
  });

  it('navigates to /dashboard after successful registration and login', async () => {
    mockRegisterMutation.mockReturnValue({ unwrap: () => Promise.resolve({}) });
    const loginResponse = {
      access_token: 'tok',
      user: { id: '1', name: 'Ana', email: 'ana@e.com', role: 'ENGINEERING' },
    };
    mockLoginMutation.mockReturnValue({ unwrap: () => Promise.resolve(loginResponse) });

    renderRegisterForm();

    fireEvent.change(screen.getByLabelText(/nome completo/i), { target: { value: 'Ana Lima' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'ana@e.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'senha1234' } });
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/dashboard'));
  });

  it('shows an API error message on registration failure', async () => {
    mockRegisterMutation.mockReturnValue({
      unwrap: () => Promise.reject({ data: { message: 'E-mail já cadastrado.' } }),
    });

    renderRegisterForm();

    fireEvent.change(screen.getByLabelText(/nome completo/i), { target: { value: 'Ana Lima' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'ana@e.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'senha1234' } });
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    expect(await screen.findByText('E-mail já cadastrado.')).toBeInTheDocument();
  });
});
