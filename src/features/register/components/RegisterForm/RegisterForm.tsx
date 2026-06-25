'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useRegisterUserMutation, useLoginMutation } from '@/shared/api/apiSlice';
import { setCredentials } from '../../../auth/authSlice';

export function RegisterForm() {
  const router = useRouter();
  const [registerMutation, { isLoading: isRegistering }] = useRegisterUserMutation();
  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ENGINEERING');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const isLoading = isRegistering || isLoggingIn;

  const handleRegister = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await registerMutation({ name, email, password, role }).unwrap();
      // Auto-login after successful registration
      const loginResponse = await loginMutation({ email, password }).unwrap();
      if (loginResponse.access_token) {
        localStorage.setItem('token', loginResponse.access_token);
        localStorage.setItem('user', JSON.stringify(loginResponse.user));
        dispatch(setCredentials({ user: loginResponse.user, access_token: loginResponse.access_token }));
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } catch (err) {
      setError((err as { data?: { message?: string } })?.data?.message || 'Erro ao efetuar cadastro. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="flex w-[360px] flex-col gap-6">
      <form className="flex flex-col gap-5" onSubmit={handleRegister}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium leading-5 text-text-secondary" htmlFor="name">Nome completo</label>
          <div className="flex h-11 w-full items-center rounded-lg border border-border bg-white px-3.5 py-2.5 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <input 
              className="w-full bg-transparent text-base leading-6 text-text-main outline-none placeholder:text-text-muted" 
              type="text" 
              id="name" 
              placeholder="Digite seu nome completo"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium leading-5 text-text-secondary" htmlFor="email">E-mail</label>
          <div className="flex h-11 w-full items-center rounded-lg border border-border bg-white px-3.5 py-2.5 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <input 
              className="w-full bg-transparent text-base leading-6 text-text-main outline-none placeholder:text-text-muted" 
              type="email" 
              id="email" 
              placeholder="Digite seu e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium leading-5 text-text-secondary" htmlFor="password">Senha</label>
          <div className="flex h-11 w-full items-center rounded-lg border border-border bg-white px-3.5 py-2.5 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <input 
              className="w-full bg-transparent text-base leading-6 text-text-main outline-none placeholder:text-text-muted" 
              type="password" 
              id="password" 
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <p className="mt-1 text-sm text-text-muted">A senha deve ter no mínimo 8 caracteres.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium leading-5 text-text-secondary" htmlFor="role">Papel do Usuário</label>
          <div className="flex h-11 w-full items-center rounded-lg border border-border bg-white px-3.5 py-2.5 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <select 
              id="role"
              className="w-full bg-transparent text-base leading-6 text-text-main outline-none"
              value={role}
              onChange={e => setRole(e.target.value)}
              disabled={isLoading}
            >
              <option value="ENGINEERING">Engenharia</option>
              <option value="FINANCE">Financeiro</option>
            </select>
          </div>
        </div>
        
        {error && <span className="text-sm text-red-500">{error}</span>}
        <button type="submit" className="hidden" />
      </form>

      <div className="flex flex-col">
        <button 
          className="flex h-11 w-full cursor-pointer items-center justify-center rounded-lg border border-primary bg-primary text-base font-medium leading-6 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-all hover:bg-primary-hover active:translate-y-[1px] disabled:opacity-50" 
          type="button"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </div>

      <div className="flex w-full items-center justify-center gap-1">
        <span className="text-sm leading-5 text-text-muted">Já tem uma conta?</span>
        <Link href="/" className="text-sm font-medium leading-5 text-primary transition-colors hover:text-primary-hover">Faça login</Link>
      </div>
    </div>
  );
}
